/**
 * WEBHOOK ZALO OFFICIAL ACCOUNT — nhận tin nhắn khách gửi đến OA,
 * trả lời bằng cùng trợ lý AI đang dùng cho website và Messenger
 * (dùng chung src/lib/ai-reply.ts).
 * ------------------------------------------------------------------
 * URL: /api/zalo/webhook  (chỉ có POST — Zalo không có bước GET verify
 * riêng như Facebook, nhưng có "Kiểm tra" gửi thử 1 request POST thật
 * khi bạn lưu URL trên Zalo Developers).
 *
 * Biến môi trường cần có trong .env.local / Vercel:
 *  - ZALO_APP_ID           App ID (trang Cài đặt)
 *  - ZALO_APP_SECRET       "Khóa bí mật của ứng dụng" (trang Cài đặt)
 *  - ZALO_OA_SECRET_KEY    "OA secret" (trang Webhook), nếu tìm thấy trên
 *                           giao diện Zalo Developers của bạn. Nếu không có,
 *                           để trống — code sẽ tự dùng ZALO_APP_SECRET thay thế
 *  - ZALO_REFRESH_TOKEN    refresh_token gốc lấy 1 lần qua OAuth thủ công
 *  - ANTHROPIC_API_KEY     đã có sẵn cho /api/chat
 *
 * Cần Vercel KV đã kết nối vào project (xem src/lib/zalo-token.ts).
 */

import { NextResponse } from "next/server";
import crypto from "crypto";
import { askClaude, LOI_CHUNG, type ChatMessage } from "@/lib/ai-reply";
import { layAccessTokenHopLe } from "@/lib/zalo-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lưu lịch sử hội thoại theo từng khách (user_id) để AI nhớ ngữ cảnh.
 * ⚠️ Nằm trong RAM — mất khi deploy lại/restart, mỗi instance nhớ
 * riêng. Đủ dùng quy mô nhỏ, giống cơ chế đã dùng cho Messenger.
 */
const lichSuTheoKhach = new Map<string, ChatMessage[]>();
const MAX_LICH_SU_LUU = 20;

function themVaoLichSu(userId: string, msg: ChatMessage) {
  const hienTai = lichSuTheoKhach.get(userId) ?? [];
  hienTai.push(msg);
  if (hienTai.length > MAX_LICH_SU_LUU) hienTai.shift();
  lichSuTheoKhach.set(userId, hienTai);
  if (lichSuTheoKhach.size > 2000) lichSuTheoKhach.clear();
}

/**
 * Công thức Zalo quy định: mac = sha256(app_id + rawBody + timestamp + OA_secret_key)
 * Đây là hash thường (không phải HMAC), bắt buộc dùng đúng raw body
 * (chuỗi JSON gốc Zalo gửi), không phải object đã parse rồi stringify lại.
 */
function chuKyHopLe(rawBody: string, timestamp: string, signature: string | null): boolean {
  const appId = process.env.ZALO_APP_ID;
  const oaSecretKey = process.env.ZALO_OA_SECRET_KEY || process.env.ZALO_APP_SECRET;
  if (!appId || !oaSecretKey || !signature || !timestamp) return false;

  const expected = crypto
    .createHash("sha256")
    .update(appId + rawBody + timestamp + oaSecretKey)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false; // độ dài khác nhau → chắc chắn không khớp
  }
}

async function guiTinZalo(userId: string, text: string) {
  const accessToken = await layAccessTokenHopLe();

  // Zalo giới hạn 2000 ký tự mỗi tin nhắn text.
  const noiDung = text.slice(0, 2000);

  const res = await fetch("https://openapi.zalo.me/v3.0/oa/message/cs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      access_token: accessToken,
    },
    body: JSON.stringify({
      recipient: { user_id: userId },
      message: { text: noiDung },
    }),
  });

  if (!res.ok) {
    console.error("[zalo] Gửi tin thất bại:", await res.text());
  }
}

interface ZaloEventPayload {
  app_id?: string;
  oa_id?: string;
  event_name?: string;
  timestamp?: string;
  sender?: { id?: string };
  message?: { text?: string; msg_id?: string };
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-zevent-signature");

  let payload: ZaloEventPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const timestamp = payload.timestamp ?? "";
  const chuKyOk = chuKyHopLe(rawBody, timestamp, signature);
  if (!chuKyOk) {
    // Không chặn cứng bằng 403 — request "Kiểm tra" của Zalo khi lưu
    // Webhook URL không phải lúc nào cũng ký đúng định dạng sự kiện thật,
    // và Zalo yêu cầu MỌI trường hợp phải trả 200 OK mới lưu được URL.
    // Ghi log để so sánh/tìm đúng OA secret sau, nhưng vẫn trả 200 và
    // KHÔNG xử lý nội dung (không gọi AI, không trả lời) cho an toàn.
    console.error(
      "[zalo] Chữ ký không khớp — bỏ qua xử lý sự kiện này.",
      JSON.stringify({ event_name: payload.event_name, hasSignature: Boolean(signature) }),
    );
    return new NextResponse("OK", { status: 200 });
  }

  // Chỉ xử lý sự kiện khách gửi tin nhắn văn bản, bỏ qua các event khác
  // (follow OA, thả icon, gửi ảnh...) để giữ code đơn giản trước mắt.
  if (payload.event_name === "user_send_text") {
    const userId = payload.sender?.id;
    const text = payload.message?.text;

    if (userId && text) {
      themVaoLichSu(userId, { role: "user", content: text });

      try {
        const reply = await askClaude(lichSuTheoKhach.get(userId)!);
        themVaoLichSu(userId, { role: "assistant", content: reply });
        await guiTinZalo(userId, reply);
      } catch (err) {
        console.error("[zalo] Lỗi khi hỏi Claude:", err);
        await guiTinZalo(userId, LOI_CHUNG);
      }
    }
  }

  // Luôn trả 200 cho Zalo biết đã nhận, kể cả những event không xử lý.
  return new NextResponse("OK", { status: 200 });
}

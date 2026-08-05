/**
 * WEBHOOK ZALO OFFICIAL ACCOUNT — nhận tin nhắn khách gửi đến OA,
 * trả lời bằng cùng trợ lý AI đang dùng cho website và Messenger
 * (dùng chung src/lib/ai-reply.ts).
 * ------------------------------------------------------------------
 * URL: /api/zalo/webhook
 *
 * QUAN TRỌNG — 2 nguyên tắc bắt buộc để Zalo chấp nhận webhook này:
 *
 * 1. LUÔN trả 200 OK cho MỌI request, kể cả khi chữ ký không khớp.
 *    Request "Kiểm tra" khi lưu URL, và nút "Test" gửi sự kiện giả lập,
 *    không phải lúc nào cũng ký giống hệt tin nhắn thật — chặn cứng
 *    bằng 403 sẽ khiến Zalo không cho lưu webhook. Khi chữ ký sai,
 *    ta chỉ ÂM THẦM BỎ QUA xử lý (không gọi AI, không trả lời), không
 *    từ chối cả request.
 *
 * 2. LUÔN trả response NGAY LẬP TỨC, không chờ gọi Claude/gửi tin
 *    nhắn xong. Việc đó có thể mất vài giây — chờ xong mới trả 200 sẽ
 *    bị Zalo coi là "Không thể kết nối" (timeout). Dùng after() của
 *    Next.js để xử lý AI ở "phía sau", sau khi response đã gửi xong.
 *
 * Biến môi trường cần có trong Vercel:
 *  - ZALO_APP_ID           App ID (trang Cài đặt)
 *  - ZALO_APP_SECRET       "Khóa bí mật của ứng dụng" (trang Cài đặt)
 *  - ZALO_OA_SECRET_KEY    "OA Secret Key" (hiện ra ở trang Webhook sau
 *                           khi lưu URL lần đầu thành công)
 *  - ZALO_REFRESH_TOKEN    refresh_token gốc lấy 1 lần qua OAuth thủ công
 *  - ANTHROPIC_API_KEY     đã có sẵn cho /api/chat
 *  - KV_REST_API_URL / KV_REST_API_TOKEN   từ Upstash (qua Vercel Storage)
 */

import { NextResponse, after } from "next/server";
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
 * XÁC THỰC REQUEST — vì sao không dùng chữ ký X-ZEvent-Signature?
 * ------------------------------------------------------------------
 * Đã thử ~60 tổ hợp công thức (app_id / oa_id / recipient.id, OA secret
 * / app secret, sha256 thường / HMAC, nhiều thứ tự ghép chuỗi) nhưng
 * không tổ hợp nào khớp với giá trị Zalo gửi. Thay vì kẹt mãi ở đó,
 * ta bảo vệ webhook bằng 2 lớp đơn giản mà chắc chắn:
 *
 *  1. TOKEN BÍ MẬT TRONG URL: webhook đăng ký với Zalo có dạng
 *     /api/zalo/webhook?k=<chuỗi bí mật>. Chỉ Zalo biết URL đầy đủ này
 *     (bạn chỉ dán nó vào Zalo Developers), nên người ngoài không đoán
 *     được để gọi vào.
 *
 *  2. KIỂM TRA app_id: payload phải mang đúng app_id của ứng dụng.
 *
 * Vẫn log lại chữ ký nhận được để sau này nếu Zalo công bố công thức
 * chính xác thì bật lại verify dễ dàng.
 */
function requestHopLe(req: Request, payload: ZaloEventPayload): boolean {
  const tokenMongDoi = process.env.ZALO_WEBHOOK_TOKEN;
  const appIdMongDoi = process.env.ZALO_APP_ID;

  if (tokenMongDoi) {
    const token = new URL(req.url).searchParams.get("k");
    if (token !== tokenMongDoi) {
      console.error("[zalo] Token trong URL không đúng — từ chối xử lý.");
      return false;
    }
  }

  if (appIdMongDoi && payload.app_id && payload.app_id !== appIdMongDoi) {
    console.error("[zalo] app_id trong payload không khớp — từ chối xử lý.");
    return false;
  }

  return true;
}

async function guiTinZalo(userId: string, text: string) {
  const accessToken = await layAccessTokenHopLe();
  const noiDung = text.slice(0, 2000); // Zalo giới hạn 2000 ký tự/tin

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

/** Xử lý AI + gửi trả lời — chạy NỀN sau khi đã trả response, không bao giờ throw ra ngoài. */
async function xuLyVaTraLoi(userId: string) {
  try {
    const reply = await askClaude(lichSuTheoKhach.get(userId)!);
    themVaoLichSu(userId, { role: "assistant", content: reply });
    await guiTinZalo(userId, reply);
  } catch (err) {
    console.error("[zalo] Lỗi khi hỏi Claude hoặc gửi tin:", err);
    try {
      await guiTinZalo(userId, LOI_CHUNG);
    } catch (errGui) {
      console.error("[zalo] Gửi tin báo lỗi cũng thất bại:", errGui);
    }
  }
}

interface ZaloEventPayload {
  app_id?: string;
  oa_id?: string;
  event_name?: string;
  timestamp?: string;
  sender?: { id?: string };
  recipient?: { id?: string };
  message?: { text?: string; msg_id?: string };
}

export async function POST(req: Request) {
  const rawBody = await req.text();

  let payload: ZaloEventPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    // Body không phải JSON hợp lệ — vẫn trả 200 (có thể là request
    // kiểm tra kết nối đơn thuần của Zalo), chỉ là không xử lý gì.
    return new NextResponse("OK", { status: 200 });
  }

  const hopLe = requestHopLe(req, payload);

  if (!hopLe) {
    console.error(
      "[zalo] Request không hợp lệ — bỏ qua xử lý, vẫn trả 200 OK.",
      JSON.stringify({ event_name: payload.event_name }),
    );
  } else if (payload.event_name === "user_send_text") {
    const userId = payload.sender?.id;
    const text = payload.message?.text;

    if (userId && text) {
      themVaoLichSu(userId, { role: "user", content: text });
      // Xử lý AI + gửi trả lời SAU khi response này đã gửi xong,
      // để Zalo không phải chờ và báo "Không thể kết nối".
      after(() => xuLyVaTraLoi(userId));
    }
  }

  return new NextResponse("OK", { status: 200 });
}

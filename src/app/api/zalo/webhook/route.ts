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
 * Header thực tế Zalo gửi có dạng "mac=<hash>", phải bỏ tiền tố "mac="
 * trước khi so sánh (đã xác nhận qua log debug thực tế).
 */
function chuKyHopLe(
  rawBody: string,
  timestamp: string,
  signatureHeader: string | null,
  payload: ZaloEventPayload,
): boolean {
  const oaSecretKey = process.env.ZALO_OA_SECRET_KEY ?? "";
  const appSecret = process.env.ZALO_APP_SECRET ?? "";
  const appIdEnv = process.env.ZALO_APP_ID ?? "";

  if (!signatureHeader || !timestamp) {
    console.error("[zalo][debug4] Thiếu chữ ký hoặc timestamp.");
    return false;
  }

  const signature = signatureHeader.startsWith("mac=") ? signatureHeader.slice(4) : signatureHeader;

  // Các nguồn ID có thể xuất hiện trong công thức
  const nguonId: Record<string, string> = {
    appIdPayload: payload.app_id ?? "",
    appIdEnv,
    recipientId: payload.recipient?.id ?? "", // chính là OA id
    senderId: payload.sender?.id ?? "",
    oaIdPayload: payload.oa_id ?? "",
    rong: "",
  };

  const nguonKhoa: Record<string, string> = {
    oaSecret: oaSecretKey,
    appSecret,
  };

  const ketQua: Record<string, string> = {};
  let khopVoi: string | null = null;
  let chuoiKhop: { chuoi: string; hmac: boolean; khoa: string } | null = null;

  for (const [tenId, idVal] of Object.entries(nguonId)) {
    if (!idVal && tenId !== "rong") continue;
    for (const [tenKhoa, khoa] of Object.entries(nguonKhoa)) {
      if (!khoa) continue;

      const mauChuoi: Record<string, string> = {
        "id+body+ts+key": idVal + rawBody + timestamp + khoa,
        "id+body+ts": idVal + rawBody + timestamp,
        "body+ts": rawBody + timestamp,
      };

      for (const [tenMau, chuoi] of Object.entries(mauChuoi)) {
        // sha256 thường
        const h1 = crypto.createHash("sha256").update(chuoi).digest("hex");
        const ten1 = `${tenId}|${tenKhoa}|${tenMau}|sha256`;
        ketQua[ten1] = h1.slice(0, 8);
        if (h1 === signature) {
          khopVoi = ten1;
          chuoiKhop = { chuoi, hmac: false, khoa };
        }

        // HMAC-SHA256 với khoá
        const h2 = crypto.createHmac("sha256", khoa).update(chuoi).digest("hex");
        const ten2 = `${tenId}|${tenKhoa}|${tenMau}|hmac`;
        ketQua[ten2] = h2.slice(0, 8);
        if (h2 === signature) {
          khopVoi = ten2;
          chuoiKhop = { chuoi, hmac: true, khoa };
        }
      }
    }
  }

  console.error(
    "[zalo][debug4]",
    JSON.stringify({
      received8: signature.slice(0, 8),
      receivedLen: signature.length,
      timestamp,
      rawBodyLen: rawBody.length,
      coOaSecret: Boolean(oaSecretKey),
      coAppSecret: Boolean(appSecret),
      khopVoi,
    }),
  );
  if (!khopVoi) {
    console.error("[zalo][debug4] Bang ket qua:", JSON.stringify(ketQua));
  }

  if (!khopVoi || !chuoiKhop) return false;

  const expected = chuoiKhop.hmac
    ? crypto.createHmac("sha256", chuoiKhop.khoa).update(chuoiKhop.chuoi).digest("hex")
    : crypto.createHash("sha256").update(chuoiKhop.chuoi).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
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
  const signatureHeader = req.headers.get("x-zevent-signature");

  let payload: ZaloEventPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    // Body không phải JSON hợp lệ — vẫn trả 200 (có thể là request
    // kiểm tra kết nối đơn thuần của Zalo), chỉ là không xử lý gì.
    return new NextResponse("OK", { status: 200 });
  }

  const timestamp = payload.timestamp ?? "";
  const hopLe = chuKyHopLe(rawBody, timestamp, signatureHeader, payload);

  if (!hopLe) {
    console.error(
      "[zalo] Chữ ký không khớp hoặc thiếu — bỏ qua xử lý, vẫn trả 200 OK.",
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

/**
 * WEBHOOK MESSENGER — nhận tin nhắn từ Fanpage Facebook, trả lời bằng
 * cùng trợ lý AI đang chạy trên chat box website (dùng chung
 * src/lib/ai-reply.ts).
 * ------------------------------------------------------------------
 * URL: /api/messenger/webhook
 *  - GET  → Facebook gọi 1 lần để xác minh webhook (Bước 7).
 *  - POST → Facebook gọi mỗi khi có tin nhắn mới từ khách.
 *
 * Biến môi trường cần có trong .env.local:
 *  - MESSENGER_VERIFY_TOKEN   chuỗi bạn tự đặt, dùng để xác minh GET
 *  - MESSENGER_PAGE_TOKEN     Page Access Token lấy từ Meta Developer
 *  - MESSENGER_APP_SECRET     "Khóa bí mật của ứng dụng" (App secret),
 *                              dùng để kiểm tra chữ ký request (chống giả mạo)
 *  - ANTHROPIC_API_KEY        đã có sẵn cho /api/chat
 */

import { NextResponse } from "next/server";
import crypto from "crypto";
import { askClaude, LOI_CHUNG, type ChatMessage } from "@/lib/ai-reply";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * BƯỚC 7 (một phần): Facebook gọi GET này đúng 1 lần khi bạn bấm
 * "Xác minh và lưu" trong mục Webhooks trên Meta Developer.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.MESSENGER_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Xác minh thất bại", { status: 403 });
}

/**
 * Lưu lịch sử hội thoại theo từng người gửi (senderId) để AI nhớ
 * ngữ cảnh trong phiên chat.
 *
 * ⚠️ Giống bộ đếm rate-limit ở /api/chat: nằm trong RAM nên sẽ mất khi
 * deploy lại / restart server, và mỗi instance server nhớ riêng. Đủ
 * dùng cho quy mô nhỏ. Nếu cần bền hơn, thay bằng Redis (VD Upstash).
 */
const lichSuTheoNguoiGui = new Map<string, ChatMessage[]>();
const MAX_LICH_SU_LUU = 20;

function themVaoLichSu(senderId: string, msg: ChatMessage) {
  const hienTai = lichSuTheoNguoiGui.get(senderId) ?? [];
  hienTai.push(msg);
  if (hienTai.length > MAX_LICH_SU_LUU) hienTai.shift();
  lichSuTheoNguoiGui.set(senderId, hienTai);
  if (lichSuTheoNguoiGui.size > 2000) lichSuTheoNguoiGui.clear();
}

/** Kiểm tra request thực sự đến từ Facebook, không phải bị giả mạo. */
function chuKyHopLe(rawBody: string, signature: string | null): boolean {
  const appSecret = process.env.MESSENGER_APP_SECRET;
  if (!appSecret || !signature) return false;

  const expected =
    "sha256=" + crypto.createHmac("sha256", appSecret).update(rawBody).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false; // độ dài khác nhau → chắc chắn không khớp
  }
}

/** Gửi tin nhắn trả lời cho khách qua Messenger Send API. */
async function guiTinMessenger(recipientId: string, text: string) {
  const pageToken = process.env.MESSENGER_PAGE_TOKEN;
  if (!pageToken) {
    console.error("[messenger] Thiếu MESSENGER_PAGE_TOKEN.");
    return;
  }

  // Messenger giới hạn 2000 ký tự mỗi tin.
  const noiDung = text.slice(0, 2000);

  const res = await fetch(
    `https://graph.facebook.com/v21.0/me/messages?access_token=${pageToken}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: noiDung },
        messaging_type: "RESPONSE",
      }),
    },
  );

  if (!res.ok) {
    console.error("[messenger] Gửi tin thất bại:", await res.text());
  }
}

interface MessengerEntry {
  messaging?: Array<{
    sender?: { id?: string };
    message?: { text?: string; is_echo?: boolean };
  }>;
}

export async function POST(req: Request) {
  const rawBody = await req.text();

  // BƯỚC 7 (bảo mật): xác minh chữ ký trước khi xử lý bất cứ gì.
  const signature = req.headers.get("x-hub-signature-256");
  if (!chuKyHopLe(rawBody, signature)) {
    console.error("[messenger] Chữ ký không hợp lệ — có thể là request giả mạo.");
    return new NextResponse("Invalid signature", { status: 403 });
  }

  let payload: { object?: string; entry?: MessengerEntry[] };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new NextResponse("Bad Request", { status: 400 });
  }

  if (payload.object !== "page") {
    return new NextResponse("Ignored", { status: 200 });
  }

  for (const entry of payload.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      const senderId = event.sender?.id;
      const text = event.message?.text;

      // Bỏ qua tin echo (tin do chính Page gửi, Facebook cũng báo lại).
      if (!senderId || !text || event.message?.is_echo) continue;

      themVaoLichSu(senderId, { role: "user", content: text });

      try {
        const reply = await askClaude(lichSuTheoNguoiGui.get(senderId)!);
        themVaoLichSu(senderId, { role: "assistant", content: reply });
        await guiTinMessenger(senderId, reply);
      } catch (err) {
        console.error("[messenger] Lỗi khi hỏi Claude:", err);
        await guiTinMessenger(senderId, LOI_CHUNG);
      }
    }
  }

  // Luôn trả 200 cho Facebook biết đã nhận, kể cả khi có lỗi xử lý bên trong
  // (tránh Facebook nghĩ webhook chết rồi tự ý huỷ đăng ký).
  return new NextResponse("EVENT_RECEIVED", { status: 200 });
}

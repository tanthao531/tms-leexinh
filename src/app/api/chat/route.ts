/**
 * ENDPOINT CHAT — chạy trên SERVER, không phải trên trình duyệt.
 * ------------------------------------------------------------------
 * Đây là lớp trung gian giữa chat box và Claude API. Lý do bắt buộc
 * phải có nó: API key chỉ được nằm ở server. Nếu gọi thẳng từ trình
 * duyệt, bất kỳ ai mở DevTools cũng lấy được key và dùng hết tiền
 * trong tài khoản của bạn.
 *
 * Đường dẫn file quyết định URL: src/app/api/chat/route.ts → /api/chat
 *
 * Logic gọi Claude nằm chung ở src/lib/ai-reply.ts — webhook Messenger
 * (src/app/api/messenger/webhook/route.ts) cũng gọi cùng hàm đó.
 */

import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { askClaude, LOI_CHUNG, type ChatMessage } from "@/lib/ai-reply";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CUA_SO_MS = 60_000;
const MAX_REQUEST_MOI_PHUT = 12;

const luotGoi = new Map<string, number[]>();

function vuotGioiHan(ip: string): boolean {
  const now = Date.now();
  const ganDay = (luotGoi.get(ip) ?? []).filter((t) => now - t < CUA_SO_MS);
  ganDay.push(now);
  luotGoi.set(ip, ganDay);
  if (luotGoi.size > 5000) luotGoi.clear();
  return ganDay.length > MAX_REQUEST_MOI_PHUT;
}

function layIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function hopLe(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (m) =>
        m &&
        typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
  );
}

export async function POST(req: Request) {
  if (vuotGioiHan(layIp(req))) {
    return NextResponse.json(
      {
        error: `Bạn đang gửi hơi nhanh. Chờ một chút rồi thử lại, hoặc nhắn Zalo ${siteConfig.contact.zaloNumber} để được trả lời ngay.`,
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!hopLe(messages)) {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  try {
    const reply = await askClaude(messages);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[chat] Không gọi được Claude API:", err);
    return NextResponse.json({ error: LOI_CHUNG }, { status: 502 });
  }
}

/**
 * ENDPOINT CHAT — chạy trên SERVER, không phải trên trình duyệt.
 * ------------------------------------------------------------------
 * Đây là lớp trung gian giữa chat box và Claude API. Lý do bắt buộc
 * phải có nó: API key chỉ được nằm ở server. Nếu gọi thẳng từ trình
 * duyệt, bất kỳ ai mở DevTools cũng lấy được key và dùng hết tiền
 * trong tài khoản của bạn.
 *
 * Đường dẫn file quyết định URL: src/app/api/chat/route.ts → /api/chat
 */

import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chat-context";
import { siteConfig } from "@/lib/site-config";

// Bắt buộc chạy trên Node runtime và không cache phản hồi.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Model đang dùng: Claude Sonnet 5.
 *
 * Vì sao chọn model này:
 *  - Trả lời tự nhiên, khéo hơn Haiku rõ rệt — quan trọng khi bot đang
 *    thay mặt bạn nói chuyện với khách sắp đặt phòng.
 *  - Ngưỡng cache chỉ 1.024 token, nên prompt caching bên dưới hoạt
 *    động NGAY (Haiku 4.5 cần tới 4.096 token mới cache được).
 *
 * 👉 Lưu ý về giá: Sonnet 5 đang áp dụng giá giới thiệu $2/$10 mỗi triệu
 * token (vào/ra) đến hết 31/08/2026, sau đó lên mức chuẩn $3/$15. Khi đó
 * chi phí sẽ tăng khoảng 50%. Nếu muốn rẻ hơn, đổi dòng dưới thành
 * "claude-haiku-4-5-20251001" — nhưng nhớ là caching sẽ ngừng hoạt động
 * trừ khi system prompt của bạn đã dài quá 4.096 token.
 */
const MODEL = "claude-sonnet-5";

const MAX_TOKENS = 600;
const MAX_LICH_SU = 20; // số tin nhắn gần nhất được gửi kèm
const MAX_KY_TU = 800; // độ dài tối đa 1 tin nhắn của khách
const CUA_SO_MS = 60_000;
const MAX_REQUEST_MOI_PHUT = 12;

type Role = "user" | "assistant";
interface ChatMessage {
  role: Role;
  content: string;
}

const LOI_CHUNG = `Xin lỗi, hệ thống đang bận. Bạn vui lòng nhắn Zalo ${siteConfig.contact.zaloNumber} hoặc gọi ${siteConfig.contact.phoneDisplay} để được hỗ trợ ngay nhé.`;

/**
 * Giới hạn số lần gọi theo IP — chặn người ta spam làm cạn tiền API.
 *
 * ⚠️ Bộ đếm này nằm trong RAM nên sẽ reset mỗi lần deploy, và mỗi
 * instance server đếm riêng. Đủ dùng cho một website nhỏ. Nếu sau này
 * lượng truy cập lớn, thay bằng Upstash Redis (có gói miễn phí).
 */
const luotGoi = new Map<string, number[]>();

function vuotGioiHan(ip: string): boolean {
  const now = Date.now();
  const ganDay = (luotGoi.get(ip) ?? []).filter((t) => now - t < CUA_SO_MS);
  ganDay.push(now);
  luotGoi.set(ip, ganDay);

  // Dọn bộ nhớ để Map không phình vô hạn.
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
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Log ra terminal cho bạn thấy, còn khách chỉ thấy thông báo chung.
    console.error("[chat] Thiếu ANTHROPIC_API_KEY trong biến môi trường.");
    return NextResponse.json({ error: LOI_CHUNG }, { status: 500 });
  }

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

  // Chỉ giữ các tin nhắn gần nhất và cắt bớt tin quá dài → tiết kiệm chi phí.
  const lichSu = messages.slice(-MAX_LICH_SU).map((m) => ({
    role: m.role,
    content: m.content.slice(0, MAX_KY_TU),
  }));

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        /**
         * PROMPT CACHING
         * System prompt được đánh dấu là điểm cache. Phần này giống hệt
         * nhau ở mọi request nên là chỗ duy nhất đáng cache — lịch sử
         * hội thoại nằm SAU điểm cache vì nó đổi liên tục.
         *
         * ✅ Sonnet 5 chỉ cần system prompt dài tối thiểu 1.024 token là
         * cache được. Prompt của bạn khoảng 2.500-3.000 token nên caching
         * hoạt động ngay. Xem dòng log [chat] usage bên dưới để xác nhận.
         */
        system: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: lichSu,
      }),
      // Nếu Claude không trả lời trong 30 giây thì bỏ cuộc.
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      const chiTiet = await res.text();
      console.error(`[chat] Claude API lỗi ${res.status}:`, chiTiet);
      return NextResponse.json({ error: LOI_CHUNG }, { status: 502 });
    }

    const data = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
      usage?: {
        input_tokens?: number;
        output_tokens?: number;
        cache_creation_input_tokens?: number;
        cache_read_input_tokens?: number;
      };
    };

    /**
     * Log để kiểm chứng cache. Cách đọc:
     *  - cache_write > 0  → lần đầu, đã ghi vào cache (tốn 1,25x giá input)
     *  - cache_read  > 0  → ĂN CACHE, chỉ tốn 10% giá input 🎉
     *  - cả hai = 0       → KHÔNG cache. Với Sonnet 5 thì đây là dấu hiệu
     *                       bất thường, cần kiểm tra lại.
     */
    const u = data.usage;
    if (u) {
      console.log(
        `[chat] usage cache_write=${u.cache_creation_input_tokens ?? 0} ` +
          `cache_read=${u.cache_read_input_tokens ?? 0} ` +
          `input=${u.input_tokens ?? 0} output=${u.output_tokens ?? 0}`,
      );
    }

    const reply = (data.content ?? [])
      .filter((b) => b.type === "text" && b.text)
      .map((b) => b.text)
      .join("\n")
      .trim();

    if (!reply) {
      return NextResponse.json({ error: LOI_CHUNG }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[chat] Không gọi được Claude API:", err);
    return NextResponse.json({ error: LOI_CHUNG }, { status: 502 });
  }
}

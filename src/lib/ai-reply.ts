/**
 * HÀM GỌI CLAUDE DÙNG CHUNG
 * ------------------------------------------------------------------
 * Được tách ra từ src/app/api/chat/route.ts để cả chat box trên
 * website VÀ webhook Messenger (src/app/api/messenger/webhook/route.ts)
 * đều gọi cùng một chỗ — sửa prompt hay đổi model chỉ cần sửa 1 nơi.
 */

import { SYSTEM_PROMPT } from "@/lib/chat-context";
import { siteConfig } from "@/lib/site-config";

export const MODEL = "claude-sonnet-5";
const MAX_TOKENS = 600;
const MAX_LICH_SU = 20;
const MAX_KY_TU = 800;

export type Role = "user" | "assistant";
export interface ChatMessage {
  role: Role;
  content: string;
}

export const LOI_CHUNG = `Xin lỗi, hệ thống đang bận. Bạn vui lòng nhắn Zalo ${siteConfig.contact.zaloNumber} hoặc gọi ${siteConfig.contact.phoneDisplay} để được hỗ trợ ngay nhé.`;

/**
 * Gửi lịch sử hội thoại cho Claude, trả về câu trả lời dạng text.
 * Ném lỗi (throw) khi có sự cố — nơi gọi tự quyết định xử lý ra sao
 * (web trả JSON lỗi, Messenger thì gửi LOI_CHUNG cho khách).
 */
export async function askClaude(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Thiếu ANTHROPIC_API_KEY trong biến môi trường.");
  }

  const lichSu = messages.slice(-MAX_LICH_SU).map((m) => ({
    role: m.role,
    content: m.content.slice(0, MAX_KY_TU),
  }));

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
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: lichSu,
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!res.ok) {
    const chiTiet = await res.text();
    console.error(`[ai-reply] Claude API lỗi ${res.status}:`, chiTiet);
    throw new Error(`Claude API lỗi ${res.status}`);
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

  const u = data.usage;
  if (u) {
    console.log(
      `[ai-reply] usage cache_write=${u.cache_creation_input_tokens ?? 0} ` +
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
    throw new Error("Claude trả về câu trả lời rỗng.");
  }

  return reply;
}

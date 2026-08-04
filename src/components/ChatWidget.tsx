"use client";

/**
 * CHAT BOX AI — nút tròn nổi ở góc phải màn hình.
 * ------------------------------------------------------------------
 * Dùng đúng bộ màu và font đã có của site (navy / teal / coral / sand)
 * nên nhìn liền mạch với phần còn lại.
 *
 * Trên di động, nút được đẩy lên trên thanh StickyContactBar để không
 * che mất nút "Gọi ngay / Zalo / Đặt phòng".
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

interface Message {
  role: "user" | "assistant";
  content: string;
}

/** 👉 Sửa các câu gợi ý này theo những gì khách hay hỏi bạn nhất. */
const CAU_GOI_Y = [
  "Căn nào hợp cho gia đình 4 người?",
  "Mấy giờ được nhận phòng?",
  "Từ đây ra biển bao xa?",
  "Có chỗ đỗ ô tô không?",
];

const LOI_CHAO: Message = {
  role: "assistant",
  content: `Xin chào! Mình là trợ lý ảo của ${siteConfig.shortName}. Bạn muốn hỏi về căn hộ, tiện ích hay đường đi tới chỗ mình?`,
};

export default function ChatWidget() {
  const [moRong, setMoRong] = useState(false);
  const [messages, setMessages] = useState<Message[]>([LOI_CHAO]);
  const [input, setInput] = useState("");
  const [dangGui, setDangGui] = useState(false);
  const [loi, setLoi] = useState<string | null>(null);

  const cuoiDanhSach = useRef<HTMLDivElement>(null);
  const oNhap = useRef<HTMLInputElement>(null);

  // Luôn cuộn xuống tin nhắn mới nhất.
  useEffect(() => {
    cuoiDanhSach.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, dangGui]);

  // Mở panel thì đưa con trỏ vào ô nhập luôn.
  useEffect(() => {
    if (moRong) oNhap.current?.focus();
  }, [moRong]);

  // Nhấn Esc để đóng.
  useEffect(() => {
    if (!moRong) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoRong(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moRong]);

  const gui = useCallback(
    async (noiDung: string) => {
      const text = noiDung.trim();
      if (!text || dangGui) return;

      const lichSuMoi: Message[] = [...messages, { role: "user", content: text }];
      setMessages(lichSuMoi);
      setInput("");
      setLoi(null);
      setDangGui(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          // Bỏ lời chào mở đầu ra, nó chỉ để hiển thị chứ không cần gửi đi.
          body: JSON.stringify({ messages: lichSuMoi.slice(1) }),
        });

        const data = await res.json();

        if (!res.ok || !data.reply) {
          setLoi(data.error ?? "Không gửi được tin nhắn. Bạn thử lại nhé.");
          return;
        }

        setMessages((truoc) => [...truoc, { role: "assistant", content: data.reply }]);
      } catch {
        setLoi(
          `Mất kết nối mạng. Bạn kiểm tra lại wifi/4G, hoặc nhắn Zalo ${siteConfig.contact.zaloNumber} nhé.`,
        );
      } finally {
        setDangGui(false);
      }
    },
    [messages, dangGui],
  );

  return (
    <>
      {/* Nút mở/đóng */}
      <button
        type="button"
        onClick={() => setMoRong((v) => !v)}
        aria-label={moRong ? "Đóng khung chat" : "Mở khung chat hỏi đáp"}
        aria-expanded={moRong}
        className="fixed right-4 bottom-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-lg shadow-navy/20 transition hover:bg-coral-dark active:scale-95 lg:bottom-6"
      >
        {moRong ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 10.5h7.5M8.25 13.5h4.5M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-3.6-.68L3 21l1.26-3.78A8.19 8.19 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
        )}
      </button>

      {/* Khung chat */}
      {moRong && (
        <div
          role="dialog"
          aria-label="Hỏi đáp nhanh"
          className="fixed right-4 bottom-36 z-50 flex h-[min(70vh,520px)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-2xl shadow-navy/25 lg:bottom-24"
        >
          {/* Đầu khung */}
          <div className="flex items-center gap-3 bg-teal px-4 py-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 font-display text-sm font-semibold">
              LX
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold">Hỏi nhanh {siteConfig.shortName}</p>
              <p className="truncate text-[11px] text-white/75">Trợ lý ảo · trả lời ngay</p>
            </div>
          </div>

          {/* Danh sách tin nhắn */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-ivory px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <p
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-teal px-3.5 py-2.5 text-sm leading-relaxed text-white"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm bg-sand-light px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-ink"
                  }
                >
                  {m.content}
                </p>
              </div>
            ))}

            {dangGui && (
              <div className="flex justify-start">
                <p className="rounded-2xl rounded-bl-sm bg-sand-light px-3.5 py-2.5 text-sm text-ink-soft">
                  Đang soạn câu trả lời…
                </p>
              </div>
            )}

            {loi && (
              <p className="rounded-xl bg-coral/10 px-3.5 py-2.5 text-sm text-coral-dark" role="alert">
                {loi}
              </p>
            )}

            {/* Gợi ý câu hỏi — chỉ hiện khi khách chưa nhắn gì */}
            {messages.length === 1 && !dangGui && (
              <div className="flex flex-wrap gap-2 pt-1">
                {CAU_GOI_Y.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => gui(c)}
                    className="rounded-full border border-teal/30 bg-white px-3 py-1.5 text-left text-xs text-teal transition hover:bg-teal hover:text-white"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            <div ref={cuoiDanhSach} />
          </div>

          {/* Ô nhập */}
          <div className="border-t border-navy/10 bg-white px-3 py-3">
            <div className="flex items-center gap-2">
              <input
                ref={oNhap}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") gui(input);
                }}
                maxLength={800}
                placeholder="Nhập câu hỏi của bạn…"
                aria-label="Câu hỏi của bạn"
                className="min-w-0 flex-1 rounded-full border border-navy/15 bg-ivory px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60"
              />
              <button
                type="button"
                onClick={() => gui(input)}
                disabled={dangGui || !input.trim()}
                aria-label="Gửi câu hỏi"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral text-white transition hover:bg-coral-dark disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-7.5-15-7.5v6l9 1.5-9 1.5v6z" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-ink-soft">
              Trả lời tự động, có thể chưa chính xác hoàn toàn. Cần chắc chắn, bạn gọi{" "}
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="font-semibold text-teal underline">
                {siteConfig.contact.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}

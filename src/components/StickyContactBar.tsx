import { siteConfig } from "@/lib/site-config";

/**
 * Thanh liên hệ nhanh cố định ở đáy màn hình trên di động — nơi khách
 * đặt phòng thường thao tác nhất. Luôn hiển thị số điện thoại, Zalo,
 * Messenger để giảm tối đa bước trước khi khách liên hệ.
 */
export default function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-navy/10 bg-white/95 backdrop-blur lg:hidden">
      <a
        href={`tel:${siteConfig.contact.phoneHref}`}
        className="flex flex-col items-center gap-0.5 py-2.5 text-navy active:bg-sand-light"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a1.5 1.5 0 001.5-1.5v-2.02a1.5 1.5 0 00-1.14-1.456l-3.32-.83a1.5 1.5 0 00-1.514.454l-.897 1.037a12.06 12.06 0 01-5.983-5.983l1.037-.897a1.5 1.5 0 00.454-1.514l-.83-3.32A1.5 1.5 0 006.27 2.25H4.25a1.5 1.5 0 00-1.5 1.5v3z"
          />
        </svg>
        <span className="text-[11px] font-semibold">Gọi ngay</span>
      </a>
      <a
        href={siteConfig.contact.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 border-x border-navy/10 py-2.5 text-teal active:bg-sand-light"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 10.5h7.5M8.25 13.5h4.5M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-3.6-.68L3 21l1.26-3.78A8.19 8.19 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
          />
        </svg>
        <span className="text-[11px] font-semibold">Zalo</span>
      </a>
      <a
        href={siteConfig.booking.engineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 bg-coral py-2.5 text-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3.75h10.5A2.25 2.25 0 0119.5 6v9a2.25 2.25 0 01-2.25 2.25H9l-4.5 3.75V6a2.25 2.25 0 012.25-2.25z"
          />
        </svg>
        <span className="text-[11px] font-semibold">Đặt phòng</span>
      </a>
    </div>
  );
}

"use client";

/**
 * POPUP KHUYẾN MÃI — hiện lên khi khách vừa vào trang.
 * ------------------------------------------------------------------
 * Cách dùng:
 *   1. Bỏ ảnh khuyến mãi thật vào: /public/images/khuyen-mai/khuyen-mai.jpg
 *      (kích thước gợi ý: ảnh dọc ~800x1000px hoặc ảnh ngang ~1200x800px)
 *   2. Vậy là xong — popup TỰ ĐỘNG hiện ảnh khi phát hiện file đã có.
 *      Nếu CHƯA có ảnh, popup sẽ không hiện gì cả (không hiện khung
 *      trống/báo lỗi), tránh làm phiền khách khi bạn chưa sẵn sàng.
 *
 * Tuỳ chỉnh:
 *   - PROMO_LINK: đường link khi khách bấm vào ảnh (vd: trang đặt phòng,
 *     Zalo, hoặc để trống "" nếu ảnh chỉ để xem, không cần bấm).
 *   - PROMO_ENABLED: đổi thành false để tắt popup ngay lập tức mà không
 *     cần xoá ảnh.
 *   - Popup chỉ hiện 1 lần cho mỗi phiên truy cập (đóng rồi sẽ không hiện
 *     lại cho tới khi khách đóng hẳn trình duyệt / mở tab mới).
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

// 👉 Đổi các dòng dưới đây theo nhu cầu
const PROMO_ENABLED = true;
const PROMO_IMAGE = "/images/khuyen-mai/khuyen-mai.jpg";
// Bấm vào ảnh sẽ dẫn tới trang đặt phòng (dùng chung link với nút "Đặt phòng
// ngay" trong site-config.ts — đổi hệ thống đặt phòng ở đó thì popup tự theo).
const PROMO_LINK = siteConfig.booking.engineUrl;
const SESSION_KEY = "tms-promo-popup-dismissed";

export default function PromoPopup() {
  const [imageOk, setImageOk] = useState(false);
  const [open, setOpen] = useState(false);

  // Kiểm tra ảnh có tồn tại chưa (gọi qua HEAD request vì đây là client component,
  // không thể dùng fs như PlaceholderImage ở server component).
  useEffect(() => {
    if (!PROMO_ENABLED) return;

    const alreadyDismissed = sessionStorage.getItem(SESSION_KEY) === "1";
    if (alreadyDismissed) return;

    let cancelled = false;
    fetch(PROMO_IMAGE, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && res.ok) {
          setImageOk(true);
          setOpen(true);
        }
      })
      .catch(() => {
        // Chưa có ảnh hoặc lỗi mạng — im lặng bỏ qua, không hiện popup.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  if (!PROMO_ENABLED || !imageOk || !open) return null;

  const imageEl = (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl sm:aspect-[3/4]">
      <Image
        src={PROMO_IMAGE}
        alt="Khuyến mãi"
        fill
        className="object-cover"
        sizes="(max-width: 640px) 90vw, 420px"
        priority
      />
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Chương trình khuyến mãi"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng"
          className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        {PROMO_LINK ? (
          <a
            href={PROMO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="block"
          >
            {imageEl}
          </a>
        ) : (
          imageEl
        )}
      </div>
    </div>
  );
}

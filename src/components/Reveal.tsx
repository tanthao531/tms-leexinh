"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Hướng trượt vào khi xuất hiện */
  direction?: "up" | "left" | "right" | "none";
  /** Độ trễ (ms) — dùng để tạo hiệu ứng xuất hiện lần lượt (stagger) cho nhiều phần tử cạnh nhau */
  delay?: number;
  className?: string;
}

const hiddenTransform: Record<NonNullable<RevealProps["direction"]>, string> = {
  up: "translate-y-10",
  left: "translate-x-10",
  right: "-translate-x-10",
  none: "",
};

/**
 * Bọc quanh 1 khối nội dung để nó nhẹ nhàng hiện dần + trượt vào đúng lúc
 * người xem cuộn tới, thay vì hiện sẵn toàn bộ ngay từ đầu. Đây là hiệu
 * ứng "sinh động khi cuộn trang" áp dụng xuyên suốt site.
 *
 * Tôn trọng người dùng bật "giảm chuyển động" (prefers-reduced-motion) —
 * quy tắc này đã được xử lý toàn cục trong globals.css.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // An toàn: nếu trình duyệt cũ không hỗ trợ IntersectionObserver,
    // hiển thị nội dung ở khung hình kế tiếp thay vì để ẩn vĩnh viễn.
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hiddenTransform[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

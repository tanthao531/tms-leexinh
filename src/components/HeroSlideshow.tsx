"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Slideshow ảnh nền đầu trang: chuyển đổi mờ dần (crossfade) kết hợp zoom
 * chậm (Ken Burns) để banner không bị "đứng yên tĩnh".
 *
 * TỐI ƯU TỐC ĐỘ: lần tải trang đầu tiên CHỈ tải 1 ảnh duy nhất (ảnh đầu,
 * gắn priority để hiện nhanh nhất). Các ảnh còn lại chỉ được thêm vào sau
 * khi trang đã hiển thị xong — tránh làm chậm lần hiển thị đầu tiên, vốn
 * là yếu tố Google chấm điểm tốc độ (LCP).
 */
export default function HeroSlideshow({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [loadAll, setLoadAll] = useState(false);

  // Chỉ nạp các ảnh còn lại sau khi trang đã hiển thị xong.
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setTimeout(() => setLoadAll(true), 1500);
    return () => clearTimeout(t);
  }, [images.length]);

  useEffect(() => {
    if (!loadAll || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [loadAll, images.length]);

  if (images.length === 0) {
    return (
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(63,139,143,0.55),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(238,122,84,0.35),transparent_50%)]"
        aria-hidden="true"
      />
    );
  }

  const visibleImages = loadAll ? images : images.slice(0, 1);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {visibleImages.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          fill
          priority={i === 0}
          className={`animate-kenburns object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
        />
      ))}
    </div>
  );
}

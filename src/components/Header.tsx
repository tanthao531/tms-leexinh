"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import Container from "./Container";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Đóng menu di động khi chuyển trang, không dùng effect để tránh
  // cascading render — cập nhật trực tiếp trong lúc render (an toàn vì
  // đây là điều chỉnh state dựa trên props thay đổi).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-navy/95 shadow-lg backdrop-blur" : "bg-navy/80 backdrop-blur"
      }`}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-coral to-coral-dark font-display text-base font-bold text-white shadow-sm sm:h-10 sm:w-10 sm:text-lg"
          >
            LX
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold text-ivory sm:text-lg">
              Lee Xinh
            </span>
            <span className="text-[11px] tracking-wide text-sand/75">
              TMS Quy Nhơn
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Điều hướng chính">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-coral ${
                  active ? "text-coral" : "text-ivory/85"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <a
            href={siteConfig.booking.engineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-coral-dark"
          >
            Đặt phòng ngay
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ivory lg:hidden"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-ivory/10 bg-navy lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2.5 text-base font-medium ${
                  pathname === item.href ? "bg-white/10 text-coral" : "text-ivory/90"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.booking.engineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white"
            >
              Đặt phòng ngay
            </a>
            <a
              href={`tel:${siteConfig.contact.phoneHref}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-ivory/25 px-5 py-3 text-sm font-semibold text-ivory"
            >
              Gọi tư vấn: {siteConfig.contact.phoneDisplay}
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}

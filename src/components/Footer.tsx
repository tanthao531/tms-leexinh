import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import Container from "./Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy pb-28 pt-14 text-sand-light lg:pb-14">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-ivory">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-sand-light/80">
            {siteConfig.tagline}
          </p>
          <div className="mt-4 flex gap-3">
            {/* 👉 TODO: xoá bớt icon mạng xã hội nào bạn không dùng */}
            {siteConfig.social.facebook && (
              <SocialIcon href={siteConfig.social.facebook} label="Facebook">
                <path d="M13.5 9H15V6.5h-1.75C11.5 6.5 10.5 7.6 10.5 9.25V11H9v2.5h1.5V21h3v-7.5H15.9l.35-2.5h-2.75V9.4c0-.5.2-.9.9-.9Z" />
              </SocialIcon>
            )}
            {siteConfig.social.tiktok && (
              <SocialIcon href={siteConfig.social.tiktok} label="TikTok">
                <path d="M14 4v9.6a2.9 2.9 0 11-2.3-2.84V8.2A5.4 5.4 0 1017 13.5V9.9a6 6 0 003 .8V8.2a3.4 3.4 0 01-3-2.1V4h-3Z" />
              </SocialIcon>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-ivory">
            Điều hướng
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-coral">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-ivory">
            Liên hệ
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{siteConfig.address.full}</li>
            <li>
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-coral">
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-coral">
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-ivory">
            Đặt phòng nhanh
          </p>
          <div className="mt-3 flex flex-col gap-2.5">
            <a
              href={siteConfig.booking.engineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-coral px-4 py-2 text-sm font-semibold text-white hover:bg-coral-dark"
            >
              Đặt phòng ngay
            </a>
            <a
              href={siteConfig.contact.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-coral"
            >
              Nhắn Zalo tư vấn
            </a>
            {siteConfig.googleBusinessProfile.profileUrl && (
              <a
                href={siteConfig.googleBusinessProfile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-coral"
              >
                Xem đánh giá trên Google
              </a>
            )}
          </div>
        </div>
      </Container>

      <Container className="mt-10 border-t border-ivory/10 pt-6 text-xs text-sand-light/60">
        © {year} {siteConfig.name}. Toạ lạc tại toà nhà TMS Quy Nhơn, {siteConfig.address.city}.
      </Container>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-coral hover:text-coral"
    >
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        {children}
      </svg>
    </a>
  );
}

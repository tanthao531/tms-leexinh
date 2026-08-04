import type { Metadata } from "next";
import { Fraunces, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactBar from "@/components/StickyContactBar";
import ChatWidget from "@/components/ChatWidget";
import { LodgingJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "TMS Quy Nhơn",
    "Lee Xinh",
    "căn hộ Quy Nhơn",
    "khách sạn Quy Nhơn",
    "căn hộ view biển Quy Nhơn",
    "thuê căn hộ Quy Nhơn",
    "TMS Quy Nhơn 28 Nguyễn Huệ",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/og-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // 👉 TODO: sau khi đăng ký Google Search Console, dán mã xác minh vào đây
  verification: { google: "3X65X0Ngr7czv0m5AHCSsVkdS5gYme6GcuOoEuKeEBI" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${fraunces.variable} ${beVietnamPro.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <LodgingJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyContactBar />
        <ChatWidget />
      </body>
    </html>
  );
}

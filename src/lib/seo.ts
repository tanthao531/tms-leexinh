import type { Metadata } from "next";
import { siteConfig } from "./site-config";

interface PageSeoInput {
  title: string;
  description: string;
  path: string; // vd: "/can-ho"
  image?: string; // đường dẫn ảnh OG, mặc định dùng ảnh chung
  noIndex?: boolean;
}

/**
 * Tạo metadata chuẩn hoá cho từng trang: title, description, canonical,
 * Open Graph, Twitter Card. Dùng hàm này ở MỌI trang để đảm bảo SEO
 * nhất quán thay vì viết metadata rời rạc từng nơi.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/images/og-cover.jpg",
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "vi_VN",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { rooms } from "@/data/rooms";

/**
 * Next.js sẽ tự động tạo /sitemap.xml từ file này — giúp Google index
 * toàn bộ trang nhanh hơn. Khi thêm trang mới, nhớ thêm vào đây.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/can-ho",
    "/tien-ich",
    "/thu-vien-anh",
    "/vi-tri",
    "/gioi-thieu",
    "/lien-he",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const roomRoutes = rooms.map((room) => ({
    url: `${siteConfig.url}/can-ho/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...roomRoutes];
}

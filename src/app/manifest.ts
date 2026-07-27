import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf8f2",
    theme_color: "#0e2a32",
    // 👉 TODO: thêm icon thật (192x192 và 512x512) vào /public rồi khai báo tại đây
    icons: [],
  };
}

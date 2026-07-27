import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Ưu tiên định dạng ảnh hiện đại: AVIF và WebP nhẹ hơn JPEG 30-60%
     * với chất lượng tương đương. Next.js tự chuyển đổi khi phục vụ, ảnh
     * gốc trong /public giữ nguyên — bạn không cần làm gì thêm.
     */
    formats: ["image/avif", "image/webp"],
    // Cache ảnh đã tối ưu 30 ngày để lần truy cập sau tải tức thì.
    minimumCacheTTL: 2592000,
  },

  // Ẩn header "X-Powered-By: Next.js" — giảm lộ thông tin hệ thống.
  poweredByHeader: false,

  // Nén phản hồi (gzip/brotli) để trang tải nhanh hơn.
  compress: true,
};

export default nextConfig;

import { siteConfig } from "@/lib/site-config";

/**
 * Dữ liệu có cấu trúc (Schema.org) giúp Google hiểu đây là một cơ sở lưu trú
 * và có thể hiển thị rich result (đánh giá sao, địa chỉ, giá...) trên
 * trang kết quả tìm kiếm. Đây là một trong những yếu tố SEO quan trọng
 * nhất cho website khách sạn/căn hộ.
 */
export function LodgingJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneHref,
    email: siteConfig.contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.ward,
      addressRegion: siteConfig.address.city,
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    // 👉 TODO: điền URL ảnh thật (ví dụ ảnh mặt tiền toà nhà) sau khi có
    image: [`${siteConfig.url}/images/og-cover.jpg`],
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.tiktok,
    ].filter(Boolean),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Bếp riêng", value: true },
      { "@type": "LocationFeatureSpecification", name: "Máy giặt riêng", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wifi miễn phí", value: true },
      { "@type": "LocationFeatureSpecification", name: "Bãi đỗ xe", value: true },
      { "@type": "LocationFeatureSpecification", name: "Hồ bơi ngoài trời", value: true },
      { "@type": "LocationFeatureSpecification", name: "Phòng gym", value: true },
      { "@type": "LocationFeatureSpecification", name: "Nhà hàng", value: true },
      { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

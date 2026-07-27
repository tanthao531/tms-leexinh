import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { destinations } from "@/data/destinations";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Vị trí & điểm đến lân cận",
  description:
    "TMS Quy Nhơn - Lee Xinh toạ lạc tại 28 Nguyễn Huệ, TP. Quy Nhơn — gần biển trung tâm, Tháp Đôi, Kỳ Co, Eo Gió và Cù Lao Xanh.",
  path: "/vi-tri",
});

export default function LocationPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", path: "/" }, { name: "Vị trí", path: "/vi-tri" }]} />

      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Vị trí"
              title="28 Nguyễn Huệ — trục đường trung tâm Quy Nhơn"
              as="h1"
              description="Con đường nối quảng trường trung tâm thành phố tới quảng trường tượng đài Chiến Thắng, đi qua các cơ quan trọng yếu và kết thúc gần khu nhà hàng, dịch vụ sầm uất nhất trên đường Xuân Diệu."
              light
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal direction="left" className="overflow-hidden rounded-2xl border border-navy/10">
            {/* 👉 TODO: thay googleMapsEmbedUrl trong src/lib/site-config.ts bằng link nhúng bản đồ thật */}
            <iframe
              title="Bản đồ vị trí TMS Quy Nhơn - Lee Xinh"
              src={siteConfig.googleMapsEmbedUrl}
              className="h-80 w-full sm:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <Reveal direction="right" delay={150}>
            <h2 className="font-display text-2xl text-navy">Địa chỉ</h2>
            <p className="mt-2 text-ink-soft">{siteConfig.address.full}</p>

            <a
              href={siteConfig.googleMapsDirectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal-light"
            >
              Chỉ đường trên Google Maps
            </a>

            <h3 className="mt-8 font-display text-xl text-navy">Di chuyển</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>• Từ ga Quy Nhơn: khoảng 1.4 km, ~20 phút đi bộ hoặc 5 phút xe taxi.</li>
              <li>• Từ sân bay Phù Cát: khoảng 30-35 km, nên đặt xe đưa đón trước.</li>
              <li>• Từ bến xe Quy Nhơn: khoảng 2 km, đặt taxi hoặc xe công nghệ.</li>
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="bg-sand-light py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Khám phá"
              title="Điểm đến nổi bật quanh Quy Nhơn"
              description="Vị trí trung tâm giúp bạn dễ dàng lên kế hoạch cho cả những chuyến đi trong ngày."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d, i) => (
              <Reveal key={d.name} delay={(i % 3) * 100}>
                <div className="rounded-2xl border border-navy/10 bg-white p-4">
                  <PlaceholderImage
                    path={`/images/vi-tri/${d.imageSlot || "diem-den.jpg"}`}
                    label={d.name}
                    ratio="video"
                  />
                  <h3 className="mt-4 font-display text-lg text-navy">{d.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-coral-dark">
                    {d.travelTime} · {d.distance}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">{d.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

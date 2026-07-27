import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import AmenityGrid from "@/components/AmenityGrid";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { amenities, amenityCategories } from "@/data/amenities";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tiện ích",
  description:
    "Tiện ích tại TMS Quy Nhơn - Lee Xinh: bếp riêng, máy giặt, ban công, wifi tốc độ cao, cùng hồ bơi, gym, nhà hàng, rooftop và spa trong khuôn viên toà nhà.",
  path: "/tien-ich",
});

export default function AmenitiesPage() {
  const withImage = amenities.filter((a) => a.imageSlot);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", path: "/" }, { name: "Tiện ích", path: "/tien-ich" }]} />

      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Tiện ích"
              title="Mọi tiện nghi trong tầm tay"
              as="h1"
              description="Căn hộ đầy đủ tiện nghi như ở nhà, cộng thêm chuỗi tiện ích nội khu của toà tháp TMS Quy Nhơn."
              light
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <Container>
          <Reveal>
            <AmenityGrid items={amenities} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-sand-light py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Hình ảnh"
              title="Không gian tiện ích"
              align="center"
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {withImage.map((a, i) => (
              <Reveal key={a.name} delay={i * 80}>
                <PlaceholderImage
                  path={`/images/tien-ich/${a.imageSlot}`}
                  label={a.name}
                  ratio="video"
                />
                <p className="mt-2 text-center text-sm font-medium text-navy">{a.name}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Chi tiết"
              title="Danh sách tiện nghi đầy đủ"
              description="Tổng hợp toàn bộ tiện nghi trong căn hộ và của toà nhà, để bạn nắm rõ trước khi đặt phòng."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {amenityCategories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 80}>
                <div className="rounded-2xl border border-navy/10 bg-white p-6">
                  <h3 className="font-display text-lg text-navy">{cat.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

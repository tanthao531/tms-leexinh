import Link from "next/link";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import RoomCard from "@/components/RoomCard";
import AmenityGrid from "@/components/AmenityGrid";
import TestimonialsFeatured from "@/components/TestimonialsFeatured";
import PlaceholderImage from "@/components/PlaceholderImage";
import WaveDivider from "@/components/WaveDivider";
import Reveal from "@/components/Reveal";
import { rooms } from "@/data/rooms";
import { amenities } from "@/data/amenities";
import { destinations } from "@/data/destinations";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const featuredRoom = rooms.find((r) => r.highlight) ?? rooms[0];
  const otherRooms = rooms.filter((r) => r.slug !== featuredRoom.slug);

  return (
    <>
      <Hero />

      {/* Giới thiệu ngắn */}
      <section className="bg-ivory py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <div>
              <SectionHeading
                eyebrow="Về Lee Xinh"
                title="Một góc yên tĩnh trong toà tháp cao nhất Quy Nhơn"
                description={`${siteConfig.name} nằm trong toà nhà TMS Quy Nhơn ${siteConfig.building.floors} tầng tại số 28 Nguyễn Huệ — trục đường trung tâm nối liền quảng trường thành phố với bờ biển. Từ căn hộ, bạn chỉ mất vài phút đi bộ để chạm chân xuống cát, hoặc dạo bước tới các quán hải sản nổi tiếng trên đường Xuân Diệu.`}
              />
              <ul className="mt-6 grid grid-cols-2 gap-4 text-sm text-ink-soft">
                <li className="rounded-xl bg-sand-light px-4 py-3">
                  <span className="block font-display text-lg text-navy">~120 m</span>
                  tới biển trung tâm
                </li>
                <li className="rounded-xl bg-sand-light px-4 py-3">
                  <span className="block font-display text-lg text-navy">1.4 km</span>
                  tới ga Quy Nhơn
                </li>
                <li className="rounded-xl bg-sand-light px-4 py-3">
                  <span className="block font-display text-lg text-navy">{siteConfig.building.floors} tầng</span>
                  toà tháp cao nhất Quy Nhơn
                </li>
                <li className="rounded-xl bg-sand-light px-4 py-3">
                  <span className="block font-display text-lg text-navy">3+</span>
                  loại căn hộ linh hoạt
                </li>
              </ul>
              <Link
                href="/gioi-thieu"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy underline decoration-coral decoration-2 underline-offset-4"
              >
                Tìm hiểu thêm về Lee Xinh →
              </Link>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <PlaceholderImage
              path="/images/gioi-thieu/mat-tien-toa-nha.jpg"
              label="Mặt tiền toà nhà TMS Quy Nhơn"
              ratio="portrait"
            />
          </Reveal>
        </Container>
      </section>

      <WaveDivider fill="var(--color-sand-light)" />

      {/* Các loại căn hộ — bố cục bất đối xứng: 1 căn nổi bật + 2 căn nhỏ */}
      <section className="bg-sand-light py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Lưu trú"
              title="Chọn không gian phù hợp với chuyến đi của bạn"
              description="Từ studio ấm cúng cho cặp đôi đến căn hộ 2 phòng ngủ cho cả gia đình — mỗi loại căn hộ đều có ban công riêng và bếp để bạn thoải mái như ở nhà."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            <Reveal direction="left" className="lg:col-span-3">
              <RoomCard room={featuredRoom} featured />
            </Reveal>
            <div className="grid gap-6 lg:col-span-2">
              {otherRooms.map((room, i) => (
                <Reveal key={room.slug} direction="right" delay={i * 120}>
                  <RoomCard room={room} />
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/can-ho"
              className="inline-flex items-center justify-center rounded-full border border-navy/20 px-7 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-ivory"
            >
              Xem tất cả căn hộ
            </Link>
          </div>
        </Container>
      </section>

      {/* Tiện ích nổi bật — bố cục ảnh lớn + danh sách, thay vì lưới icon thuần */}
      <section className="bg-ivory py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-5 lg:items-center">
          <Reveal direction="left" className="lg:col-span-2">
            <PlaceholderImage
              path="/images/tien-ich/ho-boi-vo-cuc.jpg"
              label="Hồ bơi ngoài trời của toà nhà"
              ratio="portrait"
            />
          </Reveal>

          <div className="lg:col-span-3">
            <Reveal>
              <SectionHeading
                eyebrow="Tiện ích"
                title="Tiện nghi đầy đủ trong khuôn viên toà nhà"
                description="Không cần rời khỏi toà nhà, bạn vẫn có đầy đủ hồ bơi, gym, sky bar và nhiều dịch vụ khác."
              />
            </Reveal>
            <Reveal delay={150} className="mt-8">
              <AmenityGrid items={amenities.slice(0, 6)} />
            </Reveal>
            <Reveal delay={250}>
              <Link
                href="/tien-ich"
                className="mt-6 inline-block text-sm font-semibold text-navy underline decoration-coral decoration-2 underline-offset-4"
              >
                Xem đầy đủ tiện ích →
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      <WaveDivider fill="var(--color-navy)" />

      {/* Vị trí / điểm đến — dải cuộn ngang thay vì lưới cố định */}
      <section className="bg-navy py-16 sm:py-24">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Vị trí"
                title="Điểm xuất phát lý tưởng khám phá Quy Nhơn"
                description="Nằm ngay trục đường trung tâm, thuận tiện di chuyển tới các điểm tham quan nổi tiếng nhất Quy Nhơn."
                light
              />
              <span className="hidden shrink-0 text-xs uppercase tracking-widest text-sand-light/50 sm:inline">
                Vuốt để xem thêm →
              </span>
            </div>
          </Reveal>

          <div className="mt-10 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            {destinations.map((d, i) => (
              <Reveal
                key={d.name}
                delay={i * 80}
                className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
              >
                <div className="h-full rounded-2xl bg-white/5 p-5">
                  <PlaceholderImage
                    path={`/images/vi-tri/${d.imageSlot || "diem-den.jpg"}`}
                    label={d.name}
                    ratio="video"
                    className="border-ivory/20"
                  />
                  <h3 className="mt-4 font-display text-lg text-ivory">{d.name}</h3>
                  <p className="mt-1 text-sm text-sand-light/80">
                    {d.travelTime} ({d.distance})
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 text-center sm:mt-8">
            <Link
              href="/vi-tri"
              className="text-sm font-semibold text-ivory underline decoration-coral decoration-2 underline-offset-4"
            >
              Xem bản đồ & tất cả điểm đến →
            </Link>
          </div>
        </Container>
      </section>

      {/* Đánh giá khách hàng — 1 đánh giá lớn nổi bật + các đánh giá nhỏ */}
      <section className="bg-ivory py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Khách nói gì"
              title="Trải nghiệm từ những vị khách đã lưu trú"
              align="center"
            />
          </Reveal>
          <Reveal delay={150} className="mt-10">
            <TestimonialsFeatured items={testimonials} />
          </Reveal>
        </Container>
      </section>

      {/* CTA cuối trang */}
      <section className="bg-coral py-14">
        <Container className="flex flex-col items-center gap-5 text-center">
          <Reveal>
            <h2 className="font-display text-2xl text-white sm:text-3xl">
              Sẵn sàng cho chuyến đi Quy Nhơn của bạn?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xl text-sm text-white/90">
              Xem phòng trống, giá tốt nhất và đặt phòng trực tuyến ngay trên hệ
              thống — xác nhận tức thì, không cần chờ phản hồi.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.booking.engineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-coral-dark"
              >
                Đặt phòng ngay
              </a>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="rounded-full border border-white/70 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Gọi {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

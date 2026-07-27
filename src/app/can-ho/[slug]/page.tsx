import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import PlaceholderImage from "@/components/PlaceholderImage";
import MediaGrid from "@/components/MediaGrid";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { getRoomBySlug, rooms } from "@/data/rooms";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { listPublicImages } from "@/lib/media";
import type { Metadata } from "next";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return buildMetadata({ title: "Không tìm thấy căn hộ", description: "", path: "/can-ho" });

  return buildMetadata({
    title: room.name,
    description: `${room.shortDescription} Diện tích ${room.area}, phù hợp ${room.capacity}. Tại TMS Quy Nhơn - Lee Xinh, 28 Nguyễn Huệ, Quy Nhơn.`,
    path: `/can-ho/${room.slug}`,
  });
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const otherRooms = rooms.filter((r) => r.slug !== room.slug).slice(0, 3);
  const fullGallery = room.galleryFolder ? listPublicImages(room.galleryFolder) : [];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Căn hộ", path: "/can-ho" },
          { name: room.name, path: `/can-ho/${room.slug}` },
        ]}
      />

      <section className="bg-ivory py-10 sm:py-14">
        <Container>
          <Link href="/can-ho" className="text-sm font-medium text-teal hover:underline">
            ← Tất cả căn hộ
          </Link>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl text-navy sm:text-4xl">{room.name}</h1>
              <p className="mt-2 max-w-2xl text-ink-soft">{room.description}</p>
            </div>
            {room.highlight && (
              <span className="rounded-full bg-coral px-4 py-1.5 text-xs font-semibold text-white">
                {room.highlight}
              </span>
            )}
          </div>

          <Reveal delay={100} className="mt-8 grid gap-4 sm:grid-cols-2">
            {room.imageSlots.map((img, i) => (
              <PlaceholderImage
                key={img}
                path={`/images/can-ho/${room.slug}/${img}`}
                label={`Ảnh ${i + 1} — ${room.name}`}
                ratio={i === 0 ? "wide" : "video"}
                className={i === 0 ? "sm:col-span-2" : ""}
              />
            ))}
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            <Reveal direction="left" delay={150} className="lg:col-span-2">
              <h2 className="font-display text-xl text-navy">Tiện nghi trong căn hộ</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-ink-soft">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal direction="right" delay={200}>
              <aside className="rounded-2xl border border-navy/10 bg-sand-light p-6">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Diện tích</dt>
                    <dd className="font-semibold text-navy">{room.area}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Sức chứa</dt>
                    <dd className="font-semibold text-navy">{room.capacity}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Giường</dt>
                    <dd className="font-semibold text-navy text-right">{room.bedConfig}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Hướng nhìn</dt>
                    <dd className="font-semibold text-navy text-right">{room.view}</dd>
                  </div>
                </dl>
                <a
                  href={siteConfig.booking.engineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block rounded-full bg-coral py-3 text-center text-sm font-semibold text-white hover:bg-coral-dark"
                >
                  Đặt phòng ngay
                </a>
                <a
                  href={siteConfig.contact.zaloUrl}
                  className="mt-3 block rounded-full border border-navy/20 py-3 text-center text-sm font-semibold text-navy hover:bg-white"
                >
                  Nhắn Zalo tư vấn
                </a>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      {fullGallery.length > 0 && (
        <section className="bg-ivory py-14">
          <Container>
            <Reveal>
              <h2 className="font-display text-2xl text-navy">
                Toàn bộ hình ảnh thực tế ({fullGallery.length} ảnh)
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                Bấm vào ảnh để xem kích thước đầy đủ.
              </p>
            </Reveal>
            <Reveal delay={150} className="mt-6">
              <MediaGrid images={fullGallery} altPrefix={room.name} />
            </Reveal>
          </Container>
        </section>
      )}

      {otherRooms.length > 0 && (
        <section className="bg-sand-light py-14">
          <Container>
            <Reveal>
              <h2 className="font-display text-2xl text-navy">Các căn hộ khác</h2>
            </Reveal>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {otherRooms.map((r, i) => (
                <Reveal key={r.slug} delay={i * 100}>
                  <Link
                    href={`/can-ho/${r.slug}`}
                    className="block rounded-2xl border border-navy/10 bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    <h3 className="font-display text-lg text-navy">{r.name}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{r.shortDescription}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

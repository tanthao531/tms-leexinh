import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import RoomCard from "@/components/RoomCard";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { rooms } from "@/data/rooms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Các loại căn hộ",
  description:
    "Khám phá các loại căn hộ tại TMS Quy Nhơn - Lee Xinh: Studio View Biển, Căn hộ 2 Phòng Ngủ và Căn hộ 3 Giường Gia Đình.",
  path: "/can-ho",
});

export default function RoomsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", path: "/" }, { name: "Căn hộ", path: "/can-ho" }]} />
      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Lưu trú"
              title="Các loại căn hộ tại Lee Xinh"
              as="h1"
              description="Mỗi căn hộ đều có ban công riêng, bếp đầy đủ tiện nghi và được dọn dẹp kỹ trước mỗi lượt khách."
              light
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-sand-light py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, i) => (
              <Reveal key={room.slug} delay={i * 100}>
                <RoomCard room={room} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

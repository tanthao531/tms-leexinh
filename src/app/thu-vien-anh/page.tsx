import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";
import MediaGrid from "@/components/MediaGrid";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { listPublicImages } from "@/lib/media";
import { rooms } from "@/data/rooms";

export const metadata = buildMetadata({
  title: "Thư viện ảnh",
  description:
    "Hình ảnh và video thực tế về căn hộ, tiện ích và khung cảnh xung quanh TMS Quy Nhơn - Lee Xinh.",
  path: "/thu-vien-anh",
});

/**
 * 👉 TODO: đây là bộ khung thư viện ảnh với các vị trí gợi ý theo chủ đề.
 * Hãy thêm ảnh/video thật vào đúng thư mục trong /public/images/thu-vien-anh/
 * (hoặc /public/videos/) theo tên file gợi ý bên dưới, rồi xoá comment
 * PlaceholderImage để hiển thị ảnh thật — xem HUONG-DAN-THEM-ANH.md.
 */
const galleryGroups = [
  {
    title: "Toàn cảnh toà nhà",
    items: [
      "mat-tien-ban-ngay.jpg",
      "mat-tien-ban-dem.jpg",
      "sanh-don-tiep.jpg",
      "loi-vao-toa-nha.jpg",
    ],
  },
  {
    title: "Không gian căn hộ",
    items: ["phong-khach-1.jpg", "phong-ngu-1.jpg", "khu-bep-1.jpg", "phong-tam-1.jpg"],
  },
  {
    title: "Tiện ích nội khu",
    items: ["ho-boi-vo-cuc.jpg", "sky-bar.jpg", "phong-gym.jpg", "nha-hang-tang-cao.jpg"],
  },
  {
    title: "Khung cảnh xung quanh",
    items: [
      "view-bien-tu-ban-cong.jpg",
      "hoang-hon.jpg",
      "duong-xuan-dieu.jpg",
      "bien-trung-tam-quy-nhon.jpg",
    ],
  },
];

const videoSlots = ["gioi-thieu-can-ho.mp4", "flycam-toa-nha.mp4"];

export default function GalleryPage() {
  const commonSpacePhotos = listPublicImages(
    "images/thu-vien-anh/khong-gian-chung"
  );

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", path: "/" }, { name: "Thư viện ảnh", path: "/thu-vien-anh" }]} />

      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Thư viện"
              title="Hình ảnh & video thực tế"
              as="h1"
              description="Bộ sưu tập hình ảnh giúp khách hình dung rõ không gian trước khi đặt phòng."
              light
            />
          </Reveal>
        </Container>
      </section>

      {galleryGroups.map((group, idx) => (
        <section key={group.title} className={idx % 2 === 0 ? "bg-ivory py-14" : "bg-sand-light py-14"}>
          <Container>
            <Reveal>
              <h2 className="font-display text-2xl text-navy">{group.title}</h2>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {group.items.map((img, i) => (
                <Reveal key={img} delay={i * 80}>
                  <PlaceholderImage
                    path={`/images/thu-vien-anh/${img}`}
                    label={img.replace(/[-.]/g, " ").replace(".jpg", "")}
                    ratio="square"
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ))}

      {commonSpacePhotos.length > 0 && (
        <section className="bg-sand-light py-14">
          <Container>
            <Reveal>
              <h2 className="font-display text-2xl text-navy">Không gian chung của toà nhà</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Sảnh đón tiếp, hồ bơi, nhà hàng, gym, rooftop và spa — chụp thực tế
                tại toà nhà TMS Quy Nhơn.
              </p>
            </Reveal>
            <Reveal delay={150} className="mt-6">
              <MediaGrid images={commonSpacePhotos} altPrefix="Không gian chung TMS Quy Nhơn" />
            </Reveal>
          </Container>
        </section>
      )}

      <section className="bg-ivory py-14">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl text-navy">Bộ ảnh đầy đủ theo từng loại căn hộ</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Xem trọn bộ ảnh thực tế của từng loại căn hộ trên trang chi tiết.
            </p>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {rooms.map((room, i) => (
              <Reveal key={room.slug} delay={i * 100}>
                <Link
                  href={`/can-ho/${room.slug}`}
                  className="block rounded-2xl border border-navy/10 bg-white p-5 text-center transition-shadow hover:shadow-md"
                >
                  <h3 className="font-display text-lg text-navy">{room.name}</h3>
                  <p className="mt-1 text-sm text-coral-dark">Xem toàn bộ ảnh →</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy py-14">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl text-ivory">Video giới thiệu</h2>
            <p className="mt-2 text-sm text-sand-light/80">
              Video ngắn quay thực tế căn hộ và khuôn viên toà nhà.
            </p>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {videoSlots.map((v, i) => (
              <Reveal key={v} delay={i * 100}>
                <PlaceholderImage
                  path={`/videos/${v}`}
                  label={v.replace(".mp4", "").replace(/-/g, " ")}
                  ratio="video"
                  isVideo
                  className="border-ivory/25"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

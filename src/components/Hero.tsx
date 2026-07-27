import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import Container from "./Container";
import WaveDivider from "./WaveDivider";
import HeroSlideshow from "./HeroSlideshow";

/**
 * Danh sách ảnh ứng viên cho banner đầu trang, theo THỨ TỰ ƯU TIÊN.
 * Component tự kiểm tra ảnh nào thực sự tồn tại trong /public rồi mới
 * đưa vào slideshow — không cần sửa code, chỉ cần thêm/bớt file ảnh.
 *
 * 👉 TODO: muốn đổi ảnh hero, chỉ cần thay/thêm ảnh đẹp nhất của bạn vào
 * /public/images/hero/hero-bien.jpg (và có thể thêm hero-bien-2.jpg,
 * hero-bien-3.jpg) — ảnh sẽ tự động được ưu tiên hiển thị trước.
 *
 * Lưu ý hiệu năng: chỉ 3 ảnh đầu tiên tìm thấy được dùng, để trang không
 * phải tải quá nhiều ảnh lớn ở khu vực đầu trang.
 */
const HERO_IMAGE_CANDIDATES = [
  "/images/hero/hero-bien.jpg",
  "/images/hero/hero-bien-2.jpg",
  "/images/hero/hero-bien-3.jpg",
  "/images/thu-vien-anh/hoang-hon.jpg",
  "/images/thu-vien-anh/view-bien-tu-ban-cong.jpg",
];

function getExistingHeroImages(): string[] {
  return HERO_IMAGE_CANDIDATES.filter((relPath) =>
    fs.existsSync(path.join(process.cwd(), "public", relPath))
  ).slice(0, 3);
}

export default function Hero() {
  const heroImages = getExistingHeroImages();

  return (
    <section className="relative overflow-hidden bg-navy">
      <HeroSlideshow images={heroImages} />
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/55 to-navy/25"
        aria-hidden="true"
      />

      <Container className="relative flex min-h-[86vh] flex-col justify-center gap-8 pb-20 pt-28 sm:min-h-[90vh] sm:pt-32">
        <span className="animate-fade-up inline-flex w-fit items-center gap-2 rounded-full border border-ivory/25 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-sand">
          28 Nguyễn Huệ · Phường Quy Nhơn
        </span>

        <h1
          className="animate-fade-up max-w-3xl font-display text-4xl leading-[1.1] text-ivory sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Thức dậy cùng biển Quy Nhơn,
          <br className="hidden sm:block" /> ngay giữa lòng thành phố.
        </h1>

        <p
          className="animate-fade-up max-w-xl text-base leading-relaxed text-sand-light/90 sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          {siteConfig.name} — căn hộ nghỉ dưỡng trong toà tháp cao nhất Quy Nhơn,
          cách bãi biển trung tâm vài phút đi bộ. Không gian ấm cúng, chủ nhà
          thân thiện, phù hợp cho gia đình, nhóm bạn và khách công tác.
        </p>

        <div
          className="animate-fade-up flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/can-ho"
            className="inline-flex items-center justify-center rounded-full bg-coral px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral/20 transition-colors hover:bg-coral-dark"
          >
            Xem các loại căn hộ
          </Link>
          <a
            href={`tel:${siteConfig.contact.phoneHref}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/30 px-7 py-3.5 text-sm font-semibold text-ivory transition-colors hover:bg-ivory/10"
          >
            Gọi tư vấn: {siteConfig.contact.phoneDisplay}
          </a>
        </div>

        <dl
          className="animate-fade-up mt-6 grid max-w-xl grid-cols-3 gap-4 border-t border-ivory/15 pt-6 text-ivory"
          style={{ animationDelay: "320ms" }}
        >
          <div>
            <dt className="text-xs uppercase tracking-wide text-sand-light/70">Toà nhà</dt>
            <dd className="mt-1 font-display text-2xl">{siteConfig.building.floors} tầng</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-sand-light/70">Cách biển</dt>
            <dd className="mt-1 font-display text-2xl">~120 m</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-sand-light/70">Loại căn hộ</dt>
            <dd className="mt-1 font-display text-2xl">3+ lựa chọn</dd>
          </div>
        </dl>
      </Container>

      <WaveDivider className="relative" />
    </section>
  );
}

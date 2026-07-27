import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Liên hệ & đặt phòng",
  description:
    "Liên hệ TMS Quy Nhơn - Lee Xinh: gọi điện, nhắn Zalo, hoặc đặt phòng trực tuyến ngay trên hệ thống.",
  path: "/lien-he",
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", path: "/" }, { name: "Liên hệ", path: "/lien-he" }]} />

      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Liên hệ"
              title="Liên hệ đặt phòng"
              as="h1"
              description="Chọn cách liên hệ thuận tiện nhất — chúng tôi phản hồi nhanh trong ngày."
              light
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-5">
          <Reveal direction="left" className="lg:col-span-2">
            <div className="space-y-4">
              <ContactRow label="Điện thoại" value={siteConfig.contact.phoneDisplay} href={`tel:${siteConfig.contact.phoneHref}`} />
              <ContactRow label="Zalo" value={siteConfig.contact.zaloNumber} href={siteConfig.contact.zaloUrl} />
              <ContactRow label="Email" value={siteConfig.contact.email} href={`mailto:${siteConfig.contact.email}`} />
              <ContactRow label="Messenger" value="Nhắn tin Fanpage" href={siteConfig.contact.messengerUrl} />
              <ContactRow label="Địa chỉ" value={siteConfig.address.full} />
            </div>

            <div className="mt-8 rounded-2xl bg-sand-light p-5 text-sm text-ink-soft">
              <p className="font-semibold text-navy">Giờ nhận / trả phòng</p>
              <p className="mt-1">
                Nhận phòng: {siteConfig.policies.checkIn} · Trả phòng: {siteConfig.policies.checkOut}
              </p>
              <p className="mt-3 text-xs text-ink-soft/70">
                (Có thể linh hoạt tuỳ tình trạng phòng, vui lòng liên hệ trước.)
              </p>
            </div>

            <GoogleReviewsCard />
          </Reveal>

          <Reveal direction="right" delay={150} className="lg:col-span-3">
            <div className="flex h-full flex-col justify-center rounded-2xl border border-navy/10 bg-navy p-8 text-center sm:p-10">
              <h2 className="font-display text-2xl text-ivory">Đặt phòng ngay</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-sand-light/85">
                Xem phòng trống, so sánh giá theo ngày và đặt trực tiếp trên hệ
                thống — xác nhận tức thì, không cần chờ phản hồi qua điện thoại.
              </p>
              <a
                href={siteConfig.booking.engineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-6 inline-flex items-center justify-center rounded-full bg-coral px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-coral/20 transition-colors hover:bg-coral-dark"
              >
                Kiểm tra phòng trống & đặt ngay
              </a>
              <p className="mt-4 text-xs text-sand-light/60">
                Muốn trao đổi trước? Gọi {siteConfig.contact.phoneDisplay} hoặc
                nhắn Zalo — chúng tôi phản hồi nhanh trong ngày.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

/**
 * Thẻ "Đánh giá trên Google" — chỉ hiện nút khi bạn đã điền link trong
 * src/lib/site-config.ts (mục googleBusinessProfile). Nếu chưa điền,
 * hiển thị gợi ý nhỏ để nhắc bạn cấu hình thay vì im lặng bỏ qua.
 */
function GoogleReviewsCard() {
  const { reviewUrl, profileUrl } = siteConfig.googleBusinessProfile;
  const hasAnyLink = Boolean(reviewUrl || profileUrl);

  return (
    <div className="mt-4 rounded-2xl border border-navy/10 bg-white p-5">
      <p className="font-semibold text-navy">Đánh giá trên Google</p>

      {hasAnyLink ? (
        <div className="mt-3 flex flex-col gap-2.5">
          {profileUrl && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 py-2.5 text-sm font-semibold text-navy hover:bg-sand-light"
            >
              Xem đánh giá trên Google
            </a>
          )}
          {reviewUrl && (
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal py-2.5 text-sm font-semibold text-white hover:bg-teal-light"
            >
              Viết đánh giá cho chúng tôi
            </a>
          )}
        </div>
      ) : (
        <p className="mt-2 text-xs leading-relaxed text-ink-soft/70">
          👉 Chưa cấu hình: sau khi tạo & xác minh Google Business Profile, điền
          link vào mục <code className="rounded bg-sand-light px-1">googleBusinessProfile</code> trong{" "}
          <code className="rounded bg-sand-light px-1">src/lib/site-config.ts</code> để hiện nút ở đây.
        </p>
      )}
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center justify-between rounded-xl border border-navy/10 bg-white px-5 py-4">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</span>
      <span className="text-sm font-semibold text-navy">{value}</span>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block hover:opacity-80">
      {content}
    </a>
  );
}

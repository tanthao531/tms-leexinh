import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Giới thiệu",
  description:
    "Câu chuyện về TMS Quy Nhơn - Lee Xinh, căn hộ nghỉ dưỡng trong toà tháp cao nhất Quy Nhơn tại số 28 Nguyễn Huệ.",
  path: "/gioi-thieu",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", path: "/" }, { name: "Giới thiệu", path: "/gioi-thieu" }]} />

      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Giới thiệu"
              title="Câu chuyện của Lee Xinh"
              as="h1"
              light
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left">
            <PlaceholderImage
              path="/images/gioi-thieu/chu-can-ho.jpg"
              label="Ảnh chủ căn hộ / đội ngũ đón tiếp"
              ratio="portrait"
            />
          </Reveal>
          <Reveal direction="right" delay={150} className="space-y-4 text-ink-soft">
            <p>
              {siteConfig.name} vận hành các căn hộ nghỉ dưỡng bên trong toà
              tháp TMS Quy Nhơn — công trình {siteConfig.building.floors}
              tầng, khởi công năm {siteConfig.building.yearBuilt} và từng là
              toà nhà cao nhất thành phố Quy Nhơn. Toà tháp kết hợp khối khách
              sạn tiêu chuẩn quốc tế ở các tầng cao với khối căn hộ du lịch ở
              các tầng giữa, tạo nên một điểm lưu trú đa dạng ngay tại trục
              đường trung tâm thành phố.
            </p>
            <p>
              {/* 👉 TODO: thay đoạn này bằng câu chuyện thật của bạn — vì
              sao bạn bắt đầu kinh doanh căn hộ ở đây, điều gì bạn tự hào
              nhất khi đón khách. Nội dung thật, giọng văn cá nhân sẽ giúp
              khách tin tưởng hơn nhiều so với đoạn mô tả chung chung này. */}
              Với Lee Xinh, mỗi căn hộ được chăm chút để khách có cảm giác
              như đang ở nhà: không gian sạch sẽ, đầy đủ tiện nghi, và sự hỗ
              trợ tận tình trong suốt thời gian lưu trú.
            </p>
            <p>
              Chúng tôi tin rằng một kỳ nghỉ đáng nhớ ở Quy Nhơn bắt đầu từ
              nơi ở thoải mái — để bạn có thể dành trọn thời gian cho biển,
              cho những chuyến đi Kỳ Co, Eo Gió, Cù Lao Xanh, thay vì lo lắng
              về chỗ nghỉ ngơi.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-sand-light py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Cam kết" title="Vì sao khách chọn Lee Xinh" />
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "Vị trí trung tâm",
                text: "Chỉ vài phút đi bộ tới biển, gần các điểm tham quan và ẩm thực nổi tiếng.",
              },
              {
                title: "Đón tiếp tận tâm",
                text: "Hỗ trợ nhanh chóng trước, trong và sau khi lưu trú — kể cả ngoài giờ hành chính.",
              },
              {
                title: "Không gian như ở nhà",
                text: "Bếp đầy đủ, máy giặt riêng, phù hợp cho cả chuyến đi ngắn ngày lẫn dài ngày.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl border border-navy/10 bg-white p-6">
                  <h3 className="font-display text-lg text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Điều khoản dịch vụ",
  description:
    "Điều khoản dịch vụ khi sử dụng website và đặt phòng tại TMS Quy Nhơn - Lee Xinh.",
  path: "/dieu-khoan-dich-vu",
});

export default function TermsOfServicePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Điều khoản dịch vụ", path: "/dieu-khoan-dich-vu" },
        ]}
      />

      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Pháp lý"
              title="Điều khoản dịch vụ"
              as="h1"
              description="Cập nhật lần cuối: tháng 8/2026."
              light
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="prose prose-slate max-w-none space-y-6 text-ink-soft [&_h2]:font-display [&_h2]:text-navy [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-2 [&_p]:leading-relaxed [&_li]:leading-relaxed">
              <p>
                Khi truy cập website hoặc nhắn tin với {siteConfig.name} qua website hay Fanpage
                Messenger, bạn đồng ý với các điều khoản dưới đây.
              </p>

              <h2>1. Nội dung website</h2>
              <p>
                Thông tin về căn hộ, tiện ích, hình ảnh và giá trên website mang tính tham khảo và có thể
                thay đổi mà không cần báo trước. Vui lòng liên hệ để được xác nhận thông tin mới nhất
                trước khi đặt phòng.
              </p>

              <h2>2. Đặt phòng</h2>
              <p>
                Việc đặt phòng chỉ được xác nhận khi có phản hồi trực tiếp từ nhân viên hoặc qua hệ thống
                đặt phòng trực tuyến. Chính sách nhận/trả phòng: nhận phòng {siteConfig.policies.checkIn},
                trả phòng {siteConfig.policies.checkOut}.
              </p>

              <h2>3. Chat box và trợ lý AI</h2>
              <p>
                Website và Fanpage Messenger có tích hợp chat box hỗ trợ (bao gồm trợ lý AI) nhằm cung cấp
                thông tin nhanh cho khách hàng. Thông tin từ chat box mang tính hỗ trợ, không thay thế xác
                nhận chính thức từ nhân viên khi phát sinh giao dịch.
              </p>

              <h2>4. Trách nhiệm người dùng</h2>
              <p>
                Bạn cam kết cung cấp thông tin liên hệ chính xác và không sử dụng kênh chat/nhắn tin của
                chúng tôi cho mục đích spam, quấy rối hoặc trái pháp luật.
              </p>

              <h2>5. Thay đổi điều khoản</h2>
              <p>
                Chúng tôi có thể cập nhật điều khoản này theo thời gian. Phiên bản mới nhất luôn được đăng
                tại trang này.
              </p>

              <h2>6. Liên hệ</h2>
              <p>
                Mọi thắc mắc, vui lòng liên hệ email{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-coral-dark underline">
                  {siteConfig.contact.email}
                </a>{" "}
                hoặc điện thoại {siteConfig.contact.phoneDisplay}.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

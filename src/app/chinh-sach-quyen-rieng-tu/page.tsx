import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Chính sách quyền riêng tư",
  description:
    "Chính sách quyền riêng tư của TMS Quy Nhơn - Lee Xinh: cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của khách hàng.",
  path: "/chinh-sach-quyen-rieng-tu",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Chính sách quyền riêng tư", path: "/chinh-sach-quyen-rieng-tu" },
        ]}
      />

      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Pháp lý"
              title="Chính sách quyền riêng tư"
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
                {siteConfig.name} (&ldquo;chúng tôi&rdquo;) tôn trọng quyền riêng tư của khách hàng và
                người dùng website, ứng dụng nhắn tin (bao gồm Fanpage Messenger) liên quan đến dịch vụ
                căn hộ nghỉ dưỡng tại {siteConfig.address.full}. Chính sách này giải thích chúng tôi thu
                thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn như thế nào.
              </p>

              <h2>1. Thông tin chúng tôi thu thập</h2>
              <ul className="list-disc pl-5">
                <li>Họ tên, số điện thoại, email khi bạn liên hệ đặt phòng hoặc điền form trên website.</li>
                <li>Nội dung tin nhắn khi bạn chat với chúng tôi qua website hoặc Fanpage Messenger.</li>
                <li>Thông tin kỹ thuật cơ bản (loại trình duyệt, thiết bị) phục vụ vận hành website.</li>
              </ul>

              <h2>2. Mục đích sử dụng</h2>
              <ul className="list-disc pl-5">
                <li>Tư vấn, xác nhận và hỗ trợ đặt phòng.</li>
                <li>Trả lời câu hỏi qua chat box (bao gồm chat box có hỗ trợ AI) trên website và Messenger.</li>
                <li>Cải thiện chất lượng dịch vụ và trải nghiệm website.</li>
              </ul>

              <h2>3. Chia sẻ thông tin</h2>
              <p>
                Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ với
                đối tác vận hành hệ thống đặt phòng trực tuyến hoặc khi pháp luật yêu cầu.
              </p>

              <h2>4. Lưu trữ và bảo mật</h2>
              <p>
                Thông tin được lưu trữ trong thời gian cần thiết để phục vụ mục đích thu thập ở trên và
                được bảo vệ bằng các biện pháp kỹ thuật hợp lý để tránh truy cập trái phép.
              </p>

              <h2>5. Quyền của bạn</h2>
              <p>
                Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xoá thông tin cá nhân của mình. Xem chi tiết tại{" "}
                trang{" "}
                <a href="/xoa-du-lieu-nguoi-dung" className="text-coral-dark underline">
                  Xoá dữ liệu người dùng
                </a>
                .
              </p>

              <h2>6. Liên hệ</h2>
              <p>
                Mọi thắc mắc về chính sách quyền riêng tư, vui lòng liên hệ qua email{" "}
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

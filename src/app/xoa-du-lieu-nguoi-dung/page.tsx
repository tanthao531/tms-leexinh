import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Xoá dữ liệu người dùng",
  description:
    "Hướng dẫn yêu cầu xoá dữ liệu cá nhân đã cung cấp cho TMS Quy Nhơn - Lee Xinh qua website hoặc Messenger.",
  path: "/xoa-du-lieu-nguoi-dung",
});

export default function DataDeletionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", path: "/" },
          { name: "Xoá dữ liệu người dùng", path: "/xoa-du-lieu-nguoi-dung" },
        ]}
      />

      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Pháp lý"
              title="Xoá dữ liệu người dùng"
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
                Nếu bạn từng liên hệ, đặt phòng hoặc nhắn tin với {siteConfig.name} qua website hoặc
                Fanpage Messenger, bạn có quyền yêu cầu xoá dữ liệu cá nhân mà chúng tôi đang lưu trữ.
              </p>

              <h2>1. Dữ liệu có thể được xoá</h2>
              <ul className="list-disc pl-5">
                <li>Họ tên, số điện thoại, email đã cung cấp khi liên hệ đặt phòng.</li>
                <li>Lịch sử nội dung trò chuyện qua chat box website hoặc Messenger.</li>
              </ul>

              <h2>2. Cách gửi yêu cầu xoá dữ liệu</h2>
              <p>Bạn có thể gửi yêu cầu theo một trong các cách sau, kèm họ tên và số điện thoại/email đã dùng để liên hệ:</p>
              <ul className="list-disc pl-5">
                <li>
                  Gửi email đến{" "}
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-coral-dark underline">
                    {siteConfig.contact.email}
                  </a>{" "}
                  với tiêu đề &ldquo;Yêu cầu xoá dữ liệu cá nhân&rdquo;.
                </li>
                <li>
                  Nhắn tin trực tiếp qua Fanpage Messenger:{" "}
                  <a href={siteConfig.contact.messengerUrl} className="text-coral-dark underline">
                    {siteConfig.contact.messengerUrl}
                  </a>
                  .
                </li>
                <li>Gọi điện thoại: {siteConfig.contact.phoneDisplay}.</li>
              </ul>

              <h2>3. Thời gian xử lý</h2>
              <p>
                Chúng tôi sẽ xác nhận và xử lý yêu cầu xoá dữ liệu trong vòng 7 ngày làm việc kể từ khi
                nhận được yêu cầu hợp lệ. Một số dữ liệu có thể được giữ lại nếu pháp luật yêu cầu (ví dụ
                hồ sơ liên quan đến giao dịch đã hoàn tất).
              </p>

              <h2>4. Liên hệ</h2>
              <p>
                Xem thêm tại{" "}
                <a href="/chinh-sach-quyen-rieng-tu" className="text-coral-dark underline">
                  Chính sách quyền riêng tư
                </a>
                . Mọi thắc mắc khác vui lòng liên hệ {siteConfig.contact.email}.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

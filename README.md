# TMS Quy Nhơn - Lee Xinh | Website căn hộ nghỉ dưỡng

Website được xây bằng **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**,
tối ưu SEO và tốc độ tải, dựa trên thông tin thực tế của toà nhà TMS Quy Nhơn
(28 Nguyễn Huệ, TP. Quy Nhơn) mà bạn đang khai thác dưới thương hiệu Lee Xinh.

## 1. Chạy thử ở máy bạn

```bash
npm install
npm run dev
```

Mở http://localhost:3000

Build bản production:

```bash
npm run build
npm run start
```

## 2. Việc đầu tiên bạn cần làm: điền thông tin thật

Mở file **`src/lib/site-config.ts`** — đây là nơi DUY NHẤT chứa thông tin liên
hệ, mọi trang đều lấy dữ liệu từ đây. Tìm các dòng có 👉 TODO và điền:

- Số điện thoại, số Zalo, email, link Messenger
- Domain thật của website (`url`)
- Toạ độ GPS + link nhúng Google Maps thật (`geo`, `googleMapsEmbedUrl`)
- Link mạng xã hội (Facebook, Instagram, TikTok)

## 3. Thêm ảnh & video thật

Đọc file **`HUONG-DAN-THEM-ANH.md`** — hướng dẫn chi tiết từng bước, kèm danh
sách đầy đủ ảnh/video cần chụp và đặt đúng thư mục. Hiện tại mọi chỗ chưa có
ảnh thật đều hiển thị khối placeholder ghi rõ tên file cần thêm, thay vì ảnh vỡ.

## 4. Cấu trúc dự án

```
src/
  app/                    → Các trang (route) theo Next.js App Router
    page.tsx              → Trang chủ
    can-ho/page.tsx        → Danh sách căn hộ
    can-ho/[slug]/page.tsx → Chi tiết từng loại căn hộ
    tien-ich/page.tsx      → Tiện ích
    thu-vien-anh/page.tsx  → Thư viện ảnh & video
    vi-tri/page.tsx        → Vị trí & điểm đến lân cận
    gioi-thieu/page.tsx    → Giới thiệu
    lien-he/page.tsx       → Liên hệ & form đặt phòng
    sitemap.ts / robots.ts → SEO kỹ thuật, tự sinh sitemap.xml & robots.txt
  components/             → Các thành phần giao diện dùng chung
  data/                   → Dữ liệu: căn hộ, tiện ích, điểm đến, đánh giá
  lib/
    site-config.ts        → ⚙️ Cấu hình trung tâm (sửa ở đây!)
    seo.ts                → Hàm dựng metadata SEO chuẩn cho mọi trang
public/
  images/, videos/        → Nơi bỏ ảnh/video thật vào (xem HUONG-DAN-THEM-ANH.md)
```

## 5. Những gì đã được tối ưu sẵn cho SEO

- **Metadata chuẩn hoá**: title, description, canonical URL, Open Graph,
  Twitter Card cho từng trang qua hàm `buildMetadata()`.
- **Dữ liệu có cấu trúc (JSON-LD)**: khai báo loại hình `LodgingBusiness`
  (tên, địa chỉ, toạ độ, tiện ích) giúp Google hiển thị rich result, và
  `BreadcrumbList` cho điều hướng.
- **sitemap.xml & robots.txt** tự sinh tại `/sitemap.xml` và `/robots.txt`.
- **URL tiếng Việt không dấu, thân thiện** (`/can-ho`, `/tien-ich`, `/vi-tri`...)
  và nội dung tập trung vào từ khoá địa phương (Quy Nhơn, Kỳ Co, Eo Gió...).
- **Tốc độ tải nhanh**: dùng font `next/font` (tự host, không chặn render),
  ảnh dùng `next/image` khi bạn thêm ảnh thật (tự tối ưu kích thước/định dạng).
- **Thân thiện di động**: thanh liên hệ nhanh (gọi/Zalo/đặt phòng) cố định
  đáy màn hình, menu responsive, toàn bộ layout responsive từ mobile.
- **Trợ năng (a11y)**: focus rõ ràng khi dùng bàn phím, tôn trọng cài đặt
  giảm chuyển động (`prefers-reduced-motion`), `alt`/`aria-label` đầy đủ.

## 6. Việc nên làm tiếp theo (không bắt buộc ngay)

- [ ] Đăng ký **Google Search Console** + **Google Business Profile** cho địa
      điểm này, dán mã xác minh vào `verification` trong `src/app/layout.tsx`.
- [ ] Thay đánh giá mẫu trong `src/data/testimonials.ts` bằng đánh giá thật
      của khách (xin phép trước khi đăng tên).
- [ ] Kết nối form liên hệ với một dịch vụ gửi mail/API thật nếu muốn nhận
      yêu cầu ngay trên hệ thống thay vì qua email cá nhân (xem ghi chú trong
      `src/components/ContactForm.tsx`).
- [ ] Thêm favicon/logo thật thay cho `src/app/icon.svg` hiện tại.
- [ ] Mua domain và deploy (khuyến khích Vercel — triển khai Next.js dễ nhất).

## 7. Bảng màu & font (để giữ nhất quán khi bạn chỉnh sửa thêm)

| Vai trò | Token | Mã màu |
|---|---|---|
| Nền tối / header / footer | `--color-navy` | `#0E2A32` |
| Màu thương hiệu chính | `--color-teal` | `#1B5E63` |
| Nền phụ / chip | `--color-sand` | `#E8DCC6` |
| Nút CTA / nhấn | `--color-coral` | `#EE7A54` |
| Nền chính | `--color-ivory` | `#FBF8F2` |

Font chữ tiêu đề: **Fraunces** (font-display) · Font chữ nội dung: **Be Vietnam Pro**
(hỗ trợ tốt dấu tiếng Việt).

# Hướng dẫn thêm ảnh & video thật vào website

Toàn bộ vị trí trong website hiện đang hiển thị **khối placeholder màu be/xanh
có ghi chữ** thay vì ảnh thật (ví dụ: "Thêm ảnh: Hồ bơi vô cực — /public/images/tien-ich/ho-boi-vo-cuc.jpg").
Đây là chủ đích — để bạn biết chính xác cần chụp gì và đặt file ở đâu.

## Tin vui: bạn KHÔNG cần sửa code

Hệ thống đã được lập trình để **tự động nhận diện ảnh thật**. Với gần như
toàn bộ vị trí trong site (các loại căn hộ, tiện ích, điểm đến, thư viện ảnh...),
bạn chỉ cần:

1. Đặt tên file ảnh **giống hệt** tên ghi trong khối placeholder.
2. Copy file đó vào **đúng thư mục** ghi trên khối placeholder (bắt đầu bằng
   `/public/...`).
3. Mở lại trang web — ảnh sẽ **tự động hiện ra**, thay cho khối gradient.
   Không cần mở file code, không cần sửa dòng nào.

Ví dụ: placeholder ghi:
> Thêm ảnh: Hồ bơi vô cực
> `/public/images/tien-ich/ho-boi-vo-cuc.jpg`

→ Bạn chỉ cần copy 1 file tên **`ho-boi-vo-cuc.jpg`** vào đúng thư mục
`public/images/tien-ich/` trong project. Xong.

**Lưu ý về thời điểm ảnh hiện ra:**
- Khi đang chạy `npm run dev` (máy bạn tự chạy thử) → chỉ cần **tải lại trang
  (F5)** là thấy ảnh ngay, không cần khởi động lại gì cả.
- Khi website đã **deploy lên server thật** (Vercel...) → bạn cần **build và
  deploy lại** sau khi thêm ảnh (ảnh được "nướng" sẵn vào trang lúc build để
  tải nhanh hơn). Nếu deploy qua Vercel bằng Git, chỉ cần commit + push ảnh
  mới, Vercel sẽ tự build lại.

## Trường hợp đặc biệt: nếu bạn thật sự cần sửa code

99% trường hợp bạn không cần đọc phần này. Chỉ khi bạn muốn **đổi tên file**
khác với tên mặc định, hoặc thêm 1 vị trí ảnh hoàn toàn mới, bạn mới cần mở
đúng file dữ liệu tương ứng (`src/data/rooms.ts`, `src/data/amenities.ts`,
`src/data/destinations.ts`) và sửa lại tên file trong đó cho khớp.



## Danh sách đầy đủ ảnh cần chụp/thêm

### 1. Ảnh hero & trang chủ (`public/images/hero/`, `public/images/gioi-thieu/`)
- `hero-bien.jpg` — Ảnh nền lớn nhất đầu trang chủ (view biển hoặc mặt tiền toà nhà, góc rộng, đẹp nhất bạn có)
- `mat-tien-toa-nha.jpg` — Mặt tiền toà nhà TMS Quy Nhơn (chụp ban ngày, dùng ở mục giới thiệu ngắn trên trang chủ)
- `chu-can-ho.jpg` — Ảnh chủ nhà / đội ngũ đón tiếp (tạo sự tin tưởng, rất nên có, dùng ở trang Giới thiệu)
- Video hero 10-20 giây quay lướt qua căn hộ + view biển (khuyến khích, không bắt buộc)

### 2. Từng loại căn hộ (`public/images/can-ho/{slug}/`)
Mỗi căn hộ trong `src/data/rooms.ts` có danh sách `imageSlots` riêng, ví dụ
thư mục `public/images/can-ho/studio-view-bien/` cần:
- `phong-khach.jpg`, `ban-cong-view-bien.jpg`, `phong-tam.jpg`

Làm tương tự cho `can-ho-1-phong-ngu`, `can-ho-2-phong-ngu-gia-dinh`,
`penthouse-sky-view`. Nên chụp: toàn cảnh phòng khách, giường ngủ, bếp,
phòng tắm, và **view từ ban công** (ảnh view biển luôn là ảnh "chốt đơn" tốt nhất).

### 3. Tiện ích (`public/images/tien-ich/`)
`ho-boi-vo-cuc.jpg`, `phong-gym.jpg`, `sky-bar.jpg`, `nha-hang.jpg`, `spa.jpg`,
`khu-vui-choi-tre-em.jpg`, `bai-do-xe.jpg`

### 4. Vị trí / điểm đến (`public/images/vi-tri/`)
`bien-trung-tam.jpg`, `thap-doi.jpg`, `ky-co.jpg`, `eo-gio.jpg`, `cu-lao-xanh.jpg`
(Có thể dùng ảnh do bạn tự chụp, hoặc ảnh xin phép từ trang du lịch địa phương
— tránh copy ảnh có bản quyền từ nguồn không rõ ràng.)

### 5. Thư viện ảnh (`public/images/thu-vien-anh/`)
Xem danh sách đầy đủ trong `src/app/thu-vien-anh/page.tsx` (mục `galleryGroups`).
Đây là nơi bạn có thể tự do thêm bớt — càng nhiều ảnh thật càng tăng độ tin cậy.

### 6. Video (`public/videos/`)
- `gioi-thieu-can-ho.mp4` — video ngắn quay toàn bộ 1 căn hộ tiêu biểu
- `flycam-toa-nha.mp4` — nếu có flycam quay toà nhà + khu vực biển xung quanh

> Video nên nén dưới 15-20MB/clip (dùng HandBrake hoặc công cụ nén online) để
> trang tải nhanh. Với video dài hơn, nên upload YouTube rồi nhúng iframe thay
> vì để file .mp4 nặng trực tiếp trên server.

### 7. Ảnh chia sẻ mạng xã hội (Open Graph)
- `public/images/og-cover.jpg` (đã có ảnh tạm do tôi tạo — bạn nên thay bằng
  1 ảnh đẹp nhất của toà nhà/căn hộ, kích thước đúng **1200×630px**)

### 8. Icon / favicon
- `src/app/icon.svg` hiện là icon chữ "L" đơn giản — bạn có thể thay bằng logo
  thật (giữ định dạng .svg hoặc đổi sang .png 512×512 cùng tên `icon`).

## Thông số kỹ thuật khuyến nghị
| Loại ảnh | Tỉ lệ | Kích thước tối thiểu |
|---|---|---|
| Ảnh hero trang chủ | 16:9 hoặc rộng hơn | 1920×1080px |
| Ảnh căn hộ trong thẻ (card) | 16:7 | 1200×525px |
| Ảnh chi tiết trong trang căn hộ | 16:9 | 1200×675px |
| Ảnh vuông thư viện | 1:1 | 1000×1000px |
| Ảnh chân dung (portrait) | 3:4 | 900×1200px |

Định dạng: ưu tiên `.jpg` cho ảnh chụp thường, `.png` nếu cần nền trong suốt
(logo). Nên nén ảnh trước khi upload (dùng squoosh.app hoặc TinyPNG) để giữ
dung lượng dưới ~300KB/ảnh, giúp website tải nhanh hơn — một yếu tố SEO quan
trọng của Google (Core Web Vitals).

## Sau khi thêm xong ảnh
Chạy lại thử ở máy bạn:
```
npm run dev
```
rồi mở từng trang để kiểm tra ảnh hiển thị đúng chỗ trước khi build & deploy.

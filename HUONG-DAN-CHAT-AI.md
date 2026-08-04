# Hướng dẫn thêm Chat Box AI vào website

Tài liệu này hướng dẫn gắn trợ lý ảo trả lời khách 24/7 vào site TMS Quy Nhơn - Lee Xinh.

---

## 1. Chép 3 file mới vào dự án

Giữ nguyên đường dẫn, đừng đổi tên thư mục — Next.js dựa vào đường dẫn file để tạo URL.

```
src/lib/chat-context.ts        ← gom dữ liệu site thành "bộ não" cho AI
src/app/api/chat/route.ts      ← endpoint chạy trên server, giữ API key
src/components/ChatWidget.tsx  ← khung chat hiển thị cho khách
```

## 2. Sửa `src/app/layout.tsx`

Chỉ thêm đúng 2 dòng. Dòng import đặt cạnh các import component khác:

```tsx
import ChatWidget from "@/components/ChatWidget";
```

Và đặt `<ChatWidget />` ngay dưới `<StickyContactBar />`:

```tsx
        <Footer />
        <StickyContactBar />
        <ChatWidget />
      </body>
```

(File `layout.tsx` kèm theo đã sửa sẵn — bạn có thể chép đè luôn.)

## 3. Lấy API key

1. Vào https://console.anthropic.com → đăng ký tài khoản.
2. Nạp tiền vào mục **Billing** (tài khoản mới có ít credit dùng thử; hết credit thì API trả về lỗi và chat box sẽ hiện thông báo mời khách gọi điện).
3. Vào **API Keys** → **Create Key** → sao chép chuỗi bắt đầu bằng `sk-ant-`.

Key này hiện đúng **một lần**. Sao chép ngay, không thì phải tạo key mới.

## 4. Tạo file `.env.local`

Đặt ở thư mục gốc dự án, ngang hàng với `package.json`:

```
ANTHROPIC_API_KEY=sk-ant-dán-key-thật-vào-đây
```

`.gitignore` của bạn đã có dòng `.env*` nên file này sẽ không bị đẩy lên GitHub. Đừng bỏ dòng đó ra.

## 5. Chạy thử

```bash
npm run dev
```

Mở http://localhost:3000 — nút tròn màu coral xuất hiện ở góc dưới bên phải. Bấm vào và hỏi thử: *"Căn nào hợp cho gia đình 4 người?"*

Nếu chat box báo lỗi, mở terminal đang chạy `npm run dev` để xem log chi tiết. Hai nguyên nhân hay gặp nhất: quên khởi động lại server sau khi tạo `.env.local`, và tài khoản chưa nạp tiền.

## 6. Deploy lên Vercel

Vercel không đọc file `.env.local` trên máy bạn. Phải khai báo lại:

**Project → Settings → Environment Variables** → thêm `ANTHROPIC_API_KEY` với giá trị là key thật → chọn cả 3 môi trường (Production, Preview, Development) → **Redeploy**.

---

## Cách nó hoạt động

```
Khách gõ câu hỏi
      ↓
ChatWidget.tsx  (trình duyệt — không có key)
      ↓  POST /api/chat
route.ts  (server — có key)
      ↓  + SYSTEM_PROMPT từ chat-context.ts
Claude API
      ↓
Câu trả lời hiện lên khung chat
```

Điểm mấu chốt: API key **chỉ tồn tại ở server**. Trình duyệt của khách không bao giờ nhìn thấy nó.

---

## Tuỳ chỉnh về sau

| Muốn đổi gì | Sửa ở đâu |
|---|---|
| Tính cách, cách xưng hô, quy tắc trả lời | `SYSTEM_PROMPT` trong `chat-context.ts` |
| Câu hỏi gợi ý hiện lúc mới mở | `CAU_GOI_Y` trong `ChatWidget.tsx` |
| Lời chào đầu tiên | `LOI_CHAO` trong `ChatWidget.tsx` |
| Model AI (chất lượng ↔ chi phí) | `MODEL` trong `route.ts` — đang dùng `claude-sonnet-5` |
| Giới hạn chống spam | `MAX_REQUEST_MOI_PHUT` trong `route.ts` |
| Kiến thức về căn hộ, tiện ích, địa điểm | Các file `src/data/` sẵn có — chat box tự cập nhật theo |

Ô cuối cùng là phần đáng giá nhất: `chat-context.ts` đọc trực tiếp `rooms.ts`, `amenities.ts`, `destinations.ts` và `site-config.ts`. Bạn sửa mô tả căn hộ ở một chỗ, cả website lẫn chat box cùng cập nhật. Không có dữ liệu nào bị chép lặp hai nơi để rồi lệch nhau.

---

## Ba điều cần lưu ý

**Chat box không biết giá.** File `rooms.ts` không chứa giá, nên `SYSTEM_PROMPT` cấm AI nói ra bất kỳ con số nào và luôn đẩy khách sang link đặt phòng. Đây là chủ ý: một con số sai do AI bịa ra sẽ thành tranh cãi với khách lúc nhận phòng.

**Chi phí theo lượt hỏi.** Mỗi câu hỏi tốn một khoản rất nhỏ. Cơ chế chặn spam theo IP đã có sẵn trong `route.ts`, nhưng nên đặt thêm cảnh báo chi tiêu (spend alert) trong Console để không bị bất ngờ.

**Bộ đếm chống spam nằm trong RAM.** Nó reset mỗi lần deploy và mỗi server đếm riêng. Đủ cho lượng khách hiện tại. Khi nào site đông hẳn thì thay bằng Upstash Redis (có gói miễn phí).

---

## Nâng cấp có thể làm sau

- **Hiệu ứng chữ chạy dần** như ChatGPT (streaming) — trả lời có vẻ nhanh hơn hẳn dù tốc độ thực không đổi.
- **Lưu lịch sử hội thoại** để biết khách hay hỏi gì → bổ sung vào `src/data/` cho đúng nhu cầu thật.
- **Nút chuyển sang Zalo** ngay trong khung chat khi AI không trả lời được.

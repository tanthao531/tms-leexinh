# Hướng dẫn đưa dự án lên GitHub & deploy lên Vercel

Dành cho người chưa từng dùng Git. Làm theo đúng thứ tự, mỗi bước chỉ vài phút.

---

## Bước 1: Cài Git (chỉ làm 1 lần)

- **Windows**: tải tại https://git-scm.com/download/win → cài đặt, bấm Next tới cuối.
- **macOS**: mở Terminal, gõ `git --version` → nếu chưa có, máy sẽ tự hỏi và cài.

Kiểm tra đã cài xong:
```bash
git --version
```

## Bước 2: Khai báo tên & email (chỉ làm 1 lần)

```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@cua-ban.com"
```

## Bước 3: Tạo kho chứa trên GitHub

1. Đăng ký/đăng nhập https://github.com
2. Bấm nút **+** góc trên bên phải → **New repository**
3. Điền:
   - **Repository name**: `tms-leexinh`
   - Chọn **Private** (riêng tư) nếu không muốn người khác xem code
   - **KHÔNG** tích vào "Add a README file" (dự án đã có sẵn)
4. Bấm **Create repository**
5. GitHub hiện ra 1 địa chỉ dạng `https://github.com/ten-cua-ban/tms-leexinh.git` — **copy lại**, lát nữa dùng.

## Bước 4: Đưa dự án lên

Mở Terminal (macOS) hoặc Git Bash (Windows), di chuyển vào thư mục dự án:

```bash
cd đường/dẫn/tới/tms-leexinh
```

> 💡 Mẹo: gõ `cd ` (có dấu cách), rồi **kéo thả** thư mục dự án vào cửa sổ Terminal — đường dẫn tự điền.

Sau đó chạy lần lượt 5 lệnh:

```bash
git init
git add .
git commit -m "Khoi tao website TMS Quy Nhon - Lee Xinh"
git remote add origin https://github.com/ten-cua-ban/tms-leexinh.git
git push -u origin main
```

> Thay `https://github.com/ten-cua-ban/tms-leexinh.git` bằng địa chỉ bạn copy ở Bước 3.

**Nếu báo lỗi `src refspec main does not match any`**, chạy thêm:
```bash
git branch -M main
git push -u origin main
```

**Khi được hỏi mật khẩu**: GitHub không nhận mật khẩu tài khoản nữa, cần dùng *token*:
1. Vào https://github.com/settings/tokens → **Generate new token (classic)**
2. Tích ô **repo**, bấm **Generate token**
3. Copy chuỗi token, dán vào chỗ hỏi mật khẩu (dán xong không thấy gì hiện lên là bình thường, cứ Enter)

Lần đầu push khoảng 78 MB nên hơi lâu (2–5 phút tuỳ mạng). Các lần sau rất nhanh.

---

## Bước 5: Deploy lên Vercel (miễn phí)

1. Vào https://vercel.com → **Sign up** → chọn **Continue with GitHub**
2. Bấm **Add New** → **Project**
3. Chọn kho `tms-leexinh` vừa đưa lên → bấm **Import**
4. Vercel tự nhận diện đây là dự án Next.js — **không cần đổi gì cả**, bấm **Deploy**
5. Chờ 2–3 phút → website đã chạy tại địa chỉ dạng `tms-leexinh.vercel.app`

### Gắn tên miền thật (tmsquynhonleexinh.com)

1. Trong Vercel: vào project → tab **Settings** → **Domains**
2. Gõ `tmsquynhonleexinh.com` → **Add**
3. Vercel hiện ra các bản ghi DNS cần khai báo
4. Đăng nhập nơi bạn mua tên miền → mục quản lý DNS → thêm đúng các bản ghi đó
5. Chờ 5 phút – vài tiếng để tên miền trỏ về (Vercel tự cấp chứng chỉ bảo mật HTTPS)

---

## Sau này muốn sửa nội dung / thêm ảnh

Chỉ cần 3 lệnh, website tự cập nhật sau ~2 phút:

```bash
git add .
git commit -m "Mô tả ngắn thay đổi, ví dụ: them anh phong moi"
git push
```

Vercel tự động nhận thay đổi, build lại và cập nhật website — bạn không cần làm gì thêm.

---

## Những điều cần lưu ý

### ⚠️ Đặt tên file ảnh
Khi thêm ảnh mới, **luôn dùng tên không dấu, không khoảng trắng**:

| ❌ Sai | ✅ Đúng |
|---|---|
| `Phòng ngủ 1.jpg` | `phong-ngu-1.jpg` |
| `ảnh đẹp (1).jpg` | `anh-dep-1.jpg` |
| `Hồ Bơi.JPG` | `ho-boi.jpg` |

**Vì sao quan trọng**: máy tính của bạn (Windows/macOS) và máy chủ Vercel (Linux) lưu dấu tiếng Việt theo 2 cách khác nhau. Ảnh có dấu chạy tốt trên máy bạn nhưng có thể **mất trắng khi lên web**. Toàn bộ ảnh hiện tại của dự án đã được đổi sang tên an toàn.

### ⚠️ Không bao giờ chạy `npm audit fix --force`
Lệnh này sẽ hạ cấp Next.js xuống bản năm 2020 và làm sập toàn bộ website. Muốn kiểm tra bảo mật, dùng:
```bash
npm audit --omit=dev
```
(hiện đang là **0 lỗi**)

### Thư mục KHÔNG được đưa lên Git
Đã cấu hình sẵn trong file `.gitignore`, bạn không cần làm gì:
- `node_modules/` — thư viện, Vercel tự cài lại
- `.next/` — file build tạm

Nếu lỡ đưa lên, dung lượng sẽ phình lên hàng trăm MB.

---

## Gặp lỗi thường gặp

| Lỗi | Cách xử lý |
|---|---|
| `fatal: not a git repository` | Bạn đang ở sai thư mục — chạy lại `cd` vào đúng thư mục dự án |
| `remote origin already exists` | Chạy `git remote remove origin` rồi thêm lại |
| `failed to push some refs` | Chạy `git pull origin main --rebase` rồi `git push` lại |
| Vercel build lỗi | Vào tab **Deployments** → bấm vào lần deploy lỗi → đọc dòng báo lỗi màu đỏ |
| Ảnh không hiện trên web (chạy tốt ở máy) | Gần như chắc chắn do tên file có dấu/khoảng trắng — đổi tên và push lại |

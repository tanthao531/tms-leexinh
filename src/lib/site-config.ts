/**
 * CẤU HÌNH TRUNG TÂM CỦA WEBSITE
 * ------------------------------------------------------------------
 * Đây là nơi DUY NHẤT bạn cần sửa các thông tin thật của mình
 * (số điện thoại, Zalo, mạng xã hội, toạ độ bản đồ...).
 * Mọi trang trong site đều lấy dữ liệu từ đây, nên chỉ cần sửa 1 lần.
 *
 * Các dòng có đánh dấu 👉 TODO là những chỗ BẮT BUỘC bạn cần điền
 * thông tin thật trước khi đưa site lên mạng.
 */

export const siteConfig = {
  name: "TMS Quy Nhơn - Lee Xinh",
  shortName: "Lee Xinh",
  tagline: "Căn hộ nghỉ dưỡng view biển giữa lòng Quy Nhơn",

  // 👉 TODO: đổi thành domain thật khi bạn mua/deploy (vd: https://tmsquynhonleexinh.com)
  url: "https://tmsquynhonleexinh.com",

  description:
    "Lee Xinh - căn hộ nghỉ dưỡng toạ lạc tại toà tháp TMS Quy Nhơn 42 tầng, số 28 Nguyễn Huệ, Phường Quy Nhơn. Cách biển trung tâm chỉ vài phút đi bộ, gần Tháp Đôi, Kỳ Co, Eo Gió. Phù hợp cho gia đình, nhóm bạn và khách công tác.",

  address: {
    line1: "Toà nhà TMS Quy Nhơn, 28 Nguyễn Huệ",
    ward: "Phường Quy Nhơn",
    city: "Tỉnh Gia Lai",
    country: "Việt Nam",
    full: "28 Nguyễn Huệ, Phường Quy Nhơn, Tỉnh Gia Lai",
  },

  // 👉 TODO: thay bằng toạ độ GPS chính xác của toà nhà (lấy từ Google Maps: chuột phải > "Toạ độ của bạn ở đây")
  geo: {
    latitude: 13.7705776,
    longitude: 109.2323037,
  },

  // 👉 TODO: dán link Google Maps "Nhúng bản đồ" thật của bạn vào đây
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1394.0163917879947!2d109.23230367171493!3d13.770577642075546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f6d5947af8fd5%3A0xa414435eb2a61ef4!2sTMS%20Quy%20Nh%C6%A1n%20-%20Lee%20Xinh!5e0!3m2!1svi!2s!4v1785000829862!5m2!1svi!2s",
  googleMapsDirectionUrl:
    "https://maps.app.goo.gl/ACi8AGtgUK6LtQU49",

  contact: {
    // 👉 TODO: thay số điện thoại thật (định dạng quốc tế cho SEO, ví dụ +84935xxxxxx)
    phoneDisplay: "0935 339 131",
    phoneHref: "+84935339131",
    // 👉 TODO: thay số Zalo thật
    zaloNumber: "0935339131",
    zaloUrl: "https://zalo.me/0935339131",
    // 👉 TODO: thay email thật
    email: "tmsquynhonleexinh@gmail.com",
    // 👉 TODO: thay link Messenger fanpage thật
    messengerUrl: "https://m.me/tmsquynhonleexinh",
  },

  /**
   * Hệ thống đặt phòng trực tuyến (booking engine). Toàn bộ nút
   * "Đặt phòng ngay" / "Gửi yêu cầu đặt phòng" trong site đều trỏ về đây.
   * 👉 TODO: nếu sau này đổi sang hệ thống đặt phòng khác, chỉ cần sửa 1 dòng
   * này — mọi nút trong site sẽ tự cập nhật theo.
   */
  booking: {
    engineUrl:
      "https://booking.getbestbooking.com/?ht=5928&lang=vi-VN&curency=VND",
  },

  /** Chính sách lưu trú — hiển thị ở trang Liên hệ. 👉 TODO: cập nhật nếu có thay đổi. */
  policies: {
    checkIn: "14:00 – 23:00",
    checkOut: "trước 12:00",
    breakfast: false,
    pets: false,
  },

  social: {
    // 👉 TODO: điền các link mạng xã hội thật, hoặc xoá dòng nào không dùng
    facebook: "https://www.facebook.com/tmsquynhonleexinh",
    tiktok: "https://www.tiktok.com/@leexinhquynhon",
  },

  /**
   * 👉 TODO — QUAN TRỌNG: sau khi tạo & xác minh xong Google Business Profile
   * (xem hướng dẫn phần "Google Business Profile" đã trao đổi), dán link
   * "Viết đánh giá" của hồ sơ vào đây. Cách lấy link:
   *   1. Đăng nhập https://business.google.com, chọn đúng hồ sơ của bạn.
   *   2. Vào mục "Xin đánh giá" (Get more reviews) → Google tạo sẵn 1 link dạng
   *      https://g.page/r/xxxxxxxxxxxxxxxx/review
   *   3. Dán link đó vào 2 dòng bên dưới.
   * Nếu để trống, nút "Xem đánh giá trên Google" ở trang Liên hệ sẽ không hiển thị.
   */
  googleBusinessProfile: {
    // Link để KHÁCH VIẾT đánh giá mới (dùng cho nút "Đánh giá trên Google")
    reviewUrl: "https://g.page/r/CfQeprJeQxSkEBM/review",
    // Link tới TRANG HỒ SƠ đầy đủ trên Google Maps (để khách xem review + chỉ đường)
    // Lấy bằng cách: tìm doanh nghiệp trên Google Maps > Chia sẻ > Sao chép liên kết
    profileUrl: "https://maps.app.goo.gl/ACi8AGtgUK6LtQU49",
  },

  building: {
    floors: 42,
    yearBuilt: 2017,
    totalUnits: 740,
  },

  nav: [
    { href: "/", label: "Trang chủ" },
    { href: "/can-ho", label: "Căn hộ" },
    { href: "/tien-ich", label: "Tiện ích" },
    { href: "/thu-vien-anh", label: "Thư viện ảnh" },
    { href: "/vi-tri", label: "Vị trí" },
    { href: "/gioi-thieu", label: "Giới thiệu" },
    { href: "/lien-he", label: "Liên hệ" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

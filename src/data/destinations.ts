export interface Destination {
  name: string;
  distance: string;
  travelTime: string;
  description: string;
  imageSlot: string;
}

/**
 * Các điểm đến nổi tiếng quanh Quy Nhơn — rất tốt cho SEO địa phương
 * vì đây là những từ khoá khách du lịch hay tìm kiếm. Điều chỉnh lại
 * khoảng cách/thời gian di chuyển cho chính xác từ vị trí toà nhà của bạn.
 */
export const destinations: Destination[] = [
  {
    name: "Biển trung tâm Quy Nhơn",
    distance: "~120 m",
    travelTime: "2 phút đi bộ",
    description: "Bãi biển ngay trước mặt đường Xuân Diệu, tiện đi dạo mỗi sáng và tối.",
    imageSlot: "bien-trung-tam.jpg",
  },
  {
    name: "Tháp Đôi Quy Nhơn",
    distance: "~2 km",
    travelTime: "6 phút đi xe",
    description: "Cụm tháp Chăm cổ hơn 800 năm tuổi, biểu tượng lịch sử của thành phố.",
    imageSlot: "thap-doi.jpg",
  },
  {
    name: "Kỳ Co",
    distance: "~25 km",
    travelTime: "45 phút đi ca nô/xe",
    description: "Bãi biển được ví như \"Maldives của Việt Nam\" với nước biển trong xanh.",
    imageSlot: "ky-co.jpg",
  },
  {
    name: "Eo Gió",
    distance: "~22 km",
    travelTime: "40 phút đi xe",
    description: "Điểm ngắm bình minh nổi tiếng nhất Quy Nhơn, view vách đá và biển tuyệt đẹp.",
    imageSlot: "eo-gio.jpg",
  },
  {
    name: "Cù Lao Xanh",
    distance: "~24 km + tàu",
    travelTime: "Khoảng 1-1.5 giờ",
    description: "Đảo hoang sơ với hải đăng cổ, phù hợp cho chuyến đi trong ngày.",
    imageSlot: "cu-lao-xanh.jpg",
  },
  {
    name: "Ga Quy Nhơn",
    distance: "~1.4 km",
    travelTime: "20 phút đi bộ",
    description: "Thuận tiện cho khách di chuyển bằng tàu hoả đến/đi từ Quy Nhơn.",
    imageSlot: "",
  },
];

export interface Amenity {
  name: string;
  description: string;
  icon:
    | "pool"
    | "gym"
    | "restaurant"
    | "spa"
    | "reception"
    | "parking"
    | "wifi"
    | "security"
    | "skybar"
    | "laundry";
  imageSlot: string;
}

export interface AmenityCategory {
  title: string;
  items: string[];
}

/**
 * Tiện ích nổi bật có ảnh thật — tổng hợp dựa trên mô tả thực tế của
 * "TMS Quy Nhơn - Lee Xinh" trên các kênh Agoda/Booking/Traveloka/Hotels.com.
 * 👉 TODO: một số tiện ích dùng chung của toà nhà (hồ bơi, gym, nhà hàng,
 * rooftop, spa) có thể thay đổi quyền sử dụng tuỳ thời điểm — vui lòng xác
 * nhận lại với ban quản lý toà nhà trước khi quảng cáo là "miễn phí sử dụng".
 */
export const amenities: Amenity[] = [
  {
    name: "Hồ bơi ngoài trời",
    description:
      "Hồ bơi ngoài trời trong khuôn viên toà nhà TMS Quy Nhơn, nhìn ra vịnh biển — điểm check-in được nhiều khách yêu thích.",
    icon: "pool",
    imageSlot: "ho-boi-vo-cuc.jpg",
  },
  {
    name: "Phòng Gym & Fitness",
    description:
      "Khu vực tập luyện với máy tập hiện đại trong khuôn viên toà nhà, phục vụ khách muốn duy trì vận động khi đi xa.",
    icon: "gym",
    imageSlot: "phong-gym.jpg",
  },
  {
    name: "Nhà hàng tầng cao",
    description:
      "Nhà hàng trên tầng cao của toà nhà, phục vụ ẩm thực với tầm nhìn bao quát thành phố Quy Nhơn.",
    icon: "restaurant",
    imageSlot: "nha-hang.jpg",
  },
  {
    name: "Rooftop / Sky Bar",
    description:
      "Không gian ngoài trời trên tầng thượng, lý tưởng để ngắm hoàng hôn và toàn cảnh vịnh biển Quy Nhơn.",
    icon: "skybar",
    imageSlot: "sky-bar.jpg",
  },
  {
    name: "Spa & massage",
    description: "Dịch vụ spa, massage thư giãn trong khuôn viên toà nhà sau một ngày khám phá Quy Nhơn.",
    icon: "spa",
    imageSlot: "spa.jpg",
  },
  {
    name: "Lễ tân hỗ trợ 24/7",
    description:
      "Đội ngũ lễ tân hỗ trợ nhận/trả phòng và giải đáp thắc mắc trong suốt thời gian lưu trú.",
    icon: "reception",
    imageSlot: "",
  },
  {
    name: "Bãi đỗ xe",
    description: "Khu vực đỗ xe ô tô, xe máy có người trông giữ trong khuôn viên toà nhà.",
    icon: "parking",
    imageSlot: "",
  },
  {
    name: "Wifi miễn phí tốc độ cao",
    description: "Phủ sóng toàn bộ căn hộ, đáp ứng tốt nhu cầu làm việc từ xa và giải trí.",
    icon: "wifi",
    imageSlot: "",
  },
  {
    name: "Dịch vụ giặt ủi",
    description: "Hỗ trợ giặt ủi/giặt khô theo yêu cầu, tiện lợi cho khách lưu trú dài ngày.",
    icon: "laundry",
    imageSlot: "",
  },
];

/**
 * Danh sách tiện nghi đầy đủ dạng checklist — trình bày theo nhóm giống
 * cách Agoda/Booking.com hiển thị, giúp khách nắm rõ những gì căn hộ có
 * trước khi đặt phòng (tốt cho SEO và giảm thắc mắc trước khi đặt).
 * 👉 TODO: rà lại từng mục cho khớp chính xác với căn hộ bạn đang cho thuê,
 * vì tiện nghi có thể khác nhau đôi chút giữa các căn.
 */
export const amenityCategories: AmenityCategory[] = [
  {
    title: "Phổ biến nhất",
    items: [
      "Bếp riêng có tủ lạnh",
      "Máy giặt riêng trong căn hộ",
      "Ban công riêng",
      "Wifi miễn phí tốc độ cao",
      "Bãi đỗ xe miễn phí có người trông",
      "Khu vực tiếp khách riêng biệt",
    ],
  },
  {
    title: "Phòng & nội thất",
    items: [
      "Điều hoà nhiệt độ",
      "Smart TV / TV màn hình phẳng cỡ lớn kèm truyền hình cáp",
      "Nệm cao cấp, ga trải giường vải cotton",
      "Sofa giường (tuỳ loại căn hộ)",
      "Mỗi căn hộ trang trí, bài trí riêng biệt",
      "Cách âm tốt",
    ],
  },
  {
    title: "Nhà bếp",
    items: [
      "Bếp nấu (bếp điện/bếp từ)",
      "Nồi cơm điện, bát đũa đầy đủ",
      "Bình đun nước siêu tốc",
      "Bàn ủi quần áo",
      "Máy nước nóng",
    ],
  },
  {
    title: "Dịch vụ hỗ trợ",
    items: [
      "Lễ tân hỗ trợ nhận / trả phòng",
      "Dịch vụ giặt ủi, giặt khô",
      "Giữ hành lý trước/sau giờ nhận-trả phòng",
      "Hỗ trợ thuê xe máy",
      "Hỗ trợ đặt tour du lịch địa phương",
      "Cung cấp đặc sản địa phương",
    ],
  },
  {
    title: "Tiện ích chung của toà nhà",
    items: [
      "Hồ bơi ngoài trời",
      "Phòng gym",
      "Nhà hàng tầng cao",
      "Rooftop / khu vực ngoài trời tầng thượng",
      "Dịch vụ spa, massage",
      "Bãi đỗ xe ô tô, xe máy",
    ],
  },
  {
    title: "Chính sách lưu trú",
    items: [
      "Nhận phòng: 14:00 – 23:00",
      "Trả phòng: trước 12:00",
      "Không phục vụ bữa sáng tại chỗ (có nhiều quán ăn gần đó)",
      "Không nhận thú cưng",
      "Khu vực không hút thuốc",
    ],
  },
];

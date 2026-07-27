export interface RoomType {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  area: string; // vd: "32-38 m²"
  capacity: string; // vd: "2-3 khách"
  bedConfig: string;
  view: string;
  highlight?: string; // nhãn nổi bật, vd "Bán chạy nhất"
  amenities: string[];
  // Danh sách tên ảnh gợi ý — bạn cần thêm ảnh thật vào /public/images/can-ho/{slug}/
  imageSlots: string[];
  // Thư mục chứa TOÀN BỘ ảnh thật của loại căn hộ này (tính từ /public),
  // dùng để tự động hiển thị cả bộ ảnh trên trang chi tiết căn hộ.
  galleryFolder?: string;
}

/**
 * 👉 TODO: đây là các loại căn hộ MẪU dựa trên cấu trúc thực tế của toà
 * TMS Quy Nhơn (căn hộ 1PN, 2PN, studio, penthouse). Hãy chỉnh lại tên,
 * diện tích, số lượng và mô tả cho đúng với các căn bạn đang khai thác,
 * rồi thêm ảnh thật cho từng căn.
 */
export const rooms: RoomType[] = [
  {
    slug: "studio-view-bien",
    name: "Studio View Biển",
    shortDescription: "Căn hộ studio ấm cúng, ban công nhìn thẳng ra biển.",
    description:
      "Không gian mở liên thông giữa khu bếp, phòng khách và phòng ngủ, tối ưu cho cặp đôi hoặc khách công tác một mình. Cửa kính lớn đón trọn ánh sáng tự nhiên và tầm nhìn ra biển Quy Nhơn, đặc biệt đẹp vào lúc bình minh.",
    area: "47 m²",
    capacity: "2-4 khách",
    bedConfig: "2 giường đôi",
    view: "Hướng biển",
    highlight: "Được đặt nhiều nhất",
    amenities: [
      "Bếp từ mini & tủ lạnh",
      "Máy lạnh",
      "Smart TV",
      "Wifi tốc độ cao",
      "Ban công riêng",
    ],
    imageSlots: ["phong-khach.jpg", "ban-cong-view-bien.jpg", "phong-tam.jpg"],
    galleryFolder: "images/thu-vien-anh/studio",
  },
  {
    slug: "can-ho-2-phong-ngu",
    name: "Căn hộ 2 Phòng Ngủ",
    shortDescription: "Phòng ngủ riêng biệt, phù hợp gia đình nhỏ 3-4 người.",
    description:
      "Thiết kế tách biệt phòng khách và phòng ngủ, có bếp đầy đủ để tự nấu nướng. Lựa chọn quen thuộc của các gia đình trẻ và nhóm bạn muốn có không gian riêng tư nhưng vẫn thoải mái sinh hoạt chung.",
    area: "55 m²",
    capacity: "3-4 khách",
    bedConfig: "2 giường đôi",
    view: "Hướng biên và thành phố",
    amenities: [
      "Bếp đầy đủ dụng cụ nấu ăn",
      "Máy giặt riêng",
      "Bàn ăn 4 người",
      "Smart TV 2 phòng",
      "Két an toàn",
    ],
    imageSlots: [
      "phong-ngu.jpg",
      "khu-bep.jpg",
      "phong-khach.jpg",
      "view-tu-ban-cong.jpg",
    ],
    galleryFolder: "images/thu-vien-anh/2-phong-ngu",
  },
  {
    slug: "can-ho-3-giuong-gia-dinh",
    name: "Căn hộ 3 Giường Gia Đình",
    shortDescription: "Rộng rãi cho gia đình đông người hoặc nhóm 2 gia đình.",
    description:
      "Hai phòng ngủ riêng biệt cùng phòng khách rộng rãi, phù hợp cho gia đình nhiều thế hệ hoặc nhóm bạn đi cùng nhau muốn chia sẻ chi phí. Không gian bếp lớn thuận tiện nấu những bữa cơm gia đình khi đi du lịch dài ngày.",
    area: "65 m²",
    capacity: "5-6 khách",
    bedConfig: "3 giường đôi",
    view: "Hướng biển và thành phố",
    amenities: [
      "1 phòng tắm riêng",
      "Bếp đầy đủ + máy rửa chén",
      "Phòng khách rộng",
      "2 Smart TV",
      "Máy giặt riêng",
    ],
    imageSlots: [
      "phong-khach-lon.jpg",
      "phong-ngu-1.jpg",
      "phong-ngu-2.jpg",
      "bep-an.jpg",
    ],
    galleryFolder: "images/thu-vien-anh/3-giuong",
  },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((r) => r.slug === slug);
}

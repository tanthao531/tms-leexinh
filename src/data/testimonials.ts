export interface Testimonial {
  name: string;
  location?: string;
  rating: number; // 1-5
  quote: string;
  source?: string;
}

/**
 * Đánh giá THẬT do chủ căn hộ cung cấp từ hồ sơ Google Maps của chính
 * "TMS Quy Nhơn - Lee Xinh" (đều là đánh giá 5 sao). Tên khách được ẩn
 * danh vì chủ căn hộ chưa xin phép hiển thị tên/ảnh thật của từng khách.
 * 👉 TODO: nếu sau này xin được phép hiển thị tên thật của khách, có thể
 * thay trường "name" bằng tên thật để tăng độ tin cậy.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Khách lưu trú",
    rating: 5,
    source: "Google Maps",
    quote:
      "Mình rất hài lòng khi lưu trú tại căn hộ TMS Quy Nhơn. Căn hộ có view biển cực đẹp, ngắm bình minh và hoàng hôn rất thư giãn. Nội thất đầy đủ, sạch sẽ và tiện nghi như ở nhà. Nhân viên đón tiếp nhiệt tình, hỗ trợ nhanh chóng. Ngoài ra còn có các dịch vụ tiện ích như cho thuê xe máy, đặt tour tham quan và giới thiệu đặc sản địa phương rất thuận tiện. Chắc chắn sẽ quay lại khi có dịp đến Quy Nhơn.",
  },
  {
    name: "Khách đi theo nhóm bạn",
    rating: 5,
    source: "Google Maps",
    quote:
      "Đi du lịch theo nhóm bạn và chọn lưu trú ở đây thấy cực kỳ tiện lợi. Căn hộ có đầy đủ khu vực bếp nấu với bếp từ, tủ lạnh dung tích lớn, nồi cơm điện và bát đũa sạch sẽ để cả nhóm tự mua hải sản về chế biến ăn uống. Toà nhà TMS nằm ngay vị trí trung tâm mặt đường lớn, bước vài bước là ra đến bãi biển, xung quanh tập hợp rất nhiều quán café đẹp, nhà hàng ăn uống và siêu thị tiện lợi ngay dưới chân đế.",
  },
  {
    name: "Khách lưu trú",
    rating: 5,
    source: "Google Maps",
    quote:
      "Trải nghiệm lưu trú khá tốt, nhân viên hỗ trợ nhanh khi cần, thủ tục nhận phòng đơn giản, ngoài ra còn có dịch vụ thuê xe máy rất tiện cho việc khám phá thành phố.",
  },
  {
    name: "Khách gia đình có con nhỏ",
    rating: 5,
    source: "Google Maps",
    quote:
      "Nhà mình 2 người lớn và 2 bé (1 tuổi và 5 tuổi) ở phòng 2 giường, rộng rãi sạch sẽ, view đẹp. Hôm đến nhận phòng mình chủ quan không gọi báo trước, gọi số chủ nhà thì thuê bao nên hơi lo, may có bạn lễ tân bên dưới gọi Zalo hỗ trợ đón, chỉ đợi khoảng 10 phút. Mọi người nên liên hệ trước khoảng 1 tiếng khi đến để đỡ phải chờ.",
  },
  {
    name: "Khách lưu trú",
    rating: 5,
    source: "Google Maps",
    quote:
      "Phòng đẹp kiểu sang trọng, mở cửa ra thấy biển luôn, nội thất gọn gàng sạch bóng. Chị chủ tư vấn tận tình, hỏi gì cũng trả lời chu đáo. Ở đây chụp được cơ man nào là ảnh đẹp, đăng lên ai cũng khen.",
  },
];

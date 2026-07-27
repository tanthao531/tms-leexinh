import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

interface PlaceholderImageProps {
  /** Đường dẫn nơi bạn nên đặt ảnh thật, vd: /images/can-ho/studio/phong-khach.jpg */
  path: string;
  /** Mô tả ngắn nội dung ảnh cần thêm (cũng dùng làm alt text khi ảnh đã có) */
  label: string;
  /** Tỉ lệ khung hình */
  ratio?: "square" | "video" | "portrait" | "wide";
  className?: string;
  /** Đánh dấu đây là vị trí cần video thay vì ảnh */
  isVideo?: boolean;
}

const ratioClass: Record<NonNullable<PlaceholderImageProps["ratio"]>, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/7]",
};

/**
 * Component "ảnh thông minh": TỰ ĐỘNG kiểm tra xem file thật đã có trong
 * thư mục /public chưa.
 *   - Nếu CHƯA có file → hiển thị khối gradient ghi rõ tên file/đường dẫn
 *     cần thêm (không cần sửa code).
 *   - Nếu ĐÃ có file (bạn chỉ cần copy đúng tên vào đúng thư mục) → tự
 *     động hiển thị ảnh/video thật, không cần sửa bất kỳ dòng code nào.
 *
 * Nói cách khác: với hầu hết các vị trí trong site, bạn CHỈ CẦN bỏ đúng
 * file ảnh vào đúng thư mục trong /public — mọi thứ sẽ tự hiện ra.
 */
export default function PlaceholderImage({
  path: mediaPath,
  label,
  ratio = "video",
  className = "",
  isVideo = false,
}: PlaceholderImageProps) {
  const absolutePath = path.join(process.cwd(), "public", mediaPath);
  const fileExists = fs.existsSync(absolutePath);

  if (fileExists && isVideo) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${ratioClass[ratio]} w-full ${className}`}>
        <video
          src={mediaPath}
          controls
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </div>
    );
  }

  if (fileExists) {
    return (
      <div
        className={`group relative overflow-hidden rounded-2xl ${ratioClass[ratio]} w-full bg-gradient-to-br from-sand-light to-sand ${className}`}
      >
        {/* Chỉ tải 1 ảnh duy nhất, đặt trên nền gradient — ảnh hiển thị
            TRỌN VẸN (object-contain), không bị cắt mất chi tiết. */}
        <Image
          src={mediaPath}
          alt={label}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex ${ratioClass[ratio]} w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-teal/30 bg-gradient-to-br from-sand-light via-sand to-teal-light/30 ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-7 w-7 text-teal/70 sm:h-8 sm:w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          {isVideo ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5l4.72-2.36a.75.75 0 011.03.67v10.38a.75.75 0 01-1.03.67l-4.72-2.36M3 8.25A2.25 2.25 0 015.25 6h7.5A2.25 2.25 0 0115 8.25v7.5A2.25 2.25 0 0112.75 18h-7.5A2.25 2.25 0 013 15.75v-7.5z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18A.75.75 0 0021.75 19.5V4.5a.75.75 0 00-.75-.75H3a.75.75 0 00-.75.75v15c0 .414.336.75.75.75zM9 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
          )}
        </svg>
        <p className="text-xs font-semibold uppercase tracking-wide text-teal sm:text-sm">
          {isVideo ? "Thêm video" : "Thêm ảnh"}: {label}
        </p>
        <code className="rounded bg-navy/5 px-2 py-0.5 text-[10px] text-ink-soft sm:text-xs">
          /public{mediaPath}
        </code>
      </div>
    </div>
  );
}

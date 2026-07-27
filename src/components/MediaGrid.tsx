import Image from "next/image";

/**
 * Lưới ảnh hiển thị TOÀN BỘ ảnh thật trong 1 thư mục.
 *
 * Tối ưu hiệu năng: mỗi ô chỉ tải DUY NHẤT 1 ảnh (đặt trên nền màu cát
 * nhạt), thay vì tải 2 lần như trước. Ảnh vẫn hiển thị trọn vẹn không bị
 * cắt nhờ object-contain. Ảnh ngoài màn hình được tải trễ (lazy) tự động.
 */
export default function MediaGrid({
  images,
  altPrefix,
}: {
  images: string[];
  altPrefix: string;
}) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((src, i) => (
        <a
          key={src}
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-sand-light to-sand"
        >
          <Image
            src={src}
            alt={`${altPrefix} — ảnh ${i + 1}`}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </a>
      ))}
    </div>
  );
}

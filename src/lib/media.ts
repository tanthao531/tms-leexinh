import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/**
 * Sắp xếp tên file theo kiểu "tự nhiên": 1, 2, 3 ... 10, 11 thay vì
 * theo thứ tự chữ cái (1, 10, 11, 2, 3...). Giúp các bộ ảnh đánh số thứ
 * tự (1.jpg, 2.jpg, ..., 10.jpg) hiển thị đúng thứ tự chụp.
 */
function naturalSort(a: string, b: string): number {
  const numA = parseInt(a.match(/\d+/)?.[0] ?? "", 10);
  const numB = parseInt(b.match(/\d+/)?.[0] ?? "", 10);
  if (!Number.isNaN(numA) && !Number.isNaN(numB) && numA !== numB) {
    return numA - numB;
  }
  return a.localeCompare(b, "vi");
}

/**
 * Liệt kê toàn bộ ảnh thật trong 1 thư mục con của /public. Dùng để tự
 * động hiển thị cả bộ ảnh (vd: 40+ ảnh thực tế của 1 loại căn hộ) mà
 * không cần khai báo tay từng tên file trong code.
 *
 * @param relativeDir đường dẫn thư mục tính từ /public, KHÔNG có dấu / ở đầu
 *   (ví dụ: "images/thu-vien-anh/studio")
 * @returns danh sách đường dẫn URL đã encode, sẵn sàng dùng làm src cho <Image>
 */
export function listPublicImages(relativeDir: string): string[] {
  const absoluteDir = path.join(process.cwd(), "public", relativeDir);
  if (!fs.existsSync(absoluteDir)) return [];

  const files = fs
    .readdirSync(absoluteDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort(naturalSort);

  const encodedDir = relativeDir
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return files.map((name) => `/${encodedDir}/${encodeURIComponent(name)}`);
}

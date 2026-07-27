import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ivory">
      <Container className="text-center">
        <p className="font-display text-6xl text-navy">404</p>
        <h1 className="mt-3 font-display text-2xl text-navy">
          Không tìm thấy trang bạn cần
        </h1>
        <p className="mt-2 text-ink-soft">
          Trang có thể đã được di chuyển hoặc không còn tồn tại.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-coral px-7 py-3 text-sm font-semibold text-white hover:bg-coral-dark"
        >
          Về trang chủ
        </Link>
      </Container>
    </section>
  );
}

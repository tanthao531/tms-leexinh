import type { Testimonial } from "@/data/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-coral" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${idx < rating ? "fill-coral" : "fill-navy/10"}`}
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Bố cục đánh giá bất đối xứng: 1 đánh giá lớn được "ghim" nổi bật bên
 * trái (dạng trích dẫn báo chí, có dấu ngoặc kép lớn trang trí), các
 * đánh giá còn lại xếp nhỏ hơn bên phải — thay vì lưới đều nhau đơn điệu.
 */
export default function TestimonialsFeatured({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  const [featured, ...rest] = items;

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:items-stretch">
      <figure className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-navy p-8 text-ivory sm:p-10 lg:col-span-2">
        <span
          className="font-display absolute -top-6 left-4 text-[10rem] leading-none text-ivory/10"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <div className="relative">
          <Stars rating={featured.rating} />
          <blockquote className="mt-5 font-display text-xl leading-snug sm:text-2xl">
            {featured.quote}
          </blockquote>
        </div>
        <figcaption className="relative mt-8 text-sm font-semibold text-sand">
          {featured.name}
          {featured.source && (
            <span className="ml-2 text-xs font-normal uppercase tracking-wide text-sand-light/60">
              · {featured.source}
            </span>
          )}
        </figcaption>
      </figure>

      <div className="grid gap-5 sm:grid-cols-2 lg:col-span-3">
        {rest.map((t, i) => (
          <figure
            key={i}
            className="flex flex-col gap-3 rounded-2xl border border-navy/8 bg-white p-6"
          >
            <Stars rating={t.rating} />
            <blockquote className="text-sm leading-relaxed text-ink-soft">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-auto text-sm font-semibold text-navy">
              {t.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

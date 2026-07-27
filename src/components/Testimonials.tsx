import type { Testimonial } from "@/data/testimonials";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t, i) => (
        <figure
          key={i}
          className="flex flex-col gap-4 rounded-2xl border border-navy/8 bg-white p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-0.5 text-coral" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg
                  key={idx}
                  viewBox="0 0 20 20"
                  className={`h-4 w-4 ${idx < t.rating ? "fill-coral" : "fill-navy/10"}`}
                >
                  <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
                </svg>
              ))}
            </div>
            {t.source && (
              <span className="text-[11px] font-medium uppercase tracking-wide text-ink-soft/50">
                {t.source}
              </span>
            )}
          </div>
          <blockquote className="text-sm leading-relaxed text-ink-soft">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-auto text-sm font-semibold text-navy">
            {t.name}
            {t.location && (
              <span className="block text-xs font-normal text-ink-soft/70">
                {t.location}
              </span>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  /**
   * Cấp độ thẻ tiêu đề. Mỗi trang phải có ĐÚNG MỘT thẻ h1 (tiêu đề chính
   * của trang) — đây là yếu tố Google dùng để hiểu trang nói về chủ đề gì.
   * Các mục nhỏ hơn trong cùng trang dùng h2 (mặc định).
   */
  as?: "h1" | "h2";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span
        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${
          light ? "text-sand" : "text-coral-dark"
        }`}
      >
        <span
          className={`h-px w-6 ${light ? "bg-sand" : "bg-coral"}`}
          aria-hidden="true"
        />
        {eyebrow}
      </span>
      <Heading
        className={`mt-3 font-display text-3xl leading-tight sm:text-4xl ${
          light ? "text-ivory" : "text-navy"
        }`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-sand-light/90" : "text-ink-soft"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

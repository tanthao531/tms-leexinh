interface WaveDividerProps {
  /** Màu của phần "nước" phía dưới đường sóng */
  fill?: string;
  flip?: boolean;
  className?: string;
}

/**
 * Đường "thuỷ triều" — yếu tố hình ảnh xuyên suốt của site, tượng trưng
 * cho ranh giới đất liền/biển của Quy Nhơn. Dùng để phân tách các section
 * thay vì đường thẳng thông thường.
 */
export default function WaveDivider({
  fill = "var(--color-ivory)",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full ${flip ? "rotate-180" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="h-10 w-full sm:h-14"
      >
        <path
          d="M0 30 Q 180 0 360 30 T 720 30 T 1080 30 T 1440 30 V60 H0 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

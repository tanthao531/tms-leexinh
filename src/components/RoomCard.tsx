import Link from "next/link";
import type { RoomType } from "@/data/rooms";
import PlaceholderImage from "./PlaceholderImage";

export default function RoomCard({
  room,
  featured = false,
}: {
  room: RoomType;
  /** Hiển thị dạng nổi bật: ảnh to hơn, hiện đủ mô tả và danh sách tiện nghi */
  featured?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative">
        <PlaceholderImage
          path={`/images/can-ho/${room.slug}/${room.imageSlots[0]}`}
          label={`Ảnh đại diện — ${room.name}`}
          ratio={featured ? "wide" : "video"}
          className="rounded-none rounded-t-3xl border-0"
        />
        {room.highlight && (
          <span className="absolute left-4 top-4 rounded-full bg-coral px-3 py-1 text-xs font-semibold text-white shadow">
            {room.highlight}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col gap-3 ${featured ? "p-7 sm:p-8" : "p-6"}`}>
        <h3 className={`font-display text-navy ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {room.name}
        </h3>
        <p className={`leading-relaxed text-ink-soft ${featured ? "text-base" : "text-sm"}`}>
          {featured ? room.description : room.shortDescription}
        </p>

        <ul className="mt-1 flex flex-wrap gap-2 text-xs text-teal">
          <li className="rounded-full bg-sand-light px-3 py-1">{room.area}</li>
          <li className="rounded-full bg-sand-light px-3 py-1">{room.capacity}</li>
          <li className="rounded-full bg-sand-light px-3 py-1">{room.view}</li>
        </ul>

        {featured && (
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-ink-soft">
            {room.amenities.slice(0, 4).map((a) => (
              <li key={a} className="flex items-center gap-1.5">
                <span className="h-1 w-1 shrink-0 rounded-full bg-coral" />
                {a}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <Link
            href={`/can-ho/${room.slug}`}
            className="text-sm font-semibold text-navy underline decoration-coral decoration-2 underline-offset-4 group-hover:text-coral-dark"
          >
            Xem chi tiết →
          </Link>
        </div>
      </div>
    </article>
  );
}

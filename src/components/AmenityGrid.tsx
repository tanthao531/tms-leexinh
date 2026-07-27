import type { Amenity } from "@/data/amenities";

const icons: Record<Amenity["icon"], React.ReactNode> = {
  pool: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 16.5c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0M4.5 12V6.75A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25V12"
    />
  ),
  gym: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 6.75v10.5M17.25 6.75v10.5M3.75 9.75v4.5M20.25 9.75v4.5M6.75 12h10.5"
    />
  ),
  restaurant: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 3v6.75a2.25 2.25 0 002.25 2.25v9M8.25 3a2.25 2.25 0 00-2.25 2.25V9M8.25 3a2.25 2.25 0 012.25 2.25V9m6-6v18m3-18a3 3 0 013 3v3a3 3 0 01-3 3"
    />
  ),
  spa: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3c1.5 2 2.25 3.75 2.25 5.6a2.25 2.25 0 11-4.5 0C9.75 6.75 10.5 5 12 3zM6 12c1.5 1.5 2.25 3 2.25 4.35a2.25 2.25 0 01-4.5 0C3.75 15 4.5 13.5 6 12zM18 12c1.5 1.5 2.25 3 2.25 4.35a2.25 2.25 0 01-4.5 0c0-1.35.75-2.85 2.25-4.35z"
    />
  ),
  reception: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 21h18M4.5 21V9.75L12 4.5l7.5 5.25V21M9 21v-5.25h6V21"
    />
  ),
  parking: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 21V3h6a4.5 4.5 0 010 9H6"
    />
  ),
  wifi: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 15.75a5.25 5.25 0 017.5 0M4.5 12a10.5 10.5 0 0115 0M12 19.5h.01"
    />
  ),
  security: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3l7.5 3v5.25c0 4.72-3.15 8.66-7.5 9.75-4.35-1.09-7.5-5.03-7.5-9.75V6L12 3z"
    />
  ),
  skybar: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 6.75h13.5L12 15v6m-3 0h6M9 15L5.25 9.75"
    />
  ),
  laundry: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 4.5h15a1 1 0 011 1v13a1 1 0 01-1 1h-15a1 1 0 01-1-1v-13a1 1 0 011-1zM7 6.75h.01M9.5 6.75h.01M12 15a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
    />
  ),
};

export default function AmenityGrid({ items }: { items: Amenity[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a) => (
        <div
          key={a.name}
          className="flex gap-4 rounded-2xl border border-navy/8 bg-white p-5"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
            <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" fill="none" stroke="currentColor" strokeWidth={1.6}>
              {icons[a.icon]}
            </svg>
          </div>
          <div>
            <h3 className="font-display text-lg text-navy">{a.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{a.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const ITEMS = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
  "Book by the Hour",
  "Verified Hosts",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-base-300 bg-neutral py-4 text-neutral-content">
      <div className="marquee-run">
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-6 text-sm font-semibold uppercase tracking-widest"
          >
            {t}
            <span className="text-primary">&#9679;</span>
          </span>
        ))}
      </div>
    </div>
  );
}


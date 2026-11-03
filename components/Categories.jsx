import Link from "next/link";
import { FaCamera, FaFilm, FaMicrophone, FaMusic, FaPaintBrush } from "react-icons/fa";
import { CATEGORIES } from "../lib/constants";

const ICONS = {
  "photo-studio": FaCamera,
  "film-stage": FaFilm,
  "podcast-lounge": FaMicrophone,
  "music-suite": FaMusic,
  workshop: FaPaintBrush,
};

const BLURBS = {
  "photo-studio": "Cyc walls, strobes and clean white backdrops.",
  "film-stage": "Soundproofed stages ready for cinema crews.",
  "podcast-lounge": "Cosy rooms with mics and acoustic treatment.",
  "music-suite": "Recording suites with pro monitors and booths.",
  workshop: "Open creative spaces for art and making.",
};

export default function Categories() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {CATEGORIES.map((c) => {
        const Icon = ICONS[c.value];
        return (
          <Link
            key={c.value}
            href={`/studios?category=${c.value}`}
            className="card h-full border border-base-300 bg-base-100 p-6 text-center transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-primary-content">
              <Icon />
            </div>
            <h3 className="mt-4 text-lg font-bold">{c.homeLabel}</h3>
            <p className="mt-2 text-sm text-base-content/70">{BLURBS[c.value]}</p>
          </Link>
        );
      })}
    </div>
  );
}
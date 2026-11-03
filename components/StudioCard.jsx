import Link from "next/link";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const LABELS = {
  "photo-studio": "Photo Studio",
  "film-stage": "Film Stage",
  "podcast-lounge": "Podcast Lounge",
  "music-suite": "Music Suite",
  workshop: "Workshop",
};

export default function StudioCard({ studio }) {
  return (
    <div className="card h-full overflow-hidden border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-lg">
      <figure className="relative h-52 w-full shrink-0 bg-base-200">
        <img
          src={studio.image}
          alt={studio.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="badge badge-primary absolute left-3 top-3">
          {LABELS[studio.category] || studio.category}
        </span>
        <span className="badge badge-neutral absolute right-3 top-3 gap-1">
          <FaStar />
          {studio.rating ? Number(studio.rating).toFixed(1) : "New"}
        </span>
      </figure>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold">{studio.title}</h3>
        <p className="mt-1 flex items-center gap-2 text-sm text-base-content/70">
          <FaMapMarkerAlt className="shrink-0" />
          <span className="line-clamp-1">{studio.location}</span>
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-lg font-bold">
            ${studio.hourlyRate}
            <span className="text-sm font-normal text-base-content/60"> / hr</span>
          </p>
          <Link href={`/studios/${studio._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
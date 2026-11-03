"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import StudioCard from "./StudioCard";
import StudioCardSkeleton from "./StudioCardSkeleton";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState(null);

  useEffect(() => {
    fetch("/api/studios/featured")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(setStudios)
      .catch(() => {
        setStudios([]);
        toast.error("Could not load featured studios. Please try again.");
      });
  }, []);

  if (studios === null) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <StudioCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (studios.length === 0) {
    return (
      <div className="rounded-box border border-dashed border-base-300 p-12 text-center">
        <h3 className="text-xl font-bold">No studios listed yet</h3>
        <p className="mt-2 text-base-content/70">
          Be the first host to list a creative space on StudioSpace.
        </p>
        <Link href="/add-studio" className="btn btn-primary mt-6">
          Host Your Space
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((s) => (
          <StudioCard key={s._id} studio={s} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/studios" className="btn btn-primary">
          Explore All Studios
        </Link>
      </div>
    </>
  );
}
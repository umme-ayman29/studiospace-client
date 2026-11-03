"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar, FaMapMarkerAlt, FaUsers, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { categoryLabel } from "../lib/constants";
import BookingModal from "./BookingModal";
import ReviewSection from "./ReviewSection";

export default function StudioDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [studio, setStudio] = useState(null);
  const [state, setState] = useState("loading");
  const [bookingOpen, setBookingOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/studios/${id}`);
      if (res.status === 404 || res.status === 400) {
        setState("missing");
        return;
      }
      if (!res.ok) throw new Error("Request failed");
      setStudio(await res.json());
      setState("ready");
    } catch {
      setState("error");
      toast.error("Could not load this studio. Please try again.");
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleBook = () => {
    if (authLoading) return;
    if (!user) {
      toast.info("Please log in to book this studio");
      router.push(`/login?redirect=/studios/${id}`);
      return;
    }
    if (user.email === studio.ownerEmail) {
      toast.error("You cannot book your own studio");
      return;
    }
    setBookingOpen(true);
  };

  if (state === "loading") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="skeleton h-96 w-full" />
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="skeleton h-8 w-2/3" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
          </div>
          <div className="skeleton h-56 w-full" />
        </div>
      </div>
    );
  }

  if (state !== "ready") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">
          {state === "missing" ? "Studio not found" : "Something went wrong"}
        </h1>
        <p className="mt-3 text-base-content/70">
          {state === "missing"
            ? "This studio may have been removed by its host."
            : "We could not load this studio right now."}
        </p>
        <Link href="/studios" className="btn btn-primary mt-6">
          Back to Studios
        </Link>
      </div>
    );
  }

  const images = studio.images?.length ? studio.images : [studio.image];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="mb-8 h-72 w-full overflow-hidden rounded-box bg-base-200 md:h-[28rem]"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <img src={src} alt={`${studio.title} photo ${i + 1}`} className="h-full w-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <div>
            <span className="badge badge-primary">{categoryLabel(studio.category)}</span>
            <h1 className="mt-3 text-3xl font-bold md:text-4xl">{studio.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-base-content/80">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt /> {studio.location}
              </span>
              <span className="flex items-center gap-2">
                <FaUsers /> Up to {studio.maxCapacity} people
              </span>
              <span className="flex items-center gap-2">
                <FaStar className="text-warning" />
                {studio.rating ? Number(studio.rating).toFixed(1) : "New"} ({studio.reviewCount || 0})
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Overview</h2>
            <p className="mt-3 leading-relaxed text-base-content/80">{studio.overview}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Amenities</h2>
            {studio.amenities?.length ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {studio.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary" /> {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-base-content/70">The host has not listed any amenities yet.</p>
            )}
          </div>

          <ReviewSection studioId={studio._id} reviews={studio.reviews || []} onAdded={load} />
        </div>

        <aside className="lg:col-span-1">
          <div className="card sticky top-24 border border-base-300 bg-base-100 p-6 shadow-sm">
            <p className="text-3xl font-bold">
              ${studio.hourlyRate}
              <span className="text-base font-normal text-base-content/60"> / hr</span>
            </p>
            <p className="mt-1 text-sm text-base-content/70">
              Security deposit: ${studio.securityDeposit || 0}
            </p>
            <button onClick={handleBook} className="btn btn-primary mt-5 w-full">
              Book Workspace Now
            </button>

            <div className="divider" />
            <p className="eyebrow mb-2">Hosted by</p>
            <p className="font-bold">{studio.ownerName}</p>
            <p className="text-sm text-base-content/70">{studio.ownerEmail}</p>
          </div>
        </aside>
      </div>

      <BookingModal studio={studio} open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
}
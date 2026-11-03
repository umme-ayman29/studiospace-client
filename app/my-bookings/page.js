"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import PrivateRoute from "../../components/PrivateRoute";
import SectionHeading from "../../components/SectionHeading";
import StatusBadge from "../../components/StatusBadge";

function Bookings() {
  const [bookings, setBookings] = useState(null);
  const [toCancel, setToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    fetch("/api/bookings/mine")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(setBookings)
      .catch(() => {
        setBookings([]);
        toast.error("Could not load your bookings");
      });
  }, []);

  const confirmCancel = async () => {
    setCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${toCancel._id}/cancel`, { method: "PATCH" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.message || "Could not cancel the booking");
        return;
      }
      setBookings((list) =>
        list.map((b) => (b._id === toCancel._id ? { ...b, status: "Cancelled" } : b))
      );
      toast.success("Booking cancelled");
      setToCancel(null);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  if (bookings === null) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-24 w-full" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-box border border-dashed border-base-300 p-12 text-center">
        <h3 className="text-xl font-bold">No bookings yet</h3>
        <p className="mt-2 text-base-content/70">Find a studio you love and reserve your first slot.</p>
        <Link href="/studios" className="btn btn-primary mt-6">Explore Studios</Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {bookings.map((b) => (
          <div key={b._id} className="card border border-base-300 bg-base-100 p-4 md:flex-row md:items-center">
            <img src={b.studioImage} alt={b.studioTitle} className="h-28 w-full rounded-lg object-cover md:w-44" />
            <div className="flex-1 md:px-4">
              <Link href={`/studios/${b.studioId}`} className="text-lg font-bold hover:underline">
                {b.studioTitle}
              </Link>
              <p className="text-sm text-base-content/70">{b.studioLocation}</p>
              <p className="mt-2 text-sm">
                {b.date} &middot; {b.startTime} - {b.endTime} ({b.hours} {b.hours === 1 ? "hr" : "hrs"})
              </p>
              <p className="text-sm font-semibold">Total: ${b.totalPrice}</p>
            </div>
            <div className="mt-3 flex items-center gap-3 md:mt-0 md:flex-col md:items-end">
              <StatusBadge status={b.status} />
              {b.status === "Pending" && (
                <button onClick={() => setToCancel(b)} className="btn btn-outline btn-error btn-sm">
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {toCancel && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="text-xl font-bold">Cancel this booking?</h3>
            <p className="mt-3 text-base-content/80">
              Your pending request for <span className="font-semibold">{toCancel.studioTitle}</span> on {toCancel.date} will be cancelled.
            </p>
            <div className="modal-action">
              <button onClick={() => setToCancel(null)} className="btn btn-ghost" disabled={cancelling}>Keep Booking</button>
              <button onClick={confirmCancel} className="btn btn-error" disabled={cancelling}>
                {cancelling ? <span className="loading loading-spinner loading-sm" /> : "Yes, Cancel"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={cancelling ? undefined : () => setToCancel(null)} />
        </div>
      )}
    </>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <main className="mx-auto max-w-5xl px-4 py-12">
        <SectionHeading eyebrow="Call Sheet" title="My Bookings" subtitle="Track every reservation and its current status." />
        <Bookings />
      </main>
    </PrivateRoute>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import PrivateRoute from "../../components/PrivateRoute";
import SectionHeading from "../../components/SectionHeading";
import StatusBadge from "../../components/StatusBadge";

function Requests() {
  const [items, setItems] = useState(null);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    fetch("/api/bookings/requests")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(setItems)
      .catch(() => {
        setItems([]);
        toast.error("Could not load booking requests");
      });
  }, []);

  const act = async (b, action, nextStatus, okMsg) => {
    setBusyId(b._id);
    try {
      const res = await fetch(`/api/bookings/${b._id}/${action}`, { method: "PATCH" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.message || "Action failed");
        return;
      }
      setItems((list) => list.map((x) => (x._id === b._id ? { ...x, status: nextStatus } : x)));
      toast.success(okMsg);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setBusyId(null);
    }
  };

  if (items === null) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-24 w-full" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-box border border-dashed border-base-300 p-12 text-center">
        <h3 className="text-xl font-bold">No booking requests yet</h3>
        <p className="mt-2 text-base-content/70">When creators book your studios, their requests will appear here.</p>
        <Link href="/my-listings" className="btn btn-primary mt-6">View My Listings</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((b) => (
        <div key={b._id} className="card border border-base-300 bg-base-100 p-4 md:flex-row md:items-center">
          <div className="flex-1">
            <p className="text-lg font-bold">{b.studioTitle}</p>
            <p className="text-sm text-base-content/70">Requested by {b.userName} ({b.userEmail})</p>
            <p className="mt-2 text-sm">
              {b.date} &middot; {b.startTime} - {b.endTime} ({b.hours} {b.hours === 1 ? "hr" : "hrs"})
            </p>
            <p className="text-sm font-semibold">Total: ${b.totalPrice}</p>
          </div>
          <div className="mt-3 flex items-center gap-3 md:mt-0">
            <StatusBadge status={b.status} />
            {b.status === "Pending" && (
              <button
                onClick={() => act(b, "confirm", "Confirmed", "Booking confirmed")}
                className="btn btn-primary btn-sm"
                disabled={busyId === b._id}
              >
                {busyId === b._id ? <span className="loading loading-spinner loading-xs" /> : "Confirm"}
              </button>
            )}
            {b.status === "Confirmed" && (
              <button
                onClick={() => act(b, "complete", "Completed", "Booking marked as completed")}
                className="btn btn-primary btn-sm"
                disabled={busyId === b._id}
              >
                {busyId === b._id ? <span className="loading loading-spinner loading-xs" /> : "Mark Completed"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BookingRequestsPage() {
  return (
    <PrivateRoute>
      <main className="mx-auto max-w-5xl px-4 py-12">
        <SectionHeading eyebrow="Host Desk" title="Booking Requests" subtitle="Confirm incoming requests and mark finished sessions as completed." />
        <Requests />
      </main>
    </PrivateRoute>
  );
}

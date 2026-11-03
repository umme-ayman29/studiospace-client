"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const toMin = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const todayStr = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
};

export default function BookingModal({ studio, open, onClose }) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const validTimes = startTime && endTime && toMin(endTime) > toMin(startTime);
  const hours = validTimes ? (toMin(endTime) - toMin(startTime)) / 60 : 0;
  const total = hours * studio.hourlyRate;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!date) return setError("Please choose a booking date");
    if (!validTimes) return setError("End time must be after start time");

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studioId: studio._id, date, startTime, endTime }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        toast.error("Please log in to book a studio");
        router.push(`/login?redirect=/studios/${studio._id}`);
        return;
      }
      if (!res.ok) {
        const msg = data.message || "Booking failed. Please try again.";
        setError(msg);
        toast.error(msg);
        return;
      }
      toast.success("Booking request sent! Status: Pending");
      onClose();
      router.push("/my-bookings");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <h3 className="text-xl font-bold">Book {studio.title}</h3>
        <p className="mt-1 text-sm text-base-content/70">
          Choose your date and shoot hours. The host will confirm your request.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="form-control w-full">
            <span className="mb-1 block text-sm font-semibold">Date</span>
            <input
              type="date"
              min={todayStr()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="form-control w-full">
              <span className="mb-1 block text-sm font-semibold">Start time</span>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full">
              <span className="mb-1 block text-sm font-semibold">End time</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <div className="rounded-box bg-base-200 p-4 text-sm">
            <div className="flex justify-between">
              <span>
                ${studio.hourlyRate} x {hours} {hours === 1 ? "hour" : "hours"}
              </span>
              <span className="font-bold">${total}</span>
            </div>
            <div className="mt-1 flex justify-between text-base-content/70">
              <span>Refundable security deposit</span>
              <span>${studio.securityDeposit || 0}</span>
            </div>
          </div>

          {error && (
            <p className="rounded-box border border-error/40 bg-error/10 p-3 text-sm text-error">
              {error}
            </p>
          )}

          <div className="modal-action mt-2">
            <button type="button" onClick={onClose} className="btn btn-ghost" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? <span className="loading loading-spinner loading-sm" /> : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={submitting ? undefined : onClose} />
    </div>
  );
}
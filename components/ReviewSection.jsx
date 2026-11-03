"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function ReviewSection({ studioId, reviews, onAdded }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Please write a short comment");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/studios/${studioId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment: comment.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.message || "Could not post your review");
        return;
      }
      toast.success("Thanks for your review!");
      setComment("");
      setRating(5);
      onAdded();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mt-4 rounded-box border border-base-300 p-5">
          <p className="mb-2 text-sm font-semibold">Your rating</p>
          <div className="mb-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                className={`text-2xl ${n <= rating ? "text-warning" : "text-base-300"}`}
              >
                <FaStar />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Share your experience with this studio"
            className="textarea textarea-bordered w-full"
          />
          <button type="submit" className="btn btn-primary mt-3" disabled={submitting}>
            {submitting ? <span className="loading loading-spinner loading-sm" /> : "Post Review"}
          </button>
        </form>
      ) : (
        <p className="mt-4 rounded-box border border-dashed border-base-300 p-5 text-sm">
          <Link href={`/login?redirect=/studios/${studioId}`} className="link link-primary font-semibold">
            Log in
          </Link>{" "}
          to leave a review.
        </p>
      )}

      {reviews.length === 0 ? (
        <p className="mt-6 text-base-content/70">No reviews yet. Be the first to share your experience.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="rounded-box border border-base-300 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 font-semibold">
                  <FaUserCircle className="text-xl opacity-60" />
                  {r.userName}
                </p>
                <p className="flex items-center gap-1 text-warning">
                  <FaStar /> <span className="text-base-content">{r.rating}</span>
                </p>
              </div>
              <p className="mt-2 text-base-content/80">{r.comment}</p>
              <p className="mt-2 text-xs text-base-content/50">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FaEdit, FaTrash } from "react-icons/fa";
import PrivateRoute from "../../components/PrivateRoute";
import SectionHeading from "../../components/SectionHeading";
import { categoryLabel } from "../../lib/constants";

function Listings() {
  const [studios, setStudios] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/studios/mine")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(setStudios)
      .catch(() => {
        setStudios([]);
        toast.error("Could not load your listings");
      });
  }, []);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/studios/${toDelete._id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.message || "Could not delete the studio");
        return;
      }
      setStudios((list) => list.filter((s) => s._id !== toDelete._id));
      toast.success("Studio deleted");
      setToDelete(null);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (studios === null) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-20 w-full" />
        ))}
      </div>
    );
  }

  if (studios.length === 0) {
    return (
      <div className="rounded-box border border-dashed border-base-300 p-12 text-center">
        <h3 className="text-xl font-bold">You have not listed any studios yet</h3>
        <p className="mt-2 text-base-content/70">Add your first creative space and start receiving bookings.</p>
        <Link href="/add-studio" className="btn btn-primary mt-6">Add New Studio</Link>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-300">
        <table className="table">
          <thead>
            <tr>
              <th>Studio</th>
              <th>Category</th>
              <th>Rate</th>
              <th>Rating</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studios.map((s) => (
              <tr key={s._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={s.image} alt={s.title} className="h-14 w-20 rounded-lg object-cover" />
                    <div>
                      <Link href={`/studios/${s._id}`} className="font-bold hover:underline">{s.title}</Link>
                      <p className="text-sm text-base-content/70">{s.location}</p>
                    </div>
                  </div>
                </td>
                <td>{categoryLabel(s.category)}</td>
                <td>${s.hourlyRate} / hr</td>
                <td>{s.rating ? Number(s.rating).toFixed(1) : "New"}</td>
                <td>
                  <div className="flex justify-end gap-2">
                    <Link href={`/studios/edit/${s._id}`} className="btn btn-primary btn-sm gap-2">
                      <FaEdit /> Update
                    </Link>
                    <button onClick={() => setToDelete(s)} className="btn btn-outline btn-error btn-sm gap-2">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toDelete && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="text-xl font-bold">Delete this studio?</h3>
            <p className="mt-3 text-base-content/80">
              <span className="font-semibold">{toDelete.title}</span> will be removed permanently. This action cannot be undone.
            </p>
            <div className="modal-action">
              <button onClick={() => setToDelete(null)} className="btn btn-ghost" disabled={deleting}>Cancel</button>
              <button onClick={confirmDelete} className="btn btn-error" disabled={deleting}>
                {deleting ? <span className="loading loading-spinner loading-sm" /> : "Yes, Delete"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={deleting ? undefined : () => setToDelete(null)} />
        </div>
      )}
    </>
  );
}

export default function MyListingsPage() {
  return (
    <PrivateRoute>
      <main className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="Your Lot" title="My Studio Listings" subtitle="Update details or remove spaces you have listed." />
        <Listings />
      </main>
    </PrivateRoute>
  );
}
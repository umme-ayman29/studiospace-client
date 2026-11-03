"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PrivateRoute from "../../components/PrivateRoute";
import SectionHeading from "../../components/SectionHeading";
import StudioForm from "../../components/StudioForm";
import { useAuth } from "../../context/AuthContext";

export default function AddStudioPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/studios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.message || "Could not add the studio");
        return;
      }
      toast.success("Studio added successfully");
      router.push("/my-listings");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PrivateRoute>
      <main className="mx-auto max-w-3xl px-4 py-12">
        <SectionHeading eyebrow="New Set" title="Add New Studio" subtitle="List your creative space for creators to discover and book." />
        <StudioForm user={user} submitLabel="Add Studio" submitting={submitting} onSubmit={handleSubmit} />
      </main>
    </PrivateRoute>
  );
}

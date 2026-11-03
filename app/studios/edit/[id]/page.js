"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import PrivateRoute from "../../../../components/PrivateRoute";
import SectionHeading from "../../../../components/SectionHeading";
import StudioForm from "../../../../components/StudioForm";
import { useAuth } from "../../../../context/AuthContext";

function EditStudio() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [studio, setStudio] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/studios/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        if (user && data.ownerEmail !== user.email) {
          toast.error("You can only edit your own studios");
          router.replace("/my-listings");
          return;
        }
        setStudio(data);
      })
      .catch(() => {
        toast.error("Studio not found");
        router.replace("/my-listings");
      });
  }, [id, user, router]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/studios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.message || "Could not update the studio");
        return;
      }
      toast.success("Studio updated successfully");
      router.push("/my-listings");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!studio) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return <StudioForm user={user} initial={studio} submitLabel="Save Changes" submitting={submitting} onSubmit={handleSubmit} />;
}

export default function EditStudioPage() {
  return (
    <PrivateRoute>
      <main className="mx-auto max-w-3xl px-4 py-12">
        <SectionHeading eyebrow="Re-shoot" title="Update Studio" subtitle="Edit your listing details and save your changes." />
        <EditStudio />
      </main>
    </PrivateRoute>
  );
}
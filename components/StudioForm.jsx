"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CATEGORIES } from "../lib/constants";
import { uploadToImgbb } from "../lib/imgbb";

const SUGGESTED = [
  "Free WiFi",
  "Air conditioning",
  "Softboxes",
  "Green screen",
  "Power backup",
  "Parking",
  "Makeup station",
  "Soundproofing",
];

export default function StudioForm({ user, initial, submitLabel, submitting, onSubmit }) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    category: initial?.category || CATEGORIES[0].value,
    hourlyRate: initial?.hourlyRate ?? "",
    securityDeposit: initial?.securityDeposit ?? "",
    maxCapacity: initial?.maxCapacity ?? "",
    location: initial?.location || "",
    image: initial?.image || "",
    overview: initial?.overview || "",
  });
  const [amenities, setAmenities] = useState(initial?.amenities || []);
  const [tag, setTag] = useState("");
  const [uploading, setUploading] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const addTag = (value) => {
    const v = value.trim();
    if (!v) return;
    if (amenities.some((a) => a.toLowerCase() === v.toLowerCase())) return;
    setAmenities((a) => [...a, v]);
  };

  const handleTagKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(tag);
      setTag("");
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setForm((f) => ({ ...f, image: url }));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Image upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Please enter a studio title");
    if (!form.hourlyRate || Number(form.hourlyRate) <= 0)
      return toast.error("Hourly rate must be greater than 0");
    if (!form.maxCapacity || Number(form.maxCapacity) < 1)
      return toast.error("Max capacity must be at least 1");
    if (!form.location.trim()) return toast.error("Please enter the location");
    if (!form.image.trim()) return toast.error("Please upload or paste an image URL");
    if (form.overview.trim().length < 20)
      return toast.error("Overview should be at least 20 characters");

    onSubmit({
      title: form.title.trim(),
      category: form.category,
      hourlyRate: Number(form.hourlyRate),
      securityDeposit: Number(form.securityDeposit) || 0,
      maxCapacity: Number(form.maxCapacity),
      location: form.location.trim(),
      image: form.image.trim(),
      amenities,
      overview: form.overview.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-semibold">Studio title</span>
          <input value={form.title} onChange={set("title")} className="input input-bordered w-full" placeholder="e.g. Aperture White Cyc Wall Studio" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Category</span>
          <select value={form.category} onChange={set("category")} className="select select-bordered w-full">
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Location / address</span>
          <input value={form.location} onChange={set("location")} className="input input-bordered w-full" placeholder="e.g. Gulshan, Dhaka" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Hourly rate ($)</span>
          <input type="number" min="1" value={form.hourlyRate} onChange={set("hourlyRate")} className="input input-bordered w-full" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Security deposit ($)</span>
          <input type="number" min="0" value={form.securityDeposit} onChange={set("securityDeposit")} className="input input-bordered w-full" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Max capacity (people)</span>
          <input type="number" min="1" value={form.maxCapacity} onChange={set("maxCapacity")} className="input input-bordered w-full" />
        </label>
      </div>

      <div>
        <span className="mb-1 block text-sm font-semibold">Studio image</span>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="file-input file-input-bordered w-full md:w-1/2" />
          <input value={form.image} onChange={set("image")} className="input input-bordered w-full md:w-1/2" placeholder="or paste an image URL" />
        </div>
        {uploading && (
          <p className="mt-2 flex items-center gap-2 text-sm">
            <span className="loading loading-spinner loading-xs" /> Uploading image...
          </p>
        )}
        {form.image && (
          <img src={form.image} alt="Studio preview" className="mt-3 h-40 w-64 rounded-box border border-base-300 object-cover" />
        )}
      </div>

      <div>
        <span className="mb-1 block text-sm font-semibold">Amenities</span>
        <div className="mb-3 flex flex-wrap gap-2">
          {amenities.map((a) => (
            <span key={a} className="badge badge-primary gap-2 py-3">
              {a}
              <button type="button" onClick={() => setAmenities((l) => l.filter((x) => x !== a))} aria-label={`Remove ${a}`}>
                x
              </button>
            </span>
          ))}
          {amenities.length === 0 && (
            <span className="text-sm text-base-content/60">No amenities added yet</span>
          )}
        </div>
        <input value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={handleTagKey} className="input input-bordered w-full" placeholder="Type an amenity and press Enter" />
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED.filter((s) => !amenities.includes(s)).map((s) => (
            <button type="button" key={s} onClick={() => addTag(s)} className="btn btn-outline btn-xs">
              + {s}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-semibold">Detailed overview</span>
        <textarea value={form.overview} onChange={set("overview")} rows={5} className="textarea textarea-bordered w-full" placeholder="Describe the space, equipment and what makes it special" />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Host name</span>
          <input value={user?.name || ""} readOnly className="input input-bordered w-full opacity-70" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Host email</span>
          <input value={user?.email || ""} readOnly className="input input-bordered w-full opacity-70" />
        </label>
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting || uploading}>
        {submitting ? <span className="loading loading-spinner loading-sm" /> : submitLabel}
      </button>
    </form>
  );
}
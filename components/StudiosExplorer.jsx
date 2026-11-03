"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FaSearch } from "react-icons/fa";
import StudioCard from "./StudioCard";
import StudioCardSkeleton from "./StudioCardSkeleton";
import { CATEGORIES } from "../lib/constants";

const SORTS = [
  { value: "", label: "Newest first" },
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export default function StudiosExplorer() {
  const router = useRouter();
  const params = useSearchParams();

  const category = params.get("category") || "all";
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";

  const [searchInput, setSearchInput] = useState(search);
  const [studios, setStudios] = useState(null);

  const updateParams = (key, value) => {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "all") next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `/studios?${qs}` : "/studios", { scroll: false });
  };

  useEffect(() => {
    if (searchInput === search) return;
    const t = setTimeout(() => updateParams("search", searchInput.trim()), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    setStudios(null);
    const qs = new URLSearchParams();
    if (category !== "all") qs.set("category", category);
    if (search) qs.set("search", search);
    if (sort) qs.set("sort", sort);

    fetch(`/api/studios?${qs.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setStudios(data);
      })
      .catch(() => {
        if (!cancelled) {
          setStudios([]);
          toast.error("Could not load studios. Please try again.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [category, search, sort]);

  const clearAll = () => {
    setSearchInput("");
    router.replace("/studios", { scroll: false });
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="input input-bordered flex w-full items-center gap-3 lg:max-w-md">
          <FaSearch className="opacity-60" />
          <input
            type="text"
            className="grow"
            placeholder="Search by studio name or location"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </label>
        <select
          className="select select-bordered w-full lg:w-60"
          value={sort}
          onChange={(e) => updateParams("sort", e.target.value)}
          aria-label="Sort studios"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        <button
          onClick={() => updateParams("category", "all")}
          className={`btn btn-sm ${category === "all" ? "btn-primary" : "btn-outline"}`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => updateParams("category", c.value)}
            className={`btn btn-sm ${category === c.value ? "btn-primary" : "btn-outline"}`}
          >
            {c.homeLabel}
          </button>
        ))}
      </div>

      {studios === null ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <StudioCardSkeleton key={i} />
          ))}
        </div>
      ) : studios.length === 0 ? (
        <div className="rounded-box border border-dashed border-base-300 p-12 text-center">
          <h3 className="text-xl font-bold">No studios match your search</h3>
          <p className="mt-2 text-base-content/70">
            Try a different keyword or category, or list your own space for others to find.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={clearAll} className="btn btn-primary">
              Clear Filters
            </button>
            <Link href="/add-studio" className="btn btn-outline">
              Host Your Space
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-base-content/70">
            Showing {studios.length} {studios.length === 1 ? "studio" : "studios"}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((s) => (
              <StudioCard key={s._id} studio={s} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
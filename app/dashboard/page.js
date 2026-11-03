"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PrivateRoute from "../../components/PrivateRoute";
import SectionHeading from "../../components/SectionHeading";
import { useAuth } from "../../context/AuthContext";

const getJson = (url) =>
  fetch(url)
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);

function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([
      getJson("/api/studios/mine"),
      getJson("/api/bookings/mine"),
      getJson("/api/bookings/requests"),
    ]).then(([studios, bookings, requests]) =>
      setStats({
        listings: studios.length,
        bookings: bookings.length,
        pending: requests.filter((r) => r.status === "Pending").length,
      })
    );
  }, []);

  const cards = [
    { label: "My Listings", value: stats?.listings, href: "/my-listings", cta: "Manage listings" },
    { label: "My Bookings", value: stats?.bookings, href: "/my-bookings", cta: "View bookings" },
    { label: "Pending Requests", value: stats?.pending, href: "/booking-requests", cta: "Review requests" },
  ];

  return (
    <>
      <p className="mb-8 text-center text-lg">
        Welcome back, <span className="font-bold">{user?.name}</span>
      </p>
      <div className="grid gap-6 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="card h-full border border-base-300 bg-base-100 p-6 text-center">
            <p className="eyebrow">{c.label}</p>
            {stats ? (
              <p className="mt-2 text-5xl font-bold">{c.value}</p>
            ) : (
              <div className="skeleton mx-auto mt-3 h-12 w-16" />
            )}
            <Link href={c.href} className="btn btn-primary btn-sm mt-5">{c.cta}</Link>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/add-studio" className="btn btn-primary">Add New Studio</Link>
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <main className="mx-auto max-w-5xl px-4 py-12">
        <SectionHeading eyebrow="Control Room" title="Dashboard" subtitle="Everything about your listings and bookings in one place." />
        <Overview />
      </main>
    </PrivateRoute>
  );
}
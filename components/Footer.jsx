"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import Logo from "./Logo";
import { CATEGORIES } from "@/lib/constants";

export default function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e) => {
    e.preventDefault();
    toast.success("Thanks for subscribing! Fresh studio drops are on the way.");
    setEmail("");
  };

  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-base-content/70">
            Our mission is to put every creator in the right room: from cyc wall photo studios
            to cinema stages, podcast lounges and music suites, booked in minutes.
          </p>
          <div className="flex gap-3">
            {[
              { icon: FaXTwitter, href: "https://x.com", label: "X" },
              { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
              { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
              { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="btn btn-circle btn-sm btn-outline"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-base-content/70">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/studios" className="hover:text-primary">Explore Studios</Link></li>
            <li><Link href="/how-it-works" className="hover:text-primary">How It Works</Link></li>
            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Popular Categories</h3>
          <ul className="space-y-2 text-sm text-base-content/70">
            {CATEGORIES.map((c) => (
              <li key={c.value}>
                <Link href={`/studios?category=${c.value}`} className="hover:text-primary">
                  {c.homeLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
          <p className="mb-3 text-sm text-base-content/70">
            Get new studio listings and creator tips in your inbox.
          </p>
          <form onSubmit={subscribe} className="join w-full">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input join-item w-full"
            />
            <button type="submit" className="btn btn-primary join-item">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-base-300 py-5 text-center text-xs text-base-content/60">
        © 2026 StudioSpace. All rights reserved. By using this platform you agree to our Terms of
        Service and Privacy Policy.
      </div>
    </footer>
  );
}
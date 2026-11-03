"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

const userLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/add-studio", label: "Add New Studio" },
  { href: "/my-listings", label: "My Studio Listings" },
  { href: "/my-bookings", label: "My Bookings" },
];

const closeMenu = () => document.activeElement?.blur();

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const handleLogout = async () => {
    closeMenu();
    try {
      await logout();
      toast.success("You have been logged out");
      router.push("/");
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[60] mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
            >
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={closeMenu}
                    className={isActive(l.href) ? "font-semibold text-primary" : ""}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Logo />
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`border-b-2 px-3 py-2 text-sm font-medium transition ${
                isActive(l.href)
                  ? "border-primary text-primary"
                  : "border-transparent hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loading ? (
            <span className="skeleton h-10 w-10 rounded-full" />
          ) : user ? (
            <div className="dropdown dropdown-end dropdown-hover">
              <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name} referrerPolicy="no-referrer" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-primary font-semibold text-primary-content">
                      {user.name?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[60] w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
              >
                <li className="menu-title px-3 py-2 text-base-content">{user.name}</li>
                {userLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={closeMenu}>
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button onClick={handleLogout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm sm:btn-md">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm sm:btn-md">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
import Link from "next/link";

export function ApertureIcon({ className = "h-8 w-8" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M14.31 8l5.74 9.94" />
      <path d="M9.69 8h11.48" />
      <path d="M7.38 12l5.74-9.94" />
      <path d="M9.69 16L3.95 6.06" />
      <path d="M14.31 16H2.83" />
      <path d="M16.62 12l-5.74 9.94" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary">
      <ApertureIcon />
      <span className="text-2xl font-bold tracking-tight text-base-content">
        Studio<span className="text-primary">Space</span>
      </span>
    </Link>
  );
}
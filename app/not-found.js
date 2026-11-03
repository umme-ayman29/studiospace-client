import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <svg viewBox="0 0 240 180" className="h-48 w-64" aria-hidden="true">
        <rect x="30" y="70" width="180" height="90" rx="8" className="fill-neutral" />
        <rect x="30" y="40" width="180" height="30" rx="6" className="fill-primary" />
        <path d="M60 40 l20 30 M100 40 l20 30 M140 40 l20 30 M180 40 l20 30" className="stroke-neutral" strokeWidth="10" />
        <text x="120" y="125" textAnchor="middle" className="fill-neutral-content" fontSize="40" fontWeight="700">404</text>
      </svg>
      <p className="eyebrow mt-6">Scene Not Found</p>
      <h1 className="mt-2 text-3xl font-bold md:text-5xl">
        This set is empty
      </h1>
      <p className="mt-4 max-w-md opacity-70">
        The page you are looking for was cut from the final edit. Head back to the main stage and keep creating.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Return to Home
      </Link>
    </main>
  );
}
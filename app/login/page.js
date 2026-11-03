"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import GoogleButton from "@/components/GoogleButton";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Welcome back to StudioSpace!");
      const redirect = new URLSearchParams(window.location.search).get("redirect");
      const safe = redirect && redirect.startsWith("/") && !redirect.startsWith("//");
      router.replace(safe ? redirect : "/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-box border border-base-300 bg-base-100 p-8 shadow-lg">
        <h1 className="mb-1 text-3xl font-bold">Login to StudioSpace</h1>
        <p className="mb-6 text-sm text-base-content/70">
          Welcome back. Pick up where you left off.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="input w-full"
            />
            <button
              type="button"
              onClick={() => toast.info("Password reset is coming soon.")}
              className="mt-2 text-sm text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</p>
          )}

          <button type="submit" disabled={submitting} className="btn btn-primary w-full">
            {submitting ? <span className="loading loading-spinner" /> : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setEmail("test@example.com");
            setPassword("Test12");
            toast.info("Demo credentials filled in. Press Login.");
          }}
          className="btn btn-ghost btn-sm mt-3 w-full"
        >
          Use demo account
        </button>

        <div className="divider text-xs">OR</div>

        <GoogleButton />

        <p className="mt-6 text-center text-sm">
          New to StudioSpace?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
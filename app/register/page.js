"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import GoogleButton from "@/components/GoogleButton";

function validatePassword(pw) {
  if (pw.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(pw)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(pw)) return "Password must include a lowercase letter.";
  return "";
}

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (key === "password") setPasswordError(value ? validatePassword(value) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const pwError = validatePassword(form.password);
    if (pwError) {
      setPasswordError(pwError);
      toast.error(pwError);
      return;
    }
    setSubmitting(true);
    try {
      await register(form);
      toast.success("Account created! Please log in.");
      router.push("/login");
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
        <h1 className="mb-1 text-3xl font-bold">Create your account</h1>
        <p className="mb-6 text-sm text-base-content/70">
          Join StudioSpace to book or host creative studios.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              required
              value={form.name}
              onChange={update("name")}
              placeholder="Your full name"
              className="input w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={update("email")}
              placeholder="you@example.com"
              className="input w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Photo URL</label>
            <input
              type="url"
              value={form.photoURL}
              onChange={update("photoURL")}
              placeholder="https://example.com/photo.jpg"
              className="input w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={update("password")}
              placeholder="Uppercase, lowercase, 6+ characters"
              className="input w-full"
            />
            {passwordError && <p className="mt-1 text-sm text-error">{passwordError}</p>}
          </div>

          {error && (
            <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</p>
          )}

          <button type="submit" disabled={submitting} className="btn btn-primary w-full">
            {submitting ? <span className="loading loading-spinner" /> : "Register"}
          </button>
        </form>

        <div className="divider text-xs">OR</div>

        <GoogleButton />

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

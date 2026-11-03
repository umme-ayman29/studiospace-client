"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const SCRIPT_SRC = "https://accounts.google.com/gsi/client";

export default function GoogleButton() {
  const { googleLogin } = useAuth();
  const router = useRouter();
  const buttonRef = useRef(null);
  const handlerRef = useRef(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    handlerRef.current = async (response) => {
      try {
        await googleLogin(response.credential);
        toast.success("Signed in with Google");
        const redirect = new URLSearchParams(window.location.search).get("redirect");
        const safe = redirect && redirect.startsWith("/") && !redirect.startsWith("//");
        router.replace(safe ? redirect : "/");
      } catch (err) {
        toast.error(err.message || "Google sign-in failed. Please try again.");
      }
    };
  });

  useEffect(() => {
    if (!clientId) return;

    const init = () => {
      if (!window.google || !buttonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => handlerRef.current?.(response),
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        text: "continue_with",
        width: 300,
      });
    };

    if (window.google) {
      init();
      return;
    }

    let script = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", init);
    return () => script.removeEventListener("load", init);
  }, [clientId]);

  if (!clientId) {
    return (
      <p className="text-center text-sm text-error">Google sign-in is not configured yet.</p>
    );
  }

  return (
    <div className="flex justify-center">
      <div ref={buttonRef} />
    </div>
  );
}
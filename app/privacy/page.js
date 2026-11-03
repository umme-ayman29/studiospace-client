export const metadata = { title: "Privacy Policy | StudioSpace" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="eyebrow mb-3">Legal</p>
      <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>
      <p className="mb-8 opacity-70">Last updated: November 3, 2026</p>

      <div className="space-y-6 leading-relaxed">
        <section>
          <h2 className="mb-2 text-2xl font-semibold">What we collect</h2>
          <p>
            When you create an account or sign in with Google, StudioSpace stores your name,
            email address and profile photo. When you list a studio or make a booking, we store
            the details you submit, such as studio information, dates and times.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-2xl font-semibold">How we use it</h2>
          <p>
            We use your information only to run the platform: to sign you in, to show your
            listings and bookings, and to let hosts and creators coordinate sessions. We do not
            sell your personal data.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Cookies</h2>
          <p>
            We use one secure, HTTP-only cookie to keep you signed in. It is not used for
            advertising or tracking.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Google sign-in</h2>
          <p>
            If you choose Google sign-in, we receive only your name, email and profile picture
            from Google. We never see your Google password.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Contact</h2>
          <p>Questions about your data? Email us at ummeaymanatika@gmail.com.</p>
        </section>
      </div>
    </div>
  );
}
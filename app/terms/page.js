export const metadata = { title: "Terms of Service | StudioSpace" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="eyebrow mb-3">Legal</p>
      <h1 className="mb-6 text-4xl font-bold">Terms of Service</h1>
      <p className="mb-8 opacity-70">Last updated: November 3, 2026</p>

      <div className="space-y-6 leading-relaxed">
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Using StudioSpace</h2>
          <p>
            StudioSpace is a marketplace where hosts list creative studios and creators request
            to book them. By using the platform you agree to provide accurate information and
            to respect the spaces you book.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Bookings</h2>
          <p>
            A booking request starts as Pending. A booking becomes Confirmed only when the host
            accepts it. Overlapping time slots cannot be confirmed for the same studio.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Host responsibilities</h2>
          <p>
            Hosts must describe their studios honestly, keep equipment safe and honor confirmed
            bookings.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Account conduct</h2>
          <p>
            You are responsible for activity on your account. We may remove listings or accounts
            that misuse the platform.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-2xl font-semibold">Contact</h2>
          <p>Questions about these terms? Email us at ummeaymanatika@gmail.com.</p>
        </section>
      </div>
    </div>
  );
}
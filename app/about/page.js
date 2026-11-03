import Link from "next/link";
import SectionHeading from "../../components/SectionHeading";

export const metadata = { title: "About Us | StudioSpace" };

const VALUES = [
  { title: "Creators First", text: "Every feature is built to help filmmakers, photographers, podcasters and musicians find the right space quickly." },
  { title: "Fair for Hosts", text: "Studio owners set their own rates and confirm every booking, so they stay in control of their space." },
  { title: "Clear Pricing", text: "Hourly rates and security deposits are shown up front, with no hidden fees at checkout." },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading
        eyebrow="Our Story"
        title="About StudioSpace"
        subtitle="StudioSpace is a peer-to-peer marketplace that connects creators with studios, sound stages and workshops they can book by the hour."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {VALUES.map((v) => (
          <div key={v.title} className="card h-full border border-base-300 bg-base-100 p-6">
            <h3 className="text-lg font-bold">{v.title}</h3>
            <p className="mt-2 text-sm text-base-content/70">{v.text}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-2xl text-center text-base-content/80">
        Our mission is simple: make great creative spaces easy to find, fair to book and rewarding to host.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
        <Link href="/add-studio" className="btn btn-primary">Host Your Space</Link>
      </div>
    </main>
  );
}
import { FaSearch, FaRegClock, FaBolt, FaVideo } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const STEPS = [
  { icon: FaSearch, title: "Discover Spaces", text: "Search and filter studios by category, price and location." },
  { icon: FaRegClock, title: "Select Shoot Hours", text: "Pick a date and your start and end time with clear pricing." },
  { icon: FaBolt, title: "Book Instantly", text: "Send your booking request and track its status in real time." },
  { icon: FaVideo, title: "Create & Produce", text: "Show up, set up your gear and focus on making great work." },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <SectionHeading
        eyebrow="Behind the Scenes"
        title="How Booking Works"
        subtitle="From first search to final take in four simple steps."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <div
            key={s.title}
            className="card h-full border border-base-300 bg-base-100 p-6 text-center"
          >
            <p className="eyebrow mb-4">Step {i + 1}</p>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-primary-content">
              <s.icon />
            </div>
            <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-base-content/70">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
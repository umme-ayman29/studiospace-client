import { FaShieldAlt, FaUserCheck, FaTools, FaHeadset } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const ITEMS = [
  { icon: FaShieldAlt, title: "Liability Protection", text: "Every booking is backed by clear terms that protect both hosts and creators." },
  { icon: FaUserCheck, title: "Verified Profiles", text: "Hosts and creators sign in with verified accounts before they can book or list." },
  { icon: FaTools, title: "Equipment Safety", text: "Hosts list the gear and amenities up front so you know exactly what to expect." },
  { icon: FaHeadset, title: "24/7 Host Support", text: "Our support team is on hand around the clock whenever a shoot needs help." },
];

export default function HostGuarantee() {
  return (
    <section className="bg-base-200 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Our Promise"
          title="Host Guarantee & Creator Support"
          subtitle="Book and host with confidence, backed by protections built for creative work."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((s) => (
            <div
              key={s.title}
              className="card h-full border border-base-300 bg-base-100 p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-xl text-primary-content">
                <s.icon />
              </div>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-base-content/70">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
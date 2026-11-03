import Link from "next/link";
import HowItWorks from "../../components/HowItWorks";
import HostGuarantee from "../../components/HostGuarantee";

export const metadata = { title: "How It Works | StudioSpace" };

export default function HowItWorksPage() {
  return (
    <main>
      <HowItWorks />
      <HostGuarantee />
      <div className="py-16 text-center">
        <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
      </div>
    </main>
  );
}
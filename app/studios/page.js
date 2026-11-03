import { Suspense } from "react";
import SectionHeading from "../../components/SectionHeading";
import StudiosExplorer from "../../components/StudiosExplorer";
import StudioCardSkeleton from "../../components/StudioCardSkeleton";

export const metadata = { title: "Explore Studios | StudioSpace" };

export default function StudiosPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading
        eyebrow="The Lot"
        title="Explore Studios"
        subtitle="Search, filter and compare creative spaces ready to book by the hour."
      />
      <Suspense
        fallback={
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <StudioCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <StudiosExplorer />
      </Suspense>
    </main>
  );
}
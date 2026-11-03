import HeroSlider from "../components/HeroSlider";
import FeaturedStudios from "../components/FeaturedStudios";
import Categories from "../components/Categories";
import SectionHeading from "../components/SectionHeading";

export default function Home() {
  return (
    <main>
      <HeroSlider />

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Now Showing"
          title="Featured Studios"
          subtitle="Top-rated and newest creative spaces, hand-picked for your next production."
        />
        <FeaturedStudios />
      </section>

      <section className="bg-base-200 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Pick Your Set"
            title="Browse by Studio Category"
            subtitle="Choose the kind of space you need and jump straight to matching studios."
          />
          <Categories />
        </div>
      </section>
    </main>
  );
}
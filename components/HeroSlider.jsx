"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const SLIDES = [
  {
    scene: "Scene 01",
    title: "Find the Perfect Studio for Your Next Shoot",
    text: "Browse photography cyc walls, cinema sound stages and more, booked by the hour with transparent pricing.",
    image: "/hero/slide-1.jpg",
  },
  {
    scene: "Scene 02",
    title: "Record, Stream and Produce in Pro Sound",
    text: "Podcast lounges and music recording suites with the gear already set up and waiting for you.",
    image: "/hero/slide-2.jpg",
  },
  {
    scene: "Scene 03",
    title: "Turn Your Empty Space into a Creative Set",
    text: "List your studio, set your hourly rate and let creators book open slots in real time.",
    image: "/hero/slide-3.jpg",
  },
];

const OVERLAY = {
  background:
    "linear-gradient(90deg, color-mix(in oklab, var(--color-neutral) 92%, transparent) 0%, color-mix(in oklab, var(--color-neutral) 70%, transparent) 45%, color-mix(in oklab, var(--color-neutral) 25%, transparent) 100%)",
};

export default function HeroSlider() {
  return (
    <section className="hero-swiper relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[70vh] min-h-[500px] max-h-[720px]"
      >
        {SLIDES.map((s) => (
          <SwiperSlide key={s.scene}>
            <div
              className="relative flex h-full items-center bg-neutral bg-cover bg-center"
              style={{ backgroundImage: `url(${s.image})` }}
            >
              <div className="absolute inset-0" style={OVERLAY} />
              <div className="relative mx-auto w-full max-w-7xl px-6 md:px-16">
                <div className="max-w-2xl text-neutral-content">
                  <p className="eyebrow mb-4 flex items-center gap-2">
                    <span className="rec-dot" />
                    {s.scene}
                  </p>
                  <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                    {s.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-base opacity-85 md:text-lg">
                    {s.text}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/studios" className="btn btn-primary">
                      Explore Studios
                    </Link>
                    <Link
                      href="/add-studio"
                      className="btn btn-outline border-neutral-content text-neutral-content hover:border-neutral-content hover:bg-neutral-content hover:text-neutral"
                    >
                      Host Your Space
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
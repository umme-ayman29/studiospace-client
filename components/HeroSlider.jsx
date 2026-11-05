"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    scene: "Scene 01",
    img: "/hero/slide1.jpg",
    title: "Your Next Shoot Starts in the Right Room",
    text: "Cyc walls, daylight lofts and fully lit photo studios, priced by the hour with no surprises.",
  },
  {
    scene: "Scene 02",
    img: "/hero/slide2.jpg",
    title: "Record, Stream and Produce in Pro Sound",
    text: "Podcast lounges and music recording suites with the gear already set up and waiting for you.",
  },
  {
    scene: "Scene 03",
    img: "/hero/slide3.jpg",
    title: "Turn Your Empty Room into Creative Income",
    text: "List your studio, set your rate and let creators book it with real-time availability.",
  },
];

export default function HeroSlider() {
  return (
    <section>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        style={{
          "--swiper-theme-color": "#fb923c",
          "--swiper-navigation-color": "#ffffff",
          "--swiper-pagination-bullet-inactive-color": "#ffffff",
          height: "78vh",
          minHeight: "520px",
        }}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.scene}>
            <div className="relative h-full w-full bg-neutral">
              <img
                src={s.img}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover object-center"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />

              <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 sm:px-12">
                <div className="max-w-2xl text-white">
                  <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
                    {s.scene}
                  </p>
                  <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
                    {s.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-lg text-white/85">{s.text}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/studios" className="btn btn-primary btn-lg">
                      Explore Studios
                    </Link>
                    <Link
                      href="/add-studio"
                      className="btn btn-outline btn-lg border-white text-white hover:border-white hover:bg-white hover:text-black"
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
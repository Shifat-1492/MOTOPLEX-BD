"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap, Award, ChevronLeft, ChevronRight, Flame } from "lucide-react";

const heroSlides = [
  {
    id: "slide-1",
    tag: "Official 2026 Season Launch",
    badge: "Aprilia RS 457 Now In Bangladesh",
    headline: ["THE APEX OF", "ITALIAN RACING", "& LUXURY COMMUTING."],
    highlightWord: "ITALIAN RACING",
    description:
      "Direct official importer of Aprilia supersports, Vespa scooters, and world-championship certified safety gear from Shoei, Dainese, Alpinestars, and Akrapovič in Bangladesh.",
    primaryCta: { href: "/shop", label: "Explore 2026 Collection" },
    secondaryCta: { href: "/product/aprilia-rs-457-twin-cylinder", label: "Aprilia RS 457 Specs" },
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Aprilia RS 457 Motoplex Bangladesh",
    cardTitle: "Aprilia RS 457",
    cardSub: "Prismatic Dark & Racing Stripes",
    cardBadge: "Flagship Edition",
    cardPrice: "৳9,85,000",
    stats: [
      { value: "47.6 HP", label: "Parallel Twin" },
      { value: "ECE 22.06", label: "FIM Certified" },
      { value: "64 Districts", label: "Nationwide Delivery" },
    ],
  },
  {
    id: "slide-2",
    tag: "Iconic Italian Design",
    badge: "Vespa Primavera Now Available",
    headline: ["TIMELESS ITALIAN", "SCOOTER CULTURE,", "DHAKA-READY."],
    highlightWord: "ITALIAN",
    description:
      "The Vespa Primavera 150 — embodying six decades of Italian design heritage, now officially imported for Bangladesh roads with full BRTA documentation and 2-year warranty.",
    primaryCta: { href: "/category/motorcycles", label: "View All Scooters" },
    secondaryCta: { href: "/product/vespa-primavera-150-touring", label: "Vespa Primavera Specs" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Vespa Primavera Motoplex Bangladesh",
    cardTitle: "Vespa Primavera 150",
    cardSub: "Matt Rosso Passione • Touring Edition",
    cardBadge: "Iconic Heritage",
    cardPrice: "৳3,75,000",
    stats: [
      { value: "11.7 HP", label: "Euro 5 Engine" },
      { value: "3-Year", label: "Official Warranty" },
      { value: "Smart Delivery", label: "Express Dhaka" },
    ],
  },
  {
    id: "slide-3",
    tag: "World Championship Certified",
    badge: "Shoei NXR2 Helmets In Stock",
    headline: ["RACE-GRADE", "PROTECTION FOR", "BANGLADESH RIDERS."],
    highlightWord: "RACE-GRADE",
    description:
      "Official distributor of Shoei, AGV, and Arai helmets — all ECE 22.06 & SNELL 2020 certified. Expert helmet fitting consultations at our Gulshan-2 flagship showroom.",
    primaryCta: { href: "/category/helmets", label: "Shop All Helmets" },
    secondaryCta: { href: "/product/shoei-nxr2-motegi-2-tc1", label: "Shoei NXR2 Details" },
    image: "https://images.unsplash.com/photo-1558618047-f4e90b59e55a?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Shoei Helmet Motoplex Bangladesh",
    cardTitle: "Shoei NXR2 Motegi2 TC-1",
    cardSub: "ECE 22.06 • SNELL 2020 Certified",
    cardBadge: "Track Proven",
    cardPrice: "৳78,500",
    stats: [
      { value: "0.3kg", label: "Shell Weight" },
      { value: "ECE 22.06", label: "Safety Certified" },
      { value: "7 Sizes", label: "Available Now" },
    ],
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [currentSlide, isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative bg-zinc-950 text-white overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/12 rounded-full blur-3xl pointer-events-none transition-all duration-1000" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
            key={slide.id}
            style={{ animation: "fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-semibold text-white">{slide.tag}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-red-400 font-bold uppercase tracking-wider text-[10px]">
                {slide.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
              {slide.headline.map((line, i) => (
                <span key={i} className={`block ${line === slide.highlightWord ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-amber-500" : ""}`}>
                  {line}
                </span>
              ))}
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={slide.primaryCta.href}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{slide.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={slide.secondaryCta.href}
                className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 font-semibold text-sm px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>{slide.secondaryCta.label}</span>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              {slide.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-[11px] text-zinc-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5 relative" key={`img-${slide.id}`}>
            <div className="relative aspect-4/3 sm:aspect-[16/11] w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={currentSlide === 0}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 45vw"
                style={{ animation: "fade-in 0.6s ease forwards" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              {/* Floating Info Chip */}
              <div className="absolute bottom-5 inset-x-5 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 text-xs glass-dark">
                <div>
                  <div className="flex items-center gap-1.5 text-red-500 font-bold uppercase tracking-wider text-[10px]">
                    <Flame className="w-3.5 h-3.5" />
                    {slide.cardBadge}
                  </div>
                  <h3 className="font-bold text-white text-sm mt-0.5">{slide.cardTitle}</h3>
                  <p className="text-[11px] text-zinc-400">{slide.cardSub}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-zinc-400 block">Ex-Showroom BD</span>
                  <span className="text-sm font-black text-white">{slide.cardPrice}</span>
                </div>
              </div>
            </div>

            {/* Slide Navigation Dots + Arrow Buttons */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentSlide
                        ? "w-6 h-2 bg-red-600"
                        : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="border-t border-zinc-800 bg-zinc-900/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-zinc-300">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
            <span>100% Genuine Importer Hologram</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-red-500 shrink-0" />
            <span>24–48h Express Dhaka Delivery</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-red-500 shrink-0" />
            <span>2-Year Official Engine Warranty</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-red-500 font-bold shrink-0">COD</span>
            <span>Cash on Delivery with Inspection</span>
          </div>
        </div>
      </div>
    </section>
  );
}

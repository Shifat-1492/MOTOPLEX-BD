import React from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoBanner } from "@/components/home/PromoBanner";
import { BestSellers } from "@/components/home/BestSellers";
import { TrustBadges } from "@/components/home/TrustBadges";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoBanner />
      <BestSellers />
      <TrustBadges />
      <TestimonialsSection />
    </>
  );
}

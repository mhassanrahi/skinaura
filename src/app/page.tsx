"use client";

import * as React from "react";
import Hero from "@/components/layout/hero";
import FeaturedProducts from "@/components/layout/featured-products";
import Testimonials from "@/components/layout/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Testimonials />
    </main>
  );
}

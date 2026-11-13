"use client";

import React from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "../lib/site";

export default function OriginalHomePage() {
  return (
    <div className="w-full bg-[#080D26] text-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden flex items-center justify-center">
        {/* Desktop Image */}
        <div className="w-full relative min-w-full">
          <img
            src="/assets/hero.jpeg"
            alt="Fly Or Fall Streetwear"
            className="w-full h-[34.1875rem] md:h-auto 2xl:h-[45rem] block object-cover max-md:hidden filter brightness-90"
          />
          {/* Mobile Image */}
          <img
            src="/assets/hero.jpeg"
            alt="Fly Or Fall Streetwear"
            className="w-full h-[32rem] object-cover hidden max-md:block filter brightness-90 mt-[-4rem]"
          />

          {/* Hero Overlay Box */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D26] via-transparent to-black/30" />

          {/* Hero Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 sm:pb-16 px-4 text-center z-10 space-y-4 max-w-4xl mx-auto">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-wide leading-none text-white drop-shadow-lg mt-4">
              DARE TO FLY. READY TO FALL.
            </h1>
            <div className="pt-2 flex flex-col items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                href="/pages/about-us"
                className="w-full sm:w-auto min-w-[200px] text-center px-8 py-3.5 bg-black/60 backdrop-blur-md border border-white/30 text-white font-display text-sm sm:text-base font-bold tracking-[2px] uppercase hover:border-[#D4FF00] hover:text-[#D4FF00] transition-all rounded-xs"
              >
                Our Story
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto min-w-[200px] text-center px-8 py-3.5 bg-[#D4FF00] text-black font-display text-sm sm:text-base font-bold tracking-[2px] uppercase hover:bg-[#BEF200] active:scale-[0.98] transition-all rounded-xs shadow-xl"
              >
                Imported Track Pants (₹999)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Drop / Product Grid */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#D4FF00] uppercase block mb-1">
              EXCLUSIVE CAPSULE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-wide text-white">
              LATEST DROP
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-display text-sm font-bold tracking-widest uppercase text-[#D4FF00] hover:underline underline-offset-4 transition"
            >
              Shop Track Pants (₹999) →
            </Link>
          </div>
        </div>

        {/* Featured Product */}
        <div className="max-w-md mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Manifesto Section */}
      <section className="w-full bg-[#0F1738] border-y border-white/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4FF00]">
            THE FLY OR FALL MANIFESTO
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            “WE DO NOT DESIGN FOR COMFORT ZONES. WE CRAFT FOR THE LEAP.”
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Every visionary leaps knowing there are only two outcomes: you either touch the sky or crash to the pavement. But staying on solid ground was never an option.
          </p>
          <div className="pt-4">
            <Link
              href="/pages/about-us"
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#D4FF00] border-b-2 border-[#D4FF00] pb-1 hover:text-white hover:border-white transition"
            >
              Read Our Full Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

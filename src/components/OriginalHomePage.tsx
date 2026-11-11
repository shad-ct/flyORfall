"use client";

import React from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "../lib/site";

export default function OriginalHomePage() {
  return (
    <div className="w-full bg-[rgb(11,11,11)] text-white">
      {/* Highpe Hero Section */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(11,11,11)] via-transparent to-black/30" />

          {/* Hero Text overlay matching Highpe positioning */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 sm:pb-16 px-4 text-center z-10 space-y-4 max-w-4xl mx-auto">
            <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-wide leading-none text-white drop-shadow-lg mt-4">
              DARE TO FLY. READY TO FALL.
            </h1>
            {/* <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-medium tracking-wider uppercase">
              Heavyweight Luxury Streetwear • Crafted in Hindustan
            </p> */}
            <div className="pt-2 flex flex-col items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                href="/pages/about-us"
                className="w-full sm:w-auto min-w-[200px] text-center px-8 py-3.5 bg-black/60 backdrop-blur-md border border-white/30 text-white font-['Barlow_Condensed'] text-sm sm:text-base font-bold tracking-[2px] uppercase hover:border-white hover:bg-white/10 transition-all rounded-xs"
              >
                Our Story
              </Link>
              <Link
                href="/collections/all"
                className="w-full sm:w-auto min-w-[200px] text-center px-8 py-3.5 bg-white text-black font-['Barlow_Condensed'] text-sm sm:text-base font-bold tracking-[2px] uppercase hover:bg-neutral-200 active:scale-[0.98] transition-all rounded-xs shadow-xl"
              >
                All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Drop / Product Grid */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase block mb-1">
              EXCLUSIVE CAPSULE
            </span>
            <h2 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black uppercase tracking-wide text-white">
              LATEST DROP
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/collections/all"
              className="font-['Barlow_Condensed'] text-sm font-bold tracking-widest uppercase text-white/80 hover:text-white underline underline-offset-4 transition"
            >
              Shop All Products →
            </Link>
          </div>
        </div>

        {/* 2 Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Split Banner */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Oversized Tees */}
          <Link
            href="/collections/all?category=T-SHIRTS"
            className="group relative h-[420px] rounded-lg overflow-hidden border border-white/10"
          >
            <img
              src="/assets/cloned/images/828f8eea3437.webp"
              alt="Gravity Drop Tees"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">
                CATEGORY 01
              </span>
              <h3 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-extrabold uppercase text-white">
                HEAVYWEIGHT TEES
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-md">
                260 GSM French terry cotton engineered with a relaxed drop-shoulder cut.
              </p>
              <span className="inline-block pt-2 text-xs font-bold uppercase tracking-widest text-white group-hover:underline">
                Explore Tees →
              </span>
            </div>
          </Link>

          {/* Card 2: Cargo Bottoms */}
          <Link
            href="/collections/all?category=BOTTOM"
            className="group relative h-[420px] rounded-lg overflow-hidden border border-white/10"
          >
            <img
              src="/assets/cargo/optimized/IMG_2044.webp"
              alt="Altitude Cargo Pants"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">
                CATEGORY 02
              </span>
              <h3 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-extrabold uppercase text-white">
                TACTICAL CARGOS
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-md">
                6-pocket ripstop utility pants with adjustable ankle toggles and relaxed drape.
              </p>
              <span className="inline-block pt-2 text-xs font-bold uppercase tracking-widest text-white group-hover:underline">
                Explore Cargos →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Brand Manifesto Section */}
      <section className="w-full bg-[rgb(16,16,16)] border-y border-white/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/40">
            THE FLY OR FALL MANIFESTO
          </span>
          <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            “WE DO NOT DESIGN FOR COMFORT ZONES. WE CRAFT FOR THE LEAP.”
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Every visionary leaps knowing there are only two outcomes: you either touch the sky or crash to the pavement. But staying on solid ground was never an option.
          </p>
          <div className="pt-4">
            <Link
              href="/pages/about-us"
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-white border-b-2 border-white pb-1 hover:text-white/70 hover:border-white/70 transition"
            >
              Read Our Full Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

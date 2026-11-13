import React from "react";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "../../../lib/site";

export const metadata = {
  title: `Our Story – ${SITE_NAME}`,
  description: "The story, craft, and vision behind FALL OR FLY streetwear.",
};

export default function AboutUsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-16 md:py-24 space-y-16">
      {/* Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4FF00]">
          IDEOLOGY: {SITE_TAGLINE}
        </span>
        <h1 className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-white">
          OUR STORY
        </h1>
        <div className="text-white/80 text-base sm:text-lg leading-relaxed font-light space-y-4 pt-2">
          <p>
            <strong className="text-white font-semibold">{SITE_NAME}</strong> is a streetwear brand focused on creating unique styles and distinctive fashion pieces. Inspired by everyday wear, travel, and culture, we bring creativity and individuality into fashion through thoughtfully designed pieces that combine comfort, style, and functionality.
          </p>
          <p>
            Our vision is to create more than just clothing — to build a culture around personal expression and everyday fashion.
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1 bg-[#D4FF00]/15 text-[#D4FF00] border border-[#D4FF00]/30 font-display font-black text-sm uppercase tracking-widest rounded-xs">
              {SITE_TAGLINE}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Brand Imagery */}
      <div className="relative h-[450px] sm:h-[550px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        <img
          src="/assets/hero.jpeg"
          alt="FALL OR FLY hero"
          className="w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D26] via-transparent to-black/30 flex items-end p-8 md:p-12">
          <blockquote className="font-display text-3xl sm:text-5xl font-black uppercase text-white max-w-2xl leading-tight">
            “{SITE_TAGLINE}”
          </blockquote>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center pt-12 space-y-6 border-t border-white/10">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
          EXPERIENCE THE CURRENT DROP
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-[#D4FF00] hover:bg-[#BEF200] text-black font-display text-base font-bold uppercase tracking-widest rounded transition shadow-[0_4px_20px_rgba(212,255,0,0.3)]"
          >
            Shop Imported Lightweight Track Pants (₹999)
          </Link>
        </div>
      </div>
    </div>
  );
}

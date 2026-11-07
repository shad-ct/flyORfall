import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Our Story – FLY OR FALL",
  description: "The story, craft, and vision behind FLY OR FALL streetwear.",
};

export default function AboutUsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-16 md:py-24 space-y-16">
      {/* Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/50">
          THE VISION
        </span>
        <h1 className="font-['Barlow_Condensed'] text-5xl sm:text-7xl font-black uppercase tracking-tight text-white">
          OUR STORY
        </h1>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light">
          FLY OR FALL was born in 2024 from an obsession with raw urban subcultures, heavyweight fabrics, and the philosophy that taking the ultimate risk defines who you are.
        </p>
      </div>

      {/* Hero Brand Imagery */}
      <div className="relative h-[450px] sm:h-[550px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        <img
          src="/assets/cloned/images/2595fa418c9f.png"
          alt="Fly Or Fall Studio"
          className="w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 md:p-12">
          <blockquote className="font-['Barlow_Condensed'] text-2xl sm:text-4xl font-extrabold uppercase text-white max-w-2xl leading-tight">
            “IF YOU’RE AFRAID OF THE FALL, YOU NEVER TRULY FLY.”
          </blockquote>
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        <div className="p-8 bg-[rgb(16,16,16)] border border-white/10 rounded-lg space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-white/40">01</span>
          <h3 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase text-white">
            WEIGHT & TEXTURE
          </h3>
          <p className="text-sm text-white/70 leading-relaxed">
            We don't do flimsy cotton. Every piece starts with high-gauge yarns, custom milling 260 GSM French terry and tough ripstop nylon that drapes with structure and authority.
          </p>
        </div>

        <div className="p-8 bg-[rgb(16,16,16)] border border-white/10 rounded-lg space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-white/40">02</span>
          <h3 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase text-white">
            INTENTIONAL SILHOUETTES
          </h3>
          <p className="text-sm text-white/70 leading-relaxed">
            Our boxy tees and articulated cargo cuts are prototyped through multiple rounds of real-world wear-testing to ensure they break just right over your kicks.
          </p>
        </div>

        <div className="p-8 bg-[rgb(16,16,16)] border border-white/10 rounded-lg space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-white/40">03</span>
          <h3 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase text-white">
            LIMITED BY DESIGN
          </h3>
          <p className="text-sm text-white/70 leading-relaxed">
            We release small, focused capsules. We never mass-produce or flood the market. When a drop is gone, it enters the archive.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center pt-12 space-y-6 border-t border-white/10">
        <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-extrabold uppercase text-white">
          EXPERIENCE THE CURRENT DROP
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            href="/collections/all"
            className="px-8 py-4 bg-white text-black font-['Barlow_Condensed'] text-base font-bold uppercase tracking-widest rounded hover:bg-white/90 transition shadow-xl"
          >
            Shop The 2-Piece Capsule
          </Link>
        </div>
      </div>
    </div>
  );
}


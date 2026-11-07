import React from "react";
import Link from "next/link";
import { PRODUCTS } from "../../lib/site";
import ProductCard from "../../components/ProductCard";

export const metadata = {
  title: "Collections – FLY OR FALL",
  description: "Explore all limited streetwear drops by FLY OR FALL.",
};

export default function CollectionsPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-3 sm:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
      {/* Breadcrumb & Header */}
      <div className="mb-8 text-center space-y-2">
        <span className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase">
          CURATED DROPS
        </span>
        <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-wide">
          COLLECTIONS
        </h1>
        <p className="text-white/60 text-xs sm:text-sm max-w-lg mx-auto">
          Explore our limited edition drops, designed and manufactured for street culture.
        </p>
      </div>

      {/* Collection Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-16 max-w-5xl mx-auto">
        <Link
          href="/collections/all?category=T-SHIRTS"
          className="group relative h-[280px] sm:h-[380px] rounded-lg overflow-hidden border border-white/10"
        >
          <img
            src="/assets/cloned/images/828f8eea3437.webp"
            alt="T-Shirts Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-1">
            <span className="text-[11px] font-bold tracking-widest text-white/60 uppercase">
              1 PIECE AVAILABLE
            </span>
            <h2 className="font-['Barlow_Condensed'] text-2xl sm:text-3xl font-extrabold uppercase text-white">
              T-SHIRTS
            </h2>
            <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:underline">
              View Collection →
            </span>
          </div>
        </Link>

        <Link
          href="/collections/all?category=BOTTOM"
          className="group relative h-[280px] sm:h-[380px] rounded-lg overflow-hidden border border-white/10"
        >
          <img
            src="/assets/cargo/optimized/IMG_2044.webp"
            alt="Bottoms Collection"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-1">
            <span className="text-[11px] font-bold tracking-widest text-white/60 uppercase">
              1 PIECE AVAILABLE
            </span>
            <h2 className="font-['Barlow_Condensed'] text-2xl sm:text-3xl font-extrabold uppercase text-white">
              BOTTOMS & CARGOS
            </h2>
            <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:underline">
              View Collection →
            </span>
          </div>
        </Link>
      </div>

      {/* All Products Grid */}
      <div className="border-t border-white/10 pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Barlow_Condensed'] text-2xl sm:text-3xl font-extrabold uppercase text-white">
            ALL CURRENT PIECES
          </h2>
          <span className="text-xs text-white/50 tracking-wider uppercase">
            2 Products
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

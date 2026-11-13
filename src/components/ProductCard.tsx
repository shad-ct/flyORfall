"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "../lib/site";
import { useCart } from "../lib/cart";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, selectedSize, product.colors[0], 1);
    setShowSizePicker(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleMobileQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0], product.colors[0], 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#0F1738] rounded-lg overflow-hidden border border-white/10 hover:border-[#D4FF00]/40 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      {/* Product Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-3/4 overflow-hidden bg-[#0C1333] cursor-pointer"
      >
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge */}
        {product.tag && (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#D4FF00] text-black font-display text-[9px] sm:text-xs font-black tracking-widest uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs shadow-[0_0_10px_rgba(212,255,0,0.3)]">
            {product.tag}
          </span>
        )}

        {/* Desktop Quick Add Overlay */}
        <div
          className={`hidden md:block absolute inset-x-3 bottom-3 z-10 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {showSizePicker ? (
            <div className="bg-[#0C1333]/95 backdrop-blur-md p-3 rounded-sm shadow-2xl border border-white/20 space-y-2">
              <div className="flex justify-between items-center text-[10px] text-white/70 uppercase tracking-wider font-bold">
                <span>Select Size:</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowSizePicker(false);
                  }}
                  className="hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSize(s);
                    }}
                    className={`flex-1 min-w-[2.5rem] h-8 text-xs font-display font-bold rounded-xs border transition-all cursor-pointer flex items-center justify-center ${
                      selectedSize === s
                        ? "bg-[#D4FF00] text-black border-[#D4FF00] shadow-[0_0_8px_rgba(212,255,0,0.3)] scale-102"
                        : "bg-[#131C44] text-white border-white/20 hover:border-white/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleQuickAdd}
                className="w-full py-2 bg-[#D4FF00] hover:bg-[#BEF200] text-black text-xs font-display font-extrabold uppercase tracking-widest rounded-xs transition shadow cursor-pointer"
              >
                Confirm Size & Bag
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowSizePicker(true);
              }}
              className="w-full py-2.5 bg-[#D4FF00] hover:bg-[#BEF200] text-black font-display text-xs font-bold uppercase tracking-widest rounded-xs shadow-lg transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>+ Quick Add</span>
            </button>
          )}
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between bg-[#0F1738] space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4FF00] uppercase block">
            {product.category}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="font-display text-base sm:text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#D4FF00] transition line-clamp-1 cursor-pointer block"
          >
            {product.name}
          </Link>
          <p className="text-[11px] sm:text-xs text-white/60 line-clamp-2 pt-0.5 leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-sm sm:text-base text-white">
              {product.priceFormatted}
            </span>
            {product.originalPriceFormatted && (
              <span className="text-[11px] sm:text-xs text-white/40 line-through">
                {product.originalPriceFormatted}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Icon button */}
          <button
            type="button"
            onClick={handleMobileQuickAdd}
            className="md:hidden p-2 rounded-full bg-[#D4FF00] text-black hover:bg-[#BEF200] transition cursor-pointer"
            aria-label="Add to bag"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {justAdded && (
          <div className="text-[11px] text-[#D4FF00] font-bold text-center animate-in fade-in">
            ✓ Added to Bag!
          </div>
        )}
      </div>
    </div>
  );
}

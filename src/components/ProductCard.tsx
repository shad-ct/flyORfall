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
      className="group relative flex flex-col bg-[rgb(16,16,16)] rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-md hover:shadow-xl h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      {/* Product Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-3/4 overflow-hidden bg-neutral-900 cursor-pointer"
      >
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge */}
        {product.tag && (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white text-black font-['Barlow_Condensed'] text-[9px] sm:text-xs font-black tracking-widest uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs shadow">
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
            <div className="bg-[rgb(24,24,24)]/95 backdrop-blur-md p-3 rounded-sm shadow-2xl border border-white/20 space-y-2">
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
                    className={`flex-1 min-w-[2.5rem] h-8 text-xs font-['Barlow_Condensed'] font-bold rounded-xs border transition-all cursor-pointer flex items-center justify-center ${
                      selectedSize === s
                        ? "bg-white text-black border-white shadow scale-102"
                        : "bg-[rgb(18,18,18)] text-white border-white/20 hover:border-white/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleQuickAdd}
                className="w-full h-9 bg-white text-black font-['Barlow_Condensed'] text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-neutral-200 active:scale-95 transition cursor-pointer flex items-center justify-center"
              >
                Confirm • Add To Bag
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
              className="w-full h-11 bg-white text-black font-['Barlow_Condensed'] text-sm font-bold uppercase tracking-wider rounded-xs shadow-2xl hover:bg-neutral-200 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>+ Quick Add</span>
            </button>
          )}
        </div>
      </Link>

      {/* Product Information Box */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/50 block mb-0.5">
            {product.category}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="block font-['Barlow_Condensed'] text-sm sm:text-lg font-bold uppercase text-white hover:text-white/80 transition line-clamp-1"
          >
            {product.name}
          </Link>
        </div>

        <div>
          <div className="flex items-baseline gap-2 pt-1 border-t border-white/5">
            <span className="text-xs sm:text-base font-bold text-white">
              {product.priceFormatted}
            </span>
            {product.originalPriceFormatted && (
              <span className="text-[10px] sm:text-xs text-white/40 line-through">
                {product.originalPriceFormatted}
              </span>
            )}
          </div>

          {/* Full-width button on mobile */}
          <div className="md:hidden mt-2.5">
            <button
              type="button"
              onClick={handleMobileQuickAdd}
              className={`w-full h-9.5 text-xs font-['Barlow_Condensed'] font-bold uppercase tracking-wider rounded-xs shadow transition-all duration-150 flex items-center justify-center cursor-pointer ${
                justAdded
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-black hover:bg-neutral-200 active:scale-[0.98]"
              }`}
            >
              {justAdded ? "✓ Added to Bag" : "Add to Bag"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

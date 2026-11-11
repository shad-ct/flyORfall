"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS, Product } from "../lib/site";
import ProductCard from "./ProductCard";

export default function ProductCatalogue() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get("category") || "ALL";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with URL category changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    if (val === "ALL") {
      router.push("/", { scroll: false });
    } else {
      router.push(`/?category=${val}`, { scroll: false });
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== "ALL" && p.category !== selectedCategory) {
        return false;
      }
      // Size filter
      if (selectedSize && !p.sizes.includes(selectedSize)) {
        return false;
      }
      // Search query
      if (initialQuery) {
        const query = initialQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        if (!matchName && !matchDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedCategory, selectedSize, sortBy, initialQuery]);

  const allSizes = ["S", "M", "L", "XL", "30", "32", "34", "36"];

  const categories = [
    { label: "ALL ITEMS", val: "ALL", count: PRODUCTS.length },
    { label: "T-SHIRTS", val: "T-SHIRTS", count: PRODUCTS.filter(p => p.category === "T-SHIRTS").length },
    { label: "BOTTOMS & CARGOS", val: "BOTTOM", count: PRODUCTS.filter(p => p.category === "BOTTOM").length },
  ];

  const activeFiltersCount =
    (selectedCategory !== "ALL" ? 1 : 0) +
    (selectedSize ? 1 : 0) +
    (sortBy !== "featured" ? 1 : 0);

  return (
    <div className="max-w-[1600px] mx-auto px-3 sm:px-8 lg:px-12 py-6 sm:py-10 md:py-14">
      {/* Page Title */}
      <div className="mb-4 sm:mb-8 text-left">
        <span className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase block mb-1">
          STREETWEAR CATALOGUE
        </span>
        <h1 className="font-['Barlow_Condensed'] text-3xl sm:text-5xl font-black uppercase tracking-wide text-white">
          {selectedCategory === "T-SHIRTS"
            ? "T-SHIRTS"
            : selectedCategory === "BOTTOM"
            ? "BOTTOMS & CARGOS"
            : "ALL PRODUCTS"}
        </h1>
        {initialQuery && (
          <div className="flex items-center gap-3 text-xs text-white/60 mt-1">
            <span>
              Search results for: <span className="text-white font-semibold">"{initialQuery}"</span>
            </span>
            <button
              onClick={() => router.push("/", { scroll: false })}
              className="text-xs text-white/50 hover:text-white underline uppercase cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Category Chips (Swipeable on Mobile) */}
      <div className="mb-6 overflow-x-auto no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-2 w-max">
          {categories.map((c) => {
            const isActive = selectedCategory === c.val;
            return (
              <button
                key={c.val}
                type="button"
                onClick={() => handleCategoryChange(c.val)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['Barlow_Condensed'] tracking-widest font-bold uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-black shadow-lg scale-[1.02]"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10"
                }`}
              >
                <span>{c.label}</span>
                <span className={`text-[10px] ${isActive ? "text-black/60 font-black" : "text-white/40"}`}>
                  ({c.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Toolbar (Filter & Sort button + Piece count) */}
      <div className="flex lg:hidden items-center justify-between py-3 mb-6 border-y border-white/10">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-sm text-xs font-['Barlow_Condensed'] font-bold tracking-wider uppercase border border-white/15 transition cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" fillRule="evenodd" d="M4.833 6.5a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0M4.05 7H2.5a.5.5 0 0 1 0-1h1.55a2.5 2.5 0 0 1 4.9 0h8.55a.5.5 0 0 1 0 1H8.95a2.5 2.5 0 0 1-4.9 0m11.117 6.5a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0M13.5 11a2.5 2.5 0 0 1 2.45 2h1.55a.5.5 0 0 1 0 1h-1.55a2.5 2.5 0 0 1-4.9 0H2.5a.5.5 0 0 1 0-1h8.55a2.5 2.5 0 0 1 2.45-2" />
          </svg>
          <span>Filter & Sort</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 bg-white text-black text-[10px] font-black rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <span className="text-xs font-['Barlow_Condensed'] font-semibold tracking-widest text-white/60 uppercase">
          {filteredProducts.length} {filteredProducts.length === 1 ? "Piece" : "Pieces"}
        </span>
      </div>

      {/* Main Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
        {/* Desktop Sidebar (Hidden on Mobile) */}
        <aside className="hidden lg:block space-y-8 sticky top-24">
          {/* Categories */}
          <div className="space-y-3">
            <h3 className="font-['Barlow_Condensed'] text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Categories
            </h3>
            <div className="space-y-1.5 text-sm">
              {categories.map((c) => (
                <button
                  key={c.val}
                  type="button"
                  onClick={() => handleCategoryChange(c.val)}
                  className={`flex items-center justify-between w-full text-left py-2 px-3 rounded text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer ${
                    selectedCategory === c.val
                      ? "bg-white text-black shadow-md scale-[1.02]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{c.label}</span>
                  <span className={`text-[10px] ${selectedCategory === c.val ? "text-black/60 font-black" : "text-white/40"}`}>
                    ({c.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sizes Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-['Barlow_Condensed'] text-base font-bold uppercase tracking-wider text-white">
                Filter by Size
              </h3>
              {selectedSize && (
                <button
                  type="button"
                  onClick={() => setSelectedSize(null)}
                  className="text-[10px] text-white/60 hover:text-white uppercase font-bold underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {allSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    setSelectedSize(selectedSize === s ? null : s)
                  }
                  className={`h-10 flex items-center justify-center text-xs font-['Barlow_Condensed'] font-bold uppercase tracking-wider rounded-sm border transition-all duration-150 cursor-pointer ${
                    selectedSize === s
                      ? "bg-white text-black border-white shadow-md font-extrabold scale-[1.02]"
                      : "bg-[rgb(18,18,18)] border-white/20 text-white/80 hover:border-white/70 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By Desktop */}
          <div className="space-y-3">
            <h3 className="font-['Barlow_Condensed'] text-base font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Sort by
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[rgb(18,18,18)] text-white text-xs font-bold uppercase border border-white/20 rounded px-3 py-2.5 focus:outline-hidden hover:border-white/50 transition cursor-pointer"
            >
              <option value="featured">Featured Drop</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetically, A-Z</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(selectedCategory !== "ALL" || selectedSize !== null || sortBy !== "featured") && (
            <button
              type="button"
              onClick={() => {
                handleCategoryChange("ALL");
                setSelectedSize(null);
                setSortBy("featured");
              }}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded transition cursor-pointer"
            >
              Reset All Filters
            </button>
          )}

          {/* Pan India Fast Delivery Notice */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-xs text-white/60 space-y-1.5">
            <span className="font-bold text-white uppercase block tracking-wider">
              ⚡ Pan-India Delivery
            </span>
            <p>Dispatched in 24 hrs. 100% Cotton & Heavyweight Streetwear Weave.</p>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="w-full">
          <div className="hidden lg:flex items-center justify-between mb-6 text-xs text-white/50 tracking-wider uppercase">
            <span>Showing {filteredProducts.length} of {PRODUCTS.length} pieces</span>
            <span>Heavyweight Streetwear</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4 bg-white/5 rounded-2xl border border-white/10 p-8">
              <span className="text-4xl">🔍</span>
              <h2 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase text-white">
                No Pieces Found
              </h2>
              <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                No streetwear items matched your current filter criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleCategoryChange("ALL");
                  setSelectedSize(null);
                  setSortBy("featured");
                }}
                className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-neutral-200 transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Slide-up Filter & Sort Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Bottom Sheet Modal */}
          <div className="relative z-10 w-full max-h-[85vh] bg-[rgb(16,16,16)] border-t border-white/15 rounded-t-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <h2 className="font-['Barlow_Condensed'] text-2xl font-black uppercase tracking-wider text-white">
                  FILTER & SORT
                </h2>
                {activeFiltersCount > 0 && (
                  <span className="text-xs bg-white text-black px-2 py-0.5 rounded-full font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Filter Options */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="font-['Barlow_Condensed'] text-sm font-bold uppercase tracking-wider text-white/70">
                  Category
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((c) => {
                    const isActive = selectedCategory === c.val;
                    return (
                      <button
                        key={c.val}
                        type="button"
                        onClick={() => handleCategoryChange(c.val)}
                        className={`py-3 px-4 flex items-center justify-between text-xs font-['Barlow_Condensed'] font-bold uppercase rounded-sm border transition cursor-pointer ${
                          isActive
                            ? "bg-white text-black border-white shadow-sm font-extrabold"
                            : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
                        }`}
                      >
                        <span>{c.label}</span>
                        <span className={`text-[10px] ${isActive ? "text-black/60 font-black" : "text-white/40"}`}>
                          ({c.count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort Section */}
              <div className="space-y-3">
                <h3 className="font-['Barlow_Condensed'] text-sm font-bold uppercase tracking-wider text-white/70">
                  Sort By
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Featured", val: "featured" },
                    { label: "Price: Low to High", val: "price-asc" },
                    { label: "Price: High to Low", val: "price-desc" },
                    { label: "Alphabetical", val: "name-asc" },
                  ].map((s) => (
                    <button
                      key={s.val}
                      type="button"
                      onClick={() => setSortBy(s.val)}
                      className={`p-3 text-xs font-['Barlow_Condensed'] font-bold uppercase rounded-sm border text-center flex items-center justify-center transition cursor-pointer ${
                        sortBy === s.val
                          ? "bg-white text-black border-white shadow-sm font-extrabold"
                          : "bg-white/5 text-white/80 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter by Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Barlow_Condensed'] text-sm font-bold uppercase tracking-wider text-white/70">
                    Size
                  </h3>
                  {selectedSize && (
                    <button
                      type="button"
                      onClick={() => setSelectedSize(null)}
                      className="text-xs text-white/50 hover:text-white underline font-bold uppercase cursor-pointer"
                    >
                      Clear Size
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {allSizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                      className={`h-11 flex items-center justify-center text-sm font-['Barlow_Condensed'] font-bold uppercase tracking-wider rounded-sm border transition-all duration-150 cursor-pointer ${
                        selectedSize === s
                          ? "bg-white text-black border-white shadow-md font-extrabold scale-[1.02]"
                          : "bg-white/5 border-white/15 text-white/80 hover:border-white/50 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pinned Action Buttons at bottom of sheet */}
            <div className="p-4 sm:p-6 border-t border-white/10 bg-[rgb(16,16,16)] flex items-center gap-3 shrink-0">
              {(selectedSize !== null || sortBy !== "featured" || selectedCategory !== "ALL") && (
                <button
                  type="button"
                  onClick={() => {
                    handleCategoryChange("ALL");
                    setSelectedSize(null);
                    setSortBy("featured");
                  }}
                  className="w-1/3 py-3.5 px-4 bg-white/10 hover:bg-white/15 text-white font-['Barlow_Condensed'] text-sm font-bold uppercase tracking-widest rounded-sm transition text-center flex items-center justify-center cursor-pointer"
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className={`py-3.5 px-6 bg-white text-black font-['Barlow_Condensed'] text-sm sm:text-base font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition shadow-xl text-center flex items-center justify-center cursor-pointer ${
                  selectedSize !== null || sortBy !== "featured" || selectedCategory !== "ALL"
                    ? "flex-1"
                    : "w-full"
                }`}
              >
                Apply • View {filteredProducts.length} {filteredProducts.length === 1 ? "Piece" : "Pieces"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, PRODUCTS } from "../lib/site";
import { useCart } from "../lib/cart";
import ProductCard from "./ProductCard";

export default function ProductDetailView({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "details" | "shipping">("desc");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id);

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hey FLY OR FALL! I want to order:\n• Product: ${product.name}\n• Size: ${selectedSize}\n• Color: ${selectedColor}\n• Quantity: ${quantity}\n• Price: ${product.priceFormatted}\n\nPlease confirm availability and payment link!`
    );
    window.open(`https://wa.me/918590877545?text=${text}`, "_blank");
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-[11px] sm:text-xs text-white/50 mb-6 sm:mb-8 uppercase tracking-wider">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <Link href="/" className="hover:text-white transition">Products</Link>
        <span>/</span>
        <span className="text-white font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left: Image Gallery */}
        <div className="space-y-3 sm:space-y-4">
          {/* Main Hero Image */}
          <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white text-black font-['Barlow_Condensed'] text-[10px] sm:text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-xs shadow">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 rounded overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                  selectedImage === img
                    ? "border-white scale-102 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="flex flex-col space-y-5 sm:space-y-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase block mb-1">
              {product.category} • LIMITED DROP
            </span>
            <h1 className="font-['Barlow_Condensed'] text-3xl sm:text-5xl font-black uppercase tracking-wide text-white leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-3 sm:gap-4 py-3 border-y border-white/10">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {product.priceFormatted}
            </span>
            {product.originalPriceFormatted && (
              <span className="text-sm sm:text-base text-white/40 line-through">
                {product.originalPriceFormatted}
              </span>
            )}
            <span className="px-2.5 py-1 bg-accent text-white text-[10px] sm:text-[11px] font-bold rounded uppercase tracking-wider">
              SAVE 35%
            </span>
          </div>

          {/* Color Selector */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-white">
              <span>Color: <span className="text-white/60 font-normal">{selectedColor}</span></span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`h-10 px-4 rounded-sm text-xs font-['Barlow_Condensed'] font-bold uppercase tracking-wider border transition-all duration-150 cursor-pointer flex items-center justify-center ${
                    selectedColor === c
                      ? "bg-white text-black border-white shadow-md font-extrabold scale-102"
                      : "bg-[rgb(18,18,18)] text-white/80 border-white/20 hover:border-white/60 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-white">
              <span>Size: <span className="text-white/60 font-normal">{selectedSize}</span></span>
              <button
                type="button"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-white/70 underline hover:text-white transition font-medium cursor-pointer"
              >
                Size Guide 📏
              </button>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {product.sizes.map((s) => {
                const isSelected = selectedSize === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[3.5rem] sm:min-w-[4rem] h-11 sm:h-12 px-3 rounded-sm font-['Barlow_Condensed'] text-sm sm:text-base font-bold uppercase border transition-all duration-150 cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? "bg-white text-black border-white shadow-lg font-black scale-102"
                        : "bg-[rgb(18,18,18)] text-white/80 border-white/20 hover:border-white/70 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Guide Modal Inline */}
          {showSizeGuide && (
            <div className="p-4 bg-[rgb(20,20,20)] border border-white/20 rounded-sm text-xs space-y-3 shadow-xl animate-in fade-in duration-200">
              <div className="flex justify-between font-bold uppercase tracking-wider">
                <span>Measurements (Inches)</span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(false)}
                  className="text-white/60 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-white/70">
                Fit: True to oversized streetwear drape. If you prefer a tailored fit, size down one size.
              </p>
              <div className="border border-white/10 rounded overflow-hidden">
                <div className="grid grid-cols-3 bg-white/10 p-2 font-bold uppercase text-white">
                  <span>Size</span>
                  <span>Chest / Waist</span>
                  <span>Length</span>
                </div>
                <div className="grid grid-cols-3 p-2 border-t border-white/5 text-white/80">
                  <span>S / 30</span>
                  <span>42" / 30"</span>
                  <span>29"</span>
                </div>
                <div className="grid grid-cols-3 p-2 border-t border-white/5 text-white/80">
                  <span>M / 32</span>
                  <span>44" / 32"</span>
                  <span>30"</span>
                </div>
                <div className="grid grid-cols-3 p-2 border-t border-white/5 text-white/80">
                  <span>L / 34</span>
                  <span>46" / 34"</span>
                  <span>31"</span>
                </div>
                <div className="grid grid-cols-3 p-2 border-t border-white/5 text-white/80">
                  <span>XL / 36</span>
                  <span>48" / 36"</span>
                  <span>32"</span>
                </div>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between sm:justify-start gap-4 pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-white/70">
              Quantity:
            </span>
            <div className="flex items-center border border-white/20 rounded-sm h-10 bg-[rgb(18,18,18)] overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-sm text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-bold text-white select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center text-sm text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons (Stacked Full-Width for 100% Alignment) */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full h-13 sm:h-14 bg-white text-black font-['Barlow_Condensed'] text-base sm:text-lg font-bold uppercase tracking-[2px] rounded-sm hover:bg-neutral-200 active:scale-[0.99] transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              Add To Bag • {product.priceFormatted}
            </button>

            {/* WhatsApp Direct Buy */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full h-12 sm:h-13 bg-emerald-600 hover:bg-emerald-500 text-white font-['Barlow_Condensed'] text-sm sm:text-base font-bold uppercase tracking-[1.5px] rounded-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>💬</span> Buy Directly via WhatsApp
            </button>

            {addedNotice && (
              <div className="p-3 bg-white/10 border border-white/30 rounded text-center text-xs font-bold uppercase tracking-widest text-emerald-400 animate-in fade-in">
                ✓ Added to your bag! Check your drawer.
              </div>
            )}
          </div>

          {/* Product Tabs / Accordion */}
          <div className="border-t border-white/10 pt-5 space-y-4">
            <div className="flex border-b border-white/10 gap-6 text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setActiveTab("desc")}
                className={`pb-3 transition cursor-pointer ${
                  activeTab === "desc"
                    ? "border-b-2 border-white text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`pb-3 transition cursor-pointer ${
                  activeTab === "details"
                    ? "border-b-2 border-white text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Specifications
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("shipping")}
                className={`pb-3 transition cursor-pointer ${
                  activeTab === "shipping"
                    ? "border-b-2 border-white text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Delivery & Returns
              </button>
            </div>

            <div className="text-xs sm:text-sm text-white/80 leading-relaxed pt-1">
              {activeTab === "desc" && (
                <p>{product.description}</p>
              )}
              {activeTab === "details" && (
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-white/70">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-2 text-xs text-white/70">
                  <p>• <strong>Free Shipping:</strong> On all prepaid orders nationwide.</p>
                  <p>• <strong>Dispatch:</strong> Within 24-48 business hours with live tracking link.</p>
                  <p>• <strong>Returns & Exchange:</strong> 7 days from delivery date for easy size swaps.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Complete the Look / Related Products */}
      {otherProducts.length > 0 && (
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-white/10">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase block mb-1">
              PAIR WITH THIS
            </span>
            <h2 className="font-['Barlow_Condensed'] text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-white">
              COMPLETE THE LOOK
            </h2>
          </div>
          <div className="max-w-xs sm:max-w-sm mx-auto">
            {otherProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

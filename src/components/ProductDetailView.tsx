"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, PRODUCTS, SITE_INSTAGRAM, SITE_PHONE } from "../lib/site";
import { useCart } from "../lib/cart";
import ProductCard from "./ProductCard";
import { WhatsAppIcon, InstagramIcon, PhoneIcon } from "./Icons";

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
      `Hey FALL OR FLY! I want to order:\n• Product: ${product.name}\n• Size: ${selectedSize}\n• Color: ${selectedColor}\n• Quantity: ${quantity}\n• Price: ${product.priceFormatted}\n\nPlease confirm availability!\n(Note: COD orders have ₹100 extra charge | Prepaid has Free Delivery)`
    );
    window.open(`https://wa.me/91${SITE_PHONE}?text=${text}`, "_blank");
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 md:py-16">
      {/* Breadcrumb */}
      {/* <nav className="flex items-center space-x-2 text-[11px] sm:text-xs text-white/50 mb-6 sm:mb-8 uppercase tracking-wider">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <Link href="/" className="hover:text-white transition">Track Pants</Link>
        <span>/</span>
        <span className="text-[#D4FF00] font-medium truncate">{product.name}</span>
      </nav> */}

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left: Image Gallery */}
        <div className="space-y-3 sm:space-y-4">
          {/* Main Hero Image */}
          <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-[#0C1333] border border-white/10 shadow-2xl">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#D4FF00] text-black font-display text-[10px] sm:text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-xs shadow-[0_0_12px_rgba(212,255,0,0.35)]">
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
                className={`relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 rounded overflow-hidden border-2 transition-all duration-200 cursor-pointer ${selectedImage === img
                  ? "border-[#D4FF00] scale-102 shadow-[0_0_12px_rgba(212,255,0,0.3)]"
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
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#D4FF00] uppercase block mb-1">
              {product.category} • LIMITED RUN DROP
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-wide text-white leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-3 sm:gap-4 py-3 border-y border-white/10">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D4FF00]">
              {product.priceFormatted}
            </span>
            {product.originalPriceFormatted && (
              <span className="text-sm sm:text-base text-white/40 line-through">
                {product.originalPriceFormatted}
              </span>
            )}
            <span className="px-2.5 py-1 bg-[#D4FF00]/15 text-[#D4FF00] border border-[#D4FF00]/30 text-[10px] sm:text-[11px] font-bold rounded uppercase tracking-wider">
              SAVE 33%
            </span>
          </div>

          {/* Quick Perks: Shipping & COD */}
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="px-2.5 py-1 rounded bg-[#0F1738] border border-white/10 text-white/80 flex items-center gap-1.5">
              <span>⚡</span> 2–6 Days Delivery
            </span>
            <span className="px-2.5 py-1 rounded bg-[#0F1738] border border-white/10 text-white/80 flex items-center gap-1.5">
              <span>📦</span> Free Shipping (Prepaid)
            </span>
            <span className="px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/25 text-amber-300 flex items-center gap-1.5 font-medium">
              <span>💵</span> COD Available (+₹100 charge)
            </span>
          </div>

          {/* Color Selector */}
          <div className="space-y-2.5">
            {/* <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-white">
              <span>Color: <span className="text-[#D4FF00] font-normal">{selectedColor}</span></span>
            </div> */}
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`h-10 px-4 rounded-sm text-xs font-display font-bold uppercase tracking-wider border transition-all duration-150 cursor-pointer flex items-center justify-center ${selectedColor === c
                    ? "bg-[#D4FF00] text-black border-[#D4FF00] shadow-[0_0_12px_rgba(212,255,0,0.3)] font-extrabold scale-102"
                    : "bg-[#0F1738] text-white/80 border-white/20 hover:border-white/60 hover:text-white"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector (L & XL Only) */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-white">
              {/* <span>
                Size: <span className="text-[#D4FF00] font-normal">{selectedSize}</span>
                <span className="text-white/40 font-normal ml-2">(Available in L & XL)</span>
              </span> */}
              <button
                type="button"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-white/70 underline hover:text-[#D4FF00] transition font-medium cursor-pointer"
              >
                Size Chart 📏
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
                    className={`min-w-[4.5rem] h-12 px-4 rounded-sm font-display text-base font-bold uppercase border transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 ${isSelected
                      ? "bg-[#D4FF00] text-black border-[#D4FF00] shadow-[0_0_15px_rgba(212,255,0,0.35)] font-black scale-102"
                      : "bg-[#0F1738] text-white/80 border-white/20 hover:border-white/70 hover:text-white"
                      }`}
                  >
                    <span>{s}</span>
                    <span className="text-[10px] opacity-70">
                      {s === "L" ? "(30-34)" : "(34-36)"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Chart Modal Inline */}
          {showSizeGuide && (
            <div className="p-4 bg-[#0C1333] border border-white/20 rounded-sm text-xs space-y-3 shadow-2xl animate-in fade-in duration-200">
              <div className="flex justify-between font-bold uppercase tracking-wider text-white">
                <span className="font-display text-sm text-[#D4FF00]">SIZE CHART</span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(false)}
                  className="text-white/60 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-white/70">
                These are the only available sizes for this limited drop.
              </p>
              <div className="border border-white/10 rounded overflow-hidden">
                <div className="grid grid-cols-3 bg-[#0F1738] p-2.5 font-display font-bold uppercase text-white text-xs">
                  <span>SIZE</span>
                  <span>LENGTH</span>
                  <span>WAIST</span>
                </div>
                <div className="grid grid-cols-3 p-2.5 border-t border-white/10 text-white font-medium">
                  <span className="text-[#D4FF00] font-bold">L</span>
                  <span>41 cm</span>
                  <span>30 - 34</span>
                </div>
                <div className="grid grid-cols-3 p-2.5 border-t border-white/10 text-white font-medium">
                  <span className="text-[#D4FF00] font-bold">XL</span>
                  <span>42 cm</span>
                  <span>34 - 36</span>
                </div>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between sm:justify-start gap-4 pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-white/70">
              Quantity:
            </span>
            <div className="flex items-center border border-white/20 rounded-sm h-10 bg-[#0F1738] overflow-hidden">
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

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full h-13 sm:h-14 bg-[#D4FF00] hover:bg-[#BEF200] text-black font-display text-base sm:text-lg font-bold uppercase tracking-[2px] rounded-sm active:scale-[0.99] transition-all shadow-[0_4px_25px_rgba(212,255,0,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Add To Bag • {product.priceFormatted}
            </button>

            {/* WhatsApp Direct Buy */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full h-12 sm:h-13 bg-emerald-600 hover:bg-emerald-500 text-white font-display text-sm sm:text-base font-bold uppercase tracking-[1.5px] rounded-sm transition-all flex items-center justify-center gap-2.5 shadow-lg cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              <span>Buy Directly via WhatsApp</span>
            </button>

            {addedNotice && (
              <div className="p-3 bg-[#D4FF00]/15 border border-[#D4FF00]/40 rounded text-center text-xs font-bold uppercase tracking-widest text-[#D4FF00] animate-in fade-in">
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
                className={`pb-3 transition cursor-pointer ${activeTab === "desc"
                  ? "border-b-2 border-[#D4FF00] text-[#D4FF00]"
                  : "text-white/50 hover:text-white"
                  }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`pb-3 transition cursor-pointer ${activeTab === "details"
                  ? "border-b-2 border-[#D4FF00] text-[#D4FF00]"
                  : "text-white/50 hover:text-white"
                  }`}
              >
                Features & Specs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("shipping")}
                className={`pb-3 transition cursor-pointer ${activeTab === "shipping"
                  ? "border-b-2 border-[#D4FF00] text-[#D4FF00]"
                  : "text-white/50 hover:text-white"
                  }`}
              >
                Shipping & Returns
              </button>
            </div>

            <div className="text-xs sm:text-sm text-white/80 leading-relaxed pt-1">
              {/* DESCRIPTION TAB */}
              {activeTab === "desc" && (
                <div className="space-y-3 font-light text-white/90">
                  <p className="font-semibold text-white text-sm sm:text-base">
                    Designed for everyday comfort and effortless movement.
                  </p>
                  <p className="leading-relaxed text-white/80">
                    Crafted from lightweight imported fabric, these pants feature quick-dry properties, a relaxed fit, and a wide-leg silhouette for all-day comfort. Finished with adjustable bottom drawstrings and detailed embroidery work, they combine functionality with distinctive style.
                  </p>
                  <p className="text-[#D4FF00] font-medium pt-1">
                    ⚡ Perfect for daily wear, travelling, gym sessions, and casual outings.
                  </p>
                </div>
              )}

              {/* PRODUCT FEATURES TAB */}
              {activeTab === "details" && (
                <div className="space-y-3">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#D4FF00] block">
                    PRODUCT FEATURES
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/85 font-light">
                    {product.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#D4FF00] font-bold text-sm leading-tight shrink-0">✦</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* SHIPPING, DELIVERY & RETURNS TAB */}
              {activeTab === "shipping" && (
                <div className="space-y-4 text-xs sm:text-sm text-white/80 font-light">
                  {/* Shipping & Delivery Box */}
                  <div className="p-3.5 bg-[#0F1738] rounded border border-white/10 space-y-2">
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-[#D4FF00] block">
                      SHIPPING & DELIVERY
                    </span>
                    <ul className="space-y-1.5 text-white/85">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4FF00]">✦</span>
                        <span>Estimated delivery: 2–6 business days.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4FF00]">✦</span>
                        <span>Delivery timelines may vary depending on your location.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-300">✦</span>
                        <span className="text-amber-200">COD (Cash on Delivery) orders: 100₹ extra charge.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400">✦</span>
                        <span className="text-emerald-300">Prepaid orders (UPI / Card / NetBanking): Free Delivery.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Return Policy Box */}
                  <div className="p-3.5 bg-[#0F1738] rounded border border-white/10 space-y-2">
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-[#D4FF00] block">
                      RETURN POLICY
                    </span>
                    <ul className="space-y-1.5 text-white/85">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4FF00]">✦</span>
                        <span>Returns are accepted within 4 days of delivery.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4FF00]">✦</span>
                        <span>An unboxing video is mandatory for reporting any damaged or defective product.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4FF00]">✦</span>
                        <span>Please ensure the damage is clearly visible in the video.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Customer Care Box */}
                  <div className="p-3.5 bg-[#0F1738] rounded border border-white/10 space-y-2.5">
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-[#D4FF00] block">
                      CUSTOMER CARE
                    </span>
                    <p className="text-white/85 flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-[#D4FF00] shrink-0" />
                      <span>
                        For any queries or assistance:{" "}
                        <a
                          href={`tel:${SITE_PHONE}`}
                          className="text-[#D4FF00] font-bold underline hover:text-[#BEF200]"
                        >
                          {SITE_PHONE}
                        </a>
                      </span>
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>WhatsApp Support:</span>
                      <a
                        href={`https://wa.me/91${SITE_PHONE}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#D4FF00] font-semibold underline hover:text-[#BEF200]"
                      >
                        +91 {SITE_PHONE}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>Instagram:</span>
                      <a
                        href={`https://instagram.com/${SITE_INSTAGRAM}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#D4FF00] font-semibold underline hover:text-[#BEF200]"
                      >
                        @{SITE_INSTAGRAM}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Complete the Look / Related Products (Only if additional products exist) */}
      {otherProducts.length > 0 && (
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-white/10">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase block mb-1">
              PAIR WITH THIS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-white">
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

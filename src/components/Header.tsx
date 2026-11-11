"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCart } from "../lib/cart";
import { NAV_LINKS } from "../lib/site";

function HeaderNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {NAV_LINKS.map((link) => {
        let isActive = false;
        if (link.category) {
          isActive = (pathname === "/" || pathname.startsWith("/collections/all")) && (
            (link.category === "ALL" && !currentCategory) ||
            currentCategory === link.category
          );
        } else {
          isActive = pathname === link.href;
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group relative px-4 py-2 font-['Barlow_Condensed'] text-base tracking-[0.15em] font-bold uppercase transition-all duration-200 ${
              isActive ? "text-white" : "text-white/70 hover:text-white"
            }`}
          >
            <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5 inline-block">
              {link.label}
            </span>

            {/* Highpe animated bottom border underline */}
            <span
              className={`absolute bottom-0 left-3 right-3 h-[2px] bg-white transition-all duration-300 ease-out ${
                isActive
                  ? "scale-x-100 opacity-100"
                  : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 origin-left"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}

export default function Header() {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 w-full bg-[rgb(11,11,11)]/95 backdrop-blur-md border-b border-white/10 text-white select-none transition-all">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Mobile menu toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-white/80 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Brand Logo with Highpe font & aesthetic */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 group transition"
          >
            <img
              src="/assets/logo.jpeg"
              alt="FLY OR FALL"
              className="h-8 sm:h-10 w-auto"
            />
            <span className="font-['Barlow_Condensed'] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[0.2em] uppercase text-white group-hover:text-white/80 transition hidden">
              FLY OR FALL
            </span>
          </Link>
        </div>

        {/* Desktop Navigation with animated underlines */}
        <Suspense fallback={<div className="hidden lg:flex w-96 h-6" />}>
          <HeaderNav />
        </Suspense>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-full transition"
            aria-label="Search products"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Wishlist Link */}
          <Link
            href="/cart"
            className="p-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-full transition hidden sm:flex items-center"
            title="Wishlist"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Link>

          {/* Cart Icon with Live Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-full transition relative flex items-center"
            aria-label="View shopping cart"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute 0 top-1 right-1 bg-white text-black font-['Barlow_Condensed'] font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="bg-[rgb(18,18,18)] border-t border-b border-white/10 px-4 py-3 transition animate-in fade-in duration-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
                setSearchOpen(false);
              }
            }}
            className="max-w-2xl mx-auto flex items-center gap-3"
          >
            <svg
              className="w-5 h-5 text-white/50 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search Gravity Tee, Altitude Cargo, Streetwear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/40 text-sm focus:outline-hidden py-1"
              autoFocus
            />
            {searchQuery && (
              <button
                type="submit"
                className="px-3 py-1 bg-white text-black text-xs font-bold uppercase rounded hover:bg-neutral-200 transition shrink-0 cursor-pointer"
              >
                Go
              </button>
            )}
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-white/60 hover:text-white text-xs uppercase shrink-0 cursor-pointer"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[rgb(14,14,14)] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-['Barlow_Condensed'] text-xl font-bold tracking-widest uppercase text-white/90 hover:text-white py-2 border-b border-white/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex items-center justify-between text-xs text-white/60">
            <span>DARE TO FLY. READY TO FALL.</span>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white underline font-semibold"
            >
              Bag ({totalItems})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

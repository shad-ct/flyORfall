"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../lib/cart";
import { NAV_LINKS, SITE_INSTAGRAM, SITE_PHONE } from "../lib/site";
import { InstagramIcon, PhoneIcon } from "./Icons";

function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {NAV_LINKS.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href === "/" && pathname.startsWith("/products"));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group relative px-4 py-2 font-display text-sm tracking-[0.15em] font-bold uppercase transition-all duration-200 ${
              isActive ? "text-[#D4FF00]" : "text-white/70 hover:text-white"
            }`}
          >
            <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5 inline-block">
              {link.label}
            </span>

            {/* Glowing animated bottom border underline */}
            <span
              className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#D4FF00] transition-all duration-300 ease-out ${
                isActive
                  ? "scale-x-100 opacity-100 shadow-[0_0_8px_#D4FF00]"
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
    <header className="sticky top-0 z-40 w-full bg-[#080D26]/95 backdrop-blur-md border-b border-white/10 text-white select-none transition-all">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Mobile menu toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#D4FF00] focus:outline-hidden transition cursor-pointer"
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

        {/* Brand Logo with Space Grotesk aesthetic */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-3 group transition cursor-pointer"
          >
            <img
              src="/assets/logo.jpeg"
              alt="FALL OR FLY"
              className="h-8 sm:h-10 w-auto rounded-sm"
            />
            <span className="font-display text-xl sm:text-2xl font-black tracking-[0.2em] uppercase text-white group-hover:text-[#D4FF00] transition">
              FALL OR FLY
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <Suspense fallback={<div className="hidden lg:flex w-96 h-6" />}>
          <HeaderNav />
        </Suspense>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Instagram Link */}
          <a
            href={`https://instagram.com/${SITE_INSTAGRAM}`}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 text-white/80 hover:text-[#D4FF00] hover:bg-white/5 rounded-full transition cursor-pointer"
            aria-label={`Instagram @${SITE_INSTAGRAM}`}
            title={`@${SITE_INSTAGRAM} on Instagram`}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 text-white/80 hover:text-[#D4FF00] hover:bg-white/5 rounded-full transition cursor-pointer"
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

          {/* Cart Icon with Live Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2.5 text-white/80 hover:text-[#D4FF00] hover:bg-white/5 rounded-full transition relative flex items-center cursor-pointer"
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
              <span className="absolute 0 top-1 right-1 bg-[#D4FF00] text-black font-display font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="bg-[#0F1738] border-t border-b border-white/10 px-4 py-3 transition animate-in fade-in duration-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/");
              setSearchOpen(false);
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
              placeholder="Search Track Pants, Sizing, Policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/40 text-sm focus:outline-hidden py-1"
              autoFocus
            />
            {searchQuery && (
              <button
                type="submit"
                className="px-3 py-1 bg-[#D4FF00] text-black text-xs font-bold uppercase rounded hover:bg-[#BEF200] transition shrink-0 cursor-pointer"
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
        <div className="lg:hidden bg-[#0C1333] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-display text-lg font-bold tracking-widest uppercase text-white/90 hover:text-[#D4FF00] py-2 border-b border-white/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2.5 text-xs text-white/60">
            <div className="flex items-center justify-between">
              <span className="text-[#D4FF00] font-bold tracking-wider">FLY HIGH</span>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#D4FF00] underline font-semibold"
              >
                Bag ({totalItems})
              </Link>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <a
                href={`https://instagram.com/${SITE_INSTAGRAM}`}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#D4FF00] font-semibold flex items-center gap-1.5"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>@{SITE_INSTAGRAM}</span>
              </a>
              <a
                href={`tel:${SITE_PHONE}`}
                className="text-[#D4FF00] font-semibold flex items-center gap-1.5"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>{SITE_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

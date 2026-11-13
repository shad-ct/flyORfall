"use client";

import React from "react";
import Link from "next/link";
import { SITE_INSTAGRAM, SITE_PHONE } from "../lib/site";
import { WhatsAppIcon, InstagramIcon, PhoneIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050816] border-t border-white/10 text-white select-none">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        {/* Main Sleek Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-10 border-b border-white/10">
          {/* Brand & Slogan */}
          <div className="space-y-3">
            <h3 className="font-display text-2xl sm:text-3xl font-black tracking-widest uppercase text-white">
              FALL OR FLY
            </h3>
            <p className="text-xs font-display font-bold uppercase tracking-[0.2em] text-[#D4FF00]">
              FLY HIGH
            </p>
            <p className="text-xs text-white/60 leading-relaxed font-light max-w-sm">
              Streetwear inspired by everyday wear, travel, and personal expression.
            </p>
          </div>

          {/* Orders & Policies */}
          <div className="space-y-3 text-xs">
            <span className="font-display font-bold uppercase tracking-widest text-white text-[11px] block">
              Shipping & Returns
            </span>
            <ul className="space-y-2 text-white/60 font-light">
              <li className="flex items-center gap-2">
                <span className="text-[#D4FF00]">✦</span>
                <span>Delivery: 2–6 business days nationwide</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4FF00]">✦</span>
                <span>Prepaid: Free shipping • COD: +₹100</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#D4FF00]">✦</span>
                <span>4-day returns (unboxing video mandatory)</span>
              </li>
            </ul>
          </div>

          {/* Customer Care & Contact */}
          <div className="space-y-3 text-xs">
            <span className="font-display font-bold uppercase tracking-widest text-white text-[11px] block">
              Customer Care
            </span>
            <div className="space-y-2.5 text-white/70">
              <a
                href={`tel:${SITE_PHONE}`}
                className="hover:text-[#D4FF00] transition flex items-center gap-2.5 group"
              >
                <PhoneIcon className="w-4 h-4 text-[#D4FF00] shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-white/50">Phone:</span>
                <span className="font-semibold text-white group-hover:text-[#D4FF00] transition-colors">{SITE_PHONE}</span>
              </a>
              <a
                href={`https://wa.me/91${SITE_PHONE}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#D4FF00] transition flex items-center gap-2.5 group"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-white/50">WhatsApp:</span>
                <span className="font-semibold text-white group-hover:text-[#D4FF00] transition-colors">+91 {SITE_PHONE}</span>
              </a>
              <a
                href={`https://instagram.com/${SITE_INSTAGRAM}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#D4FF00] transition flex items-center gap-2.5 group"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-white/50">Instagram:</span>
                <span className="font-semibold text-[#D4FF00] group-hover:underline">@{SITE_INSTAGRAM}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <p>© {new Date().getFullYear()} FALL OR FLY. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs font-display uppercase tracking-widest text-white/50">
            <span className="text-[#D4FF00]">FLY HIGH</span>
            <span>•</span>
            <Link href="/" className="hover:text-white transition">
              Track Pants
            </Link>
            <span>•</span>
            <Link href="/pages/about-us" className="hover:text-white transition">
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

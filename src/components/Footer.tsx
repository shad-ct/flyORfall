"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[rgb(11,11,11)] border-t border-white/10 text-white select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-['Barlow_Condensed'] text-3xl font-extrabold tracking-widest uppercase text-white">
              FLY OR FALL
            </h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Born from urban ambition and the fearless spirit of youth. Premium streetwear crafted in Hindustan with uncompromising heavyweight fabrics and razor-sharp cuts.
            </p>
            <div className="pt-2 text-xs font-semibold text-white/50 tracking-wider uppercase">
              DARE TO FLY. READY TO FALL.
            </div>
          </div>

          {/* Collections & Shop */}
          <div className="space-y-4">
            <h4 className="font-['Barlow_Condensed'] text-base font-bold tracking-widest uppercase text-white">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/collections" className="hover:text-white transition">
                  Latest Drops (2024)
                </Link>
              </li>
              <li>
                <Link href="/collections/all" className="hover:text-white transition">
                  All Streetwear Pieces
                </Link>
              </li>
              <li>
                <Link href="/products/gravity-drop-oversized-tee" className="hover:text-white transition">
                  Gravity Drop Oversized Tee
                </Link>
              </li>
              <li>
                <Link href="/products/altitude-cargo-pants" className="hover:text-white transition">
                  Altitude Cargo Pants
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Policies */}
          <div className="space-y-4">
            <h4 className="font-['Barlow_Condensed'] text-base font-bold tracking-widest uppercase text-white">
              HELP & POLICIES
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/pages/about-us" className="hover:text-white transition">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition">
                  Shipping & Delivery (Pan India)
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition">
                  7-Day Return & Size Exchange
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition">
                  Terms & Conditions
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="font-['Barlow_Condensed'] text-base font-bold tracking-widest uppercase text-white">
              CONNECT WITH US
            </h4>
            <p className="text-white/60 text-sm">
              Direct line for sizing assistance, orders & community collabs:
            </p>
            <div className="space-y-2 text-sm">
              <a
                href="https://wa.me/+919037235174"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition"
              >
                <span>💬</span> WhatsApp Support: +91 90372 35174
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition"
              >
                <span>📸</span> Instagram: @flyorfall.in
              </a>
            </div>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-[11px] font-bold tracking-wider rounded uppercase">
                Free Express Delivery Nationwide
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-4 sm:space-y-0">
          <p>© 2024 FLY OR FALL. All rights reserved.</p>
          <div className="flex space-x-6">
            <span>Designed for the Streets</span>
            <span>•</span>
            <span>Crafted in Hindustan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import { SITE_INSTAGRAM, SITE_PHONE } from "../lib/site";

export default function AnnouncementBar() {
  const announcements = [
    "FLY OR FLY • FLY HIGH",
    "IMPORTED LIGHTWEIGHT TRACK PANTS • ₹999",
    "COD ORDERS EXTRA 100₹ CHARGE",
    "FREE DELIVERY ON PREPAID ORDERS",
    "DELIVERY IN 2–6 BUSINESS DAYS",
    `INSTAGRAM: @${SITE_INSTAGRAM}`,
    `CUSTOMER CARE: ${SITE_PHONE}`,
    "USE CODE : 'FLYFALL200'",
    "4-DAY EASY RETURNS (UNBOXING VIDEO MANDATORY)",
  ];

  return (
    <div className="w-full block bg-[#0F1738] border-b border-white/10 overflow-hidden select-none py-2.5">
      <div className="flex w-max animate-marquee">
        <div className="flex items-center shrink-0 whitespace-nowrap">
          {announcements.map((text, i) => (
            <span
              key={`a-${i}`}
              className="px-6 text-white text-xs font-semibold tracking-widest uppercase font-display"
            >
              {text} <span className="text-[#D4FF00] ml-4">•</span>
            </span>
          ))}
        </div>
        <div className="flex items-center shrink-0 whitespace-nowrap">
          {announcements.map((text, i) => (
            <span
              key={`b-${i}`}
              className="px-6 text-white text-xs font-semibold tracking-widest uppercase font-display"
            >
              {text} <span className="text-[#D4FF00] ml-4">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

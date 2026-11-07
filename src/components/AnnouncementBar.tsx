"use client";

import React from "react";

export default function AnnouncementBar() {
  const announcements = [
    "FLY OR FALL",
    "STREETWEAR",
    "USE CODE : 'FLYFALL200'",
    "FAST DELIVERY ACROSS INDIA",
    "DARE TO FLY. READY TO FALL.",
    "2 EXCLUSIVE DROPS AVAILABLE",
    "PREMIUM 260 GSM FRENCH TERRY",
    "FREE SHIPPING ABOVE ₹999",
  ];

  return (
    <div className="w-full block bg-accent border-b border-white/10 overflow-hidden select-none py-2.5">
      <div className="flex w-max animate-marquee">
        <div className="flex items-center shrink-0 whitespace-nowrap">
          {announcements.map((text, i) => (
            <span
              key={`a-${i}`}
              className="px-6 text-white text-xs font-semibold tracking-widest uppercase"
            >
              {text} <span className="text-white/40 ml-4">•</span>
            </span>
          ))}
        </div>
        <div className="flex items-center shrink-0 whitespace-nowrap">
          {announcements.map((text, i) => (
            <span
              key={`b-${i}`}
              className="px-6 text-white text-xs font-semibold tracking-widest uppercase"
            >
              {text} <span className="text-white/40 ml-4">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


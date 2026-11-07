"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "../lib/cart";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 transition-opacity backdrop-blur-xs"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[rgb(18,18,18)] text-white border-l border-white/10 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold uppercase tracking-wider font-['Barlow_Condensed']">
                Your Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-white/70 hover:text-white transition"
              aria-label="Close cart"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center text-white/40">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">Your shopping bag is empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition rounded-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-white/5"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded bg-white/5 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Barlow_Condensed'] font-semibold text-base uppercase text-white truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      Size: {item.size} • Color: {item.color}
                    </p>
                    <p className="text-sm font-bold text-white mt-1">
                      {item.product.priceFormatted}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-white/20 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2.5 py-1 text-xs text-white/70 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2.5 py-1 text-xs text-white/70 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-400 hover:text-red-300 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[rgb(14,14,14)] space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Subtotal</span>
                <span className="font-bold text-white">
                  Rs. {totalPrice.toLocaleString("en-IN")}.00
                </span>
              </div>
              <p className="text-xs text-white/50">
                Taxes included. Free express shipping applied at checkout.
              </p>
              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full py-3.5 bg-white text-black text-center font-['Barlow_Condensed'] text-base font-bold uppercase tracking-wider rounded-sm hover:bg-white/90 transition shadow-lg"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full py-2.5 text-center text-xs text-white/60 uppercase tracking-widest hover:text-white transition"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


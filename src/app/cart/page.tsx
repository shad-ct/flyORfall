"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../../lib/cart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Address form for checkout
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "FLYFALL200" || code === "WELCOME200") {
      setDiscount(200);
      setCouponMessage({ text: "Coupon applied: ₹200 discount!" });
    } else {
      setCouponMessage({ text: "Invalid coupon code. Try FLYFALL200", error: true });
    }
  };

  const finalTotal = Math.max(0, totalPrice - discount);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Please fill in your name, phone number, and delivery address.");
      return;
    }

    const orderSummary = items
      .map(
        (i) => `• ${i.product.name} (${i.size}, ${i.color}) x ${i.quantity} = Rs. ${i.product.price * i.quantity}`
      )
      .join("\n");

    const message = encodeURIComponent(
      `*NEW ORDER - FLY OR FALL*\n\n` +
      `*Customer:* ${customerInfo.name}\n` +
      `*Phone:* ${customerInfo.phone}\n` +
      `*Address:* ${customerInfo.address}, ${customerInfo.city} - ${customerInfo.pincode}\n\n` +
      `*Items:*\n${orderSummary}\n\n` +
      `*Subtotal:* Rs. ${totalPrice}\n` +
      `*Discount:* Rs. ${discount}\n` +
      `*Total Payable:* Rs. ${finalTotal}\n\n` +
      `Please confirm dispatch & payment link!`
    );

    // Open WhatsApp
    window.open(`https://wa.me/+919037235174?text=${message}`, "_blank");
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-4xl mx-auto">
          ✓
        </div>
        <h1 className="font-['Barlow_Condensed'] text-5xl font-black uppercase text-white">
          ORDER INITIATED!
        </h1>
        <p className="text-white/70 text-sm">
          Your order details have been forwarded to our WhatsApp fulfillment desk. We'll reply within 15 minutes with tracking & confirmation.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3.5 bg-white text-black font-['Barlow_Condensed'] text-base font-bold uppercase tracking-widest rounded hover:bg-white/90"
        >
          Back To Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-16">
      <div className="mb-10 pb-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase block mb-1">
            CHECKOUT DESK
          </span>
          <h1 className="font-['Barlow_Condensed'] text-4xl sm:text-5xl font-black uppercase tracking-wide text-white">
            YOUR SHOPPING BAG
          </h1>
        </div>
        <Link
          href="/collections/all"
          className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white underline"
        >
          Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-[rgb(16,16,16)] rounded-lg border border-white/10 space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/40 text-2xl">
            🛍️
          </div>
          <div className="space-y-2">
            <h2 className="font-['Barlow_Condensed'] text-3xl font-bold uppercase text-white">
              YOUR BAG IS EMPTY
            </h2>
            <p className="text-white/60 text-sm">
              Explore our 2-piece limited drop and claim your fit before it sells out.
            </p>
          </div>
          <Link
            href="/collections/all"
            className="inline-block px-8 py-3.5 bg-white text-black font-['Barlow_Condensed'] text-base font-bold uppercase tracking-widest rounded hover:bg-white/90 transition shadow-lg"
          >
            Explore The Drop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
          {/* Item List */}
          <div className="space-y-6">
            <div className="border border-white/10 rounded-lg overflow-hidden bg-[rgb(16,16,16)] divide-y divide-white/10">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded bg-white/5 shrink-0"
                    />
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-['Barlow_Condensed'] text-lg font-bold uppercase text-white hover:underline block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-white/60 mt-1">
                        Size: <span className="text-white font-semibold">{item.size}</span> • Color: <span className="text-white font-semibold">{item.color}</span>
                      </p>
                      <p className="text-sm font-bold text-white mt-1">
                        {item.product.priceFormatted}
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center gap-6 self-end sm:self-center">
                    <div className="flex items-center border border-white/20 rounded-sm h-9 bg-[rgb(18,18,18)] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-full flex items-center justify-center text-sm text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white select-none">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-full flex items-center justify-center text-sm text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-white">
                        Rs. {(item.product.price * item.quantity).toLocaleString("en-IN")}.00
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-400 hover:text-red-300 underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Bag */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-xs text-white/50 hover:text-white uppercase tracking-wider underline"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Summary / Checkout Box */}
          <div className="space-y-6">
            <div className="p-6 bg-[rgb(16,16,16)] border border-white/10 rounded-lg space-y-6">
              <h2 className="font-['Barlow_Condensed'] text-2xl font-bold uppercase tracking-wider text-white border-b border-white/10 pb-4">
                ORDER SUMMARY
              </h2>

              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                  Have a Discount Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="FLYFALL200"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/20 rounded px-3 py-2 text-xs uppercase text-white placeholder-white/30 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase rounded transition"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-xs ${
                      couponMessage.error ? "text-red-400" : "text-emerald-400 font-semibold"
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm border-t border-white/10 pt-4">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>Rs. {totalPrice.toLocaleString("en-IN")}.00</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Discount (FLYFALL200)</span>
                    <span>- Rs. {discount}.00</span>
                  </div>
                )}
                <div className="flex justify-between text-white/70">
                  <span>Standard Pan-India Shipping</span>
                  <span className="text-emerald-400 font-bold uppercase text-xs">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white border-t border-white/10 pt-3">
                  <span>Total</span>
                  <span>Rs. {finalTotal.toLocaleString("en-IN")}.00</span>
                </div>
              </div>

              {/* Address toggle / Direct checkout */}
              {!isCheckingOut ? (
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-4 bg-white text-black font-['Barlow_Condensed'] text-base font-bold uppercase tracking-widest rounded hover:bg-white/90 transition shadow-xl"
                >
                  Proceed to Delivery Details
                </button>
              ) : (
                <form onSubmit={handleCompleteOrder} className="space-y-3 pt-2 border-t border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-white block">
                    Shipping Details:
                  </span>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-xs text-white focus:outline-hidden"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (WhatsApp) *"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-xs text-white focus:outline-hidden"
                  />
                  <input
                    type="text"
                    placeholder="Street Address / House No. *"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-xs text-white focus:outline-hidden"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="City *"
                      required
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      className="bg-white/5 border border-white/20 rounded px-3 py-2 text-xs text-white focus:outline-hidden"
                    />
                    <input
                      type="text"
                      placeholder="Pincode *"
                      required
                      value={customerInfo.pincode}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                      className="bg-white/5 border border-white/20 rounded px-3 py-2 text-xs text-white focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-['Barlow_Condensed'] text-base font-bold uppercase tracking-widest rounded transition shadow-xl mt-3"
                  >
                    Confirm & Order via WhatsApp
                  </button>
                </form>
              )}

              <p className="text-[11px] text-white/50 text-center">
                🔒 Safe & encrypted checkout. Instant order confirmation on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


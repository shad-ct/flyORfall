"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../../lib/cart";
import { WhatsAppIcon, InstagramIcon, PhoneIcon } from "../../components/Icons";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"prepaid" | "cod">("prepaid");

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

  const codCharge = paymentMethod === "cod" ? 100 : 0;
  const finalTotal = Math.max(0, totalPrice - discount) + codCharge;

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

    const paymentDetails =
      paymentMethod === "cod"
        ? `*Payment Method:* Cash on Delivery (COD)\n*COD Handling Charge:* Rs. 100\n*Total Payable on Delivery:* Rs. ${finalTotal}`
        : `*Payment Method:* Prepaid (Online)\n*Delivery:* Free (Prepaid Order)\n*Total Payable:* Rs. ${finalTotal}`;

    const note =
      paymentMethod === "cod"
        ? `Please confirm my Cash on Delivery order and proceed with dispatch!`
        : `Please confirm dispatch & send UPI / payment link!`;

    const message = encodeURIComponent(
      `*NEW ORDER - FALL OR FLY*\n\n` +
      `*Customer:* ${customerInfo.name}\n` +
      `*Phone:* ${customerInfo.phone}\n` +
      `*Address:* ${customerInfo.address}, ${customerInfo.city} - ${customerInfo.pincode}\n\n` +
      `*Items:*\n${orderSummary}\n\n` +
      `*Subtotal:* Rs. ${totalPrice}\n` +
      (discount > 0 ? `*Discount:* -Rs. ${discount}\n` : "") +
      `${paymentDetails}\n\n` +
      `${note}`
    );

    // Open WhatsApp
    window.open(`https://wa.me/918590877545?text=${message}`, "_blank");
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-[#D4FF00]/20 text-[#D4FF00] rounded-full flex items-center justify-center text-4xl mx-auto">
          ✓
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-white">
          ORDER INITIATED!
        </h1>
        <p className="text-white/70 text-sm">
          Your order details have been forwarded to our WhatsApp fulfillment desk. We'll reply shortly with tracking & payment confirmation.
        </p>
        <Link
          href="/products/altitude-cargo-pants"
          className="inline-block px-8 py-3.5 bg-[#D4FF00] text-black font-display text-base font-bold uppercase tracking-widest rounded hover:bg-[#BEF200] transition shadow-lg"
        >
          Back To Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-16">
      <div className="mb-10 pb-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-[#D4FF00] uppercase block mb-1">
            CHECKOUT DESK
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-wide text-white">
            YOUR SHOPPING BAG
          </h1>
        </div>
        <Link
          href="/products/altitude-cargo-pants"
          className="text-xs font-bold uppercase tracking-widest text-[#D4FF00] hover:underline"
        >
          Continue Shopping →
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-[#0F1738] rounded-lg border border-white/10 space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/40 text-2xl">
            🛍️
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold uppercase text-white">
              YOUR BAG IS EMPTY
            </h2>
            <p className="text-white/60 text-sm">
              Discover our exclusive Altitude Cargo Pants and claim your fit before it sells out.
            </p>
          </div>
          <Link
            href="/products/altitude-cargo-pants"
            className="inline-block px-8 py-3.5 bg-[#D4FF00] text-black font-display text-base font-bold uppercase tracking-widest rounded hover:bg-[#BEF200] transition shadow-xl"
          >
            Explore Altitude Cargo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
          {/* Item List */}
          <div className="space-y-6">
            <div className="border border-white/10 rounded-lg overflow-hidden bg-[#0F1738] divide-y divide-white/10">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded bg-[#0C1333] shrink-0"
                    />
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-display text-lg font-bold uppercase text-white hover:text-[#D4FF00] block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-white/60 mt-1">
                        Size: <span className="text-[#D4FF00] font-semibold">{item.size}</span> • Color: <span className="text-white font-semibold">{item.color}</span>
                      </p>
                      <p className="text-sm font-bold text-white mt-1">
                        {item.product.priceFormatted}
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center gap-6 self-end sm:self-center">
                    <div className="flex items-center border border-white/20 rounded-sm h-9 bg-[#131C44] overflow-hidden">
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
                      <div className="text-sm font-bold text-[#D4FF00]">
                        Rs. {(item.product.price * item.quantity).toLocaleString("en-IN")}.00
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-400 hover:text-red-300 underline mt-1 cursor-pointer"
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
                className="text-xs text-white/50 hover:text-white uppercase tracking-wider underline cursor-pointer"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Summary / Checkout Box */}
          <div className="space-y-6">
            <div className="p-6 bg-[#0F1738] border border-white/10 rounded-lg space-y-6">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white border-b border-white/10 pb-4">
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
                    className="flex-1 bg-[#131C44] border border-white/20 rounded px-3 py-2 text-xs uppercase text-white placeholder-white/30 focus:outline-hidden focus:border-[#D4FF00]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#D4FF00] hover:bg-[#BEF200] text-black text-xs font-bold uppercase rounded transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-xs ${
                      couponMessage.error ? "text-red-400" : "text-[#D4FF00] font-semibold"
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}
              </form>

              {/* Payment Method Selector */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-white">
                    Select Payment Method:
                  </label>
                  <span className="text-[10px] text-white/50 uppercase">
                    {paymentMethod === "cod" ? "COD: +₹100" : "Prepaid: Free"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Prepaid Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("prepaid")}
                    className={`p-3 rounded border text-left transition cursor-pointer flex flex-col justify-between ${
                      paymentMethod === "prepaid"
                        ? "bg-[#131C44] border-[#D4FF00] shadow-[0_0_15px_rgba(212,255,0,0.18)]"
                        : "bg-[#0A102A] border-white/15 hover:border-white/30 text-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-display font-bold text-xs uppercase text-white flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            paymentMethod === "prepaid"
                              ? "border-[#D4FF00] bg-[#D4FF00]"
                              : "border-white/40"
                          }`}
                        >
                          {paymentMethod === "prepaid" && (
                            <span className="w-1.5 h-1.5 bg-black rounded-full" />
                          )}
                        </span>
                        Prepaid (Online)
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 bg-[#D4FF00]/15 text-[#D4FF00] border border-[#D4FF00]/30 rounded">
                        FREE
                      </span>
                    </div>
                    <p className="text-[11px] text-white/60 mt-1.5 pl-5 leading-tight">
                      UPI, GPay, PhonePe, Cards
                    </p>
                  </button>

                  {/* Cash on Delivery Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3 rounded border text-left transition cursor-pointer flex flex-col justify-between ${
                      paymentMethod === "cod"
                        ? "bg-[#131C44] border-[#D4FF00] shadow-[0_0_15px_rgba(212,255,0,0.18)]"
                        : "bg-[#0A102A] border-white/15 hover:border-white/30 text-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-display font-bold text-xs uppercase text-white flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            paymentMethod === "cod"
                              ? "border-[#D4FF00] bg-[#D4FF00]"
                              : "border-white/40"
                          }`}
                        >
                          {paymentMethod === "cod" && (
                            <span className="w-1.5 h-1.5 bg-black rounded-full" />
                          )}
                        </span>
                        Cash on Delivery
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded">
                        +₹100
                      </span>
                    </div>
                    <p className="text-[11px] text-white/60 mt-1.5 pl-5 leading-tight">
                      Pay cash at doorstep (+₹100 charge)
                    </p>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm border-t border-white/10 pt-4">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>Rs. {totalPrice.toLocaleString("en-IN")}.00</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#D4FF00] font-medium">
                    <span>Discount (FLYFALL200)</span>
                    <span>- Rs. {discount}.00</span>
                  </div>
                )}
                <div className="flex justify-between text-white/70">
                  <span>Standard Pan-India Shipping</span>
                  <span className="text-[#D4FF00] font-bold uppercase text-xs">FREE</span>
                </div>

                {paymentMethod === "cod" ? (
                  <div className="flex justify-between items-center text-amber-300 font-medium bg-amber-400/10 px-3 py-2 rounded border border-amber-400/25 text-xs">
                    <div>
                      <span className="font-bold">COD Handling Charge</span>
                      <p className="text-[10px] text-amber-300/70">Cash on delivery handling fee</p>
                    </div>
                    <span className="font-bold text-sm">+ Rs. 100.00</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-emerald-400 text-xs">
                    <span>Prepaid Benefit</span>
                    <span>Free Delivery (No COD fee)</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold text-white border-t border-white/10 pt-3">
                  <span>Total Payable</span>
                  <span className="text-[#D4FF00]">Rs. {finalTotal.toLocaleString("en-IN")}.00</span>
                </div>
                {paymentMethod === "cod" && (
                  <p className="text-[11px] text-amber-300/80 text-right">
                    * ₹100 COD charge added to total
                  </p>
                )}
              </div>

              {/* Address toggle / Direct checkout */}
              {!isCheckingOut ? (
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-4 bg-[#D4FF00] hover:bg-[#BEF200] text-black font-display text-base font-bold uppercase tracking-widest rounded transition shadow-xl cursor-pointer"
                >
                  Proceed to Delivery Details
                </button>
              ) : (
                <form onSubmit={handleCompleteOrder} className="space-y-3 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-white block">
                      Shipping Details:
                    </span>
                    <span className="text-[11px] text-white/60">
                      Payment: <strong className={paymentMethod === "cod" ? "text-amber-300" : "text-[#D4FF00]"}>{paymentMethod === "cod" ? "COD (+₹100)" : "Prepaid"}</strong>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full bg-[#131C44] border border-white/20 rounded px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4FF00]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (WhatsApp) *"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full bg-[#131C44] border border-white/20 rounded px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4FF00]"
                  />
                  <input
                    type="text"
                    placeholder="Street Address / House No. *"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full bg-[#131C44] border border-white/20 rounded px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4FF00]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="City *"
                      required
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      className="bg-[#131C44] border border-white/20 rounded px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4FF00]"
                    />
                    <input
                      type="text"
                      placeholder="Pincode *"
                      required
                      value={customerInfo.pincode}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                      className="bg-[#131C44] border border-white/20 rounded px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#D4FF00]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-display text-base font-bold uppercase tracking-widest rounded transition shadow-xl mt-3 cursor-pointer flex items-center justify-center gap-2.5"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-current" />
                    <span>Confirm & Order via WhatsApp • Rs. {finalTotal}</span>
                  </button>
                </form>
              )}

              <div className="pt-2 border-t border-white/10 space-y-2 text-[11px] text-white/60">
                <p>📦 <strong>Delivery:</strong> 2–6 business days nationwide.</p>
                <p>🔄 <strong>Returns:</strong> 4 days from delivery (unboxing video mandatory).</p>
                <div className="flex flex-wrap items-center gap-3 pt-0.5 text-white/70">
                  <span className="flex items-center gap-1.5">
                    <PhoneIcon className="w-3.5 h-3.5 text-[#D4FF00]" />
                    <span>8590877545</span>
                  </span>
                  <span>•</span>
                  <a
                    href="https://instagram.com/fall.or_fly"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#D4FF00] transition"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                    <span>@fall.or_fly</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

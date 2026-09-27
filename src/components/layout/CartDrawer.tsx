"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shippingFee,
    total,
    itemCount,
    coupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    progressToFreeShipping,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-zinc-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-600" />
              <h2 className="text-base font-bold text-zinc-900">Your Cart</h2>
              <span className="text-xs bg-zinc-200 text-zinc-800 font-semibold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-red-50/60 border-b border-red-100 px-6 py-3">
            <div className="flex items-center gap-2 text-xs font-medium text-red-900">
              <Truck className="w-4 h-4 text-red-600 shrink-0" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-red-700">৳{remainingForFreeShipping.toLocaleString("en-BD")}</strong> more for <strong>Free Delivery</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold">
                  🎉 You have unlocked Free Nationwide Shipping!
                </span>
              )}
            </div>
            <div className="w-full bg-red-200/60 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-red-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 text-base">Your cart is empty</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs leading-relaxed">
                    Explore our collection of authentic superbikes, ECE 22.06 helmets, and racing gear.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  Start Exploring
                </Link>
              </div>
            ) : (
              items.map((item, idx) => {
                const itemPrice = item.selectedVariant?.price ?? item.product.price;
                const itemTotal = itemPrice * item.quantity;

                return (
                  <div
                    key={`${item.product.id}-${item.selectedVariant?.id || idx}`}
                    className="flex gap-4 p-3 rounded-xl border border-zinc-100 hover:border-zinc-200 bg-white transition-all group"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-bold text-xs text-zinc-900 hover:text-red-600 line-clamp-1 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <div className="text-[11px] text-zinc-500 mt-0.5 space-x-2">
                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                          className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100">
                        <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity - 1)
                            }
                            className="px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-200"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-semibold text-zinc-900 min-w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedVariant?.id, item.quantity + 1)
                            }
                            className="px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-200"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-bold text-zinc-950">
                          ৳{itemTotal.toLocaleString("en-BD")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-zinc-200 bg-zinc-50 space-y-3">
              {/* Coupon Section */}
              {coupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Tag className="w-3.5 h-3.5" /> {coupon.code} applied (-৳{discount.toLocaleString("en-BD")})
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-red-600 text-[11px] font-bold underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. MOTO10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs bg-white border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                  <button
                    type="submit"
                    className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs pt-2">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">৳{subtotal.toLocaleString("en-BD")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-semibold">-৳{discount.toLocaleString("en-BD")}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-zinc-900">
                    {shippingFee === 0 ? "Free" : `৳${shippingFee.toLocaleString("en-BD")}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total</span>
                  <span>৳{total.toLocaleString("en-BD")}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 text-center"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors block text-center"
                >
                  View Detailed Cart Page
                </Link>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Secure Checkout with bKash, AamarPay & Cash on Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

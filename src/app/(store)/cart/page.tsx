"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    shippingFee,
    total,
    itemCount,
    coupon,
    applyCoupon,
    removeCoupon,
    shippingDestination,
    setShippingDestination,
    freeShippingThreshold,
    progressToFreeShipping,
  } = useCart();

  const { addToWishlist } = useWishlist();
  const { showToast } = useToast();

  const [couponInput, setCouponInput] = useState("");
  const [orderNote, setOrderNote] = useState("");

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput("");
    }
  };

  const handleMoveToWishlist = (item: (typeof items)[0]) => {
    addToWishlist(item.product);
    removeFromCart(item.product.id, item.selectedVariant?.id);
    showToast("Moved to Wishlist", `${item.product.name} saved to wishlist.`, "success");
  };

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-zinc-100 text-zinc-400 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-zinc-950">Your Shopping Cart is Empty</h1>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              Looks like you haven&apos;t added any motorcycles or gear yet. Explore our curated European imports and track collections.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/20"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-zinc-200 gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
              Review Your Selection
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-1 tracking-tight">
              SHOPPING CART ({itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-zinc-400 hover:text-red-600 flex items-center gap-1 font-semibold transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>

        {/* Free Shipping Meter Banner */}
        <div className="mt-6 bg-red-50/70 border border-red-200/80 rounded-2xl p-4">
          <div className="flex items-center gap-2.5 text-xs font-medium text-red-950">
            <Truck className="w-4 h-4 text-red-600 shrink-0" />
            {remainingForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-red-700 font-bold">৳{remainingForFreeShipping.toLocaleString("en-BD")}</strong> more to your order for <strong className="text-zinc-900">Free Express Delivery</strong> across Bangladesh!
              </span>
            ) : (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Congratulations! You qualify for Free Nationwide Courier Delivery!
              </span>
            )}
          </div>
          <div className="w-full bg-red-200/60 rounded-full h-2 mt-2.5 overflow-hidden">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Items Table */}
          <div className="lg:col-span-8 space-y-4">
            <div className="border border-zinc-200 rounded-2xl overflow-hidden divide-y divide-zinc-200 bg-white shadow-xs">
              {items.map((item, idx) => {
                const itemPrice = item.selectedVariant?.price ?? item.product.price;
                const itemTotal = itemPrice * item.quantity;

                return (
                  <div
                    key={`${item.product.id}-${item.selectedVariant?.id || idx}`}
                    className="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between group hover:bg-zinc-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                          {item.product.brand}
                        </span>
                        <h3 className="font-bold text-sm text-zinc-900 leading-snug">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="hover:text-red-600 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        <div className="text-xs text-zinc-500 flex flex-wrap gap-2">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedMaterial && <span>• {item.selectedMaterial}</span>}
                        </div>
                        <div className="text-xs font-semibold text-zinc-700 sm:hidden pt-1">
                          ৳{itemPrice.toLocaleString("en-BD")} each
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-xs">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedVariant?.id,
                              item.quantity - 1
                            )
                          }
                          className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-100 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 py-1.5 text-xs font-bold text-zinc-950 min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedVariant?.id,
                              item.quantity + 1
                            )
                          }
                          className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-100 font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Total line price */}
                      <div className="text-right min-w-24">
                        <span className="text-sm font-black text-zinc-950 block">
                          ৳{itemTotal.toLocaleString("en-BD")}
                        </span>
                        <span className="text-[10px] text-zinc-400 hidden sm:block">
                          ৳{itemPrice.toLocaleString("en-BD")} / unit
                        </span>
                      </div>

                      {/* Action buttons: wishlist & remove */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveToWishlist(item)}
                          className="p-2 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-zinc-100 transition-colors"
                          title="Save for Later / Move to Wishlist"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                          className="p-2 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-zinc-100 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Special Instructions Note */}
            <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
              <label className="text-xs font-bold text-zinc-900 block">
                Special Delivery Instructions or Note for Showroom Concierge (Optional):
              </label>
              <textarea
                rows={2}
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="e.g. Please call before arriving, deliver after 3:00 PM, or prepare helmet sizing box."
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              ← Continue Shopping in Motoplex Catalog
            </Link>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 shadow-xs space-y-5">
              <h2 className="text-base font-black text-zinc-950 uppercase tracking-wider pb-3 border-b border-zinc-200">
                Order Summary
              </h2>

              {/* Destination selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-900 block">
                  Delivery Destination:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setShippingDestination("dhaka")}
                    className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                      shippingDestination === "dhaka"
                        ? "bg-zinc-950 text-white border-zinc-950"
                        : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    Inside Dhaka (৳80)
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingDestination("outside_dhaka")}
                    className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                      shippingDestination === "outside_dhaka"
                        ? "bg-zinc-950 text-white border-zinc-950"
                        : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    Outside Dhaka (৳150)
                  </button>
                </div>
              </div>

              {/* Coupon Code Form */}
              <div>
                <label className="text-xs font-bold text-zinc-900 block mb-1.5">
                  Promotional Coupon / Voucher:
                </label>
                {coupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{coupon.code} (-৳{discount.toLocaleString("en-BD")})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-red-600 font-bold underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try 'MOTO10' or 'FREESHIP'"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 text-xs bg-white border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 uppercase placeholder:normal-case placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                    <button
                      type="submit"
                      className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculation Lines */}
              <div className="space-y-2 pt-3 border-t border-zinc-200 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-semibold text-zinc-950">৳{subtotal.toLocaleString("en-BD")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount Coupon ({coupon?.code})</span>
                    <span className="font-bold">-৳{discount.toLocaleString("en-BD")}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>Courier Delivery ({shippingDestination === "dhaka" ? "Dhaka City" : "Outside Dhaka"})</span>
                  <span className="font-semibold text-zinc-950">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">Free</span>
                    ) : (
                      `৳${shippingFee.toLocaleString("en-BD")}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-zinc-950 pt-3 border-t border-zinc-200">
                  <span>Grand Total</span>
                  <span>৳{total.toLocaleString("en-BD")}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="pt-2 space-y-2">
                <Link
                  href="/checkout"
                  className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Guaranteed Genuine Importer Warranty & Official Recipient Receipt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: (typeof wishlist)[0]) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-zinc-100 text-zinc-400 mx-auto flex items-center justify-center">
            <Heart className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-zinc-950">Your Wishlist is Empty</h1>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
              Save your favorite Aprilia superbikes, Shoei helmets, and track gear here while you browse our showroom.
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-zinc-200 gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
              Saved For Later
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-1 tracking-tight">
              MY WISHLIST ({wishlist.length} {wishlist.length === 1 ? "ITEM" : "ITEMS"})
            </h1>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs text-zinc-400 hover:text-red-600 font-semibold transition-colors self-start sm:self-auto"
          >
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group"
            >
              <div>
                <div className="relative aspect-square w-full bg-zinc-50 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-zinc-500 hover:text-red-600 shadow-sm transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <h3 className="font-bold text-xs text-zinc-900 line-clamp-2 leading-snug">
                    <Link href={`/product/${product.slug}`} className="hover:text-red-600">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="pt-2">
                    <span className="text-base font-black text-zinc-950">
                      ৳{product.price.toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="w-full bg-zinc-950 hover:bg-red-600 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

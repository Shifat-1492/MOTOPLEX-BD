"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, Heart, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentSize = selectedSize || product.sizes?.[0] || "";
  const currentColor = selectedColor || product.colors?.[0]?.name || "";
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, currentSize, currentColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-500 hover:text-zinc-900 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Gallery Left */}
        <div className="md:w-1/2 p-6 bg-zinc-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-200">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-sm">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.discountPercentage ? (
              <span className="absolute top-3 left-3 bg-red-600 text-white font-semibold text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
                -{product.discountPercentage}% OFF
              </span>
            ) : null}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx ? "border-red-600 ring-2 ring-red-600/20" : "border-zinc-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Right */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold tracking-wider text-red-600 uppercase">
                {product.brand}
              </span>
              <span className="text-xs text-zinc-500 font-mono">SKU: {product.sku}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 leading-snug">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-zinc-200 text-zinc-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-zinc-700">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-black text-zinc-950">
                ৳{product.price.toLocaleString("en-BD")}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm text-zinc-400 line-through">
                  ৳{product.compareAtPrice.toLocaleString("en-BD")}
                </span>
              )}
            </div>

            <p className="mt-3 text-xs md:text-sm text-zinc-600 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <label className="text-xs font-semibold text-zinc-900 block mb-2">
                  Color: <span className="font-normal text-zinc-500">{currentColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 p-0.5 transition-all flex items-center justify-center ${
                        currentColor === c.name ? "border-zinc-900 ring-2 ring-zinc-900/20 scale-110" : "border-zinc-200"
                      }`}
                      title={c.name}
                    >
                      <span
                        className="w-full h-full rounded-full block"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <label className="text-xs font-semibold text-zinc-900 block mb-2">
                  Option / Size: <span className="font-normal text-zinc-500">{currentSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                        currentSize === s
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-5 flex items-center gap-4">
              <span className="text-xs font-semibold text-zinc-900">Quantity:</span>
              <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-100 font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-semibold text-zinc-900 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-100 font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} units)
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold py-3 px-5 rounded-xl shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-all ${
                  isWishlisted
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "border-zinc-200 text-zinc-600 hover:border-zinc-400 bg-white"
                }`}
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-600" : ""}`} />
              </button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="text-xs text-center text-zinc-600 hover:text-zinc-900 font-medium py-1 flex items-center justify-center gap-1 hover:underline"
            >
              View Full Product Specifications & Warranty <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Share2,
  Wrench,
  CheckCircle2,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { ProductCard } from "@/components/shop/ProductCard";
import { mockReviews } from "@/data/reviews";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0]?.name || "");
  const [selectedMaterial, setSelectedMaterial] = useState<string>(product.materials?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "shipping" | "warranty" | "reviews">("specs");

  // Reviews state for writing a new review demo
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewsList, setReviewsList] = useState(mockReviews);

  const isWishlisted = isInWishlist(product.id);

  // Check if a specific variant matches
  const matchedVariant: ProductVariant | undefined = product.variants?.find(
    (v) =>
      (!selectedColor || v.color === selectedColor) &&
      (!selectedSize || v.size === selectedSize)
  );

  const currentPrice = matchedVariant?.price ?? product.price;
  const currentComparePrice = matchedVariant?.compareAtPrice ?? product.compareAtPrice;
  const currentStock = matchedVariant?.stock ?? product.stock;
  const currentSKU = matchedVariant?.sku ?? product.sku;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor, selectedMaterial, matchedVariant);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor, selectedMaterial, matchedVariant);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link Copied!", "Product URL copied to clipboard.", "info");
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      showToast("Incomplete Review", "Please enter your name and comments.", "error");
      return;
    }

    const newRev = {
      id: Date.now().toString(),
      userName: reviewName.trim(),
      userCity: "Dhaka, Bangladesh",
      rating: reviewRating,
      date: "Today",
      title: "Verified Customer Review",
      comment: reviewComment.trim(),
      verifiedPurchase: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    };

    setReviewsList((prev) => [newRev, ...prev]);
    showToast("Review Submitted", "Thank you! Your verified review has been posted.", "success");
    setIsReviewModalOpen(false);
    setReviewName("");
    setReviewComment("");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Header */}
      <div className="border-b border-zinc-200 bg-zinc-50/60 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-zinc-500">
          <nav className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <Link href="/shop" className="hover:text-zinc-900 transition-colors">
              Catalog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <Link
              href={`/category/${product.categorySlug}`}
              className="hover:text-zinc-900 transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-semibold text-zinc-900 truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </nav>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-950 font-medium"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Product Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Large Active Image */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-200 shadow-sm group">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {/* Discount / Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.discountPercentage && (
                  <span className="bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    -{product.discountPercentage}% OFF
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="bg-zinc-900 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    2026 Season
                  </span>
                )}
              </div>

              {/* Importer Authenticity Badge */}
              <div className="absolute bottom-4 left-4 z-10 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-800 text-[11px] text-zinc-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Genuine Importer Hologram</span>
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 bg-zinc-50 shrink-0 transition-all ${
                      selectedImage === idx
                        ? "border-red-600 ring-4 ring-red-600/10 shadow-sm"
                        : "border-zinc-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand and SKU */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold text-red-600 tracking-wider uppercase">
                  {product.brand}
                </span>
                <span className="font-mono text-zinc-400">SKU: {currentSKU}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-snug">
                {product.name}
              </h1>

              <p className="text-xs text-zinc-500 font-medium mt-1 italic">
                {product.tagline}
              </p>

              {/* Rating & Stock */}
              <div className="flex items-center justify-between gap-4 mt-4 pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
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
                  <span className="text-xs font-bold text-zinc-900">{product.rating}</span>
                  <a
                    href="#reviews-section"
                    onClick={() => setActiveTab("reviews")}
                    className="text-xs text-zinc-500 hover:text-red-600 underline font-medium"
                  >
                    ({product.reviewCount} customer reviews)
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock ({currentStock} available)</span>
                </div>
              </div>

              {/* Pricing Display */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
                  ৳{currentPrice.toLocaleString("en-BD")}
                </span>
                {currentComparePrice && currentComparePrice > currentPrice && (
                  <span className="text-base text-zinc-400 line-through">
                    ৳{currentComparePrice.toLocaleString("en-BD")}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                    Save ৳{((currentComparePrice || currentPrice) - currentPrice).toLocaleString("en-BD")}
                  </span>
                )}
              </div>

              {/* Brief Description */}
              <p className="mt-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center text-xs font-semibold text-zinc-900 mb-2">
                    <span>Color: <strong className="text-zinc-950 font-bold">{selectedColor}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all flex items-center justify-center ${
                          selectedColor === c.name
                            ? "border-red-600 ring-2 ring-red-600/30 scale-110"
                            : "border-zinc-200 hover:border-zinc-400"
                        }`}
                        title={c.name}
                      >
                        <span
                          className="w-full h-full rounded-full block relative"
                          style={{ backgroundColor: c.hex }}
                        >
                          {selectedColor === c.name && (
                            <Check
                              className={`w-3.5 h-3.5 absolute inset-0 m-auto ${
                                c.name === "White" ? "text-zinc-900" : "text-white"
                              }`}
                            />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex justify-between items-center text-xs font-semibold text-zinc-900 mb-2">
                    <span>Option / Size: <strong className="text-zinc-950 font-bold">{selectedSize}</strong></span>
                    <button
                      onClick={() =>
                        showToast(
                          "Fitment Guide",
                          "Helmets & Jackets are standard European sizing. Free size exchange within 7 days in Bangladesh.",
                          "info"
                        )
                      }
                      className="text-xs text-red-600 hover:underline font-medium"
                    >
                      Size & Fit Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs px-3.5 py-2 rounded-xl border font-bold transition-all ${
                          selectedSize === s
                            ? "bg-zinc-950 text-white border-zinc-950 shadow-sm"
                            : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Material Selector if multiple */}
              {product.materials && product.materials.length > 1 && (
                <div className="mt-5">
                  <span className="text-xs font-semibold text-zinc-900 block mb-2">
                    Material Specification:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMaterial(m)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          selectedMaterial === m
                            ? "bg-zinc-900 text-white border-zinc-900"
                            : "bg-white text-zinc-700 border-zinc-200"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs font-bold text-zinc-900">Quantity:</span>
                <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-2 text-zinc-600 hover:bg-zinc-100 font-black text-sm"
                  >
                    -
                  </button>
                  <span className="px-3.5 py-2 text-xs font-black text-zinc-950 min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(currentStock, q + 1))}
                    className="px-3.5 py-2 text-zinc-600 hover:bg-zinc-100 font-black text-sm"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-zinc-500">
                  Subtotal: <strong className="text-zinc-950">৳{(currentPrice * quantity).toLocaleString("en-BD")}</strong>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-zinc-200">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-zinc-950 hover:bg-zinc-800 active:bg-black text-white font-bold text-sm py-4 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-red-500" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-2xl border transition-all ${
                    isWishlisted
                      ? "bg-red-50 border-red-200 text-red-600 shadow-sm"
                      : "border-zinc-200 text-zinc-700 hover:border-zinc-400 bg-white"
                  }`}
                  title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-600" : ""}`} />
                </button>
              </div>

              {/* Direct Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Express Buy Now (Go to Checkout)</span>
              </button>

              {/* Trust Badges Minimal */}
              <div className="grid grid-cols-2 gap-3 pt-4 text-xs text-zinc-600">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
                  <Truck className="w-4 h-4 text-red-600 shrink-0" />
                  <span>24-48h Delivery in Dhaka</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
                  <RotateCcw className="w-4 h-4 text-red-600 shrink-0" />
                  <span>7-Day Free Size Exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div id="reviews-section" className="mt-16 pt-10 border-t border-zinc-200">
          <div className="flex items-center gap-2 border-b border-zinc-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-4 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "specs"
                  ? "border-red-600 text-zinc-950"
                  : "border-transparent text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Specifications & Features
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`pb-4 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "shipping"
                  ? "border-red-600 text-zinc-950"
                  : "border-transparent text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Bangladesh Courier Logistics
            </button>
            <button
              onClick={() => setActiveTab("warranty")}
              className={`pb-4 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "warranty"
                  ? "border-red-600 text-zinc-950"
                  : "border-transparent text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Importer Warranty & Authenticity
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "reviews"
                  ? "border-red-600 text-zinc-950"
                  : "border-transparent text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Customer Reviews ({reviewsList.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wider mb-4">
                    Key Engineering Features
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700">
                        <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-zinc-900 uppercase tracking-wider mb-4">
                    Technical Specifications
                  </h3>
                  <div className="border border-zinc-200 rounded-2xl overflow-hidden divide-y divide-zinc-200 text-xs">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-2 p-3 bg-white even:bg-zinc-50">
                        <span className="font-semibold text-zinc-600">{key}</span>
                        <span className="font-bold text-zinc-900">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="max-w-3xl space-y-6 text-xs text-zinc-700 leading-relaxed">
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                  <h4 className="font-bold text-sm text-zinc-900">
                    Doorstep Courier Delivery Across Bangladesh
                  </h4>
                  <p>
                    All Motoplex BD orders are packaged in sealed tamper-proof packaging. We partner with Pathao Express and Steadfast Courier to reach every district and thana across Bangladesh.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3 bg-white rounded-xl border border-zinc-200">
                      <strong className="text-zinc-950 block">Inside Dhaka City</strong>
                      <span className="text-zinc-500">24 to 48 Hours Delivery • Standard Fee ৳80</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-zinc-200">
                      <strong className="text-zinc-950 block">All 63 Districts Outside Dhaka</strong>
                      <span className="text-zinc-500">2 to 4 Business Days • Standard Fee ৳150</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                    * Orders above ৳5,000 qualify for 100% Free Express Delivery!
                  </p>
                </div>
              </div>
            )}

            {activeTab === "warranty" && (
              <div className="max-w-3xl space-y-4 text-xs text-zinc-700 leading-relaxed">
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                  <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                    <Wrench className="w-4 h-4" />
                    <span>Official Motoplex Bangladesh Showroom Warranty</span>
                  </div>
                  <p>
                    Every motorcycle and accessory imported by Motoplex BD carries our registered barcode and verifiable warranty card.
                  </p>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>Motorcycles (Aprilia & Vespa): 2-Year Engine & Electrical Warranty with 4 free routine maintenance services at our Gulshan-2 facility.</li>
                    <li>Shoei Helmets: 5-Year International Manufacturer Warranty against shell or liner defects.</li>
                    <li>Riding Gear & Jackets: 1-Year stitching and zipper warranty.</li>
                    <li>7-Day Size Exchange: If your jacket or helmet fit is slightly off, we exchange it for your exact size with zero restocking charges.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Header & Write Review Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900">
                      Customer Reviews & Feedback
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-black text-zinc-900">
                        {product.rating} out of 5.0
                      </span>
                      <span className="text-xs text-zinc-500">
                        ({reviewsList.length} reviews)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-xs"
                  >
                    Write a Review
                  </button>
                </div>

                {/* Reviews List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-200 shrink-0">
                            <Image src={rev.avatar || ""} alt="" fill className="object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-zinc-900 flex items-center gap-1.5">
                              {rev.userName}
                              {rev.verifiedPurchase && (
                                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                  Verified Rider
                                </span>
                              )}
                            </h4>
                            <p className="text-[10px] text-zinc-400">{rev.userCity} • {rev.date}</p>
                          </div>
                        </div>

                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      <h5 className="font-bold text-xs text-zinc-900">{rev.title}</h5>
                      <p className="text-xs text-zinc-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-zinc-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                  Complement Your Ride
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-950 mt-1 tracking-tight">
                  RELATED PRODUCTS
                </h2>
              </div>
              <Link
                href={`/category/${product.categorySlug}`}
                className="text-xs font-bold text-zinc-900 hover:text-red-600"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-bold text-sm text-zinc-950">Write a Product Review</h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-900 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-zinc-900 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Shakib Al Hasan"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-900 block mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-zinc-200 text-zinc-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-900 block mb-1">Your Review</label>
                <textarea
                  rows={4}
                  placeholder="How was the build quality, sizing, and comfort on the road?"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-2.5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

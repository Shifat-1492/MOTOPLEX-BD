"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { products } from "@/data/products";
import { Product } from "@/types";

export function BestSellers() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-zinc-50 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-widest">
              <Trophy className="w-3.5 h-3.5" />
              <span>Rider Favorites in Bangladesh</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-1 tracking-tight">
              BEST SELLING PRODUCTS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-lg">
              The highest rated Italian machines and protective equipment chosen by motorcycle enthusiasts.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-red-600 transition-colors uppercase tracking-wider"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellerProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}

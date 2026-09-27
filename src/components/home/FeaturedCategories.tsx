"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

export function FeaturedCategories() {
  return (
    <section className="py-16 md:py-20 bg-zinc-50 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-1 tracking-tight">
              EXPLORE BY CATEGORY
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-lg">
              Official European motorcycles, racing homologated safety gear, and precision tuning components.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 hover:text-red-600 transition-colors uppercase tracking-wider"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-zinc-200/80 flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-95"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />

              {/* Content */}
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-bold text-zinc-300 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {cat.itemCount} Items Available
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

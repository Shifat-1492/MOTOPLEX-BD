"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { categories } from "@/data/categories";

interface MegaMenuProps {
  onClose: () => void;
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <div className="absolute top-full left-0 w-full bg-white border-b border-zinc-200 shadow-2xl py-8 px-6 lg:px-12 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Main 4-Level Category Columns */}
          <div className="col-span-8 grid grid-cols-3 gap-8 border-r border-zinc-100 pr-8">
            {categories.slice(0, 3).map((cat) => (
              <div key={cat.id} className="space-y-4">
                <Link
                  href={`/category/${cat.slug}`}
                  onClick={onClose}
                  className="group flex items-center justify-between font-bold text-sm text-zinc-950 uppercase tracking-wider pb-2 border-b border-zinc-100 hover:text-red-600 transition-colors"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <div className="space-y-4">
                  {cat.subcategories.map((sub) => (
                    <div key={sub.id} className="space-y-1.5">
                      <Link
                        href={`/shop?category=${cat.slug}&subcategory=${sub.slug}`}
                        onClick={onClose}
                        className="text-xs font-semibold text-zinc-800 hover:text-red-600 block transition-colors"
                      >
                        {sub.name}
                      </Link>

                      {/* Level 3 & 4 items */}
                      <ul className="space-y-1 pl-2 border-l border-zinc-100">
                        {sub.childCategories.slice(0, 2).map((child) => (
                          <li key={child.id}>
                            <Link
                              href={`/shop?category=${cat.slug}&child=${child.slug}`}
                              onClick={onClose}
                              className="text-[11px] text-zinc-500 hover:text-zinc-900 block py-0.5 transition-colors"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Promotional Feature Card */}
          <div className="col-span-4 flex flex-col justify-between pl-4">
            <div className="bg-zinc-950 rounded-2xl p-6 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-36 bg-red-600/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider bg-red-600 text-white px-2.5 py-0.5 rounded-full mb-3">
                  <Sparkles className="w-3 h-3" /> Featured Italian Racing
                </span>
                <h4 className="text-lg font-black tracking-tight leading-tight">
                  Aprilia RS 457 Twin Cylinder
                </h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Official homologated track supersport machine. Experience 47.6 HP and Italian chassis mastery.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-base font-bold text-white">৳9,85,000</span>
                  <Link
                    href="/product/aprilia-rs-457-twin-cylinder"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 group/link"
                  >
                    View Superbike <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="relative h-28 w-full mt-4 rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=600&auto=format&fit=crop"
                  alt="Aprilia RS 457"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Quick Links Row */}
            <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-medium text-zinc-600">
              <Link href="/shop" onClick={onClose} className="hover:text-red-600 transition-colors">
                Browse Full Catalog (24+ Items) →
              </Link>
              <Link href="/contact" onClick={onClose} className="hover:text-red-600 transition-colors">
                Gulshan Showroom Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

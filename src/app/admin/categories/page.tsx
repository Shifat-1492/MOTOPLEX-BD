"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FolderTree, ChevronRight, Layers, Tag } from "lucide-react";
import { categories } from "@/data/categories";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin"
          className="text-xs font-semibold text-zinc-500 hover:text-white flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard Overview
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          4-LEVEL CATEGORY TAXONOMY
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Visual architecture: Root Category → Subcategory → Child Category → Product Group
        </p>
      </div>

      <div className="space-y-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4"
          >
            {/* Level 1: Root Category */}
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-zinc-800 gap-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-red-600 text-white font-black text-xs flex items-center justify-center">
                  L1
                </span>
                <div>
                  <h2 className="text-base font-bold text-white">{cat.name}</h2>
                  <span className="text-[11px] text-zinc-400 font-mono">slug: /{cat.slug}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-zinc-300 bg-zinc-800 px-3 py-1 rounded-full border border-zinc-700">
                {cat.itemCount} Total Catalog Units
              </span>
            </div>

            {/* Level 2: Subcategories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {cat.subcategories.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-bold flex items-center justify-center">
                        L2
                      </span>
                      <h3 className="font-bold text-xs text-zinc-200">{sub.name}</h3>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">/{sub.slug}</span>
                  </div>

                  {/* Level 3: Child Categories */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800">
                    {sub.childCategories.map((child) => (
                      <div key={child.id} className="pl-2 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
                          <span className="text-red-500 font-bold text-[10px]">L3</span>
                          <span>{child.name}</span>
                        </div>

                        {/* Level 4: Product Groups */}
                        <div className="pl-4 flex flex-wrap gap-1.5 pt-1">
                          {child.productGroups.map((grp) => (
                            <span
                              key={grp.id}
                              className="text-[10px] bg-zinc-900 border border-zinc-700/80 text-zinc-400 px-2 py-0.5 rounded-lg flex items-center gap-1"
                            >
                              <span className="text-red-400 font-mono">L4:</span> {grp.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

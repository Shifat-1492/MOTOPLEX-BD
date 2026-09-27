"use client";

import React from "react";
import { Filter, X, RotateCcw, Check, Star } from "lucide-react";
import { categories } from "@/data/categories";

export interface FilterValues {
  category: string;
  subcategory: string;
  minPrice: number;
  maxPrice: number;
  selectedSizes: string[];
  selectedColors: string[];
  selectedMaterials: string[];
  inStockOnly: boolean;
  minRating: number;
}

interface ProductFiltersProps {
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  onReset: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL", "41 EU", "42 EU", "43 EU", "44 EU"];
const AVAILABLE_COLORS = [
  { name: "Black", hex: "#0f172a" },
  { name: "Red", hex: "#dc2626" },
  { name: "Silver", hex: "#94a3b8" },
  { name: "White", hex: "#f8fafc" },
  { name: "Brown", hex: "#78350f" },
  { name: "Yellow", hex: "#eab308" },
];
const AVAILABLE_MATERIALS = [
  "Bovine Leather",
  "Carbon Fiber",
  "Cordura 600D",
  "Titanium",
  "Gore-Tex",
  "Aluminum",
];

export function ProductFilters({
  filters,
  onChange,
  onReset,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}: ProductFiltersProps) {
  const handleCategoryClick = (catSlug: string) => {
    onChange({
      ...filters,
      category: filters.category === catSlug ? "" : catSlug,
      subcategory: "", // reset subcategory when category changes
    });
  };

  const handleSubcategoryClick = (subSlug: string) => {
    onChange({
      ...filters,
      subcategory: filters.subcategory === subSlug ? "" : subSlug,
    });
  };

  const handleToggleSize = (size: string) => {
    const next = filters.selectedSizes.includes(size)
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onChange({ ...filters, selectedSizes: next });
  };

  const handleToggleColor = (color: string) => {
    const next = filters.selectedColors.includes(color)
      ? filters.selectedColors.filter((c) => c !== color)
      : [...filters.selectedColors, color];
    onChange({ ...filters, selectedColors: next });
  };

  const handleToggleMaterial = (mat: string) => {
    const next = filters.selectedMaterials.includes(mat)
      ? filters.selectedMaterials.filter((m) => m !== mat)
      : [...filters.selectedMaterials, mat];
    onChange({ ...filters, selectedMaterials: next });
  };

  return (
    <div className={`space-y-6 ${isMobileDrawer ? "p-6" : ""}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-red-600" />
          <h3 className="font-bold text-sm text-zinc-950 uppercase tracking-wider">
            Filters
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="text-xs text-zinc-500 hover:text-red-600 flex items-center gap-1 transition-colors font-medium"
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          {isMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1 text-zinc-500 hover:text-zinc-900 ml-2"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider block">
          Category
        </label>
        <div className="space-y-1.5 text-xs">
          {categories.map((cat) => {
            const isCatActive = filters.category === cat.slug;

            return (
              <div key={cat.id} className="space-y-1">
                <button
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`w-full flex items-center justify-between text-left py-1 px-2 rounded-lg transition-colors font-medium ${
                    isCatActive
                      ? "bg-red-50 text-red-700 font-bold"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[11px] text-zinc-400">({cat.itemCount})</span>
                </button>

                {/* Subcategories if active */}
                {isCatActive && (
                  <div className="pl-4 pr-1 space-y-1 py-1 border-l-2 border-red-200 ml-2">
                    {cat.subcategories.map((sub) => {
                      const isSubActive = filters.subcategory === sub.slug;

                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleSubcategoryClick(sub.slug)}
                          className={`w-full text-left text-[11px] py-1 px-1.5 rounded transition-colors ${
                            isSubActive
                              ? "bg-zinc-900 text-white font-semibold"
                              : "text-zinc-500 hover:text-zinc-900"
                          }`}
                        >
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-3 border-t border-zinc-200">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
            Price Range (BDT)
          </label>
          <span className="text-[11px] text-zinc-500 font-mono">
            ৳{filters.minPrice.toLocaleString()} - ৳{filters.maxPrice.toLocaleString()}
          </span>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="2000"
            max="1100000"
            step="5000"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-red-600 cursor-pointer"
          />
          <div className="flex items-center gap-2 text-xs">
            <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-center">
              <span className="text-[10px] text-zinc-400 block">Min</span>
              <span className="font-bold text-zinc-800">৳{filters.minPrice.toLocaleString()}</span>
            </div>
            <span className="text-zinc-400">-</span>
            <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-center">
              <span className="text-[10px] text-zinc-400 block">Max</span>
              <span className="font-bold text-zinc-800">৳{filters.maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Size / Fit */}
      <div className="space-y-3 pt-3 border-t border-zinc-200">
        <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider block">
          Size / Option
        </label>
        <div className="flex flex-wrap gap-1.5">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = filters.selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleToggleSize(size)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                  isSelected
                    ? "bg-zinc-900 text-white border-zinc-900 shadow-xs"
                    : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Swatches */}
      <div className="space-y-3 pt-3 border-t border-zinc-200">
        <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider block">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_COLORS.map((col) => {
            const isSelected = filters.selectedColors.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => handleToggleColor(col.name)}
                className={`w-7 h-7 rounded-full border-2 p-0.5 transition-all flex items-center justify-center ${
                  isSelected
                    ? "border-red-600 ring-2 ring-red-600/20 scale-110"
                    : "border-zinc-200 hover:border-zinc-400"
                }`}
                title={col.name}
              >
                <span
                  className="w-full h-full rounded-full block relative"
                  style={{ backgroundColor: col.hex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-3.5 h-3.5 absolute inset-0 m-auto ${
                        col.name === "White" ? "text-zinc-900" : "text-white"
                      }`}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Material */}
      <div className="space-y-3 pt-3 border-t border-zinc-200">
        <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider block">
          Material & Craft
        </label>
        <div className="space-y-1.5 text-xs">
          {AVAILABLE_MATERIALS.map((mat) => {
            const isChecked = filters.selectedMaterials.includes(mat);
            return (
              <label
                key={mat}
                onClick={() => handleToggleMaterial(mat)}
                className="flex items-center gap-2.5 text-zinc-700 hover:text-zinc-950 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="rounded text-red-600 focus:ring-red-600 cursor-pointer w-3.5 h-3.5"
                />
                <span className={isChecked ? "font-bold text-zinc-950" : ""}>{mat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Stock Status & Rating */}
      <div className="space-y-3 pt-3 border-t border-zinc-200">
        <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider block">
          Availability
        </label>
        <label
          onClick={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
          className="flex items-center gap-2.5 text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer select-none"
        >
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => {}}
            className="rounded text-red-600 focus:ring-red-600 cursor-pointer w-3.5 h-3.5"
          />
          <span>In Stock Only (Showroom Available)</span>
        </label>

        {/* Rating filter */}
        <div className="pt-2">
          <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider block mb-1.5">
            Rating
          </label>
          <button
            onClick={() =>
              onChange({ ...filters, minRating: filters.minRating === 4 ? 0 : 4 })
            }
            className={`w-full flex items-center justify-between text-xs p-2 rounded-lg border transition-colors ${
              filters.minRating === 4
                ? "bg-amber-50 border-amber-300 text-amber-900 font-semibold"
                : "border-zinc-200 text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-zinc-700 text-xs ml-1">& Up</span>
            </div>
            {filters.minRating === 4 && <Check className="w-3.5 h-3.5 text-amber-700" />}
          </button>
        </div>
      </div>
    </div>
  );
}

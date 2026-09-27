"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  SlidersHorizontal,
  ChevronRight,
  Search,
  X,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductFilters, FilterValues } from "@/components/shop/ProductFilters";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { Product } from "@/types";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSubcategory = searchParams.get("subcategory") || "";
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const defaultFilters: FilterValues = {
    category: initialCategory,
    subcategory: initialSubcategory,
    minPrice: 2000,
    maxPrice: 1050000,
    selectedSizes: [],
    selectedColors: [],
    selectedMaterials: [],
    inStockOnly: false,
    minRating: 0,
  };

  const [filters, setFilters] = useState<FilterValues>(defaultFilters);

  // Sync with searchParams if URL changes
  useEffect(() => {
    const cat = searchParams.get("category") || "";
    const sub = searchParams.get("subcategory") || "";
    const q = searchParams.get("q") || "";
    if (cat || sub) {
      setFilters((prev) => ({ ...prev, category: cat, subcategory: sub }));
      setCurrentPage(1);
    }
    if (q) {
      setSearchQuery(q);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Lock scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsMobileFilterOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileFilterOpen]);

  // Active category details
  const activeCategoryObj = useMemo(() => {
    return categories.find((c) => c.slug === filters.category);
  }, [filters.category]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category) {
      result = result.filter((p) => p.categorySlug === filters.category);
    }

    // Subcategory
    if (filters.subcategory) {
      result = result.filter((p) => p.subcategorySlug === filters.subcategory);
    }

    // Price
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Sizes
    if (filters.selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes?.some((s) =>
          filters.selectedSizes.some((selected) =>
            s.toLowerCase().includes(selected.toLowerCase())
          )
        )
      );
    }

    // Colors
    if (filters.selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors?.some((c) =>
          filters.selectedColors.some((selected) =>
            c.name.toLowerCase().includes(selected.toLowerCase())
          )
        )
      );
    }

    // Materials
    if (filters.selectedMaterials.length > 0) {
      result = result.filter((p) =>
        p.materials?.some((m) =>
          filters.selectedMaterials.some((selected) =>
            m.toLowerCase().includes(selected.toLowerCase())
          )
        )
      );
    }

    // Stock
    if (filters.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Rating
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [filters, searchQuery, sortBy]);

  // Pagination (8 items per page)
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  // Auto-clamp page if filters change and reduce total page count
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleResetFilters = () => {
    setFilters({
      category: "",
      subcategory: "",
      minPrice: 2000,
      maxPrice: 1050000,
      selectedSizes: [],
      selectedColors: [],
      selectedMaterials: [],
      inStockOnly: false,
      minRating: 0,
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Active filters count
  const activeFiltersCount =
    (filters.category ? 1 : 0) +
    (filters.subcategory ? 1 : 0) +
    (filters.maxPrice < 1050000 ? 1 : 0) +
    filters.selectedSizes.length +
    filters.selectedColors.length +
    filters.selectedMaterials.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Header Bar */}
      <div className="border-b border-zinc-200 bg-zinc-50/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
              <Link href="/" className="hover:text-zinc-900 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <Link href="/shop" className="hover:text-zinc-900 transition-colors">
                Catalog
              </Link>
              {activeCategoryObj && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-semibold text-zinc-900">
                    {activeCategoryObj.name}
                  </span>
                </>
              )}
            </nav>

            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              {activeCategoryObj ? activeCategoryObj.name : "ALL MOTORCYCLES & RACING GEAR"}
            </h1>
            <p className="text-xs text-zinc-500 mt-1 max-w-xl">
              {activeCategoryObj
                ? activeCategoryObj.description
                : "Explore authentic Italian motorcycles, FIM homologated helmets, protective apparel, and racing exhausts with official Motoplex Bangladesh warranty."}
            </p>
          </div>

          {/* Search in Catalog */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search catalog products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-8 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-600 shadow-xs"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 text-zinc-400 hover:text-zinc-600 absolute right-2.5 top-2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-xs">
              <ProductFilters
                filters={filters}
                onChange={(newFilters) => {
                  setFilters(newFilters);
                  setCurrentPage(1);
                }}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Count, Mobile filter button & Sort */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-zinc-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shadow-xs"
                >
                  <SlidersHorizontal className="w-4 h-4 text-red-500" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                <p className="text-xs text-zinc-500">
                  Showing <strong className="text-zinc-900">{paginatedProducts.length}</strong> of{" "}
                  <strong className="text-zinc-900">{filteredProducts.length}</strong> products
                </p>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-500 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-xs text-zinc-900 font-semibold focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer shadow-xs"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="newest">Newest Season Arrivals</option>
                </select>
              </div>
            </div>

            {/* Active Filters Badges */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-zinc-500">Active Filters:</span>

                {filters.category && (
                  <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-full font-medium">
                    Category: {categories.find((c) => c.slug === filters.category)?.name}
                    <button
                      onClick={() => setFilters({ ...filters, category: "", subcategory: "" })}
                      className="hover:text-red-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.subcategory && (
                  <span className="inline-flex items-center gap-1 text-xs bg-zinc-100 text-zinc-800 border border-zinc-200 px-2.5 py-1 rounded-full font-medium">
                    Subcategory: {filters.subcategory}
                    <button
                      onClick={() => setFilters({ ...filters, subcategory: "" })}
                      className="hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.maxPrice < 1050000 && (
                  <span className="inline-flex items-center gap-1 text-xs bg-zinc-100 text-zinc-800 border border-zinc-200 px-2.5 py-1 rounded-full font-medium">
                    Max: ৳{filters.maxPrice.toLocaleString()}
                    <button
                      onClick={() => setFilters({ ...filters, maxPrice: 1050000 })}
                      className="hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.selectedSizes.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 text-xs bg-zinc-100 text-zinc-800 border border-zinc-200 px-2.5 py-1 rounded-full font-medium"
                  >
                    Size: {s}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          selectedSizes: filters.selectedSizes.filter((x) => x !== s),
                        })
                      }
                      className="hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {filters.selectedColors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 text-xs bg-zinc-100 text-zinc-800 border border-zinc-200 px-2.5 py-1 rounded-full font-medium"
                  >
                    Color: {c}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          selectedColors: filters.selectedColors.filter((x) => x !== c),
                        })
                      }
                      className="hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                <button
                  onClick={handleResetFilters}
                  className="text-xs text-red-600 hover:underline font-semibold ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-200 text-zinc-500 mx-auto flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 text-base">
                    No matching products found
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    Try loosening your price filter, selecting different sizes, or searching with broader terms.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8 border-t border-zinc-200">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3.5 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 text-xs font-bold rounded-xl transition-all ${
                        currentPage === pageNum
                          ? "bg-zinc-950 text-white shadow-sm"
                          : "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-in Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto">
              <ProductFilters
                filters={filters}
                onChange={(newFilters) => {
                  setFilters(newFilters);
                  setCurrentPage(1);
                }}
                onReset={handleResetFilters}
                isMobileDrawer={true}
                onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
              />
              <div className="p-6 pt-0">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-colors"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-400">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}

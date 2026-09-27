"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ChevronDown, ChevronRight, Phone, MapPin, Shield, Search, ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenuDrawer({ isOpen, onClose }: MobileMenuDrawerProps) {
  const router = useRouter();
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleCategory = (id: string) => {
    setExpandedCat(expandedCat === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-12">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-950 text-white">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tighter">MOTOPLEX</span>
              <span className="text-[10px] tracking-widest text-red-500 font-bold uppercase">BD</span>
            </Link>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar */}
          <div className="p-4 border-b border-zinc-100 bg-zinc-50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
                  onClose();
                }
              }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search helmets, gear, bikes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            </form>
          </div>

          {/* Navigation Links & Categories */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Categories
              </p>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const isExpanded = expandedCat === cat.id;

                  return (
                    <div key={cat.id} className="border-b border-zinc-100 pb-1">
                      <div className="flex items-center justify-between py-2">
                        <Link
                          href={`/category/${cat.slug}`}
                          onClick={onClose}
                          className="text-xs font-bold text-zinc-800 hover:text-red-600 transition-colors"
                        >
                          {cat.name}
                        </Link>
                        <button
                          onClick={() => toggleCategory(cat.id)}
                          className="p-1 text-zinc-400 hover:text-zinc-900"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-red-600" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Subcategories Accordion */}
                      {isExpanded && (
                        <div className="pl-3 pb-3 space-y-3 pt-1 animate-in fade-in duration-200">
                          {cat.subcategories.map((sub) => (
                            <div key={sub.id} className="space-y-1">
                              <Link
                                href={`/shop?category=${cat.slug}&subcategory=${sub.slug}`}
                                onClick={onClose}
                                className="text-xs font-semibold text-zinc-700 hover:text-red-600 flex items-center justify-between"
                              >
                                <span>{sub.name}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                              </Link>
                              {/* Child categories */}
                              <div className="pl-2 space-y-1">
                                {sub.childCategories.map((child) => (
                                  <Link
                                    key={child.id}
                                    href={`/shop?category=${cat.slug}&child=${child.slug}`}
                                    onClick={onClose}
                                    className="text-[11px] text-zinc-500 hover:text-zinc-900 block py-0.5"
                                  >
                                    • {child.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Quick Navigation
              </p>
              <div className="space-y-2 text-xs font-medium text-zinc-800">
                <Link
                  href="/services"
                  onClick={onClose}
                  className="flex items-center justify-between py-2 text-red-600 font-bold bg-red-50/80 px-3 rounded-xl border border-red-200"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <span>Workshop & Services (Master Service)</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-600" />
                </Link>
                <Link
                  href="/dealerships"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 hover:text-red-600"
                >
                  <span>Our 3 Dealerships & Showrooms</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 hover:text-red-600"
                >
                  <span>Explore Full Parts Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
                <Link
                  href="/account/orders"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 hover:text-red-600"
                >
                  <span>Track My Orders</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
                <Link
                  href="/wishlist"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 hover:text-red-600"
                >
                  <span>Saved Wishlist</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 hover:text-red-600"
                >
                  <span>Showroom Locations & Support</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 text-red-600 font-semibold"
                >
                  <span>Admin Dashboard Demo</span>
                  <Shield className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Showroom & Hotline */}
            <div className="p-4 bg-zinc-50 rounded-xl space-y-2 text-xs text-zinc-600 border border-zinc-200">
              <div className="flex items-center gap-2 font-bold text-zinc-900">
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>+880 1700-MOTOPLEX</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] text-zinc-500">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>Plot 12, Road 113, Gulshan-2, Dhaka 1212, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

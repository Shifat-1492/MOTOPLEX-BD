"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  Phone,
  MapPin,
  ChevronDown,
  Shield,
  Truck,
  X,
  ExternalLink,
} from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { MobileMenuDrawer } from "./MobileMenuDrawer";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import { Product } from "@/types";

export function Header() {
  const router = useRouter();
  const { itemCount, subtotal, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter search results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const filtered = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 5);

    setSearchResults(filtered);
  }, [searchQuery]);

  // Click outside search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white transition-all duration-300">
        {/* Top Announcement Bar */}
        <div className="bg-zinc-950 text-zinc-300 text-[11px] py-2 px-4 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-zinc-100 font-medium">
                <Truck className="w-3.5 h-3.5 text-red-500" />
                Free Express Delivery across Bangladesh on orders above ৳5,000
              </span>
              <span className="hidden lg:inline text-zinc-600">|</span>
              <span className="hidden lg:inline text-zinc-400">
                Official Motoplex Importer: Aprilia • Vespa • Moto Guzzi
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <Link
                href="/contact"
                className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"
              >
                <MapPin className="w-3 h-3 text-red-500" />
                <span>Gulshan-2 Showroom</span>
              </Link>
              <Link
                href="/account/orders"
                className="hidden md:inline hover:text-white transition-colors"
              >
                Track Order
              </Link>
              <div className="flex items-center gap-1 text-zinc-400 font-bold">
                <span className="text-[10px] bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded">
                  BDT ৳
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div
          className={`border-b border-zinc-200 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
            isScrolled ? "shadow-md py-2.5" : "py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Left: Mobile hamburger & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-zinc-700 hover:text-zinc-950 lg:hidden rounded-lg hover:bg-zinc-100"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link href="/" className="flex items-center gap-2 group">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-black text-xl sm:text-2xl tracking-tighter text-zinc-950 group-hover:text-red-600 transition-colors">
                      MOTOPLEX
                    </span>
                    {/* Italian Tricolor Accent Bars */}
                    <div className="flex h-3.5 w-2 rounded-xs overflow-hidden flex-col shadow-xs">
                      <span className="bg-emerald-600 flex-1 w-full" />
                      <span className="bg-white flex-1 w-full" />
                      <span className="bg-red-600 flex-1 w-full" />
                    </div>
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.22em] text-zinc-500 uppercase -mt-1">
                    BANGLADESH
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {/* Mega Menu Toggle */}
              <div
                className="relative"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-red-600 py-2 transition-colors">
                  <span>Categories & Models</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isMegaMenuOpen ? "rotate-180 text-red-600" : ""
                    }`}
                  />
                </button>

                {isMegaMenuOpen && <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />}
              </div>

              <Link
                href="/category/motorcycles"
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-red-600 transition-colors"
              >
                Motorcycles
              </Link>
              <Link
                href="/category/helmets"
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-red-600 transition-colors"
              >
                Helmets
              </Link>
              <Link
                href="/category/riding-gear"
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-red-600 transition-colors"
              >
                Riding Gear
              </Link>
              <Link
                href="/category/performance-parts"
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-red-600 transition-colors"
              >
                Performance
              </Link>
              <Link
                href="/shop"
                className="text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
              >
                All Products
              </Link>
            </nav>

            {/* Center/Right: Live Autocomplete Search Bar */}
            <div ref={searchRef} className="relative hidden md:block flex-1 max-w-xs lg:max-w-sm">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search bikes, helmets, jackets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-zinc-50 hover:bg-zinc-100/80 focus:bg-white border border-zinc-200 focus:border-red-600 rounded-full pl-9 pr-8 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600/10 transition-all"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-zinc-400 hover:text-zinc-600 absolute right-2.5 top-2"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Autocomplete Dropdown Preview */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden z-50 animate-in fade-in duration-150">
                  {searchResults.length > 0 ? (
                    <div className="p-2 space-y-1">
                      <p className="px-3 py-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        Matching Products
                      </p>
                      {searchResults.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/product/${prod.slug}`}
                          onClick={() => {
                            setIsSearchFocused(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-50 transition-colors group"
                        >
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                            <Image src={prod.images[0]} alt="" fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-zinc-900 group-hover:text-red-600 truncate">
                              {prod.name}
                            </h4>
                            <p className="text-[10px] text-zinc-500">{prod.brand}</p>
                          </div>
                          <span className="text-xs font-bold text-zinc-950">
                            ৳{prod.price.toLocaleString("en-BD")}
                          </span>
                        </Link>
                      ))}
                      <div className="pt-2 border-t border-zinc-100 text-center">
                        <button
                          onClick={handleSearchSubmit}
                          className="text-xs font-semibold text-red-600 hover:underline py-1"
                        >
                          View all results for &ldquo;{searchQuery}&rdquo; →
                        </button>
                      </div>
                    </div>
                  ) : searchQuery.trim().length > 1 ? (
                    <div className="p-6 text-center text-xs text-zinc-500">
                      No products found for &ldquo;{searchQuery}&rdquo;.
                    </div>
                  ) : (
                    <div className="p-4 space-y-3">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                        Trending Searches in Bangladesh
                      </p>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        {[
                          "Aprilia RS 457",
                          "Vespa Sprint 150",
                          "Shoei X-SPR Pro",
                          "Summer Mesh Jacket",
                          "Akrapovič Exhaust",
                          "Dainese Suit",
                        ].map((trend) => (
                          <button
                            key={trend}
                            onClick={() => {
                              setSearchQuery(trend);
                              router.push(`/shop?q=${encodeURIComponent(trend)}`);
                              setIsSearchFocused(false);
                            }}
                            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs px-2.5 py-1 rounded-full transition-colors"
                          >
                            {trend}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Admin Portal Demo Badge */}
              <Link
                href="/admin"
                className="hidden xl:flex items-center gap-1.5 text-[11px] font-bold text-zinc-600 hover:text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200"
                title="Admin Dashboard Demo"
              >
                <Shield className="w-3.5 h-3.5 text-red-600" />
                <span>Admin Demo</span>
              </Link>

              {/* User Account */}
              <Link
                href="/account"
                className="p-2 text-zinc-700 hover:text-zinc-950 rounded-xl hover:bg-zinc-100 transition-colors"
                title="My Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-2 text-zinc-700 hover:text-zinc-950 rounded-xl hover:bg-zinc-100 transition-colors relative"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2.5 bg-zinc-950 hover:bg-zinc-800 text-white pl-3 pr-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 group"
                aria-label="View shopping cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[10px] text-zinc-400 font-medium leading-none">Cart</span>
                  <span className="text-xs font-bold text-white leading-tight">
                    ৳{subtotal.toLocaleString("en-BD")}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Drawers */}
      <CartDrawer />
      <MobileMenuDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}

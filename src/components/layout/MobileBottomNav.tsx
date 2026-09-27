"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: Grid },
    { label: "Wishlist", href: "/wishlist", icon: Heart, count: wishlist.length },
    { label: "Cart", isCartTrigger: true, icon: ShoppingBag, count: itemCount },
    { label: "Account", href: "/account", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 py-1.5 px-3 md:hidden shadow-lg">
      <div className="grid grid-cols-5 items-center">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.href ? pathname === item.href : false;

          if (item.isCartTrigger) {
            return (
              <button
                key={idx}
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center justify-center py-1 text-zinc-600 hover:text-red-600 transition-colors relative"
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.count && item.count > 0 ? (
                    <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.count}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] font-medium mt-1">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href!}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
                isActive ? "text-red-600 font-bold" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.count && item.count > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-zinc-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.count}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

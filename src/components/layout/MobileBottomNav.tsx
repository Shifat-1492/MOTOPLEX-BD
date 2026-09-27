"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Wrench, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Parts & Gear", href: "/shop", icon: Grid },
    { label: "Services", href: "/services", icon: Wrench, isHighlighted: true },
    { label: "Cart", isCartTrigger: true, icon: ShoppingBag, count: itemCount },
    { label: "Account", href: "/account", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 pt-1.5 pb-2 md:hidden shadow-xl pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-5 items-center px-1">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.href ? pathname === item.href : false;

          if (item.isCartTrigger) {
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center justify-center py-1 text-zinc-600 hover:text-red-600 transition-colors relative cursor-pointer active:scale-95"
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.count && item.count > 0 ? (
                    <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                      {item.count}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] font-semibold mt-1">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href!}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative active:scale-95 ${
                isActive
                  ? "text-red-600 font-bold"
                  : item.isHighlighted
                  ? "text-zinc-900 font-bold"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isHighlighted && !isActive ? "text-red-600" : ""}`} />
                {item.isHighlighted && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                )}
              </div>
              <span className="text-[10px] font-semibold mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

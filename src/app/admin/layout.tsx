"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FolderTree,
  Tag,
  Users,
  Store,
  Menu,
  X,
  ShieldCheck,
  Bell,
  Search,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Products & Stock", href: "/admin/products", icon: Package },
    { label: "Orders & Shipping", href: "/admin/orders", icon: ShoppingCart },
    { label: "Categories Tree", href: "/admin/categories", icon: FolderTree },
    { label: "Coupons & Discounts", href: "/admin/coupons", icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-black text-sm tracking-tight text-white">MOTOPLEX ADMIN</span>
        </div>
        <Link
          href="/"
          className="text-xs text-red-400 font-bold hover:underline flex items-center gap-1"
        >
          <Store className="w-3.5 h-3.5" /> Storefront
        </Link>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800/80 p-6 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-black text-xl tracking-tighter text-white">
                    MOTOPLEX
                  </span>
                  <div className="flex h-3 w-1.5 rounded-xs overflow-hidden flex-col">
                    <span className="bg-emerald-600 flex-1 w-full" />
                    <span className="bg-white flex-1 w-full" />
                    <span className="bg-red-600 flex-1 w-full" />
                  </div>
                </div>
                <span className="text-[9px] font-bold tracking-[0.2em] text-red-500 uppercase -mt-0.5">
                  ADMIN CONSOLE
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 pt-4 text-xs font-semibold">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-red-600 text-white font-bold shadow-md shadow-red-600/20"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-6 border-t border-zinc-800/80 text-xs">
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5 text-zinc-200 font-bold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Store Access</span>
            </div>
            <span>Logged in as Super Administrator (Dhaka HQ)</span>
          </div>

          <Link
            href="/"
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-zinc-800"
          >
            <Store className="w-3.5 h-3.5 text-red-500" />
            <span>Switch to Customer Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-900/40">
        {/* Top Header */}
        <header className="h-16 bg-zinc-950/80 border-b border-zinc-800/80 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search orders, SKU, customers..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Systems Normal</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-md">
              HQ
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

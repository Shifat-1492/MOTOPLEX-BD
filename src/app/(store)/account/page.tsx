"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Package,
  MapPin,
  Heart,
  ShieldCheck,
  ChevronRight,
  Clock,
  Truck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { mockOrders } from "@/data/orders";
import { useWishlist } from "@/context/WishlistContext";

export default function AccountOverviewPage() {
  const { wishlist } = useWishlist();
  const recentOrder = mockOrders[0];

  return (
    <div className="bg-zinc-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* User Hero Banner */}
        <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-red-600/20 border-2 border-red-500/40 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                alt="Tanvir Rahman"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">Tanvir Rahman Chowdhury</h1>
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  VIP Paddock Tier
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Member since January 2025 • tanvir.rahman@gmail.com • +880 1711-234567
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/account/orders"
              className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              Order History ({mockOrders.length})
            </Link>
            <Link
              href="/account/profile"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* 3 Overview Quick Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Total Orders Placed
              </span>
              <p className="text-2xl font-black text-zinc-950 mt-1">{mockOrders.length} Completed</p>
              <Link href="/account/orders" className="text-xs font-semibold text-red-600 hover:underline mt-2 inline-block">
                View All Deliveries →
              </Link>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-700 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Wishlist Items
              </span>
              <p className="text-2xl font-black text-zinc-950 mt-1">{wishlist.length} Saved</p>
              <Link href="/wishlist" className="text-xs font-semibold text-red-600 hover:underline mt-2 inline-block">
                Manage Wishlist →
              </Link>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Active Showroom Warranty
              </span>
              <p className="text-2xl font-black text-emerald-600 mt-1">Certified</p>
              <span className="text-xs text-zinc-500 mt-1 block">Valid until Dec 2027</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Recent Order Spotlight */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-zinc-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-2">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Most Recent Order
              </span>
              <h3 className="text-lg font-bold text-zinc-950 mt-0.5">
                {recentOrder.orderNumber} • Placed on {recentOrder.date}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                <Clock className="w-3.5 h-3.5" />
                {recentOrder.status} (In Transit)
              </span>
              <Link
                href="/account/orders"
                className="text-xs font-bold text-zinc-700 hover:text-red-600 underline"
              >
                Order Details
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {recentOrder.items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 border border-zinc-200">
                    <Image src={it.productImage} alt="" fill className="object-cover" />
                  </div>
                  <div className="text-xs">
                    <h4 className="font-bold text-zinc-900">{it.productName}</h4>
                    <p className="text-[11px] text-zinc-500">{it.variantInfo} • Qty: {it.quantity}</p>
                  </div>
                </div>
                <span className="text-xs font-black text-zinc-950">
                  ৳{it.total.toLocaleString("en-BD")}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-700">
              <Truck className="w-4 h-4 text-red-600" />
              <span>
                Courier: <strong>{recentOrder.courierName} Express</strong> • Tracking Code:{" "}
                <strong className="font-mono text-zinc-900">{recentOrder.trackingNumber}</strong>
              </span>
            </div>
            <span className="font-bold text-zinc-950">
              Total Order: ৳{recentOrder.total.toLocaleString("en-BD")}
            </span>
          </div>
        </div>

        {/* Addresses & Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Default Address */}
          <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-900">
                  Default Shipping Address
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Primary
              </span>
            </div>
            <div className="text-xs text-zinc-600 space-y-1">
              <p className="font-bold text-zinc-900 text-sm">Tanvir Rahman</p>
              <p>House 14, Road 112, Gulshan-2, Dhaka 1212</p>
              <p>Dhaka City, Bangladesh</p>
              <p className="text-zinc-500 font-mono pt-1">+880 1711-234567</p>
            </div>
            <Link
              href="/account/addresses"
              className="text-xs font-bold text-red-600 hover:underline inline-block pt-1"
            >
              Manage Saved Addresses (2 Addresses) →
            </Link>
          </div>

          {/* Quick Account Links */}
          <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-xs space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-100">
              Account Shortcuts
            </h3>
            <div className="divide-y divide-zinc-100 text-xs">
              <Link href="/account/orders" className="flex items-center justify-between py-2.5 hover:text-red-600">
                <span>View All Past Invoices & Orders</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link href="/account/profile" className="flex items-center justify-between py-2.5 hover:text-red-600">
                <span>Security & Password Settings</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link href="/wishlist" className="flex items-center justify-between py-2.5 hover:text-red-600">
                <span>Saved Wishlist ({wishlist.length} Items)</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link href="/contact" className="flex items-center justify-between py-2.5 hover:text-red-600">
                <span>Contact Dedicated VIP Concierge</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

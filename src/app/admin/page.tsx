"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Truck,
  ExternalLink,
} from "lucide-react";
import { mockOrders } from "@/data/orders";
import { products } from "@/data/products";
import { useToast } from "@/context/ToastContext";

export default function AdminDashboardPage() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState(mockOrders);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o))
    );
    showToast("Status Updated", `Order ${orderId} status changed to ${newStatus}.`, "success");
  };

  const lowStockProducts = products.filter((p) => p.stock <= 4);

  return (
    <div className="space-y-8">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            Motoplex Operations HQ
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            EXECUTIVE DASHBOARD
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/admin/products"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-red-600/20"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold uppercase">
            <span>Gross Revenue (BDT)</span>
            <span className="text-emerald-400 font-bold flex items-center text-[11px]">
              +18.4% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ৳38,45,000
          </div>
          <span className="text-[11px] text-zinc-500 block">Current month volume</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold uppercase">
            <span>Monthly Orders</span>
            <span className="text-emerald-400 font-bold flex items-center text-[11px]">
              +12.1% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            142 Orders
          </div>
          <span className="text-[11px] text-amber-400 block">4 pending dispatch today</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold uppercase">
            <span>Registered Riders</span>
            <span className="text-emerald-400 font-bold flex items-center text-[11px]">
              +24% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            1,840
          </div>
          <span className="text-[11px] text-zinc-500 block">Across 64 Bangladesh districts</span>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold uppercase">
            <span>Avg Order Value (AOV)</span>
            <span className="text-zinc-400 font-bold text-[11px]">Steady</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ৳27,077
          </div>
          <span className="text-[11px] text-zinc-500 block">High conversion tier</span>
        </div>
      </div>

      {/* Main Tables Row: Recent Orders & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders with Status Control */}
        <div className="lg:col-span-8 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Live Orders & Courier Control
              </h2>
              <p className="text-xs text-zinc-400">Interactive demo status switcher</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-red-400 hover:text-red-300"
            >
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] text-zinc-400 uppercase font-bold border-b border-zinc-800">
                <tr>
                  <th className="pb-3">Order / Date</th>
                  <th className="pb-3">Customer / City</th>
                  <th className="pb-3">Courier</th>
                  <th className="pb-3">Total (BDT)</th>
                  <th className="pb-3">Status Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5">
                      <span className="font-mono font-bold text-red-400 block">{ord.orderNumber}</span>
                      <span className="text-[10px] text-zinc-500">{ord.date}</span>
                    </td>
                    <td className="py-3.5">
                      <span className="font-bold text-white block">{ord.shippingAddress.fullName}</span>
                      <span className="text-[10px] text-zinc-400">{ord.shippingAddress.district}</span>
                    </td>
                    <td className="py-3.5">
                      <span className="text-zinc-300 font-medium block">{ord.courierName}</span>
                      <span className="font-mono text-[10px] text-zinc-500">{ord.trackingNumber}</span>
                    </td>
                    <td className="py-3.5 font-bold text-white">
                      ৳{ord.total.toLocaleString("en-BD")}
                    </td>
                    <td className="py-3.5">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className="bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg px-2.5 py-1 focus:outline-none focus:border-red-500 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Inventory Alerts */}
        <div className="lg:col-span-4 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-800">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Low Stock Warnings
            </h2>
          </div>

          <div className="space-y-3">
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-white truncate max-w-[170px]">{p.name}</h4>
                  <span className="text-[10px] text-zinc-500 font-mono">SKU: {p.sku}</span>
                </div>
                <div className="text-right">
                  <span className="bg-amber-950 border border-amber-800 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full block">
                    {p.stock} units left
                  </span>
                  <span className="text-[10px] text-zinc-400 mt-1 block">
                    ৳{p.price.toLocaleString("en-BD")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/admin/products"
            className="block w-full text-center text-xs font-bold text-red-400 hover:text-red-300 pt-2 hover:underline"
          >
            Manage All Product Inventories →
          </Link>
        </div>
      </div>
    </div>
  );
}

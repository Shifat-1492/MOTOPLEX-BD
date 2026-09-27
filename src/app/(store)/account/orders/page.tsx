"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  Download,
  RotateCcw,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { mockOrders } from "@/data/orders";
import { useToast } from "@/context/ToastContext";

export default function AccountOrdersPage() {
  const { showToast } = useToast();
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredOrders = mockOrders.filter((order) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return order.status === "Processing" || order.status === "Pending" || order.status === "Shipped";
    if (filterStatus === "completed") return order.status === "Delivered";
    return true;
  });

  const handleDownloadInvoice = (orderNumber: string) => {
    showToast("Generating Invoice", `Official VAT Invoice for ${orderNumber} generated.`, "success");
  };

  return (
    <div className="bg-zinc-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Link & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <Link
              href="/account"
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard Overview
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              ORDER HISTORY & TRACKING
            </h1>
          </div>

          {/* Filter Status Tabs */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-zinc-200 shadow-xs text-xs font-bold">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterStatus === "all" ? "bg-zinc-950 text-white" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              All ({mockOrders.length})
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterStatus === "active" ? "bg-zinc-950 text-white" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              Active Shipments (1)
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterStatus === "completed" ? "bg-zinc-950 text-white" : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              Delivered ({mockOrders.filter((o) => o.status === "Delivered").length})
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const statusColors = {
              Pending: "bg-amber-50 text-amber-700 border-amber-200",
              Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
              Processing: "bg-indigo-50 text-indigo-700 border-indigo-200",
              Shipped: "bg-purple-50 text-purple-700 border-purple-200",
              Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
              Cancelled: "bg-red-50 text-red-700 border-red-200",
            };

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="bg-zinc-50/80 p-5 sm:px-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 text-xs">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase block">Order Placed</span>
                      <strong className="text-zinc-900">{order.date}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase block">Order Number</span>
                      <strong className="font-mono text-red-600">{order.orderNumber}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase block">Recipient</span>
                      <strong className="text-zinc-900">{order.shippingAddress.fullName}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] border ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                    <button
                      onClick={() => handleDownloadInvoice(order.orderNumber)}
                      className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 rounded-lg transition-colors"
                      title="Download PDF Invoice"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Items in Order */}
                <div className="p-6 divide-y divide-zinc-100">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                          <Image src={it.productImage} alt="" fill className="object-cover" />
                        </div>
                        <div className="space-y-1 text-xs">
                          <h4 className="font-bold text-zinc-900 text-sm leading-snug">
                            {it.productName}
                          </h4>
                          <p className="text-zinc-500">
                            {it.variantInfo} • Qty: {it.quantity}
                          </p>
                          <span className="font-mono text-zinc-700 font-bold sm:hidden block">
                            ৳{it.total.toLocaleString("en-BD")}
                          </span>
                        </div>
                      </div>

                      <div className="text-right hidden sm:block">
                        <span className="font-black text-sm text-zinc-950 block">
                          ৳{it.total.toLocaleString("en-BD")}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium">
                          ৳{it.price.toLocaleString("en-BD")} / unit
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking & Payment Footer Bar */}
                <div className="bg-zinc-50 p-5 px-6 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-medium text-zinc-700">
                      <Truck className="w-4 h-4 text-red-600" />
                      <span>
                        Shipped via <strong>{order.courierName} Express</strong> • Tracking ID:{" "}
                        <strong className="font-mono text-zinc-900">{order.trackingNumber}</strong>
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Delivery Address: {order.shippingAddress.address}, {order.shippingAddress.area}, {order.shippingAddress.district}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 block uppercase font-bold">Total Paid ({order.paymentMethod})</span>
                      <span className="font-black text-base text-zinc-950">৳{order.total.toLocaleString("en-BD")}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

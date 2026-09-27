"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Search, Truck, Filter, Download } from "lucide-react";
import { mockOrders } from "@/data/orders";
import { useToast } from "@/context/ToastContext";

export default function AdminOrdersManagerPage() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleUpdateStatus = (id: string, status: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: status as any } : o))
    );
    showToast("Status Updated", `Order ${id} changed to ${status}.`, "success");
  };

  const handleAssignCourier = (id: string, courier: "Pathao" | "Steadfast" | "RedX") => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, courierName: courier } : o))
    );
    showToast("Courier Assigned", `Assigned to ${courier} Courier.`, "info");
  };

  const filtered = orders.filter((o) => {
    if (filterStatus === "all") return true;
    return o.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="text-xs font-semibold text-zinc-500 hover:text-white flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard Overview
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ORDER FULFILLMENT & COURIER DISPATCH
          </h1>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["all", "processing", "shipped", "delivered"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-colors ${
                filterStatus === st ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
        <span className="text-zinc-400 font-medium">
          Showing <strong className="text-white">{filtered.length}</strong> orders
        </span>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/60 text-zinc-400 text-[11px] font-bold uppercase border-b border-zinc-800">
              <tr>
                <th className="p-4 pl-6">Order ID</th>
                <th className="p-4">Customer & Phone</th>
                <th className="p-4">Delivery Address</th>
                <th className="p-4">Courier Partner</th>
                <th className="p-4">Order Value</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4 pl-6">
                    <span className="font-mono font-bold text-red-400 block">{ord.orderNumber}</span>
                    <span className="text-[10px] text-zinc-500">{ord.date}</span>
                  </td>
                  <td className="p-4">
                    <strong className="text-white block">{ord.shippingAddress.fullName}</strong>
                    <span className="text-[11px] text-zinc-400 font-mono">{ord.shippingAddress.phone}</span>
                  </td>
                  <td className="p-4 text-zinc-300 max-w-xs">
                    <span className="block truncate">{ord.shippingAddress.address}</span>
                    <span className="text-[10px] text-zinc-500">{ord.shippingAddress.district}, {ord.shippingAddress.division}</span>
                  </td>
                  <td className="p-4">
                    <select
                      value={ord.courierName}
                      onChange={(e) => handleAssignCourier(ord.id, e.target.value as any)}
                      className="bg-zinc-950 border border-zinc-700 text-white rounded-lg px-2 py-1 focus:outline-none cursor-pointer text-xs"
                    >
                      <option value="Pathao">Pathao Express</option>
                      <option value="Steadfast">Steadfast</option>
                      <option value="RedX">RedX Logistics</option>
                    </select>
                  </td>
                  <td className="p-4 font-black text-white">
                    ৳{ord.total.toLocaleString("en-BD")}
                  </td>
                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                      className="bg-zinc-950 border border-zinc-700 text-white rounded-lg px-2.5 py-1 focus:outline-none focus:border-red-500 cursor-pointer text-xs font-semibold"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() =>
                        showToast("Invoice Generated", `VAT Challan for ${ord.orderNumber} ready.`, "success")
                      }
                      className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                      title="Generate PDF Invoice"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

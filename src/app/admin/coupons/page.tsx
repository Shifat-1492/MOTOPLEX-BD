"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Tag, Plus, CheckCircle2, Trash2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface AdminCoupon {
  code: string;
  type: string;
  value: string;
  minOrder: number;
  usageCount: number;
  status: "Active" | "Expired";
  expiry: string;
}

export default function AdminCouponsPage() {
  const { showToast } = useToast();

  const [coupons, setCoupons] = useState<AdminCoupon[]>([
    {
      code: "MOTO10",
      type: "Percentage (10%)",
      value: "10% Off",
      minOrder: 2000,
      usageCount: 84,
      status: "Active",
      expiry: "31 Dec 2026",
    },
    {
      code: "FREESHIP",
      type: "Free Courier Delivery",
      value: "100% Off Shipping",
      minOrder: 1000,
      usageCount: 142,
      status: "Active",
      expiry: "Ongoing 2026",
    },
    {
      code: "VIPRIDER",
      type: "Flat BDT Discount",
      value: "৳1,500 Off",
      minOrder: 15000,
      usageCount: 29,
      status: "Active",
      expiry: "30 Nov 2026",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newMin, setNewMin] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const newC: AdminCoupon = {
      code: newCode.trim().toUpperCase(),
      type: "Custom Campaign",
      value: newValue || "৳500 Off",
      minOrder: Number(newMin) || 3000,
      usageCount: 0,
      status: "Active",
      expiry: "31 Dec 2026",
    };

    setCoupons([newC, ...coupons]);
    setIsModalOpen(false);
    showToast("Coupon Created", `Voucher ${newCode} is now live across Bangladesh.`, "success");
    setNewCode("");
    setNewValue("");
    setNewMin("");
  };

  const handleDelete = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast("Coupon Deleted", `Code ${code} deactivated.`, "info");
  };

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
            PROMOTIONAL COUPONS & VOUCHERS
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Promo Voucher</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/60 text-zinc-400 text-[11px] font-bold uppercase border-b border-zinc-800">
              <tr>
                <th className="p-4 pl-6">Voucher Code</th>
                <th className="p-4">Discount Value</th>
                <th className="p-4">Min Order (BDT)</th>
                <th className="p-4">Redemptions</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4 pl-6">
                    <span className="font-mono font-black text-white text-sm bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800">
                      {c.code}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-400">{c.value}</td>
                  <td className="p-4 font-mono text-zinc-300">৳{c.minOrder.toLocaleString("en-BD")}</td>
                  <td className="p-4 font-semibold text-zinc-300">{c.usageCount} orders</td>
                  <td className="p-4 text-zinc-400">{c.expiry}</td>
                  <td className="p-4">
                    <span className="bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() => handleDelete(c.code)}
                      className="text-zinc-500 hover:text-red-400 p-1.5 transition-colors"
                      title="Deactivate coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-2xl text-xs">
            <h3 className="font-bold text-sm text-white pb-2 border-b border-zinc-800">
              Create New Promotion Code
            </h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MOTO20"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Discount Amount/Type</label>
                <input
                  type="text"
                  placeholder="e.g. 15% Off or ৳1,000 Off"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Minimum Order Amount (BDT)</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={newMin}
                  onChange={(e) => setNewMin(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-zinc-900 text-zinc-400 font-bold py-2.5 rounded-xl hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-xl hover:bg-red-700"
                >
                  Publish Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

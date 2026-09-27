"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Mail, Phone, Lock, Save, ShieldCheck } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ProfilePage() {
  const { showToast } = useToast();

  const [name, setName] = useState("Tanvir Rahman Chowdhury");
  const [email, setEmail] = useState("tanvir.rahman@gmail.com");
  const [phone, setPhone] = useState("01711234567");
  const [city, setCity] = useState("Dhaka");
  const [bikeModel, setBikeModel] = useState("Aprilia RS 457 (Prismatic Dark)");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile Updated", "Your rider profile details have been saved.", "success");
  };

  return (
    <div className="bg-zinc-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link
            href="/account"
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard Overview
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            MY RIDER PROFILE & SECURITY
          </h1>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-zinc-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wider">
                Personal Details
              </h2>
              <p className="text-xs text-zinc-500">Update your verified rider credentials</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Verified ID
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-zinc-900 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-900 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-900 block mb-1">Phone Number (+880)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-900 block mb-1">Current City / Division</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-zinc-900 block mb-1">
                Motorcycle Owned (For VIP Event Invitations & Showroom Service)
              </label>
              <input
                type="text"
                value={bikeModel}
                onChange={(e) => setBikeModel(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">
              Changes reflect across your customer account immediately.
            </span>
            <button
              type="submit"
              className="bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Copy, Check, Clock, Sparkles } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function PromoBanner() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("MOTO10");
    setCopied(true);
    showToast("Voucher Copied!", "Code 'MOTO10' copied to clipboard. Apply at checkout for 10% off.", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-12 md:py-16 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 rounded-3xl border border-zinc-800 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Limited Seasonal Paddock Campaign
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                MOTOPLEX AUTUMN TRACK PASS: ENJOY 10% OFF
              </h2>

              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl">
                Upgrade your protection ahead of the highway season. Get 10% instant discount across all Shoei helmets, Dainese leather suits, and Alpinestars boots with coupon code <strong className="text-white font-mono">MOTO10</strong>.
              </p>

              {/* Countdown Timer */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider mr-2">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>Offer Ends In:</span>
                </div>
                <div className="flex items-center gap-2 text-center font-mono">
                  <div className="bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2 min-w-12">
                    <span className="text-lg font-black text-white">{String(timeLeft.days).padStart(2, "0")}</span>
                    <span className="block text-[9px] text-zinc-400 uppercase">Days</span>
                  </div>
                  <span className="text-zinc-500 font-bold">:</span>
                  <div className="bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2 min-w-12">
                    <span className="text-lg font-black text-white">{String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className="block text-[9px] text-zinc-400 uppercase">Hours</span>
                  </div>
                  <span className="text-zinc-500 font-bold">:</span>
                  <div className="bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2 min-w-12">
                    <span className="text-lg font-black text-white">{String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className="block text-[9px] text-zinc-400 uppercase">Mins</span>
                  </div>
                  <span className="text-zinc-500 font-bold">:</span>
                  <div className="bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2 min-w-12">
                    <span className="text-lg font-black text-red-400">{String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className="block text-[9px] text-zinc-400 uppercase">Secs</span>
                  </div>
                </div>
              </div>

              {/* Voucher Action & Shop Button */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleCopyCode}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs font-bold px-4 py-3.5 rounded-xl border border-dashed border-zinc-600 flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>Code: MOTO10</span>
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-400" />
                  )}
                </button>

                <Link
                  href="/shop?category=riding-gear"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center gap-2 group"
                >
                  <span>Shop Qualified Gear</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-zinc-700/80 shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1558980664-769d59546b3d?q=80&w=800&auto=format&fit=crop"
                  alt="Track Gear Promo Motoplex"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-zinc-950/70 backdrop-blur-md rounded-xl border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Shoei X-SPR & Alpinestars Gear</span>
                  <span className="text-[11px] text-red-400 font-semibold">Instant 10% Off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

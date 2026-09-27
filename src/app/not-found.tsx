import React from "react";
import Link from "next/link";
import { ArrowRight, Search, Bike } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — MOTOPLEX BD",
  description: "The page you are looking for does not exist. Explore the full Motoplex Bangladesh collection.",
};

export default function NotFoundPage() {
  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col items-center justify-center text-white px-4 py-24 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-zinc-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center space-y-8 max-w-lg w-full">
        {/* Giant 404 */}
        <div className="relative">
          <span className="text-[120px] sm:text-[180px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 select-none leading-none block">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center">
              <Bike className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            Throttle Error — Route Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            THIS TRACK DOESN'T EXIST
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
            Looks like you took a wrong turn at the paddock. The page you are
            looking for has been moved, removed, or never existed in our showroom.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Return to Pit Lane</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold text-sm px-7 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Browse Full Catalog</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-800 text-center">
          {[
            { href: "/category/motorcycles", label: "Motorcycles" },
            { href: "/category/helmets", label: "Helmets" },
            { href: "/category/riding-gear", label: "Riding Gear" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-bold text-zinc-400 hover:text-red-400 transition-colors py-2"
            >
              {label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

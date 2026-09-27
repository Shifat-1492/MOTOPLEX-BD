"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      showToast("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    setSubscribed(true);
    showToast("Subscribed!", "You have received ৳1,000 promo voucher MOTO10.", "success");
    setEmail("");
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 text-xs">
      {/* Upper Newsletter & VIP Club */}
      <div className="border-b border-zinc-800/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[10px] font-bold text-red-500 tracking-widest uppercase">
              Join Motoplex Paddock Club
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Receive ৳1,000 Off Your First Order
            </h3>
            <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
              Get exclusive early invitations to Aprilia track days, new helmet arrivals, and private Italian motorcycle launches in Bangladesh.
            </p>
          </div>

          <div className="w-full max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2.5 bg-zinc-900 border border-emerald-500/40 p-4 rounded-2xl text-emerald-400">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <p className="font-bold text-xs text-white">Welcome to the Club!</p>
                  <p className="text-[11px] text-zinc-400">
                    Use code <strong className="text-red-400 font-mono">MOTO10</strong> at checkout for 10% off.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                >
                  Join Club <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-zinc-500 mt-2 text-center lg:text-left">
              Zero spam. Unsubscribe anytime. Official Motoplex Bangladesh Privacy Guaranteed.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-black text-2xl tracking-tighter text-white">
                    MOTOPLEX
                  </span>
                  <div className="flex h-3.5 w-2 rounded-xs overflow-hidden flex-col">
                    <span className="bg-emerald-600 flex-1 w-full" />
                    <span className="bg-white flex-1 w-full" />
                    <span className="bg-red-600 flex-1 w-full" />
                  </div>
                </div>
                <span className="text-[9px] font-bold tracking-[0.22em] text-zinc-500 uppercase -mt-1">
                  BANGLADESH
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Motoplex Bangladesh is the authorized gateway for Italian motorcycling excellence. Importer and distributor of Aprilia, Vespa, Moto Guzzi, alongside world-championship certified gear from Shoei, Dainese, Alpinestars, and Akrapovič.
            </p>

            {/* Showroom Addresses */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-200">Flagship Showroom:</strong> Plot 12, Road 113, Gulshan-2, Dhaka 1212, Bangladesh
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-200">Chattogram Lounge:</strong> GEC Circle, Nasirabad, Chattogram 4000
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-mono text-zinc-200 font-bold">+880 1700-MOTOPLEX</span>
              </div>
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/category/motorcycles" className="hover:text-white transition-colors">
                  Aprilia Supersport & Naked
                </Link>
              </li>
              <li>
                <Link href="/category/motorcycles" className="hover:text-white transition-colors">
                  Vespa Italian Scooters
                </Link>
              </li>
              <li>
                <Link href="/category/helmets" className="hover:text-white transition-colors">
                  Shoei & AGV Helmets
                </Link>
              </li>
              <li>
                <Link href="/category/riding-gear" className="hover:text-white transition-colors">
                  Leather Racing Suits & Jackets
                </Link>
              </li>
              <li>
                <Link href="/category/performance-parts" className="hover:text-white transition-colors">
                  Akrapovič & Arrow Exhausts
                </Link>
              </li>
              <li>
                <Link href="/category/accessories-maintenance" className="hover:text-white transition-colors">
                  Motul 300V & Quad Lock
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Track Delivery Status
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping & Courier Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  7-Day Return & Replacement
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Book Private Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Demo Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Portals & Demo
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white transition-colors">
                  Express Checkout UI
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-red-400 font-semibold hover:text-red-300 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Dashboard Demo
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods & Disclaimers */}
      <div className="border-t border-zinc-800/80 bg-black/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-[11px] text-zinc-400">
              © {new Date().getFullYear()} Motoplex BD (Collaborative Cloud Demo). All rights reserved.
            </p>
            <p className="text-[10px] text-zinc-600">
              Authorized brand trademarks belong to Piaggio & C. SpA, Aprilia Racing, Shoei Co. Ltd., and respective manufacturers.
            </p>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold text-zinc-300">
            <span className="bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded">
              bKash
            </span>
            <span className="bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded">
              Nagad
            </span>
            <span className="bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded">
              Visa
            </span>
            <span className="bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded">
              Mastercard
            </span>
            <span className="bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded">
              AamarPay
            </span>
            <span className="bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded text-emerald-400">
              Cash on Delivery (COD)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

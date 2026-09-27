import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
            Legal & Compliance
          </span>
          <h1 className="text-3xl font-black text-zinc-950 mt-1">
            TERMS & CONDITIONS
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Motoplex Bangladesh Commercial E-Commerce Agreement
          </p>
        </div>

        <div className="text-xs text-zinc-700 leading-relaxed space-y-4">
          <p>
            Welcome to Motoplex Bangladesh. By accessing or purchasing from our online store or physical showrooms, you agree to be bound by the following terms and commercial guidelines.
          </p>

          <h3 className="text-sm font-bold text-zinc-900 pt-2">1. Authentic Import Guarantee</h3>
          <p>
            All products displayed on Motoplex BD are guaranteed authentic, sourced through authorized European and Japanese distribution pipelines. Every serialized unit contains verifiable hologram seals.
          </p>

          <h3 className="text-sm font-bold text-zinc-900 pt-2">2. Pricing & Currency</h3>
          <p>
            All prices listed on this website are denominated in Bangladeshi Taka (BDT ৳) and include applicable import tariffs and VAT unless specifically stated otherwise. Prices are subject to revision without prior notice in accordance with international currency exchange fluctuations.
          </p>

          <h3 className="text-sm font-bold text-zinc-900 pt-2">3. Orders & Cancellation</h3>
          <p>
            An order is considered confirmed once verification is completed via SMS or phone confirmation. Orders can be cancelled prior to courier dispatch by contacting our concierge hotline.
          </p>

          <h3 className="text-sm font-bold text-zinc-900 pt-2">4. Vehicle Registrations (BRTA)</h3>
          <p>
            For motorized two-wheelers, Motoplex BD provides complete official import assessment documents, customs clearances, and delivery challans required for Bangladesh Road Transport Authority (BRTA) registration.
          </p>
        </div>

        <div className="pt-6 border-t border-zinc-200">
          <Link href="/privacy" className="text-xs font-bold text-red-600 hover:underline">
            Read Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}

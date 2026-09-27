import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
            Customer Guarantee
          </span>
          <h1 className="text-3xl font-black text-zinc-950 mt-1">
            7-DAY RETURN & SIZE EXCHANGE POLICY
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Motoplex Bangladesh Hassle-Free Riding Gear Exchange
          </p>
        </div>

        <div className="text-xs text-zinc-700 leading-relaxed space-y-6">
          <div className="p-6 bg-red-50/60 rounded-2xl border border-red-200/80 space-y-2">
            <h2 className="text-sm font-bold text-red-950 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-red-600" />
              <span>Free Size Exchange Commitment</span>
            </h2>
            <p>
              We know ordering technical riding gear online can be tricky regarding exact fitment. If your helmet, jacket, racing suit, or riding boots do not fit with 100% anatomical comfort, you can exchange them for a different size within <strong>7 business days</strong> with zero restocking fees.
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-900">Exchange Eligibility Conditions:</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Item must be unused, unridden on the road, with all original factory tags and visor protective peel films intact.</li>
              <li>Original manufacturer box, Pinlock inserts, manual, and helmet dust bag must be preserved.</li>
              <li>Proof of purchase (invoice receipt or order number MPX-XXXXX) must be provided.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-900">How to Initiate a Size Exchange:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Contact Concierge:</strong> Call our hotline at <strong>+880 1700-MOTOPLEX</strong> or send a message via our Live Concierge chat.
              </li>
              <li>
                <strong>Courier Pickup or Showroom Drop:</strong> You can either drop the parcel at our Gulshan-2 showroom or we will arrange a reverse pickup via Pathao/Steadfast Courier.
              </li>
              <li>
                <strong>Replacement Dispatch:</strong> Once verified, your revised size will be dispatched within 24 hours.
              </li>
            </ol>
          </section>
        </div>

        <div className="pt-6 border-t border-zinc-200 flex justify-between items-center text-xs">
          <Link href="/shipping" className="text-zinc-600 font-bold hover:underline">
            ← Courier Shipping Policy
          </Link>
          <Link href="/contact" className="text-red-600 font-bold hover:underline">
            Contact Support Hotline →
          </Link>
        </div>
      </div>
    </div>
  );
}

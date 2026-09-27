import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
            Logistics & Delivery
          </span>
          <h1 className="text-3xl font-black text-zinc-950 mt-1">
            SHIPPING & COURIER POLICY
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Last updated: September 2026 • Official Motoplex Bangladesh Distribution Network
          </p>
        </div>

        <div className="prose prose-zinc text-xs text-zinc-700 leading-relaxed space-y-6">
          <section className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
            <h2 className="text-sm font-bold text-zinc-900">1. Delivery Zones & Timelines</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-zinc-200">
                <strong className="text-zinc-950 block text-xs">Dhaka Metropolitan Area</strong>
                <p className="text-zinc-600 text-[11px] mt-1">
                  Deliveries within Gulshan, Banani, Dhanmondi, Uttara, Mirpur, and surrounding areas arrive within <strong>24 to 48 hours</strong> via our dedicated logistics fleet or Pathao Express.
                </p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-zinc-200">
                <strong className="text-zinc-950 block text-xs">All Other 63 Districts</strong>
                <p className="text-zinc-600 text-[11px] mt-1">
                  Deliveries to Chattogram, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, and all sub-districts arrive within <strong>2 to 4 business days</strong> via Steadfast Courier.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900">2. Courier Charges & Free Shipping Threshold</h2>
            <p>
              We believe in transparent, honest pricing. Standard delivery charges are:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Inside Dhaka:</strong> Flat ৳80</li>
              <li><strong>Outside Dhaka (All Districts):</strong> Flat ৳150</li>
              <li><strong>Free Delivery:</strong> All orders with a subtotal of ৳5,000 or above automatically qualify for 100% Free Express Delivery across Bangladesh.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900">3. Cash on Delivery (COD) & Open Box Inspection</h2>
            <p>
              All shipments dispatched by Motoplex BD are authorized with courier inspection rights. You are encouraged to inspect your gear or helmet seal prior to completing payment to the courier agent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-900">4. Motorcycle Vehicle Transport & Registration</h2>
            <p>
              For complete two-wheelers (Aprilia RS 457, Tuono 457, Vespa Sprint, and Primavera), vehicles are delivered via specialized enclosed hydraulic ramp carriers or can be collected directly during a personalized VIP unveiling at our Gulshan-2 showroom.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-zinc-200 flex justify-between items-center text-xs">
          <Link href="/returns" className="text-red-600 font-bold hover:underline">
            ← Read 7-Day Return & Size Exchange Policy
          </Link>
          <Link href="/shop" className="text-zinc-900 font-bold hover:underline">
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}

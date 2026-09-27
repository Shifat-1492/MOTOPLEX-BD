import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
            Data Protection
          </span>
          <h1 className="text-3xl font-black text-zinc-950 mt-1">
            PRIVACY & DATA POLICY
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            How Motoplex Bangladesh Protects Your Customer Data
          </p>
        </div>

        <div className="text-xs text-zinc-700 leading-relaxed space-y-4">
          <p>
            Motoplex Bangladesh respects your privacy and is committed to protecting your personal information in full compliance with Bangladesh digital commerce regulations.
          </p>

          <h3 className="text-sm font-bold text-zinc-900 pt-2">1. Information We Collect</h3>
          <p>
            We collect personal details including full name, delivery address, mobile phone number, email address, and motorcycle preferences solely for processing orders, courier shipping, and warranty registrations.
          </p>

          <h3 className="text-sm font-bold text-zinc-900 pt-2">2. Secure Payment Processing</h3>
          <p>
            Payment transactions via bKash, Nagad, Visa, Mastercard, and AamarPay are processed through 256-bit encrypted payment gateways. Motoplex BD never stores raw debit/credit card CVV or PIN numbers.
          </p>

          <h3 className="text-sm font-bold text-zinc-900 pt-2">3. Courier Data Sharing</h3>
          <p>
            Your delivery address and contact phone number are shared solely with authorized courier logistics partners (Pathao, Steadfast, RedX) for the strict purpose of completing physical parcel delivery.
          </p>
        </div>

        <div className="pt-6 border-t border-zinc-200">
          <Link href="/terms" className="text-xs font-bold text-zinc-900 hover:underline">
            ← Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}

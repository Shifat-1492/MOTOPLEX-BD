"use client";

import React from "react";
import { ShieldCheck, Truck, RefreshCw, Wrench } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: "100% Genuine European Import",
      description: "Direct importer hologram serials from Piaggio, Shoei, Dainese & Alpinestars.",
    },
    {
      icon: Truck,
      title: "Nationwide 64-District Delivery",
      description: "24-48h in Dhaka, 3-4 days all across Bangladesh with parcel inspection.",
    },
    {
      icon: RefreshCw,
      title: "7-Day Hassle-Free Size Exchange",
      description: "Helmet or jacket fit not perfect? Exchange sizes smoothly within 7 business days.",
    },
    {
      icon: Wrench,
      title: "Official Motoplex Service Warranty",
      description: "Certified master technicians with specialized Italian diagnostic tools in Gulshan.",
    },
  ];

  return (
    <section className="py-14 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 leading-snug">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

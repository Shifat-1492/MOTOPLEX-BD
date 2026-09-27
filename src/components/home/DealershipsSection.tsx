"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Navigation,
} from "lucide-react";
import { dealerships, Dealership } from "@/data/dealerships";

export function DealershipsSection() {
  const [selectedBranch, setSelectedBranch] = useState<string>("dealership-gulshan");

  return (
    <section className="py-16 md:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs text-zinc-800 font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-red-600" />
              <span>Nationwide Presence</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              3 AUTHORIZED DEALERSHIPS & SERVICE CENTERS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-xl leading-relaxed">
              Visit our state-of-the-art 3S sales, service, and spare parts facilities located strategically across Dhaka and Chattogram.
            </p>
          </div>

          <Link
            href="/dealerships"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 uppercase tracking-wider"
          >
            <span>View Branch Amenities & Staff</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Dealership Cards (1-col on mobile, 3-col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {dealerships.map((deal) => (
            <div
              key={deal.id}
              className="bg-zinc-50 rounded-3xl border border-zinc-200/90 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-zinc-300 transition-all duration-300 group"
            >
              {/* Image & City Badge */}
              <div className="relative aspect-16/10 w-full bg-zinc-900 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white px-2.5 py-1 rounded-full shadow-md">
                    {deal.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-300">
                    {deal.city}, Bangladesh
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-zinc-950 group-hover:text-red-600 transition-colors leading-snug">
                    {deal.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">{deal.tagline}</p>
                </div>

                <div className="space-y-2.5 text-xs text-zinc-600 pt-2 border-t border-zinc-200">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{deal.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-red-600 shrink-0" />
                    <a
                      href={`tel:${deal.phone.replace(/[^0-9+]/g, "")}`}
                      className="font-bold text-zinc-900 hover:text-red-600 transition-colors"
                    >
                      {deal.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-[11px] text-zinc-500">
                    <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>{deal.hours}</span>
                  </div>
                </div>

                {/* Facility Tags */}
                <div className="pt-2">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    Key Facilities:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {deal.facilities.slice(0, 3).map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-white border border-zinc-200 text-zinc-700 px-2.5 py-1 rounded-lg font-medium"
                      >
                        {f}
                      </span>
                    ))}
                    {deal.facilities.length > 3 && (
                      <span className="text-[10px] text-zinc-500 px-1 py-1">
                        +{deal.facilities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-2">
                <a
                  href={deal.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-red-600" />
                  <span>Get Directions</span>
                </a>
                <Link
                  href="/services"
                  className="flex-1 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

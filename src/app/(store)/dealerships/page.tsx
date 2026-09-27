"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  Navigation,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Mail,
  Wrench,
} from "lucide-react";
import { dealerships, Dealership } from "@/data/dealerships";
import { ServiceBookingModal } from "@/components/services/ServiceBookingModal";

export default function DealershipsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Header */}
      <div className="bg-zinc-950 text-white py-16 md:py-20 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-red-500 font-bold">Authorized Dealerships</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-xs text-red-400 font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Official 3S Flagship Network</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              3 AUTHORIZED SHOWROOMS & MASTER WORKSHOPS
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Experience Aprilia and Vespa superbikes, certified service facilities, and authentic gear at our premier branches in Gulshan-2, Uttara, and Chattogram.
            </p>
          </div>
        </div>
      </div>

      {/* Dealerships Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {dealerships.map((deal, idx) => (
          <div
            key={deal.id}
            className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left Image */}
            <div className="lg:col-span-5 relative aspect-16/10 lg:aspect-auto min-h-[260px] bg-zinc-900">
              <Image
                src={deal.image}
                alt={deal.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-black uppercase tracking-wider bg-red-600 text-white px-3 py-1 rounded-full shadow-lg">
                  {deal.badge}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs font-bold bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-zinc-700">
                  Branch #{idx + 1} • {deal.city}
                </span>
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-950">
                    {deal.name}
                  </h2>
                  <span className="font-mono text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded border border-red-200 w-fit">
                    Code: {deal.code}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">{deal.tagline}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-700 pt-2 border-t border-zinc-100">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-zinc-900">Address:</strong>
                        <span>{deal.address}</span>
                        <span className="text-[11px] text-zinc-400 block mt-0.5">({deal.landmark})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                      <div>
                        <strong className="block text-zinc-900">Operating Hours:</strong>
                        <span>{deal.hours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-red-600 shrink-0" />
                      <div>
                        <strong className="block text-zinc-900">Showroom & Service Hotline:</strong>
                        <a href={`tel:${deal.phone.replace(/[^0-9+]/g, "")}`} className="font-bold text-red-600 hover:underline">
                          {deal.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                      <div>
                        <strong className="block text-zinc-900">Branch Email:</strong>
                        <span>{deal.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Facility Tags */}
                <div className="pt-2">
                  <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    On-Site Facilities & Equipment ({deal.serviceBays} Master Service Bays):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {deal.facilities.map((f, i) => (
                      <span
                        key={i}
                        className="text-xs bg-zinc-100 border border-zinc-200 text-zinc-800 px-3 py-1 rounded-xl font-medium"
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row gap-3">
                <a
                  href={deal.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-red-600" />
                  <span>Google Map Directions</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Workshop Service at this Branch</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ServiceBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}

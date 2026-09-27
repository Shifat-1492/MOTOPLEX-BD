"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Flame,
  Gauge,
  Sparkles,
  Calendar,
} from "lucide-react";
import { bikeServices, BikeService } from "@/data/services";
import { ServiceBookingModal } from "@/components/services/ServiceBookingModal";

export function ServicesSection() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("srv-master");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <section className="py-16 md:py-24 bg-zinc-950 text-white relative overflow-hidden border-b border-zinc-800">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-xs text-red-400 font-bold uppercase tracking-wider mb-2">
              <Wrench className="w-3.5 h-3.5 text-red-500" />
              <span>Official 3S Master Workshop</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              PRECISION MOTORCYCLE SERVICES
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed">
              Factory-certified master technicians, Italian Texa diagnostic systems, and 100% genuine OEM parts for European and Japanese superbikes in Bangladesh.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenBooking("srv-master")}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Service Appointment</span>
            </button>
            <Link
              href="/services"
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>View All 4 Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Service Cards Grid (Responsive 1-col on mobile, 2-col on tablet/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {bikeServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between group ${
                service.id === "srv-master"
                  ? "bg-zinc-900/90 border-red-600/50 shadow-xl shadow-red-950/40 relative"
                  : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {service.id === "srv-master" && (
                <div className="bg-red-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest py-1.5 px-4 text-center flex items-center justify-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Client Choice — Signature 52-Point Master Service</span>
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-5">
                {/* Header details */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-zinc-800/80 px-2.5 py-1 rounded-md">
                      {service.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-2 group-hover:text-red-400 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-zinc-500 uppercase block">Starting At</span>
                    <span className="text-xl sm:text-2xl font-black text-white">
                      ৳{service.priceStarting.toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>

                {/* Service Highlights Checklist */}
                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                    Key Checklist Highlights:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                    {service.checklist.slice(0, 4).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight text-[11px] sm:text-xs text-zinc-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Time & Warranty Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-[11px] text-zinc-400 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Est. Time: <strong className="text-white">{service.estimatedTime}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                    <span>{service.warranty}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 sm:p-8 sm:pt-0 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenBooking(service.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book This Service</span>
                </button>
                <Link
                  href={`/services#${service.slug}`}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs py-3.5 px-5 rounded-xl transition-colors text-center"
                >
                  Full Checklist
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={selectedServiceId}
      />
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  Search,
  ChevronRight,
  Flame,
  Phone,
  Sparkles,
  Award,
  Zap,
  ArrowRight,
  Gauge,
  Check,
} from "lucide-react";
import { bikeServices, BikeService } from "@/data/services";
import { dealerships } from "@/data/dealerships";
import { ServiceBookingModal } from "@/components/services/ServiceBookingModal";
import { useToast } from "@/context/ToastContext";

export default function ServicesPage() {
  const { showToast } = useToast();
  const [selectedServiceId, setSelectedServiceId] = useState("srv-master");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Live Job Card Tracker Demo State
  const [trackQuery, setTrackQuery] = useState("DHAKA-METRO-LA-4589");
  const [trackerResult, setTrackerResult] = useState<{
    found: boolean;
    ticketId: string;
    bike: string;
    serviceName: string;
    branch: string;
    step: number;
    advisor: string;
    notes: string;
  } | null>({
    found: true,
    ticketId: "MPX-SRV-98214",
    bike: "Aprilia RS 457 (Racing Red)",
    serviceName: "Bike Master Service (52-Point)",
    branch: "Gulshan-2 Flagship 3S Center",
    step: 3, // 1: Checked In, 2: Inspection & Diagnostics, 3: In Master Repair / Fluids, 4: Foam Detailing, 5: Ready for Pickup
    advisor: "Engr. Nayeem Chowdhury (Master Tech)",
    notes: "Valve clearances checked & calibrated. Throttle body ultrasonic cleaned. Final ECU mapping in progress.",
  });

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) {
      showToast("Missing Input", "Please enter your motorcycle plate number or ticket ID.", "error");
      return;
    }

    showToast("Searching Service Records...", "Fetching live diagnostic bay status.", "info");
    setTimeout(() => {
      setTrackerResult({
        found: true,
        ticketId: `MPX-SRV-${Math.floor(10000 + Math.random() * 90000)}`,
        bike: `${trackQuery.toUpperCase()}`,
        serviceName: "Bike Master Service & Dyno Calibration",
        branch: "Motoplex Gulshan Flagship Bay 2",
        step: 3,
        advisor: "Engr. Nayeem Chowdhury (Master Tech)",
        notes: "52-point mechanical inspection completed. New Motul 300V synthetic oil filled. Ready for final test ride.",
      });
      showToast("Record Found!", "Live motorcycle service status loaded.", "success");
    }, 600);
  };

  const serviceSteps = [
    { num: 1, label: "Checked In & Bay Assigned" },
    { num: 2, label: "52-Point Diagnostics Scan" },
    { num: 3, label: "Master Repair & Overhaul" },
    { num: 4, label: "Foam Detailing & Test Ride" },
    { num: 5, label: "Ready for Pickup" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-zinc-950 text-white py-16 md:py-24 border-b border-zinc-800 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-red-500 font-bold">Services & Workshop</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-xs text-red-400 font-bold uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>Certified 3S Workshop & High-Performance Lab</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              PRECISION MOTORCYCLE CARE & PERFORMANCE TUNING
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Bangladesh’s most advanced motorcycle service facility. From routine oil service to our signature 52-point Bike Master Service, your machine receives factory-level attention from certified specialists.
            </p>
            <div className="pt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedServiceId("srv-master");
                  setIsBookingOpen(true);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-red-600/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Service Online</span>
              </button>
              <a
                href="#live-tracker"
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-red-500" />
                <span>Track My Active Service</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Detailed Service Packages */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
            Tailored Maintenance Tiers
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950">
            OFFICIAL WORKSHOP PACKAGES
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Transparent pricing, authentic imported fluids, and standardized checklists for every motorcycle brand.
          </p>
        </div>

        <div className="space-y-8">
          {bikeServices.map((srv, index) => (
            <div
              key={srv.id}
              id={srv.slug}
              className={`rounded-3xl border p-6 sm:p-8 lg:p-10 transition-all ${
                srv.id === "srv-master"
                  ? "bg-zinc-950 text-white border-red-600 shadow-xl"
                  : "bg-zinc-50 text-zinc-900 border-zinc-200"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        srv.id === "srv-master"
                          ? "bg-red-600 text-white"
                          : "bg-zinc-200 text-zinc-800"
                      }`}
                    >
                      {srv.category}
                    </span>
                    <span className="text-xs font-semibold opacity-70">
                      Package #{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {srv.name}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${srv.id === "srv-master" ? "text-zinc-400" : "text-zinc-600"}`}>
                    {srv.description}
                  </p>

                  <div className={`p-4 rounded-2xl border text-xs space-y-2 ${srv.id === "srv-master" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Estimated Time:</span>
                      <strong className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" /> {srv.estimatedTime}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Recommended Interval:</span>
                      <strong>{srv.recommendedFor}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Warranty Coverage:</span>
                      <strong className="text-emerald-500">{srv.warranty}</strong>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-zinc-700/40 text-sm">
                      <span className="font-bold">Starting Price:</span>
                      <span className="font-black text-lg text-red-500">
                        ৳{srv.priceStarting.toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedServiceId(srv.id);
                      setIsBookingOpen(true);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book {srv.name}</span>
                  </button>
                </div>

                {/* Right Checklist */}
                <div className="lg:col-span-7">
                  <div className={`p-6 rounded-2xl border ${srv.id === "srv-master" ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200"}`}>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Full Service Checklist & Procedures ({srv.checklist.length} Checkpoints)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {srv.checklist.map((chk, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                            srv.id === "srv-master"
                              ? "bg-zinc-950/80 border-zinc-800/80 text-zinc-300"
                              : "bg-zinc-50 border-zinc-100 text-zinc-800"
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-[11px] leading-tight font-medium">
                            {chk}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Service Job-Card Status Tracker Section */}
      <section id="live-tracker" className="py-16 bg-zinc-950 text-white border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
              Live Workshop Telemetry
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              TRACK YOUR MOTORCYCLE SERVICE
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
              Enter your bike registration number or ticket ID to monitor live inspection, parts replacement, and detailing progress.
            </p>
          </div>

          {/* Search Box */}
          <form
            onSubmit={handleTrackSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <input
              type="text"
              value={trackQuery}
              onChange={(e) => setTrackQuery(e.target.value)}
              placeholder="e.g. DHAKA-METRO-LA-4589 or MPX-SRV-98214"
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-500 uppercase"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-7 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Track Status</span>
            </button>
          </form>

          {/* Live Progress Card */}
          {trackerResult && (
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                    Live Workshop Job Card
                  </span>
                  <h4 className="text-lg font-black text-white mt-1">
                    {trackerResult.bike}
                  </h4>
                  <p className="text-xs text-zinc-400">Ticket: {trackerResult.ticketId} • {trackerResult.branch}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-zinc-500 block uppercase">Lead Tech</span>
                  <span className="text-xs font-bold text-white">{trackerResult.advisor}</span>
                </div>
              </div>

              {/* Progress Steps (Visual Stepper) */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {serviceSteps.map((st) => {
                  const isDone = st.num < trackerResult.step;
                  const isCurrent = st.num === trackerResult.step;
                  return (
                    <div
                      key={st.num}
                      className={`p-3 rounded-2xl border text-center space-y-1.5 transition-all ${
                        isCurrent
                          ? "bg-red-950/60 border-red-600 text-white ring-1 ring-red-500"
                          : isDone
                          ? "bg-zinc-950 border-emerald-800 text-emerald-400"
                          : "bg-zinc-950/40 border-zinc-800 text-zinc-500"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full mx-auto flex items-center justify-center text-xs font-black ${
                          isCurrent
                            ? "bg-red-600 text-white animate-pulse"
                            : isDone
                            ? "bg-emerald-600 text-white"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5" /> : st.num}
                      </div>
                      <p className="text-[11px] font-bold leading-tight">{st.label}</p>
                      {isCurrent && (
                        <span className="text-[9px] uppercase font-black tracking-wider text-red-400 block">
                          Current Stage
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-2.5">
                <Wrench className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Technician Notes:</strong> {trackerResult.notes}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <ServiceBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={selectedServiceId}
      />
    </div>
  );
}

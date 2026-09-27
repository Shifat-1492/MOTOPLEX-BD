"use client";

import React, { useState, useEffect } from "react";
import {
  Wrench,
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Phone,
  User,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { bikeServices, BikeService } from "@/data/services";
import { dealerships } from "@/data/dealerships";
import { useToast } from "@/context/ToastContext";

interface ServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
}

export function ServiceBookingModal({
  isOpen,
  onClose,
  preSelectedServiceId,
}: ServiceBookingModalProps) {
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedServiceId, setSelectedServiceId] = useState(
    preSelectedServiceId || "srv-master"
  );
  const [bikeBrand, setBikeBrand] = useState("Aprilia");
  const [bikeModel, setBikeModel] = useState("RS 457");
  const [bikePlate, setBikePlate] = useState("DHAKA-METRO-LA-4589");

  const [selectedDealershipId, setSelectedDealershipId] = useState("dealership-gulshan");
  const [bookingDate, setBookingDate] = useState("2026-09-30");
  const [bookingSlot, setBookingSlot] = useState("11:00 AM – 01:00 PM");

  const [customerName, setCustomerName] = useState("Tanvir Rahman");
  const [customerPhone, setCustomerPhone] = useState("01711234567");
  const [specialNotes, setSpecialNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedServiceId(preSelectedServiceId);
    }
  }, [preSelectedServiceId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentService =
    bikeServices.find((s) => s.id === selectedServiceId) || bikeServices[0];
  const currentDealership =
    dealerships.find((d) => d.id === selectedDealershipId) || dealerships[0];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !bikeModel) {
      showToast("Incomplete Form", "Please fill in all required fields.", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `MPX-SRV-${Math.floor(10000 + Math.random() * 90000)}`;
      setBookingId(generatedId);
      setIsSubmitting(false);
      setBookingConfirmed(true);
      showToast(
        "Service Slot Reserved!",
        `Job booking ${generatedId} confirmed at ${currentDealership.name}.`,
        "success"
      );
    }, 1000);
  };

  const handleResetAndClose = () => {
    setBookingConfirmed(false);
    setStep(1);
    onClose();
  };

  return (
    <div
      onClick={handleResetAndClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-zinc-950 text-white p-5 sm:p-6 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">
                  Official Workshop
                </span>
                <span className="text-xs text-zinc-400 hidden sm:inline">• Certified Master Bay</span>
              </div>
              <h3 className="font-black text-lg sm:text-xl tracking-tight text-white mt-0.5">
                Book Motorcycle Service
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {bookingConfirmed ? (
            /* Confirmation State */
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Service Appointment Reserved
                </span>
                <h2 className="text-2xl font-black text-zinc-950 pt-2">
                  THANK YOU, {customerName.toUpperCase()}!
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
                  Your master technician service slot has been booked at{" "}
                  <strong className="text-zinc-800">{currentDealership.name}</strong>.
                </p>
              </div>

              {/* Booking Summary Ticket */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                  <span className="text-zinc-500 font-semibold">Service Ticket ID:</span>
                  <span className="font-mono font-black text-red-600 text-sm">{bookingId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 font-semibold">Selected Package:</span>
                  <span className="font-bold text-zinc-900">{currentService.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 font-semibold">Motorcycle:</span>
                  <span className="font-bold text-zinc-900">
                    {bikeBrand} {bikeModel} ({bikePlate})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 font-semibold">Location:</span>
                  <span className="font-bold text-zinc-900">{currentDealership.city} ({currentDealership.badge})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 font-semibold">Scheduled Slot:</span>
                  <span className="font-bold text-emerald-700">
                    {bookingDate} • {bookingSlot}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-200 text-sm">
                  <span className="font-bold text-zinc-900">Estimated Starting Cost:</span>
                  <span className="font-black text-zinc-950">৳{currentService.priceStarting.toLocaleString("en-BD")}</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 max-w-sm mx-auto">
                A verification SMS with appointment details has been routed to <strong>{customerPhone}</strong>.
                Show this ticket ID to the service advisor upon showroom arrival.
              </p>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs px-8 py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          ) : (
            /* Multi-step Booking Form */
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              {/* Step indicator tabs */}
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors cursor-pointer ${
                    step === 1 ? "border-red-600 text-red-600" : "border-transparent text-zinc-400"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px]">1</span>
                  <span>Package</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors cursor-pointer ${
                    step === 2 ? "border-red-600 text-red-600" : "border-transparent text-zinc-400"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px]">2</span>
                  <span>Bike & Branch</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors cursor-pointer ${
                    step === 3 ? "border-red-600 text-red-600" : "border-transparent text-zinc-400"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px]">3</span>
                  <span>Schedule & Rider</span>
                </button>
              </div>

              {/* Step 1: Choose Service Package */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-950">Select Service Package</h4>
                    <p className="text-xs text-zinc-500">
                      All services performed by factory-certified master technicians using OEM diagnostic tools.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bikeServices.map((srv) => (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedServiceId(srv.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                          selectedServiceId === srv.id
                            ? "border-red-600 bg-red-50/30 shadow-md shadow-red-600/5 ring-1 ring-red-600"
                            : "border-zinc-200 hover:border-zinc-300 bg-white"
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded">
                              {srv.category}
                            </span>
                            <span className="text-[11px] font-medium text-zinc-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {srv.estimatedTime}
                            </span>
                          </div>
                          <h5 className="font-bold text-sm text-zinc-950">{srv.name}</h5>
                          <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                            {srv.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between">
                          <span className="text-xs font-black text-zinc-950">
                            Starting ৳{srv.priceStarting.toLocaleString("en-BD")}
                          </span>
                          <span className="text-[11px] font-bold text-red-600">
                            {selectedServiceId === srv.id ? "Selected ✓" : "Select"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-7 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue to Bike & Dealership</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Bike Details & Dealership */}
              {step === 2 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-950">Motorcycle & Dealership Branch</h4>
                    <p className="text-xs text-zinc-500">
                      Choose which of our 3 authorized Bangladesh service centers you will visit.
                    </p>
                  </div>

                  {/* Bike Info Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-zinc-900 block mb-1">Bike Brand *</label>
                      <select
                        value={bikeBrand}
                        onChange={(e) => setBikeBrand(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 font-semibold focus:outline-none focus:ring-1 focus:ring-red-600"
                      >
                        <option value="Aprilia">Aprilia (Official)</option>
                        <option value="Vespa">Vespa (Official)</option>
                        <option value="Yamaha">Yamaha</option>
                        <option value="Honda">Honda</option>
                        <option value="Kawasaki">Kawasaki</option>
                        <option value="Suzuki">Suzuki</option>
                        <option value="KTM">KTM</option>
                        <option value="BMW Motorrad">BMW Motorrad</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-zinc-900 block mb-1">Model & Engine *</label>
                      <input
                        type="text"
                        required
                        value={bikeModel}
                        onChange={(e) => setBikeModel(e.target.value)}
                        placeholder="e.g. RS 457, R15 V4, CBR 150R"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-zinc-900 block mb-1">Registration / Plate No</label>
                      <input
                        type="text"
                        value={bikePlate}
                        onChange={(e) => setBikePlate(e.target.value)}
                        placeholder="e.g. DHAKA-METRO-LA-XXXX"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600 uppercase"
                      />
                    </div>
                  </div>

                  {/* Select Dealership */}
                  <div className="pt-2">
                    <label className="font-bold text-zinc-900 block mb-2">
                      Choose Service Dealership *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {dealerships.map((deal) => (
                        <div
                          key={deal.id}
                          onClick={() => setSelectedDealershipId(deal.id)}
                          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                            selectedDealershipId === deal.id
                              ? "border-red-600 bg-red-50/30 ring-1 ring-red-600 shadow-sm"
                              : "border-zinc-200 hover:border-zinc-300 bg-white"
                          }`}
                        >
                          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">
                            {deal.city}
                          </span>
                          <h6 className="font-bold text-xs text-zinc-950 mt-0.5">{deal.name}</h6>
                          <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2">{deal.address}</p>
                          <span className="text-[10px] font-bold text-emerald-700 mt-2 block">
                            {deal.serviceBays} Active Service Bays
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-7 py-3 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue to Slot & Contact</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Schedule Slot & Customer Contact */}
              {step === 3 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-950">Schedule & Rider Information</h4>
                    <p className="text-xs text-zinc-500">
                      Pick your preferred date and contact number for instant SMS confirmation.
                    </p>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-zinc-900 block mb-1">Appointment Date *</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 font-semibold focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-zinc-900 block mb-1">Service Time Slot *</label>
                      <select
                        value={bookingSlot}
                        onChange={(e) => setBookingSlot(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 font-semibold focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer"
                      >
                        <option value="10:00 AM – 12:00 PM">10:00 AM – 12:00 PM (Morning Slot)</option>
                        <option value="11:00 AM – 01:00 PM">11:00 AM – 01:00 PM (Popular)</option>
                        <option value="02:00 PM – 04:00 PM">02:00 PM – 04:00 PM (Afternoon)</option>
                        <option value="04:30 PM – 06:30 PM">04:30 PM – 06:30 PM (Evening Slot)</option>
                      </select>
                    </div>
                  </div>

                  {/* Rider Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-zinc-900 block mb-1">Rider Full Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-zinc-900 block mb-1">Phone Number (For SMS Updates) *</label>
                      <input
                        type="text"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-zinc-900 block mb-1">
                      Specific Issues or Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g. Engine vibrations above 6,000 RPM, front brake sponge feel, chain noise..."
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  {/* Order Preview bar */}
                  <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold block">Selected Package</span>
                      <span className="font-bold text-zinc-900">{currentService.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 block">Est. Starting Total</span>
                      <span className="font-black text-sm text-red-600">
                        ৳{currentService.priceStarting.toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Reserving Bay...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Confirm Service Appointment</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

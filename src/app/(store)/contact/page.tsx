"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Building,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Aprilia RS 457 Showroom Viewing");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Where is the Motoplex Bangladesh flagship showroom located?",
      a: "Our primary flagship showroom and certified service facility is located at Plot 12, Road 113, Gulshan-2, Dhaka 1212. We also operate a dedicated riders' lounge at GEC Circle, Nasirabad, Chattogram.",
    },
    {
      q: "How does nationwide delivery work across Bangladesh?",
      a: "We deliver to all 64 districts in Bangladesh via Pathao Express and Steadfast Courier. For Dhaka city, deliveries take 24-48 hours. Outside Dhaka takes 2-4 business days. Orders above ৳5,000 receive 100% Free Delivery.",
    },
    {
      q: "Can I inspect the product before paying with Cash on Delivery?",
      a: "Yes! All parcels shipped by Motoplex BD have authorized 'Open & Inspect Parcel' permission on the courier manifest. You can inspect your helmet, jacket, or accessories in front of the delivery agent before making payment.",
    },
    {
      q: "How do I claim official warranty on Shoei helmets or Aprilia bikes?",
      a: "All items purchased from Motoplex BD feature our importer hologram and registered QR warranty code. Simply bring your warranty card or digital order invoice to our Gulshan-2 showroom or contact our hotline.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      showToast("Incomplete Form", "Please fill in all required fields.", "error");
      return;
    }

    setSubmitted(true);
    showToast("Message Dispatched", "Our Gulshan concierge will contact you within 2 hours.", "success");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            Showroom Concierge & Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            CONTACT MOTOPLEX BANGLADESH
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Visit our state-of-the-art Italian showroom in Gulshan-2, book private motorcycle consultations, or contact our rider support hotline.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Contact Information & Locations */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tight">
                Showroom Locations
              </h2>

              {/* Showroom 1 */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-sm text-zinc-950">
                  <Building className="w-4 h-4 text-red-600" />
                  <span>Dhaka Flagship Showroom & Service Center</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Plot 12, Road 113, Gulshan-2, Dhaka 1212, Bangladesh
                </p>
                <div className="pt-2 text-xs text-zinc-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Saturday – Thursday: 10:00 AM – 8:30 PM (Friday Closed)</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono font-bold text-zinc-900">
                    <Phone className="w-3.5 h-3.5 text-red-600" />
                    <span>+880 1700-MOTOPLEX (668675)</span>
                  </div>
                </div>
              </div>

              {/* Showroom 2 */}
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-sm text-zinc-950">
                  <Building className="w-4 h-4 text-red-600" />
                  <span>Chattogram Experience Center</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  GEC Circle, Nasirabad, Chattogram 4000
                </p>
                <div className="pt-2 text-xs text-zinc-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Saturday – Thursday: 11:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono font-bold text-zinc-900">
                    <Phone className="w-3.5 h-3.5 text-red-600" />
                    <span>+880 1711-MOTOPLEX</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Support Channels */}
            <div className="p-6 rounded-2xl bg-zinc-950 text-white space-y-3">
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                Priority Inquiries
              </span>
              <h3 className="font-bold text-sm">Direct Importer Concierge</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                For corporate fleet inquiries, track day sponsorships, or parts import, email directly to:
              </p>
              <div className="pt-2 font-mono text-xs text-red-400 font-bold">
                concierge@motoplexbd.com
              </div>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-50 rounded-3xl border border-zinc-200/80 p-8 sm:p-10 shadow-xs">
              <h2 className="text-xl font-black text-zinc-950 mb-1">
                Send a Showroom Inquiry
              </h2>
              <p className="text-xs text-zinc-500 mb-6">
                Fill in the form below and our motorcycle specialists will connect with you promptly.
              </p>

              {submitted ? (
                <div className="p-8 bg-white border border-emerald-300 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-zinc-900">Inquiry Received</h3>
                  <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
                    Thank you, {name}! Your message regarding &ldquo;{subject}&rdquo; has been sent to our Gulshan-2 showroom manager.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-red-600 hover:underline pt-2"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-zinc-900 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Mahir Faisal"
                        className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-zinc-900 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@email.com"
                        className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-zinc-900 block mb-1">Mobile Phone (+880) *</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-zinc-900 block mb-1">Topic / Subject</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer font-medium"
                      >
                        <option value="Aprilia RS 457 Showroom Viewing">Aprilia RS 457 Showroom Viewing</option>
                        <option value="Vespa Sprint / Primavera Inquiry">Vespa Sprint / Primavera Inquiry</option>
                        <option value="Shoei / AGV Helmet Sizing Consultation">Shoei / AGV Helmet Sizing Consultation</option>
                        <option value="Racing Exhaust & Performance Tuning">Racing Exhaust & Performance Tuning</option>
                        <option value="Corporate / Showroom Partnership">Corporate / Showroom Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-zinc-900 block mb-1">Your Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please detail your request or preferred showroom visit time..."
                      className="w-full bg-white border border-zinc-200 rounded-xl p-3.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs py-3.5 px-6 rounded-xl transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-20 pt-16 border-t border-zinc-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
              Got Questions?
            </span>
            <h2 className="text-2xl font-black text-zinc-950 mt-1">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-zinc-200 border border-zinc-200 rounded-3xl overflow-hidden bg-white shadow-xs">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="p-5">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-zinc-900 hover:text-red-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-red-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs text-zinc-600 leading-relaxed pr-6 animate-in fade-in duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

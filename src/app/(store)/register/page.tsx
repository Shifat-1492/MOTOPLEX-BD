"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      showToast("Terms Required", "Please accept the Terms & Conditions.", "error");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showToast("Account Created", "A 6-digit OTP code has been dispatched to your mobile.", "success");
      router.push(`/verify-otp?phone=${encodeURIComponent(phone || "01711234567")}`);
    }, 900);
  };

  return (
    <div className="bg-zinc-50 min-h-[85vh] py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-zinc-200 p-8 sm:p-10 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <span className="font-black text-2xl tracking-tighter text-zinc-950">
              MOTOPLEX
            </span>
            <span className="text-[10px] font-bold tracking-widest text-red-600 block -mt-1 uppercase">
              BANGLADESH
            </span>
          </Link>
          <h1 className="text-xl font-black text-zinc-900">Create Rider Account</h1>
          <p className="text-xs text-zinc-500">
            Join the official Motoplex community for warranty registrations and track invitations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-zinc-900 block mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mahir Faisal"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-zinc-900 block mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-zinc-900 block mb-1">Mobile Phone Number (+880) *</label>
            <div className="flex rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50">
              <span className="px-3 py-2.5 bg-zinc-100 border-r border-zinc-200 font-bold text-zinc-600 text-xs flex items-center">
                +880
              </span>
              <input
                type="tel"
                required
                placeholder="17XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-transparent px-3 py-2.5 text-zinc-900 focus:outline-none text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-zinc-900 block mb-1">Create Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>
          </div>

          <label className="flex items-start gap-2 cursor-pointer text-zinc-600 text-xs">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded text-red-600 cursor-pointer mt-0.5"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-red-600 underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-red-600 underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <span>Generating OTP...</span> : <span>Register & Verify Phone</span>}
          </button>
        </form>

        <div className="text-center text-xs text-zinc-500 pt-2 border-t border-zinc-100">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-zinc-900 hover:underline">
            Sign In Instead
          </Link>
        </div>
      </div>
    </div>
  );
}

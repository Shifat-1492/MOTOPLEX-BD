"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, RotateCcw } from "lucide-react";
import { useToast } from "@/context/ToastContext";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "01711234567";
  const { showToast } = useToast();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(54);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (val: string, index: number) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const next = [...otp];
    next[index] = val;
    setOtp(next);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      showToast("OTP Verified", "Your phone number has been verified successfully.", "success");
      router.push("/account");
    }, 900);
  };

  const handleResend = () => {
    setSecondsLeft(60);
    showToast("OTP Dispatched", `A new 6-digit code was sent to +880 ${phone}.`, "info");
  };

  return (
    <div className="bg-zinc-50 min-h-[85vh] py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-zinc-200 p-8 sm:p-10 shadow-xl space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center border border-red-100">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-black text-zinc-950">Verify Phone Number</h1>
          <p className="text-xs text-zinc-500 leading-relaxed">
            We sent a 6-digit verification code to{" "}
            <strong className="text-zinc-900">+880 {phone}</strong>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          {/* 6 Digit Inputs */}
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-11 h-14 sm:w-12 sm:h-14 text-center text-lg font-black bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white text-zinc-950 shadow-xs"
              />
            ))}
          </div>

          <div className="text-xs text-zinc-500 flex items-center justify-center gap-1.5">
            {secondsLeft > 0 ? (
              <span>Resend code in <strong className="text-zinc-900 font-mono">{secondsLeft}s</strong></span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-red-600 font-bold hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resend OTP Code</span>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isVerifying ? <span>Verifying Code...</span> : <span>Confirm & Activate Account</span>}
          </button>
        </form>

        <div className="text-center text-xs text-zinc-500 pt-2 border-t border-zinc-100">
          Entered the wrong mobile number?{" "}
          <Link href="/register" className="font-bold text-red-600 hover:underline">
            Change Number
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-400">Loading verification...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}

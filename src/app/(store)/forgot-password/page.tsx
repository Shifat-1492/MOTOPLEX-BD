"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      showToast("Reset Link Sent", "Check your mobile/email for password reset instructions.", "success");
    }, 800);
  };

  return (
    <div className="bg-zinc-50 min-h-[85vh] py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-zinc-200 p-8 sm:p-10 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-black text-zinc-950">Forgot Password?</h1>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Enter your registered email address or mobile number and we will send you a reset link.
          </p>
        </div>

        {submitted ? (
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm text-emerald-950">Instructions Dispatched</h4>
            <p className="text-xs text-emerald-800 leading-relaxed">
              We have sent password recovery instructions to <strong>{emailOrPhone}</strong>. Follow the link to create a new password.
            </p>
            <Link
              href="/login"
              className="inline-block bg-zinc-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-zinc-900 block mb-1">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="name@email.com or 017XXXXXXXX"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <span>Sending Link...</span> : <span>Send Reset Instructions</span>}
            </button>
          </form>
        )}

        <div className="text-center text-xs pt-2 border-t border-zinc-100">
          <Link
            href="/login"
            className="text-zinc-600 hover:text-zinc-950 font-semibold inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [identifier, setIdentifier] = useState("tanvir.rahman@gmail.com");
  const [password, setPassword] = useState("motoplex2026");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showToast("Signed In Successfully", "Welcome back, Tanvir Rahman.", "success");
      router.push("/account");
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    showToast(`${provider} Sign In`, `Connected to demo account via ${provider}.`, "success");
    router.push("/account");
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
          <h1 className="text-xl font-black text-zinc-900">Sign In to Your Account</h1>
          <p className="text-xs text-zinc-500">
            Access your orders, track shipments, and view VIP club perks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-zinc-900 block mb-1">
              Email or Mobile Phone Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@email.com or 017XXXXXXXX"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-zinc-900">Password</label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-red-600 hover:underline font-semibold"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-600">
              <input type="checkbox" defaultChecked className="rounded text-red-600 cursor-pointer" />
              <span>Remember this device</span>
            </label>
            <Link href="/verify-otp" className="text-zinc-500 hover:text-zinc-900">
              Sign in with OTP
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <span>Signing In...</span> : <span>Sign In</span>}
          </button>
        </form>

        {/* Social Demo Logins */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-zinc-200" />
          <span className="flex-shrink mx-3 text-zinc-400 text-[11px]">or single-click demo</span>
          <div className="flex-grow border-t border-zinc-200" />
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => handleSocialLogin("Google")}
            className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 font-bold text-zinc-700 flex items-center justify-center gap-2 transition-colors"
          >
            <span>Google Login</span>
          </button>
          <button
            onClick={() => handleSocialLogin("Facebook")}
            className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 font-bold text-zinc-700 flex items-center justify-center gap-2 transition-colors"
          >
            <span>Facebook Login</span>
          </button>
        </div>

        <div className="text-center text-xs text-zinc-500 pt-2 border-t border-zinc-100">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="font-bold text-red-600 hover:underline">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}

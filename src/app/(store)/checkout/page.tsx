"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  Phone,
  MapPin,
  ArrowRight,
  PackageCheck,
  Check,
  Building2,
  Clock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { bangladeshDivisions } from "@/data/bangladesh";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, shippingFee, total, clearCart } = useCart();
  const { showToast } = useToast();

  // Form states
  const [fullName, setFullName] = useState("Tanvir Rahman");
  const [email, setEmail] = useState("tanvir.rahman@gmail.com");
  const [phone, setPhone] = useState("01711234567");

  const [division, setDivision] = useState("Dhaka");
  const [district, setDistrict] = useState("Dhaka City");
  const [area, setArea] = useState("Gulshan");
  const [streetAddress, setStreetAddress] = useState("House 14, Road 112, Gulshan-2");

  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("express");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "aamarpay" | "cod">("bkash");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState("");

  // Districts for current division
  const currentDivisionData = bangladeshDivisions.find((d) => d.division === division);
  const availableDistricts = currentDivisionData ? Object.keys(currentDivisionData.districts) : [];
  const availableAreas =
    currentDivisionData && currentDivisionData.districts[district]
      ? currentDivisionData.districts[district]
      : [];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !streetAddress) {
      showToast("Missing Information", "Please fill out all required shipping fields.", "error");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNo = `MPX-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedOrderNumber(orderNo);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart();
      showToast("Order Placed Successfully!", `Your order ${orderNo} has been confirmed.`, "success");
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="bg-zinc-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-zinc-200 p-8 sm:p-10 shadow-xl space-y-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <PackageCheck className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Order Confirmed & Logged
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950">
              THANK YOU, {fullName.toUpperCase()}!
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-md mx-auto">
              Your order has been routed to our Motoplex Flagship fulfillment center in Gulshan-2, Dhaka.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-left text-xs space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
              <span className="text-zinc-500 font-semibold">Order Number:</span>
              <span className="font-mono font-black text-zinc-950 text-sm text-red-600">
                {generatedOrderNumber}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-semibold">Delivery Address:</span>
              <span className="font-bold text-zinc-900 text-right">
                {streetAddress}, {area}, {district}, {division}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-semibold">Selected Payment:</span>
              <span className="font-bold text-zinc-900 uppercase">
                {paymentMethod === "bkash" ? "bKash Online Merchant" : paymentMethod === "aamarpay" ? "AamarPay / Cards" : "Cash on Delivery"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-semibold">Estimated Delivery:</span>
              <span className="font-bold text-emerald-700">24 - 48 Hours via Pathao Express</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-zinc-200 text-sm">
              <span className="font-bold text-zinc-900">Total Charged:</span>
              <span className="font-black text-zinc-950">৳{total.toLocaleString("en-BD")}</span>
            </div>
          </div>

          {/* Instructions note */}
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            An official SMS confirmation and tracking link have been simulated for phone number{" "}
            <strong className="text-zinc-800">{phone}</strong>. Our logistics officer will contact you prior to final delivery.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/account/orders"
              className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md"
            >
              Track in Order History
            </Link>
            <Link
              href="/shop"
              className="bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 font-bold text-xs px-6 py-3.5 rounded-xl transition-colors"
            >
              Return to Motoplex Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-zinc-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-zinc-200 p-8 text-center space-y-5 shadow-sm animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center">
            <CreditCard className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-zinc-950">Your Cart is Empty</h2>
            <p className="text-xs text-zinc-500">
              Please select motorcycles, protective gear, or accessories before proceeding to checkout.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-block w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all active:scale-98"
          >
            Explore Motoplex Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50/70 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="pb-6 mb-8 border-b border-zinc-200">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
            Secure Fast Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-1 tracking-tight">
            FINAL CHECKOUT & DELIVERY
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form: Customer, Address, Logistics, Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Customer Info */}
            <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-sm text-zinc-950 uppercase tracking-wider">
                  Customer Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-zinc-900 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-zinc-900 block mb-1">Email Address (For Invoices) *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-zinc-900 block mb-1">
                    Mobile Phone Number (Bangladesh +880) *
                  </label>
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
              </div>
            </div>

            {/* Step 2: Delivery Address (Bangladesh Administrative Structure) */}
            <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white text-xs font-black flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-sm text-zinc-950 uppercase tracking-wider">
                  Bangladesh Delivery Address
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {/* Division */}
                <div>
                  <label className="font-bold text-zinc-900 block mb-1">Division *</label>
                  <select
                    value={division}
                    onChange={(e) => {
                      const newDiv = e.target.value;
                      setDivision(newDiv);
                      const divData = bangladeshDivisions.find((d) => d.division === newDiv);
                      const firstDist = divData ? Object.keys(divData.districts)[0] : "";
                      setDistrict(firstDist);
                      setArea(divData?.districts[firstDist]?.[0] || "");
                    }}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600 font-semibold cursor-pointer"
                  >
                    {bangladeshDivisions.map((d) => (
                      <option key={d.division} value={d.division}>
                        {d.division}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="font-bold text-zinc-900 block mb-1">District / City *</label>
                  <select
                    value={district}
                    onChange={(e) => {
                      const newDist = e.target.value;
                      setDistrict(newDist);
                      setArea(currentDivisionData?.districts[newDist]?.[0] || "");
                    }}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600 font-semibold cursor-pointer"
                  >
                    {availableDistricts.map((dst) => (
                      <option key={dst} value={dst}>
                        {dst}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area / Thana */}
                <div>
                  <label className="font-bold text-zinc-900 block mb-1">Thana / Area *</label>
                  {availableAreas.length > 0 ? (
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600 font-semibold cursor-pointer"
                    >
                      {availableAreas.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="Enter Area / Thana"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 text-xs"
                    />
                  )}
                </div>

                {/* Full Street Address */}
                <div className="sm:col-span-3">
                  <label className="font-bold text-zinc-900 block mb-1">
                    Street Address / House / Flat Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. House 14, Road 112, Gulshan-2, Dhaka"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Courier Delivery Options */}
            <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white text-xs font-black flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-sm text-zinc-950 uppercase tracking-wider">
                  Delivery Method & Courier
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  onClick={() => setDeliveryMethod("express")}
                  className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    deliveryMethod === "express"
                      ? "border-red-600 bg-red-50/40 ring-1 ring-red-600"
                      : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-950">Express Courier (Pathao)</span>
                    <Truck className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-2">
                    24 - 48 Hours inside Dhaka / Priority across 64 districts with sealed parcel inspection.
                  </p>
                  <span className="font-black text-zinc-900 mt-2 block">
                    {shippingFee === 0 ? "FREE (Orders over ৳5,000)" : `৳${shippingFee.toLocaleString("en-BD")}`}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod("standard")}
                  className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                    deliveryMethod === "standard"
                      ? "border-red-600 bg-red-50/40 ring-1 ring-red-600"
                      : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-950">Standard Delivery (Steadfast)</span>
                    <Clock className="w-4 h-4 text-zinc-500" />
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-2">
                    3 - 4 Business Days nationwide coverage to any Union/Thana.
                  </p>
                  <span className="font-black text-zinc-900 mt-2 block">
                    {shippingFee === 0 ? "FREE" : `৳${shippingFee.toLocaleString("en-BD")}`}
                  </span>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Simulation Options */}
            <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white text-xs font-black flex items-center justify-center">
                  4
                </span>
                <h3 className="font-bold text-sm text-zinc-950 uppercase tracking-wider">
                  Payment Method (Frontend Simulation)
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {/* bKash */}
                <label
                  onClick={() => setPaymentMethod("bkash")}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === "bkash"
                      ? "border-red-600 bg-red-50/40 ring-1 ring-red-600"
                      : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-700 text-white font-black text-xs flex items-center justify-center shrink-0">
                      bKash
                    </div>
                    <div>
                      <strong className="text-zinc-950 text-xs block">bKash Online Payment</strong>
                      <span className="text-[11px] text-zinc-500">
                        Direct merchant payment simulation with instant PIN & OTP prompt
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "bkash"}
                    onChange={() => {}}
                    className="text-red-600 focus:ring-red-600 cursor-pointer"
                  />
                </label>

                {/* AamarPay / Cards */}
                <label
                  onClick={() => setPaymentMethod("aamarpay")}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === "aamarpay"
                      ? "border-red-600 bg-red-50/40 ring-1 ring-red-600"
                      : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-800 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                      Cards
                    </div>
                    <div>
                      <strong className="text-zinc-950 text-xs block">AamarPay / Visa / Mastercard</strong>
                      <span className="text-[11px] text-zinc-500">
                        Local and international debit/credit cards & Net Banking
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "aamarpay"}
                    onChange={() => {}}
                    className="text-red-600 focus:ring-red-600 cursor-pointer"
                  />
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-red-600 bg-red-50/40 ring-1 ring-red-600"
                      : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white font-black text-xs flex items-center justify-center shrink-0">
                      COD
                    </div>
                    <div>
                      <strong className="text-zinc-950 text-xs block">Cash on Delivery (COD)</strong>
                      <span className="text-[11px] text-zinc-500">
                        Pay cash upon delivery after opening and inspecting parcel
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => {}}
                    className="text-red-600 focus:ring-red-600 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-xs space-y-5 sticky top-28">
              <h2 className="text-sm font-black text-zinc-950 uppercase tracking-wider pb-3 border-b border-zinc-200">
                Order Review ({items.length} {items.length === 1 ? "Item" : "Items"})
              </h2>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto divide-y divide-zinc-100 pr-1 space-y-2">
                {items.map((item, idx) => {
                  const itemPrice = item.selectedVariant?.price ?? item.product.price;
                  return (
                    <div key={idx} className="flex gap-3 py-2 items-center">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                        <Image src={item.product.images[0]} alt="" fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <h4 className="font-bold text-zinc-900 truncate">{item.product.name}</h4>
                        <p className="text-[11px] text-zinc-500">
                          Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-zinc-950">
                        ৳{(itemPrice * item.quantity).toLocaleString("en-BD")}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 pt-3 border-t border-zinc-200 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-950">৳{subtotal.toLocaleString("en-BD")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount Applied</span>
                    <span className="font-bold">-৳{discount.toLocaleString("en-BD")}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>Courier Delivery ({division})</span>
                  <span className="font-semibold text-zinc-950">
                    {shippingFee === 0 ? <strong className="text-emerald-600">Free</strong> : `৳${shippingFee.toLocaleString("en-BD")}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-zinc-950 pt-3 border-t border-zinc-200">
                  <span>Grand Total</span>
                  <span>৳{total.toLocaleString("en-BD")}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Confirming Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Client Demo Simulation • Zero Real Transaction</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

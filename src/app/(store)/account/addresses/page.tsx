"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Plus, Trash2, Edit2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface AddressItem {
  id: string;
  label: string;
  isDefault: boolean;
  name: string;
  phone: string;
  address: string;
  area: string;
  district: string;
  division: string;
}

export default function AddressesPage() {
  const { showToast } = useToast();

  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: "addr-1",
      label: "Home (Gulshan Flagship Area)",
      isDefault: true,
      name: "Tanvir Rahman",
      phone: "+880 1711-234567",
      address: "House 14, Road 112, Gulshan-2",
      area: "Gulshan",
      district: "Dhaka City",
      division: "Dhaka",
    },
    {
      id: "addr-2",
      label: "Office (Banani)",
      isDefault: false,
      name: "Tanvir Rahman",
      phone: "+880 1711-234567",
      address: "Tower 7, Floor 8, Road 11, Block D, Banani",
      area: "Banani",
      district: "Dhaka City",
      division: "Dhaka",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLabel, setNewLabel] = useState("Showroom Pickup / Residence");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    showToast("Default Address Set", "Primary delivery address updated.", "success");
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast("Address Removed", "Saved address was deleted.", "info");
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newAddress.trim()) {
      showToast("Missing Fields", "Please complete all required fields.", "error");
      return;
    }

    const newAddr: AddressItem = {
      id: `addr-${Date.now()}`,
      label: newLabel,
      isDefault: false,
      name: newName,
      phone: newPhone || "+880 1711-234567",
      address: newAddress,
      area: "Gulshan",
      district: "Dhaka City",
      division: "Dhaka",
    };

    setAddresses((prev) => [...prev, newAddr]);
    setIsModalOpen(false);
    showToast("New Address Added", "Saved to your delivery address book.", "success");
    setNewName("");
    setNewAddress("");
  };

  return (
    <div className="bg-zinc-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/account"
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard Overview
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              SAVED DELIVERY ADDRESSES
            </h1>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Address</span>
          </button>
        </div>

        {/* Address Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-white rounded-3xl p-6 border shadow-xs flex flex-col justify-between space-y-4 ${
                addr.isDefault ? "border-zinc-950 ring-1 ring-zinc-950" : "border-zinc-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="font-bold text-xs text-zinc-950">{addr.label}</span>
                  </div>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-300">
                      Default Delivery
                    </span>
                  )}
                </div>

                <div className="text-xs text-zinc-600 space-y-1 pt-3">
                  <p className="font-bold text-zinc-950 text-sm">{addr.name}</p>
                  <p>{addr.address}</p>
                  <p>{addr.area}, {addr.district}, {addr.division}</p>
                  <p className="text-zinc-400 font-mono pt-1">{addr.phone}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                {!addr.isDefault ? (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-red-600 hover:underline font-bold"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Primary
                  </span>
                )}

                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
                  title="Delete address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl border border-zinc-200 p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-sm text-zinc-950 pb-2 border-b border-zinc-100">
              Add New Bangladesh Address
            </h3>

            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-zinc-900 block mb-1">Address Label</label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. Vacation Home, Showroom, Office"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-900 block mb-1">Recipient Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Full recipient name"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-900 block mb-1">Contact Phone Number *</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+880 17XXXXXXXX"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-900 block mb-1">Full Street Address *</label>
                <textarea
                  rows={3}
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="House, Road, Area, City"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-zinc-100 text-zinc-700 font-bold py-2.5 rounded-xl hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-xl hover:bg-red-700"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

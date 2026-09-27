"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, CheckCircle2, ArrowLeft } from "lucide-react";
import { products as initialProducts } from "@/data/products";
import { useToast } from "@/context/ToastContext";

export default function AdminProductsPage() {
  const { showToast } = useToast();
  const [productList, setProductList] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form
  const [newTitle, setNewTitle] = useState("");
  const [newBrand, setNewBrand] = useState("Aprilia Racing");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newCategory, setNewCategory] = useState("Helmets & Visors");

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleStockUpdate = (productId: string, newStock: number) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p))
    );
    showToast("Stock Adjusted", "Inventory levels updated.", "info");
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice) return;

    const newProd = {
      ...initialProducts[0],
      id: `prod-${Date.now()}`,
      name: newTitle.trim(),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      brand: newBrand,
      price: Number(newPrice),
      stock: Number(newStock) || 5,
      category: newCategory,
      sku: `MPX-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setProductList([newProd, ...productList]);
    setIsAddModalOpen(false);
    showToast("Product Created", `${newTitle} added to Motoplex catalog.`, "success");
    setNewTitle("");
    setNewPrice("");
    setNewStock("");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="text-xs font-semibold text-zinc-500 hover:text-white flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard Overview
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            PRODUCT & INVENTORY MANAGER
          </h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by product name, SKU, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-red-600"
          />
        </div>
        <span className="text-xs text-zinc-400 font-semibold">
          Total: <strong className="text-white">{filtered.length}</strong> items
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/60 text-zinc-400 text-[11px] font-bold uppercase border-b border-zinc-800">
              <tr>
                <th className="p-4 pl-6">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (BDT)</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700">
                        <Image src={prod.images[0]} alt="" fill className="object-cover" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-white text-xs leading-snug line-clamp-1 max-w-xs">
                          {prod.name}
                        </h4>
                        <div className="text-[10px] text-zinc-400 flex items-center gap-2">
                          <span className="font-mono text-zinc-500">{prod.sku}</span>
                          <span>•</span>
                          <span className="text-red-400">{prod.brand}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-300 font-medium">{prod.category}</td>
                  <td className="p-4 font-black text-white">৳{prod.price.toLocaleString("en-BD")}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStockUpdate(prod.id, prod.stock - 1)}
                        className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span
                        className={`font-black min-w-6 text-center ${
                          prod.stock <= 3 ? "text-amber-400" : "text-white"
                        }`}
                      >
                        {prod.stock}
                      </span>
                      <button
                        onClick={() => handleStockUpdate(prod.id, prod.stock + 1)}
                        className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    {prod.stock > 0 ? (
                      <span className="bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        In Stock
                      </span>
                    ) : (
                      <span className="bg-red-950 border border-red-800 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Sold Out
                      </span>
                    )}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <Link
                      href={`/product/${prod.slug}`}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold"
                    >
                      View Live →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-2xl text-xs">
            <h3 className="font-bold text-sm text-white pb-2 border-b border-zinc-800">
              Add Product to Motoplex Inventory
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="font-bold text-zinc-300 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Alpinestars Supertech Glove"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Brand</label>
                <input
                  type="text"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Price (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="e.g. 45000"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-zinc-300 block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    placeholder="e.g. 10"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-300 block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-600 cursor-pointer"
                >
                  <option value="Helmets & Visors">Helmets & Visors</option>
                  <option value="Riding Gear & Protection">Riding Gear & Protection</option>
                  <option value="Two-Wheelers & Scooters">Two-Wheelers & Scooters</option>
                  <option value="Performance & Exhausts">Performance & Exhausts</option>
                  <option value="Rider Lifestyle & Apparel">Rider Lifestyle & Apparel</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-zinc-900 text-zinc-400 font-bold py-2.5 rounded-xl hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white font-bold py-2.5 rounded-xl hover:bg-red-700"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

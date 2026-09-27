import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight, ShieldCheck, Filter } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.categorySlug === slug);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Hero Banner */}
      <div className="relative bg-zinc-950 text-white overflow-hidden py-16 md:py-24 border-b border-zinc-800">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          className="object-cover opacity-25 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-white transition-colors">
              Catalog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">{category.name}</span>
          </nav>

          <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
            Motoplex Collection • {categoryProducts.length} Items
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {category.name}
          </h1>
          <p className="text-sm text-zinc-300 max-w-2xl mt-2 leading-relaxed">
            {category.description}
          </p>

          {/* Quick Subcategory Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/shop?category=${category.slug}&subcategory=${sub.slug}`}
                className="bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 text-xs font-semibold px-4 py-2 rounded-xl transition-all backdrop-blur-sm"
              >
                {sub.name} →
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 4-Level Visual Category Hierarchy Explainer */}
      <div className="border-b border-zinc-200 bg-zinc-50/70 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-red-600" />
              <span>Hierarchical Category Navigation</span>
            </div>
            <Link
              href={`/shop?category=${category.slug}`}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Open in Advanced Filter Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.subcategories.map((sub) => (
              <div
                key={sub.id}
                className="p-4 bg-white rounded-xl border border-zinc-200 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-zinc-900">{sub.name}</h4>
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase">
                    Level 2
                  </span>
                </div>
                <div className="space-y-1.5 pt-1 border-t border-zinc-100">
                  {sub.childCategories.map((child) => (
                    <div key={child.id} className="text-[11px] text-zinc-600">
                      <div className="font-medium text-zinc-800 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3 text-red-500" />
                        <span>{child.name}</span>
                      </div>
                      <div className="pl-4 flex flex-wrap gap-1 mt-0.5 text-[10px] text-zinc-400">
                        {child.productGroups.map((grp) => (
                          <span
                            key={grp.id}
                            className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600"
                          >
                            {grp.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between pb-6 border-b border-zinc-200 mb-8">
          <p className="text-xs text-zinc-500">
            Displaying <strong className="text-zinc-900">{categoryProducts.length}</strong> items in{" "}
            <strong>{category.name}</strong>
          </p>
          <Link
            href="/shop"
            className="text-xs font-bold text-zinc-900 hover:text-red-600 flex items-center gap-1"
          >
            <span>Back to All Categories</span> <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}

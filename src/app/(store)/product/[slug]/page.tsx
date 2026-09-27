import React from "react";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetailView } from "./ProductDetailView";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products in same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, 4);

  return <ProductDetailView product={product} relatedProducts={relatedProducts} />;
}

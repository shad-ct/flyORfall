import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS } from "../../../lib/site";
import ProductDetailView from "../../../components/ProductDetailView";

export async function generateStaticParams() {
  return [
    { slug: "imported-lightweight-track-pants" },
    { slug: "altitude-cargo-pants" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product = PRODUCTS.find((p) => p.slug === slug);
  if (!product && (slug === "altitude-cargo-pants" || slug === "imported-lightweight-track-pants")) {
    product = PRODUCTS[0];
  }
  if (!product) return {};

  return {
    title: `${product.name} – FALL OR FLY`,
    description: product.description,
    openGraph: {
      title: `${product.name} – FALL OR FLY`,
      description: product.description,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product = PRODUCTS.find((p) => p.slug === slug);
  if (!product && (slug === "altitude-cargo-pants" || slug === "imported-lightweight-track-pants")) {
    product = PRODUCTS[0];
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}

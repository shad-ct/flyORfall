import React from "react";
import { PRODUCTS } from "../lib/site";
import ProductDetailView from "../components/ProductDetailView";

export const metadata = {
  title: "IMPORTED LIGHTWEIGHT TRACK PANTS – FALL OR FLY",
  description:
    "Designed for everyday comfort and effortless movement. Crafted from lightweight imported fabric with quick-dry properties, a relaxed fit, and a wide-leg silhouette. Price 999₹.",
  openGraph: {
    title: "IMPORTED LIGHTWEIGHT TRACK PANTS – FALL OR FLY",
    description: "Designed for everyday comfort and effortless movement. Price 999₹.",
    images: ["/assets/cargo/optimized/IMG_2044.webp"],
  },
};

export default function HomePage() {
  const product = PRODUCTS[0];
  return <ProductDetailView product={product} />;
}

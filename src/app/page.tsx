import React from "react";
import type { Metadata } from "next";
import { PRODUCTS, SITE_ORIGIN, SITE_NAME } from "../lib/site";
import ProductDetailView from "../components/ProductDetailView";

export const metadata: Metadata = {
  title: "IMPORTED LIGHTWEIGHT TRACK PANTS – ₹999 | FALL OR FLY",
  description:
    "Buy Imported Lightweight Track Pants by FALL OR FLY for ₹999. Crafted from quick-dry imported fabric with a relaxed wide-leg silhouette, bottom drawstrings, and detailed embroidery. Limited drop available in Black and Grey.",
  keywords: [
    "FALL OR FLY",
    "imported lightweight track pants",
    "track pants",
    "streetwear pants",
    "wide leg track pants",
    "baggy pants",
    "quick dry track pants",
    "tactical black track pants",
    "streetwear India",
    "urban streetwear",
  ],
  alternates: {
    canonical: SITE_ORIGIN,
  },
  openGraph: {
    title: "IMPORTED LIGHTWEIGHT TRACK PANTS – ₹999 | FALL OR FLY",
    description:
      "Crafted from lightweight imported fabric with quick-dry properties, relaxed wide-leg fit, adjustable drawstrings, and premium embroidery. Available in Black and Grey.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_ORIGIN}/assets/bottom/black/1.jpeg`,
        width: 1200,
        height: 1600,
        alt: "FALL OR FLY Imported Lightweight Track Pants in Black",
      },
      {
        url: `${SITE_ORIGIN}/assets/bottom/grey/1.jpeg`,
        width: 1200,
        height: 1600,
        alt: "FALL OR FLY Imported Lightweight Track Pants in Grey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IMPORTED LIGHTWEIGHT TRACK PANTS – ₹999 | FALL OR FLY",
    description:
      "Crafted from lightweight imported fabric with quick-dry properties, relaxed wide-leg fit, adjustable drawstrings, and premium embroidery.",
    images: [`${SITE_ORIGIN}/assets/bottom/black/1.jpeg`],
  },
};

export default function HomePage() {
  const product = PRODUCTS[0];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => `${SITE_ORIGIN}${img}`),
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: SITE_ORIGIN,
      priceCurrency: "INR",
      price: product.price,
      priceValidUntil: "2027-12-31",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailView product={product} />
    </>
  );
}

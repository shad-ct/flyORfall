export const SITE_NAME = "FALL OR FLY";
export const SITE_TAGLINE = "FLY HIGH";
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_INSTAGRAM = "fall.or_fly";
export const SITE_PHONE = "8590877545";

export interface Product {
  id: string;
  name: string;
  category: "BOTTOM";
  price: number;
  priceFormatted: string;
  originalPriceFormatted?: string;
  slug: string;
  sizes: string[];
  colors: string[];
  description: string;
  details: string[];
  images: string[];
  thumbnail: string;
  inStock: boolean;
  tag?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "imported-lightweight-track-pants",
    name: "IMPORTED LIGHTWEIGHT TRACK PANTS",
    category: "BOTTOM",
    price: 999,
    priceFormatted: "Rs. 999",
    originalPriceFormatted: "Rs. 1,499",
    slug: "imported-lightweight-track-pants",
    sizes: ["L", "XL"],
    colors: ["Tactical Black", "Military Olive"],
    description:
      "Designed for everyday comfort and effortless movement.\n\nCrafted from lightweight imported fabric, these pants feature quick-dry properties, a relaxed fit, and a wide-leg silhouette for all-day comfort. Finished with adjustable bottom drawstrings and detailed embroidery work, they combine functionality with distinctive style.\n\nPerfect for daily wear, travelling, gym sessions, and casual outings.",
    details: [
      "Lightweight imported fabric",
      "Quick-dry technology",
      "Relaxed fit with a wide-leg silhouette",
      "Adjustable bottom drawstrings",
      "Detailed embroidery work",
      "Comfortable and breathable for everyday use"
    ],
    images: [
      "/assets/cargo/optimized/IMG_2044.webp",
      "/assets/cargo/optimized/IMG_2046.webp",
      "/assets/cargo/optimized/IMG_1798.webp",
      "/assets/cargo/optimized/IMG_2050.webp",
      "/assets/cargo/optimized/IMG_2030.webp"
    ],
    thumbnail: "/assets/cargo/optimized/IMG_2044.webp",
    inStock: true,
    tag: "LIMITED DROP"
  }
];

export const NAV_LINKS = [
  { href: "/", label: "TRACK PANTS", category: null },
  { href: "/pages/about-us", label: "OUR STORY", category: null },
  { href: "/cart", label: "BAG", category: null }
];

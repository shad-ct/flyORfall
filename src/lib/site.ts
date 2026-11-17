export const SITE_NAME = "FALL OR FLY";
export const SITE_TAGLINE = "FLY HIGH";
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://fallorfly.netlify.app";
export const SITE_INSTAGRAM = "fallorfly__";
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
  colorImages?: Record<string, string[]>;
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
    colors: ["Black", "Grey"],
    colorImages: {
      Black: [
        "/assets/bottom/black/1.jpeg",
        "/assets/bottom/black/2.PNG",
        "/assets/bottom/black/3.JPEG",
        "/assets/bottom/black/4.jpeg",
        "/assets/bottom/black/5.jpeg"
      ],
      Grey: [
        "/assets/bottom/grey/1.jpeg",
        "/assets/bottom/grey/2.jpeg",
        "/assets/bottom/grey/3.jpeg",
        "/assets/bottom/grey/4.jpeg"
      ]
    },
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
      "/assets/bottom/black/1.jpeg",
      "/assets/bottom/black/2.PNG",
      "/assets/bottom/black/3.JPEG",
      "/assets/bottom/black/4.jpeg",
      "/assets/bottom/black/5.jpeg",
      "/assets/bottom/grey/1.jpeg",
      "/assets/bottom/grey/2.jpeg",
      "/assets/bottom/grey/3.jpeg",
      "/assets/bottom/grey/4.jpeg"
    ],
    thumbnail: "/assets/bottom/black/1.jpeg",
    inStock: true,
    tag: "LIMITED DROP"
  }
];

export const NAV_LINKS = [
  { href: "/", label: "TRACK PANTS", category: null },
  { href: "/pages/about-us", label: "OUR STORY", category: null },
  { href: "/cart", label: "BAG", category: null }
];

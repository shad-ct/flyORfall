export const SITE_NAME = "FLY OR FALL";
export const SITE_TAGLINE = "Dare to Fly. Ready to Fall.";
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export interface Product {
  id: string;
  name: string;
  category: "T-SHIRTS" | "BOTTOM";
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
    id: "gravity-drop-oversized-tee",
    name: "Gravity Drop Oversized Tee",
    category: "T-SHIRTS",
    price: 1299,
    priceFormatted: "Rs. 1,299.00",
    originalPriceFormatted: "Rs. 1,999.00",
    slug: "gravity-drop-oversized-tee",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Washed Black", "Vintage White"],
    description:
      "Engineered for those who test limits. The Gravity Drop Oversized Tee features a heavyweight 260 GSM French terry cotton build with drop shoulders and an intentional boxy silhouette. Screen-printed signature FLY OR FALL insignia at back and tonal embroidery on the chest.",
    details: [
      "260 GSM 100% French Terry Cotton",
      "Signature boxy oversized streetwear silhouette",
      "Double-needle stitched ribbed collar & cuffs",
      "Screen-printed high-density back artwork",
      "Pre-shrunk for zero post-wash shrinkage",
      "Crafted in Hindustan"
    ],
    images: [
      "/assets/cloned/images/828f8eea3437.webp",
      "/assets/cloned/images/a9df78f51659.jpg",
      "/assets/cloned/images/71adad9c988c.jpg"
    ],
    thumbnail: "/assets/cloned/images/828f8eea3437.webp",
    inStock: true,
    tag: "BESTSELLER"
  },
  {
    id: "altitude-cargo-pants",
    name: "Altitude Cargo Pants",
    category: "BOTTOM",
    price: 1499,
    priceFormatted: "Rs. 1,499.00",
    originalPriceFormatted: "Rs. 2,299.00",
    slug: "altitude-cargo-pants",
    sizes: ["30", "32", "34", "36"],
    colors: ["Tactical Black", "Military Olive"],
    description:
      "Built for the climb and the freefall. The Altitude Cargo features high-durability ripstop nylon blend with modular dual-bellow pockets, adjustable ankle bungee toggles, and relaxed articulated knee darts for effortless street movement.",
    details: [
      "Durable water-repellent Ripstop Nylon-Cotton blend",
      "6-pocket tactical utility layout with heavy-duty metal zippers",
      "Elasticated waistband with branded utility drawstring",
      "Ankle cinching toggles for custom taper or wide drape",
      "Articulated knees for natural streetwear break",
      "Crafted in Hindustan"
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
  { href: "/collections", label: "NEW ARRIVALS", category: null },
  { href: "/collections/all", label: "ALL ITEMS", category: "ALL" },
  { href: "/collections/all?category=T-SHIRTS", label: "T-SHIRTS", category: "T-SHIRTS" },
  { href: "/collections/all?category=BOTTOM", label: "BOTTOM", category: "BOTTOM" },
  { href: "/pages/about-us", label: "OUR STORY", category: null }
];

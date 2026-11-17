import "./globals.css";
import "./ditto.css";
import type { Metadata, Viewport } from "next";
import { CartProvider } from "../lib/cart";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import { SITE_NAME, SITE_TAGLINE, SITE_ORIGIN } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN || "https://flyorfall.netlify.app"),
  title: {
    default: `${SITE_NAME} | Official Streetwear Store`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_NAME} - ${SITE_TAGLINE}. Exclusive drops, lightweight imported fabrics, and bold urban cuts.`,
  keywords: [
    "FALL OR FLY",
    "streetwear India",
    "imported track pants",
    "lightweight track pants",
    "wide leg track pants",
    "baggy pants",
    "streetwear drop",
    "urban fashion",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  verification: {
    google: "RFEHdzlxWE6Bfcx6RrvkfodSMfVJh9Fpgi04Gx_c64I",
  },
  alternates: {
    canonical: SITE_ORIGIN,
  },
  icons: {
    icon: [
      { url: "/assets/logo.jpeg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/assets/logo.jpeg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: `${SITE_NAME} | Official Streetwear Store`,
    description: `${SITE_NAME} - ${SITE_TAGLINE}. Exclusive drops, lightweight imported fabrics, and bold urban cuts.`,
    url: SITE_ORIGIN,
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    images: [
      {
        url: "/assets/bottom/black/IMG_1974.webp",
        width: 1200,
        height: 1600,
        alt: `${SITE_NAME} Streetwear`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Official Streetwear Store`,
    description: `${SITE_NAME} - ${SITE_TAGLINE}. Exclusive drops, lightweight imported fabrics, and bold urban cuts.`,
    images: ["/assets/bottom/black/IMG_1974.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#080D26] text-white" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="RFEHdzlxWE6Bfcx6RrvkfodSMfVJh9Fpgi04Gx_c64I" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[#080D26] text-white antialiased selection:bg-[#D4FF00] selection:text-black font-sans"
        suppressHydrationWarning
      >
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1 w-full bg-[#080D26]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

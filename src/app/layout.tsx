import "./globals.css";
import "./ditto.css";
import type { Metadata, Viewport } from "next";
import { CartProvider } from "../lib/cart";
import Header from "../components/Header";
import AnnouncementBar from "../components/AnnouncementBar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import { SITE_NAME, SITE_TAGLINE, SITE_ORIGIN } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN || "http://localhost:3000"),
  title: `${SITE_NAME} | Official Streetwear Store`,
  description: `${SITE_NAME} - ${SITE_TAGLINE}. Exclusive drops, heavyweight fabrics, and bold urban cuts.`,
  openGraph: {
    title: `${SITE_NAME} | Streetwear`,
    description: SITE_TAGLINE,
    type: "website",
    siteName: SITE_NAME,
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
    <html lang="en" className="dark bg-[rgb(11,11,11)] text-white" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-[rgb(11,11,11)] text-white antialiased selection:bg-white selection:text-black"
        suppressHydrationWarning
      >
        <CartProvider>
          {/* <AnnouncementBar /> */}
          <Header />
          <CartDrawer />
          <main className="flex-1 w-full bg-[rgb(11,11,11)]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

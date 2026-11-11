import React, { Suspense } from "react";
import ProductCatalogue from "../components/ProductCatalogue";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-white/50 font-['Barlow_Condensed'] uppercase tracking-widest">
          Loading Fly Or Fall Catalogue...
        </div>
      }
    >
      <ProductCatalogue />
    </Suspense>
  );
}

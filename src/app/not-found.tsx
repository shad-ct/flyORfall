import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4FF00]">
        404 ERROR
      </span>
      <h1 className="font-display text-5xl sm:text-6xl font-black uppercase tracking-wide text-white">
        PAGE NOT FOUND
      </h1>
      <p className="text-white/60 text-sm max-w-md mx-auto">
        The streetwear piece or page you're searching for might have dropped out of orbit or moved.
      </p>
      <div className="pt-4">
        <Link
          href="/products/altitude-cargo-pants"
          className="inline-block px-8 py-3.5 bg-[#D4FF00] hover:bg-[#BEF200] text-black font-display text-base font-bold uppercase tracking-widest rounded transition shadow-xl"
        >
          Return to Altitude Cargo
        </Link>
      </div>
    </div>
  );
}

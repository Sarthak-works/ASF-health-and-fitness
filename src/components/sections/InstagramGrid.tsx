"use client";

import Script from "next/script";

export default function InstagramGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Target container matching the properties from image_d138dd.png */}
      <div data-key="Instagram Feed " className="ft" id="ft9hb2pwy"></div>

      {/* Next.js optimized script loading */}
      <Script
        src="https://wdg.fouita.com/widgets/0x4ad1ad.js"
        strategy="afterInteractive"
      />
    </div>
  );
}

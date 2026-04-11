//Map.tsx
"use client";

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  MapControls,
} from "@/components/ui/map";
import { useEffect, useState } from "react";
const dubaiLocations = [
  {
    id: 1,
    name: "Bur Dubai",
    label: "Bur Dubai",
    area: "Old Dubai",
    lng: 55.2989,
    lat: 25.2604,
    dot: "#f43f5e",
  },
  {
    id: 2,
    name: "Mena / Jumeirah 1",
    label: "Jumeirah 1",
    area: "Jumeirah",
    lng: 55.271,
    lat: 25.2389,
    dot: "#f97316",
  },
  {
    id: 3,
    name: "Garhoud",
    label: "Garhoud",
    area: "Deira",
    lng: 55.3483,
    lat: 25.2441,
    dot: "#f59e0b",
  },
  {
    id: 4,
    name: "Mirdiff",
    label: "Mirdiff",
    area: "East Dubai",
    lng: 55.4224,
    lat: 25.2205,
    dot: "#10b981",
  },
  {
    id: 5,
    name: "Warsan",
    label: "Warsan",
    area: "East Dubai",
    lng: 55.4226,
    lat: 25.1627,
    dot: "#14b8a6",
  },
  {
    id: 6,
    name: "Al Quoz",
    label: "Al Quoz",
    area: "Central Dubai",
    lng: 55.2327,
    lat: 25.1308,
    dot: "#0ea5e9",
  },
  {
    id: 7,
    name: "Barsha Heights",
    label: "Barsha Hts",
    area: "New Dubai",
    lng: 55.1756,
    lat: 25.0977,
    dot: "#3b82f6",
  },
  {
    id: 8,
    name: "Dubai Production City",
    label: "Production City",
    area: "New Dubai",
    lng: 55.19,
    lat: 25.0318,
    dot: "#8b5cf6",
  },
  {
    id: 9,
    name: "Al Nahda 1",
    label: "Al Nahda 1",
    area: "Sharjah Border",
    lng: 55.3655,
    lat: 25.292,
    dot: "#ec4899",
  },
];

export default function MapSection() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <section className="flex flex-col bg-white overflow-hidden pt-0 pb-20">
      <div className="text-center mb-12 px-4">
        <span className="section-label !text-black mb-4 font-black">
          OUR GYM TIE-UP LOCATIONS
        </span>
        <h2 className="headline-medium text-center">Find Us Across Dubai</h2>
        <p className="text-gray-500 text-lg max-w-xl mt-4 text-center mx-auto">
          With 9 locations spread across the city, world-class fitness is always
          close to home.
        </p>
      </div>

      {/* Map */}
      <div className="w-full h-[560px]">
        <Map
          center={[55.2962, 25.2048]}
          zoom={10.5}
          scrollZoom={!isMobile}
          touchZoomRotate={!isMobile}
          touchPitch={!isMobile}
          dragPan={!isMobile}
        >
          <MapControls
            position="bottom-right"
            showZoom
            showLocate
            showFullscreen
          />

          {dubaiLocations.map((loc) => (
            <MapMarker key={loc.id} longitude={loc.lng} latitude={loc.lat}>
              <MarkerContent>
                <div className="relative flex items-center justify-center">
                  <span
                    className="absolute inline-flex h-5 w-5 rounded-full opacity-40 animate-ping"
                    style={{ backgroundColor: loc.dot }}
                  />
                  <div
                    className="relative size-4 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform duration-150"
                    style={{ backgroundColor: loc.dot }}
                  />
                </div>
                <MarkerLabel position="bottom">{loc.label}</MarkerLabel>
              </MarkerContent>

              <MarkerPopup className="w-36 overflow-hidden" closeButton>
                <div className="px-3 py-3">
                  <p className="font-bold text-foreground text-sm leading-tight">
                    {loc.name}
                  </p>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))}
        </Map>
      </div>

      {/* ── Location Pills Grid ──────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
          {dubaiLocations.map((loc) => (
            <div
              key={loc.id}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-3 hover:shadow-md hover:border-muted-foreground/30 transition-all cursor-default"
            >
              <div
                className="size-2.5 rounded-full shrink-0"
                style={{ backgroundColor: loc.dot }}
              />
              <div className="min-w-0">
                <p className="font-semibold text-xs text-foreground truncate leading-tight">
                  {loc.name}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {loc.area}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

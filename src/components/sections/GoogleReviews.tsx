"use client";
import { useEffect } from "react";

export default function GoogleReviews() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="elfsight-app-040cee19-5018-4e26-81d6-da76f7e2875f"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
}

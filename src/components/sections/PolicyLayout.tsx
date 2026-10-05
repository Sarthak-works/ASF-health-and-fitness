import type { ReactNode } from "react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

/* Heading font: uses the serif face of your homepage headings.
   If your About section uses a specific class or CSS variable for its
   "Elevate Your Well-being." heading (e.g. font-playfair), put it here. */
const HEADING_FONT = "font-serif";

/* Page shell: Navbar + white content area + dark Footer */
export function PolicyPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      {/* pt-32 clears the fixed 80px navbar */}
      <main className="bg-white min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10 border-b border-gray-200 pb-8">
            <span className="text-purple text-xs font-semibold uppercase tracking-[0.2em] mb-3 block">
              ASF Coaching
            </span>
            <h1
              className={`${HEADING_FONT} text-3xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-3`}
            >
              {title}
            </h1>
            <p className="text-sm text-gray-500">Last Updated: {lastUpdated}</p>
          </header>
          <div className="space-y-10">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* A numbered/titled block of policy text */
export function PolicySection({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section>
      {title && (
        <h2
          className={`${HEADING_FONT} text-xl md:text-2xl font-bold text-[#1A1A1A] mb-3`}
        >
          {title}
        </h2>
      )}
      <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

/* Bulleted list */
export function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-1.5 marker:text-purple">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/* Contact details block used at the end of each policy */
export function ContactBlock() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-1.5 text-gray-700">
      <p className="text-[#1A1A1A] font-semibold">
        Akshay Sahu Sports Coaching Services LLC
      </p>
      <p>Fonds Building, Sheikh Zayed Road, Office 2, Dubai, UAE</p>
      <p>
        Email:{" "}
        <a
          href="mailto:akshay@asfcoaching.com"
          className="text-purple font-medium hover:underline"
        >
          akshay@ASFcoaching.com
        </a>
      </p>
      <p>
        Phone:{" "}
        <a
          href="tel:+971543814174"
          className="text-purple font-medium hover:underline"
        >
          +971 54 381 4174
        </a>
        {" / "}
        <a
          href="tel:+971542753245"
          className="text-purple font-medium hover:underline"
        >
          +971 54 275 3245
        </a>
      </p>
      <p>Business Hours: Monday–Saturday: 6AM–8PM, Sunday: Closed</p>
    </div>
  );
}

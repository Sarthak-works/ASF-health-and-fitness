import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

/* Standalone SEO landing pages. Not linked from the navigation menu —
   reachable only by direct URL / internal links. Content is placeholder. */

export type SeoSection = { heading: string; body: string[] };

export default function SeoLandingPage({
  title,
  intro,
  image,
  imageAlt,
  sections,
}: {
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  sections: SeoSection[];
}) {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero image */}
        <header className="relative h-[60vh] min-h-[380px] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
            <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              ASF Coaching · Dubai
            </span>
            <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
              {title}
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-gray-700 md:text-xl">
            {intro}
          </p>

          <div className="mt-12 space-y-12">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-600">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-[#581c87] px-6 py-10 text-center text-white md:px-12">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Ready to start your transformation?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/80">
              Book a free consultation with an ASF coach and get a plan built
              around your goals, schedule and body.
            </p>
            <a
              href="/#contact"
              className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-[#581c87] transition-colors hover:bg-[#f3e8ff]"
            >
              Register Your Interest
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

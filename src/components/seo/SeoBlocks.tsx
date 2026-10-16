import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Check,
  Info,
  MapPin,
  Quote,
  UserRound,
} from "lucide-react";
import { FaAppStoreIos, FaGooglePlay, FaWhatsapp } from "react-icons/fa";
import Navbar from "@/components/sections/Navbar";
import ContactFooter from "@/components/sections/ContactFooter";
import {
  APP_STORE_URL,
  BRAND,
  HQ_ADDRESS,
  PHONE_DISPLAY,
  PLAY_STORE_URL,
  SITE_URL,
  TRUST_STATS,
  whatsappLink,
  type ClientResult,
  type CoachProfile,
} from "@/lib/seo-content";

/* Building blocks for the standalone SEO landing pages. Every block renders on
   the server so all copy is in the static HTML for crawlers. Headings follow a
   strict H1 (hero) → H2 (section) → H3 (card) outline. */

export type FaqItem = { question: string; answer: string };

/* ─── Page shell ─────────────────────────────────────────────────────────── */

export function SeoPageShell({
  jsonLd,
  children,
}: {
  jsonLd: object[];
  children: ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="bg-white">{children}</main>
      <ContactFooter
        eyebrow="BOOK YOUR FREE ASSESSMENT"
        title="Ready to start your transformation?"
        subtitle="Tell us your goal and preferred time. A coach will call you within one working day to book your free assessment."
      />
    </>
  );
}

/* Structured data: the service, the breadcrumb trail and the FAQ. */
export function buildJsonLd({
  path,
  name,
  description,
  serviceType,
  faqs,
}: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  faqs: FaqItem[];
}) {
  const url = `${SITE_URL}${path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      serviceType,
      description,
      url,
      areaServed: { "@type": "City", name: "Dubai" },
      provider: {
        "@type": "HealthClub",
        name: BRAND,
        legalName: "ASF Sport Coaching Services LLC",
        url: SITE_URL,
        telephone: "+971543814174",
        email: "akshay@asfcoaching.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Fonds Building, Sheikh Zayed Road, Office 2",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
        openingHours: "Mo-Sa 06:00-20:00",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];
}

/* ─── Buttons ────────────────────────────────────────────────────────────── */

export function CtaButtons({
  primaryLabel,
  whatsappMessage,
  dark = true,
}: {
  primaryLabel: string;
  whatsappMessage: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href="#contact"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-black uppercase tracking-wider text-black transition-transform hover:-translate-y-0.5"
      >
        {primaryLabel}
        <ArrowRight className="h-4 w-4" />
      </a>
      <a
        href={whatsappLink(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-full border-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors ${
          dark
            ? "border-white/70 text-white hover:bg-white hover:text-purple"
            : "border-purple text-purple hover:bg-purple hover:text-white"
        }`}
      >
        <FaWhatsapp className="h-5 w-5" />
        WhatsApp
      </a>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */

export function SeoHero({
  title,
  subline,
  primaryLabel = "Book Free Assessment",
  whatsappMessage,
  image,
  imageAlt,
  highlights,
}: {
  title: string;
  subline: string;
  primaryLabel?: string;
  whatsappMessage: string;
  image: string;
  imageAlt: string;
  highlights: string[];
}) {
  return (
    <header className="relative overflow-hidden bg-[#2a1145] pt-28 md:pt-32">
      <div className="absolute inset-0 bg-gradient-to-br from-purple via-[#3b1a5e] to-[#160822]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20">
        <div>
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-white/60">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">{title}</span>
          </nav>
          <h1 className="font-heading text-4xl font-bold leading-[1.1] text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
            {subline}
          </p>
          <ul className="mt-6 space-y-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-white/85">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <CtaButtons
              primaryLabel={primaryLabel}
              whatsappMessage={whatsappMessage}
            />
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-3 rounded-[2rem] bg-accent/20 blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt}
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl lg:aspect-[5/6]"
          />
        </div>
      </div>
    </header>
  );
}

/* ─── Trust strip ────────────────────────────────────────────────────────── */

export function TrustStrip() {
  return (
    <section aria-label="Why clients trust ASF" className="bg-[#160822]">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-8 text-center sm:px-6 md:grid-cols-4 lg:px-8">
        {TRUST_STATS.map((s) => (
          <div key={s.label} className="px-2">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-2xl font-black text-accent md:text-4xl">
              {s.value}
            </dd>
            <dd className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/70 md:text-xs">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ─── Generic section ────────────────────────────────────────────────────── */

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "white",
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  tone?: "white" | "gray" | "purple";
  children?: ReactNode;
}) {
  const bg =
    tone === "gray"
      ? "bg-gray-50"
      : tone === "purple"
        ? "bg-[#f6f0fb]"
        : "bg-white";
  return (
    <section id={id} className={`${bg} py-16 md:py-20 scroll-mt-24`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && <span className="section-label block">{eyebrow}</span>}
          <h2 className="font-heading text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {title}
          </h2>
          {intro && (
            <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
              {intro}
            </div>
          )}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: ReactNode[] }) {
  return (
    <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

/* A short, self-contained definition placed high on the page so search
   engines and AI answers can lift it as a snippet. */
export function DefinitionBox({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl rounded-2xl border-l-4 border-purple bg-[#f6f0fb] p-6 text-lg leading-relaxed text-gray-800 md:p-8">
      {children}
    </div>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 flex max-w-4xl gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900 md:text-base">
      <Info className="mt-0.5 h-5 w-5 flex-shrink-0" />
      <div>{children}</div>
    </div>
  );
}

/* ─── Cards ──────────────────────────────────────────────────────────────── */

export type CardItem = {
  title: string;
  body: string;
  icon?: LucideIcon;
  meta?: string;
  bullets?: string[];
};

export function CardGrid({
  items,
  columns = 3,
}: {
  items: CardItem[];
  columns?: 2 | 3 | 4;
}) {
  const cols =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
        ? "md:grid-cols-2 lg:grid-cols-4"
        : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid gap-5 ${cols}`}>
      {items.map((item) => (
        <article
          key={item.title}
          className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
        >
          {item.icon && (
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple/10 text-purple">
              <item.icon className="h-6 w-6" />
            </div>
          )}
          <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-gray-600">{item.body}</p>
          {item.bullets && (
            <ul className="mt-4 space-y-1.5 text-sm text-gray-600">
              {item.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          {item.meta && (
            <p className="mt-auto pt-4 text-xs font-bold uppercase tracking-wider text-purple">
              {item.meta}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

export function Checklist({
  items,
  numbered = false,
}: {
  items: { title: string; body?: string }[];
  numbered?: boolean;
}) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={item.title}
          className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">
            {numbered ? i + 1 : <Check className="h-4 w-4" />}
          </span>
          <div>
            <p className="font-bold text-gray-900">{item.title}</p>
            {item.body && (
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                {item.body}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ─── Comparison table ───────────────────────────────────────────────────── */

export function ComparisonTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-purple text-white">
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col" className="px-5 py-4 font-bold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className={r % 2 ? "bg-gray-50" : "bg-white"}>
              {row.map((cell, c) =>
                c === 0 ? (
                  <th
                    key={c}
                    scope="row"
                    className="px-5 py-4 align-top font-bold text-gray-900"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={c} className="px-5 py-4 align-top text-gray-600">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Process steps ──────────────────────────────────────────────────────── */

export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol
      className={`grid gap-5 md:grid-cols-2 ${
        steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
      }`}
    >
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="relative rounded-2xl border border-purple/15 bg-white p-6 shadow-sm"
        >
          <span className="font-heading text-5xl font-bold text-purple/20">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-lg font-bold text-gray-900">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ─── Coaches ────────────────────────────────────────────────────────────── */

export function CoachGrid({ coaches }: { coaches: CoachProfile[] }) {
  return (
    <div
      className={`grid gap-6 md:grid-cols-2 ${coaches.length > 2 ? "lg:grid-cols-3" : "max-w-4xl"}`}
    >
      {coaches.map((c, i) => (
        <article
          key={`${c.name}-${i}`}
          className={`overflow-hidden rounded-2xl bg-white shadow-sm ${
            c.placeholder
              ? "border-2 border-dashed border-purple/40"
              : "border border-gray-100"
          }`}
        >
          <div className="relative aspect-[4/3] bg-gradient-to-br from-[#f6f0fb] to-[#e9dcf5]">
            {c.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.photo}
                alt={`${c.name}, ${c.role} at ASF Coaching Dubai`}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-purple/50">
                <UserRound className="h-20 w-20" strokeWidth={1.2} />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Coach photo to be added
                </span>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
            <p className="text-sm font-semibold text-purple">{c.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{c.bio}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="font-bold text-gray-900">Certifications</dt>
                <dd className="text-gray-600">{c.certifications.join(" · ")}</dd>
              </div>
              <div>
                <dt className="font-bold text-gray-900">Specialisation</dt>
                <dd className="text-gray-600">{c.specialisation}</dd>
              </div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ─── Client results ─────────────────────────────────────────────────────── */

export function ResultsGrid({ results }: { results: ClientResult[] }) {
  return (
    <div
      className={`grid gap-6 md:grid-cols-2 ${results.length > 2 ? "lg:grid-cols-3" : ""}`}
    >
      {results.map((r) => (
        <figure
          key={r.id}
          className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.image}
            alt={r.imageAlt}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="flex flex-1 flex-col p-6">
            <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider">
              <span className="rounded-full bg-purple/10 px-3 py-1 text-purple">
                {r.goal}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                {r.timeframe}
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                {r.format}
              </span>
            </div>
            <p className="mt-4 text-lg font-bold text-gray-900">{r.result}</p>
            <blockquote className="mt-3 flex gap-2 text-gray-600">
              <Quote className="h-5 w-5 flex-shrink-0 text-purple/40" />
              <p className="italic leading-relaxed">{r.quote}</p>
            </blockquote>
            <figcaption className="mt-auto pt-4 text-sm font-semibold text-gray-900">
              {r.name}, Dubai
            </figcaption>
          </div>
        </figure>
      ))}
    </div>
  );
}

export function VideoTestimonial({
  video,
  heading,
  body,
}: {
  video: { title: string; src: string; poster: string };
  heading: string;
  body: string;
}) {
  return (
    <div className="mt-10 grid items-center gap-8 rounded-3xl bg-[#160822] p-6 md:grid-cols-[minmax(0,320px)_1fr] md:p-10">
      <video
        controls
        playsInline
        preload="none"
        poster={video.poster}
        className="mx-auto aspect-[9/16] w-full max-w-[320px] rounded-2xl bg-black object-cover"
        aria-label={video.title}
      >
        <source src={encodeURI(video.src)} type="video/mp4" />
      </video>
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
          Video testimonial
        </span>
        <h3 className="mt-3 font-heading text-2xl font-bold text-white md:text-3xl">
          {heading}
        </h3>
        <p className="mt-3 leading-relaxed text-white/75">{body}</p>
      </div>
    </div>
  );
}

/* ─── Where we train ─────────────────────────────────────────────────────── */

export function AreasCovered({
  formats,
  groups,
}: {
  formats: CardItem[];
  groups: { title: string; areas: string[] }[];
}) {
  return (
    <>
      <CardGrid items={formats} columns={3} />
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
              <MapPin className="h-5 w-5 text-purple" />
              {g.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {g.areas.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-purple/20 bg-white px-4 py-1.5 text-sm text-gray-700"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-500">
        Head office: {HQ_ADDRESS}. Sessions Monday to Saturday, 6 AM to 8 PM.
        Not on the list? Call or WhatsApp {PHONE_DISPLAY} and we will check
        coach availability in your area.
      </p>
    </>
  );
}

/* ─── App ────────────────────────────────────────────────────────────────── */

export function AppBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-2xl bg-black px-5 py-3 text-white transition-transform hover:-translate-y-0.5"
      >
        <FaAppStoreIos className="h-6 w-6" />
        <span className="text-left leading-none">
          <span className="block text-[10px] uppercase text-white/60">
            Download on the
          </span>
          <span className="text-base font-bold">App Store</span>
        </span>
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-2xl bg-black px-5 py-3 text-white transition-transform hover:-translate-y-0.5"
      >
        <FaGooglePlay className="h-5 w-5" />
        <span className="text-left leading-none">
          <span className="block text-[10px] uppercase text-white/60">
            Get it on
          </span>
          <span className="text-base font-bold">Google Play</span>
        </span>
      </a>
    </div>
  );
}

export function ScreenshotRow({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  return (
    <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      {images.map((img) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className="w-[220px] flex-shrink-0 snap-center rounded-2xl border border-gray-200 shadow-md md:w-[250px]"
        />
      ))}
    </div>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────────── */

/* Native <details> so every answer is in the HTML and works without JS. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="max-w-4xl divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
      {items.map((f) => (
        <details key={f.question} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-bold text-gray-900 marker:hidden [&::-webkit-details-marker]:hidden">
            <h3 className="text-base md:text-lg">{f.question}</h3>
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple/10 text-xl leading-none text-purple transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 leading-relaxed text-gray-600">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

/* ─── Mid-page call to action ────────────────────────────────────────────── */

export function InlineCta({
  title,
  body,
  primaryLabel = "Book Free Assessment",
  whatsappMessage,
}: {
  title: string;
  body: string;
  primaryLabel?: string;
  whatsappMessage: string;
}) {
  return (
    <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl bg-purple p-8 text-white md:flex-row md:items-center md:p-10">
      <div className="max-w-2xl">
        <p className="font-heading text-2xl font-bold">{title}</p>
        <p className="mt-2 text-white/80">{body}</p>
      </div>
      <CtaButtons primaryLabel={primaryLabel} whatsappMessage={whatsappMessage} />
    </div>
  );
}

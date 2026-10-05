"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    companyName: "ASF Sport Coaching Services LLC",
    value: "Fonds Building, Sheikh Zayed Road, Office 2, Dubai, UAE",
    href: "https://maps.google.com/?q=Fonds+Building+Sheikh+Zayed+Road+Office+2+Dubai",
  },
  {
    icon: Mail,
    label: "Email",
    value: "akshay@asfcoaching.com",
    href: "mailto:akshay@asfcoaching.com",
  },
  {
    icon: Phone,
    label: "Phone",
    values: [
      { text: "+971 54 381 4174", href: "tel:+971543814174" },
      { text: "+971 54 275 3245", href: "tel:+971542753245" },
    ],
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat: 6AM–8PM  |  Sunday: Closed",
  },
];

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/people/ASF-Personal-Training-Services/61561552820774/?rdid=4xaBd3UQIAlkWcxW&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BTW3TsBzU%2F",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/asf_dubai?utm_source=ig_web_button_share_sheet&igsh=ZDZDc0MzIxNw==",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/asf-personal-training-services/",
    label: "LinkedIn",
  },
];

const policyLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Returns & Refund Policy", href: "/returns-refund-policy" },
];

function TransparentFooterVideo({ src, width, height, className }: any) {
  return (
    <div
      className={className}
      style={{ position: "relative", width, height, maxWidth: "100%" }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="chroma-key-footer">
          <feColorMatrix
            type="matrix"
            values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            1 1 -1 0 -0.15
          "
          />
        </filter>
      </svg>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: "url(#chroma-key-footer)",
        }}
      />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        {/* Top row: logo + contact items */}
        <div className="flex flex-wrap items-start gap-x-10 gap-y-6">
          {/* Logo block — far left */}
          <div className="flex-shrink-0">
            <TransparentFooterVideo
              src="/logov.mp4"
              width={150}
              height={60}
              className="h-14 w-auto object-contain"
            />
            <p className="text-gray-500 text-xs mt-1">
              High Performance. Real Results.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-white/10 mx-2" />

          {/* Approved by — Dubai Sports */}
          <div className="flex-shrink-0 flex flex-col items-start justify-center gap-2">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
              Approved by
            </p>
            <img
              src="/DSC Logo-Text-05.webp"
              alt="Dubai Sports"
              className="h-[100px] md:h-20 w-auto max-w-full object-contain"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-white/10 mx-2" />

          {/* Contact details — inline, no boxes */}
          <div className="flex flex-wrap gap-x-8 gap-y-5 items-start flex-1">
            {contactDetails.map((item: any, i) => {
              const inner = (
                <div className="flex items-start gap-3">
                  <div className="bg-accent/10 p-2 rounded-xl flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">
                      {item.label}
                    </p>
                    {item.values ? (
                      <div className="space-y-1">
                        {item.values.map((v: any, idx: number) => (
                          <a
                            key={idx}
                            href={v.href}
                            className="text-white hover:text-accent font-medium text-xs block transition-colors duration-200"
                          >
                            {v.text}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {item.companyName && (
                          <p className="text-white text-xs font-semibold mb-0.5 leading-snug">
                            {item.companyName}
                          </p>
                        )}
                        <p className="text-white text-xs font-medium leading-snug">
                          {item.value}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                >
                  {"href" in item ? (
                    <a
                      href={item.href}
                      target={item.label === "Address" ? "_blank" : undefined}
                      rel={
                        item.label === "Address"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="hover:opacity-80 transition-opacity duration-200 block"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom row: social icons + app store buttons */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          {/* Social icons */}
          <div className="flex gap-3">
            {socialLinks.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/40 p-2.5 rounded-xl text-gray-400 hover:text-accent transition-all duration-200"
                aria-label={s.label}
              >
                <s.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* App store buttons */}
          <div className="flex gap-3">
            <motion.a
              href="https://apps.apple.com/app/asf-health-and-fitness/id6758930684"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-2xl transition-all group"
            >
              <FaAppStoreIos className="w-5 h-5 text-white group-hover:text-accent transition-colors" />
              <div className="text-left">
                <p className="text-[9px] text-gray-500 uppercase font-bold leading-none mb-0.5">
                  Download on
                </p>
                <p className="text-sm text-white font-black leading-none">
                  App Store
                </p>
              </div>
            </motion.a>

            <motion.a
              href="https://play.google.com/store/apps/details?id=com.app.asfhealthfitness"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-2xl transition-all group"
            >
              <FaGooglePlay className="w-4 h-4 text-white group-hover:text-accent transition-colors" />
              <div className="text-left">
                <p className="text-[9px] text-gray-500 uppercase font-bold leading-none mb-0.5">
                  Get it on
                </p>
                <p className="text-sm text-white font-black leading-none">
                  Google Play
                </p>
              </div>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Policy links + copyright bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex flex-col items-center gap-2 text-xs text-gray-500">
          <nav
            aria-label="Policies"
            className="flex flex-wrap justify-center gap-x-5 gap-y-1"
          >
            {policyLinks.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="hover:text-accent transition-colors"
              >
                {p.name}
              </Link>
            ))}
          </nav>
          <div className="text-center">
            <span>
              Copyright © 2026 Akshay Sahu Sports Coaching Services LLC. All
              Rights Reserved.
            </span>
            <span className="mx-2 text-gray-700">|</span>
            <span>
              Built with passion by{" "}
              <a
                href="https://buildatscale.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/70 hover:text-accent transition-colors font-medium"
              >
                Build at Scale
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

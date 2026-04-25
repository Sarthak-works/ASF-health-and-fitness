"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Input, Label } from "@/components/ui/signup-form-elements";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z
    .string()
    .regex(
      /^\+971[- ]?5[0-9][- ]?\d{7}$/,
      "Enter a valid UAE mobile number (e.g. +971 50 1234567)",
    ),
  coachingType: z.string().min(1, "Please select a coaching type"),
  budget: z.string().min(1, "Please select a budget scale"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(180, "Maximum 180 characters"),
});

type FormData = z.infer<typeof schema>;

const navLinks = [
  "About",
  "Services",
  "Transformations",
  "Founder",
  "Team",
  "FAQ",
  // "Blog",
  "Contact",
];

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    companyName: "Akshay Sahu Sports Coaching Services LLC",
    value: " Fonds Building, Sheikh Zayed Road, Office 2, Dubai, UAE",
    href: "https://maps.google.com/?q=Fonds+Building+Sheikh+Zayed+Road+Office+2+Dubai",
  },
  {
    icon: Mail,
    label: "Email",
    value: "suraj@asfhealthandfitness.com",
    href: "mailto:suraj@asfhealthandfitness.com",
  },
  {
    icon: Phone,
    label: "Phone",
    values: [
      { text: "+971 54 381 4174", href: "tel:+971543814174" },
      { text: "+971 54 275 3245", href: "tel:+971542753245" },
    ],
  },
  { icon: Clock, label: "Hours", value: "Mon–Sat: 6AM–8PM  |  Sunday: Closed" },
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

const formFields = [
  { id: "name", label: "Full Name", type: "text", placeholder: "John Smith" },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+971 5X XXX XXXX",
  },
];
// Google Apps Script handles both gsheet submission as well as bigin CRM submission,
// and the URL:https://docs.google.com/spreadsheets/d/1M3zdMyf2hJ386q0jtyQJgDa8mgGFX9oIogAMDnUpsuk/edit?usp=sharing

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzXau9Zj0C2Z2yPm_37Pb3k2SJb6K0lCilKQRbq2KJmQ2bDxpVPf7soXj9kTyB85P6H/exec";

function TransparentFooterVideo({ src, width, height, className }: any) {
  return (
    <div
      className={className}
      style={{ position: "relative", width, height, maxWidth: "100%" }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="chroma-key-footer">
          {/* 
            This matrix precisely strips the purple background (high Blue, low Green/Red) 
            while keeping the yellow logo (high Red/Green, low Blue) perfectly opaque.
            Alpha = 1*R + 1*G - 1*B - 0.1
          */}
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

export default function ContactFooter() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const INTERAKT_API_KEY =
    "alJ0dUltUlFBR1dTNy1RVGZpY1BhSTBocEtPRl9DUHJ3VnJjc3F2WTQxTTo=";

  const onSubmit = async (data: FormData) => {
    setSubmitError(false);
    try {
      // 1. Google Sheets submission
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp: new Date().toISOString(), ...data }),
      });

      // 2. Interakt submission
      const cleanPhone = data.phone
        .replace(/^\+971[- ]?/, "")
        .replace(/[- ]/g, "");

      await fetch("https://api.interakt.ai/v1/public/track/users/", {
        method: "POST",
        mode: "no-cors",
        headers: {
          Authorization: `Basic ${INTERAKT_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.email,
          phoneNumber: cleanPhone,
          countryCode: "+971",
          traits: {
            name: data.name,
            email: data.email,
            coachingType: data.coachingType,
            budget: data.budget,
            message: data.message,
            leadSource: "Website Contact Form",
          },
        }),
      });

      setSubmitted(true);
      reset();
      window.location.href = "/thank-you";
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(true);
    }
  };

  return (
    <div id="contact">
      <section className="relative min-h-[100dvh] bg-[#1A1A1A] overflow-hidden py-20 lg:py-24">
        <BackgroundBeamsWithCollision className="absolute inset-0 z-0">
          <div />
        </BackgroundBeamsWithCollision>

        {/* <div className="absolute inset-0 z-[1] overflow-hidden">
          <Meteors number={18} />
        </div> */}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
              START YOUR TRANSFORMATION
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight">
              Get In Touch!
            </h2>
            <TextGenerateEffect
              words="Ready to begin? Schedule a free consultation today."
              className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed font-normal text-center"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6">
                <TransparentFooterVideo
                  src="/logov.mp4"
                  width={180}
                  height={72}
                  className="h-16 md:h-20 w-auto object-contain mb-2"
                />
                <p className="text-gray-400 mt-1 text-xs">
                  High Performance. Real Results.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {contactDetails.map((item: any, i) => {
                  const Content = (
                    <>
                      <div className="bg-accent/10 p-2 rounded-xl flex-shrink-0">
                        <item.icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">
                          {item.label}
                        </p>
                        {item.values ? (
                          <div className="flex flex-col gap-1.5 mt-0.5 pb-1">
                            {item.values.map((v: any, idx: number) => (
                              <a
                                key={idx}
                                href={v.href}
                                className="text-white hover:text-accent font-medium text-xs transition-colors duration-200 block truncate"
                              >
                                {v.text}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div>
                            {item.companyName && (
                              <p className="text-white text-xs font-semibold mb-1">
                                {item.companyName}
                              </p>
                            )}
                            <p className="text-white text-xs font-medium">
                              {item.value}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  );

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {"href" in item ? (
                        <a
                          href={item.href}
                          target={
                            item.label === "Address" ? "_blank" : undefined
                          }
                          rel={
                            item.label === "Address"
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="flex items-start gap-4 hover:bg-white/5 p-2 -m-2 rounded-xl transition-colors duration-200"
                        >
                          {Content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-4 p-2 -m-2">
                          {Content}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

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
                      delay: 0.4 + i * 0.1,
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

              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold mb-4">
                  Download Our App
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="https://apps.apple.com/app/asf-health-and-fitness/id6758930684"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-2xl transition-all group"
                  >
                    <FaAppStoreIos className="w-6 h-6 text-white group-hover:text-accent transition-colors" />
                    <div className="text-left">
                      <p className="text-[9px] text-gray-500 uppercase font-bold leading-none mb-1">
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
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-2xl transition-all group"
                  >
                    <FaGooglePlay className="w-5 h-5 text-white group-hover:text-accent transition-colors" />
                    <div className="text-left">
                      <p className="text-[9px] text-gray-500 uppercase font-bold leading-none mb-1">
                        Get it on
                      </p>
                      <p className="text-sm text-white font-black leading-none">
                        Google Play
                      </p>
                    </div>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {formFields.map((field, i) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="space-y-1.5"
                    >
                      <Label
                        htmlFor={field.id}
                        className="text-[11px] font-bold uppercase tracking-wider text-gray-400"
                      >
                        {field.label}
                      </Label>
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="h-10 text-xs"
                        {...register(field.id as keyof FormData)}
                      />
                      {errors[field.id as keyof FormData] && (
                        <p className="text-red-400 text-[10px]">
                          {
                            errors[field.id as keyof FormData]
                              ?.message as string
                          }
                        </p>
                      )}
                    </motion.div>
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 pb-1">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="space-y-1.5"
                    >
                      <Label
                        htmlFor="coachingType"
                        className="text-[11px] font-bold uppercase tracking-wider text-gray-400"
                      >
                        Coaching Type
                      </Label>
                      <select
                        id="coachingType"
                        {...register("coachingType")}
                        className="w-full bg-zinc-800 text-white rounded-md px-3 h-10 text-xs border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 transition duration-300 appearance-none"
                      >
                        <option value="">Select option</option>
                        <option value="Suit Coaching">Suit Coaching</option>
                        <option value="VIP">VIP</option>
                        <option value="Personal">Personal</option>
                        <option value="Couple">Couple</option>
                      </select>
                      {errors.coachingType && (
                        <p className="text-red-400 text-[10px]">
                          {errors.coachingType.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 }}
                      className="space-y-1.5"
                    >
                      <Label
                        htmlFor="budget"
                        className="text-[11px] font-bold uppercase tracking-wider text-gray-400"
                      >
                        Budget
                      </Label>
                      <select
                        id="budget"
                        {...register("budget")}
                        className="w-full bg-zinc-800 text-white rounded-md px-3 h-10 text-xs border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 transition duration-300 appearance-none"
                      >
                        <option value="">Select range</option>
                        <option value="$0 - $500">$0 - $500</option>
                        <option value="$500 - $1,000">$500 - $1,000</option>
                        <option value="$1,000 - $2,000">$1,000 - $2,000</option>
                        <option value="$2,000 - $3,000">$2,000 - $3,000</option>
                        <option value="$3,000+">$3,000+</option>
                      </select>
                      {errors.budget && (
                        <p className="text-red-400 text-[10px]">
                          {errors.budget.message}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                    className="space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <Label
                        htmlFor="message"
                        className="text-[11px] font-bold uppercase tracking-wider text-gray-400"
                      >
                        Message
                      </Label>
                      <span className="text-[10px] text-gray-500">
                        {charCount}/180
                      </span>
                    </div>
                    <textarea
                      id="message"
                      rows={2}
                      maxLength={180}
                      placeholder="Tell us about your goals..."
                      {...register("message")}
                      onChange={(e) => setCharCount(e.target.value.length)}
                      className="w-full bg-zinc-800 text-white rounded-md px-3 py-2 text-xs border-none placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 resize-none transition duration-300"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-[10px]">
                        {errors.message.message}
                      </p>
                    )}
                  </motion.div>

                  {submitError && (
                    <p className="text-red-400 text-[11px] text-center">
                      Something went wrong. Please try again or email us
                      directly.
                    </p>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 }}
                  >
                    <MovingBorderButton
                      as="button"
                      type="submit"
                      disabled={isSubmitting}
                      borderRadius="2rem"
                      containerClassName="h-12 w-full"
                      className="bg-purple text-white hover:bg-yellow hover:text-black font-bold text-xs tracking-wider flex items-center gap-2 justify-center transition-all duration-300"
                      borderClassName="bg-[radial-gradient(var(--purple)_40%,transparent_60%)]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </MovingBorderButton>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0F0F0F] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-shrink-0">
              <TransparentFooterVideo
                src="/logov.mp4"
                width={150}
                height={50}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-accent text-sm transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </nav>

            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-gray-500 hover:text-accent transition-colors duration-200"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 text-center text-xs text-gray-500">
              <span>
                Copyright © 2026 Akshay Sahu Sports Coaching Services LLC All
                Rights Reserved.
              </span>
              <span className="hidden sm:inline text-gray-700">|</span>
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
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Input, Label } from "@/components/ui/signup-form-elements";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { Send, Flame, ChevronDown } from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import Footer from "@/components/sections/Footer";

/* Time slots offered in the form. The value is what gets sent to the sheet. */
const TIME_SLOTS = [
  "10:00AM-12:00PM",
  "1:00PM-4:00PM",
  "6:00PM-8:00PM",
  "8:00PM-10:00PM",
  "AVAILABLE ANY TIME",
] as const;

/* Today as YYYY-MM-DD in the visitor's local time (not UTC), so the calendar
   never lets someone pick a day that has already passed. */
const getToday = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

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
  preferredDate: z
    .string()
    .min(1, "Please pick a date")
    .refine((v) => v >= getToday(), "Pick today or a later date"),
  preferredTimeSlot: z.string().min(1, "Please select a time slot"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(180, "Maximum 180 characters"),
});

type FormData = z.infer<typeof schema>;

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

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzzKDPITpkkZ9oq9-4-v5rlrjaOhSO0MzAMR6KzeXWabDNHLoX2oaiUrjbd90FKbMs/exec";

export default function ContactFooter() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { preferredDate: "", preferredTimeSlot: "" },
  });

  const dateValue = watch("preferredDate");
  const slotValue = watch("preferredTimeSlot");

  const INTERAKT_API_KEY =
    "alJ0dUltUlFBR1dTNy1RVGZpY1BhSTBocEtPRl9DUHJ3VnJjc3F2WTQxTTo=";

  const onSubmit = async (data: FormData) => {
    setSubmitError(false);
    try {
      // `...data` already includes preferredDate and preferredTimeSlot,
      // which the Apps Script writes to the sheet and forwards to Pabbly.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp: new Date().toISOString(), ...data }),
      });

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
            preferredDate: data.preferredDate,
            preferredTimeSlot: data.preferredTimeSlot,
            message: data.message,
            leadSource: "Website Contact Form",
          },
        }),
      });

      setSubmitted(true);
      reset();
      setCharCount(0);
      window.location.href = "/thank-you";
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(true);
    }
  };

  return (
    <div id="contact">
      <section className="relative bg-[#1A1A1A] overflow-hidden py-20 lg:py-24">
        <BackgroundBeamsWithCollision className="absolute inset-0 z-0">
          <div />
        </BackgroundBeamsWithCollision>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 w-full"
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

          {/* Book now badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mb-4"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full select-none cursor-default">
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              Only few slots remaining - Book now
              <Flame className="w-3.5 h-3.5 animate-pulse" />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
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
                        {errors[field.id as keyof FormData]?.message as string}
                      </p>
                    )}
                  </motion.div>
                ))}

                {/* Coaching type + budget */}
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

                {/* ---- Preferred date + time slot ---- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-1">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="space-y-1.5"
                  >
                    <Label
                      htmlFor="preferredDate"
                      className="text-[11px] font-bold uppercase tracking-wider text-gray-400"
                    >
                      Preferred Date
                    </Label>
                    {/* Native date input: opens the browser's calendar picker.
                        While empty, the browser's own placeholder text is
                        hidden and a consistent "Select a date" hint is shown. */}
                    <div className="relative">
                      <Input
                        id="preferredDate"
                        type="date"
                        min={getToday()}
                        className={`peer block h-10 w-full max-w-full appearance-none text-left text-xs [color-scheme:dark] [&::-webkit-date-and-time-value]:text-left ${
                          dateValue
                            ? "text-white"
                            : "text-transparent focus:text-white"
                        }`}
                        onClick={(e) => {
                          try {
                            e.currentTarget.showPicker?.();
                          } catch {
                            /* picker not supported: native UI still works */
                          }
                        }}
                        {...register("preferredDate")}
                      />
                      {!dateValue && (
                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-xs text-neutral-400 peer-focus:hidden">
                          Select a date
                        </span>
                      )}
                    </div>
                    {errors.preferredDate && (
                      <p className="text-red-400 text-[10px]">
                        {errors.preferredDate.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 }}
                    className="space-y-1.5"
                  >
                    <Label
                      htmlFor="preferredTimeSlot"
                      className="text-[11px] font-bold uppercase tracking-wider text-gray-400"
                    >
                      Time Slot
                    </Label>
                    <div className="relative">
                      <select
                        id="preferredTimeSlot"
                        {...register("preferredTimeSlot")}
                        className={`w-full bg-zinc-800 rounded-md px-3 pr-9 h-10 text-xs border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 transition duration-300 appearance-none ${
                          slotValue ? "text-white" : "text-neutral-400"
                        }`}
                      >
                        <option value="">Select time slot</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
                        aria-hidden="true"
                      />
                    </div>
                    {errors.preferredTimeSlot && (
                      <p className="text-red-400 text-[10px]">
                        {errors.preferredTimeSlot.message}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
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
                    {...register("message", {
                      onChange: (e) => setCharCount(e.target.value.length),
                    })}
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
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 }}
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
      </section>

      {/* Shared footer (same one used on the policy pages, includes policy links) */}
      <Footer />
    </div>
  );
}

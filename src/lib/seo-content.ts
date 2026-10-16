/* Shared content for the standalone SEO landing pages
   (/corrective-exercise-specialist-in-dubai/, /fitness-trainer-in-dubai/,
   /online-personal-trainer-in-dubai/, /online-fitness-coach-in-dubai/,
   /best-personal-trainers-in-dubai/).

   Everything that appears on more than one page lives here so a number or a
   client story only has to be updated once. */

export const SITE_URL = "https://asfhealthandfitness.com";
export const BRAND = "ASF Coaching";

export const WHATSAPP_NUMBER = "971543814174";
export const PHONE_DISPLAY = "+971 54 381 4174";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const APP_STORE_URL =
  "https://apps.apple.com/app/asf-health-and-fitness/id6758930684";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.app.asfhealthfitness";

/* ─── Trust strip ───────────────────────────────────────────────────────────
   Same figures as the homepage Stats section. Keep the two in sync. */
export const TRUST_STATS = [
  { value: "450+", label: "Clients transformed" },
  { value: "10+", label: "Years of experience" },
  { value: "20+", label: "Certified specialists" },
  { value: "Dubai Sports", label: "Council approved" },
];

/* ─── Coaches ───────────────────────────────────────────────────────────────
   COACH PLACEHOLDERS — the coach for each SEO page is still to be assigned.
   Replace each `coachPlaceholder(...)` call in the page files with a real
   profile, e.g.

     {
       name: "Hoyam Ahmed",
       role: "Senior Fitness Coach",
       photo: "/coach-hoyam.webp",
       certifications: ["REPs UAE Level 4", "NASM-CES"],
       specialisation: "Posture, back pain and pre/postnatal training",
       bio: "Two or three sentences about the coach…",
     }

   A profile whose `placeholder` flag is true renders with a dashed outline
   and a neutral avatar so it is easy to spot before going live. */
export type CoachProfile = {
  name: string;
  role: string;
  photo?: string;
  certifications: string[];
  specialisation: string;
  bio: string;
  placeholder?: boolean;
};

export const coachPlaceholder = (role: string): CoachProfile => ({
  name: "Coach name to be confirmed",
  role,
  certifications: ["Certifications to be added"],
  specialisation: "Specialisation to be added",
  bio: "Coach bio to be added: a short introduction covering experience, the clients this coach works with most and their coaching approach.",
  placeholder: true,
});

/* ─── Client results ────────────────────────────────────────────────────────
   Cases already featured on the homepage hero carousel.
   TODO (confirm with client): the quotes and timeframes below are draft copy
   written from the homepage case summaries. Check each one with the client
   (and the client's consent) before the pages go live. */
export type ClientResult = {
  id: string;
  name: string;
  goal: string;
  result: string;
  timeframe: string;
  quote: string;
  image: string;
  imageAlt: string;
  format: "In person" | "Online" | "Hybrid";
};

export const CLIENT_RESULTS: Record<string, ClientResult> = {
  farzan: {
    id: "farzan",
    name: "Farzan",
    goal: "Weight loss",
    result: "Lost 40 kg",
    timeframe: "12 months",
    quote:
      "I had tried every diet going. Having a coach and a nutritionist checking in every day is what finally made the weight come off and stay off.",
    image: "/hero-slides/farzan-40kg-weight-loss.jpg",
    imageAlt:
      "Farzan, a Dubai professional, achieved a 40 kg weight loss transformation with ASF Coaching",
    format: "Hybrid",
  },
  diantha: {
    id: "diantha",
    name: "Diantha",
    goal: "Weight loss with knee pain",
    result: "Lost weight without aggravating her knees",
    timeframe: "16 weeks",
    quote:
      "My knees used to decide what I could do. Now I squat, climb stairs and train four times a week without pain.",
    image: "/hero-slides/diantha-knee-pain.jpg",
    imageAlt:
      "Diantha, a Dubai professional, lost weight without aggravating her knee pain with ASF Coaching",
    format: "In person",
  },
  kiran: {
    id: "kiran",
    name: "Kiran Luthra",
    goal: "Chronic back pain",
    result: "Moving pain-free again",
    timeframe: "12 weeks",
    quote:
      "I came in barely able to sit through a meeting. Step by step my coach rebuilt my core and my confidence, and the back pain is gone.",
    image: "/hero-slides/kiran-back-pain.jpg",
    imageAlt:
      "Kiran Luthra, a Dubai professional, overcame serious back pain and moved pain-free again with ASF Coaching",
    format: "In person",
  },
  esther: {
    id: "esther",
    name: "Esther",
    goal: "Mobility with scoliosis",
    result: "Better mobility and 10 kg lost",
    timeframe: "6 months",
    quote:
      "Every session was built around my spine. I move more freely, I stand taller and I lost 10 kg along the way.",
    image: "/hero-slides/esther-scoliosis-mobility.jpg",
    imageAlt:
      "Esther, a Dubai teenager, improved her mobility while managing scoliosis and lost 10 kg with ASF Coaching",
    format: "In person",
  },
  sharda: {
    id: "sharda",
    name: "Sharda Gulani",
    goal: "Postpartum strength",
    result: "Regained her strength after pregnancy",
    timeframe: "5 months",
    quote:
      "Training online from home meant I never had to choose between my baby and my health. I feel stronger now than before pregnancy.",
    image: "/hero-slides/sharda-postpartum-strength.jpg",
    imageAlt:
      "Sharda Gulani, a new mom, regained her strength after pregnancy with ASF Coaching",
    format: "Online",
  },
  satish: {
    id: "satish",
    name: "Satish",
    goal: "Shoulder mobility",
    result: "Regained shoulder strength and range",
    timeframe: "10 weeks",
    quote:
      "I could not lift my arm overhead without pain. Ten weeks later I am pressing weights again with full range of motion.",
    image: "/hero-slides/satish-shoulder-mobility.jpg",
    imageAlt:
      "Satish, a Dubai professional, regained shoulder strength and mobility with ASF Coaching",
    format: "In person",
  },
  bethya: {
    id: "bethya",
    name: "Bethya",
    goal: "Strength for motherhood",
    result: "Built a stronger foundation for motherhood",
    timeframe: "4 months",
    quote:
      "The live online sessions fitted around nap times, and the daily check-ins kept me honest even on the hardest weeks.",
    image: "/hero-slides/bethya-motherhood.jpg",
    imageAlt:
      "Bethya, a Dubai mom, built a stronger foundation for motherhood with ASF Coaching",
    format: "Online",
  },
};

/* Video testimonials already used on the homepage. */
export const VIDEO_TESTIMONIALS = {
  farzan: {
    title: "Farzan's 40 kg weight loss story",
    src: "/testimonial videos/Farzan 26-5.mp4",
    poster: "/testimonial-video-posters/Farzan 26-5_frame-001.jpg",
  },
  kiran: {
    title: "Kiran on overcoming back pain",
    src: "/testimonial videos/kiran 15-5.mp4",
    poster: "/testimonial-video-posters/kiran 15-5_frame-001.jpg",
  },
  satish: {
    title: "Satish on regaining shoulder mobility",
    src: "/testimonial videos/Satish 25-5.mp4",
    poster: "/testimonial-video-posters/Satish 25-5_frame-001.jpg",
  },
  backPain: {
    title: "A client on beating chronic back pain",
    src: "/testimonial videos/Chronic back pain 16-5.mp4",
    poster: "/testimonial-video-posters/Chronic back pain 16-5_frame-001.jpg",
  },
  zenobia: {
    title: "Zenobia on training with ASF",
    src: "/testimonial videos/Zenobia 24-5.mp4",
    poster: "/testimonial-video-posters/Zenobia 24-5_frame-001.jpg",
  },
  workouts: {
    title: "Why workouts finally make sense",
    src: "/testimonial videos/workouts finally make sense 16-3.mp4",
    poster:
      "/testimonial-video-posters/workouts finally make sense 16-3_frame-001.jpg",
  },
};

/* ─── Where we train ────────────────────────────────────────────────────────
   Partner gym locations match the homepage map. */
export const PARTNER_GYM_AREAS = [
  "Bur Dubai",
  "Jumeirah 1",
  "Garhoud",
  "Mirdif",
  "Warsan",
  "Al Quoz",
  "Barsha Heights",
  "Dubai Production City",
  "Dubai Investment Park",
  "Al Qusais",
  "Al Nahda",
];

/* TODO (confirm with client): areas where coaches travel for home and
   office sessions. */
export const HOME_TRAINING_AREAS = [
  "Dubai Marina",
  "JLT",
  "JBR",
  "Palm Jumeirah",
  "Downtown Dubai",
  "Business Bay",
  "DIFC",
  "Jumeirah",
  "Umm Suqeim",
  "Al Barsha",
  "Arabian Ranches",
  "Dubai Hills",
  "JVC",
  "Motor City",
  "Mirdif",
  "Deira",
];

export const HQ_ADDRESS = "Fonds Building, Sheikh Zayed Road, Office 2, Dubai";

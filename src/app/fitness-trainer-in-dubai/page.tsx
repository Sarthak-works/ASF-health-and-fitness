import type { Metadata } from "next";
import {
  Apple,
  Baby,
  Building2,
  Dumbbell,
  Flame,
  HeartHandshake,
  Home,
  LineChart,
  MessageCircle,
  ShieldCheck,
  Trophy,
  Users,
  Laptop,
  Waves,
} from "lucide-react";
import {
  AreasCovered,
  CardGrid,
  Checklist,
  CoachGrid,
  Faq,
  InlineCta,
  ResultsGrid,
  Section,
  SeoHero,
  SeoPageShell,
  Steps,
  TrustStrip,
  VideoTestimonial,
  buildJsonLd,
  type FaqItem,
} from "@/components/seo/SeoBlocks";
import {
  CLIENT_RESULTS,
  HOME_TRAINING_AREAS,
  PARTNER_GYM_AREAS,
  SITE_URL,
  VIDEO_TESTIMONIALS,
  coachPlaceholder,
} from "@/lib/seo-content";

const PATH = "/fitness-trainer-in-dubai/";
const TITLE = "Fitness Trainer in Dubai";
const DESCRIPTION =
  "Certified fitness trainers in Dubai for weight loss, strength, mobility and pain-free training. 1:1 sessions at home, in the gym or online, with nutrition and daily check-ins. Book a free assessment.";
const WHATSAPP_MESSAGE =
  "Hi ASF Coaching! I'm looking for a fitness trainer in Dubai and would like a free assessment.";

export const metadata: Metadata = {
  title: "Fitness Trainer in Dubai | Certified Personal Trainers | ASF",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: "Fitness Trainer in Dubai | ASF Coaching",
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    locale: "en_AE",
    images: [{ url: `${SITE_URL}/asfTeam-highres.jpg` }],
  },
};

const FAQS: FaqItem[] = [
  {
    question: "How do I choose the right fitness trainer in Dubai?",
    answer:
      "Check three things: a recognised certification (and REPs UAE registration), real experience with your specific goal, and a clear system for tracking your progress. A good trainer will also assess you before writing a programme and will happily explain why each exercise is in it.",
  },
  {
    question: "Will my fitness trainer come to my home?",
    answer:
      "Yes. ASF trainers coach at your home, in your building gym, at one of our partner gyms or at your office across Dubai. For home sessions your trainer brings the equipment needed.",
  },
  {
    question: "How many personal training sessions a week do I need?",
    answer:
      "Most clients get the best results from two to four coached sessions a week. Your trainer adds short independent workouts and daily habit targets so you keep progressing between sessions.",
  },
  {
    question: "Is nutrition included with personal training?",
    answer:
      "Every ASF programme includes nutrition guidance from your coach. For more support you can add a personalised meal plan and daily food reviews from our clinical nutritionist.",
  },
  {
    question: "Do you have female fitness trainers in Dubai?",
    answer:
      "Yes. Female trainers are available for in-person and online sessions. Let us know your preference when you book your free assessment and we will match you accordingly.",
  },
  {
    question: "I have never trained before. Is personal training right for me?",
    answer:
      "Yes. Beginners benefit the most from a personal trainer because you learn correct technique from day one, start at the right level and avoid the injuries and frustration that come from guessing.",
  },
  {
    question: "Can I train with a fitness trainer if I have back or knee pain?",
    answer:
      "In most cases, yes. Your trainer screens your movement first and builds a pain-aware programme. If you have severe, worsening or unexplained pain, please see a doctor or physiotherapist before you start.",
  },
  {
    question: "How much does a fitness trainer cost in Dubai?",
    answer:
      "Cost depends on how many sessions you book per week, the coach level, the training location and whether you add nutrition coaching. Longer packages lower the cost per session. Your first assessment is free and you get a clear quote before you commit.",
  },
];

export default function FitnessTrainerDubaiPage() {
  return (
    <SeoPageShell
      jsonLd={buildJsonLd({
        path: PATH,
        name: TITLE,
        description: DESCRIPTION,
        serviceType: "Personal training",
        faqs: FAQS,
      })}
    >
      <SeoHero
        title={TITLE}
        subline="Personal training built around your goals and your schedule. Train 1:1 with a certified ASF coach at home, in the gym or online, with nutrition and daily accountability included."
        whatsappMessage={WHATSAPP_MESSAGE}
        image="/asfTeam-highres.jpg"
        imageAlt="The ASF Coaching team of certified fitness trainers in Dubai"
        highlights={[
          "Free fitness assessment and goal-setting call",
          "Sessions 6 AM to 8 PM, Monday to Saturday",
          "Male and female trainers across Dubai",
        ]}
      />
      <TrustStrip />

      <Section
        id="why-asf"
        eyebrow="Why ASF"
        title="Why choose ASF as your fitness trainer in Dubai"
        intro={
          <p>
            Most people do not fail because of the workout. They fail because
            of the 23 hours between workouts. ASF combines expert coaching in
            the session with daily support outside it.
          </p>
        }
      >
        <CardGrid
          items={[
            {
              icon: ShieldCheck,
              title: "Certified, experienced coaches",
              body: "A team of 20+ certified specialists with over ten years of coaching in Dubai, approved by the Dubai Sports Council.",
            },
            {
              icon: LineChart,
              title: "A plan built on your assessment",
              body: "No templates. Your programme is written from your movement screen, body composition, lifestyle and goal.",
            },
            {
              icon: MessageCircle,
              title: "Daily check-ins",
              body: "Log meals, steps and workouts in the ASF app and get feedback from your coach within hours, every day.",
            },
            {
              icon: Apple,
              title: "Nutrition included",
              body: "Practical nutrition coaching for real Dubai life, with the option of a clinical nutritionist for meal plans.",
            },
            {
              icon: HeartHandshake,
              title: "Pain-aware training",
              body: "Back, knee or shoulder issues? We train around them and strengthen them, using corrective exercise where needed.",
            },
            {
              icon: Home,
              title: "We come to you",
              body: "Home, building gym, partner gym, office or online. Train where you are most likely to stay consistent.",
            },
          ]}
        />
      </Section>

      <Section
        id="training-formats"
        eyebrow="Formats"
        title="Personal training formats"
        intro={
          <p>
            Pick the format that suits your goal, budget and diary. You can
            switch formats at any time, for example online while you travel
            and in person when you are back in Dubai.
          </p>
        }
        tone="gray"
      >
        <CardGrid
          columns={4}
          items={[
            {
              icon: Dumbbell,
              title: "1:1 personal training",
              body: "Private sessions with your own coach for the fastest, most personalised results.",
              meta: "Best for most goals",
            },
            {
              icon: Users,
              title: "Couple or semi-private",
              body: "Train with your partner, friend or family member and share the cost while keeping a personal plan.",
              meta: "2–3 people",
            },
            {
              icon: Laptop,
              title: "Online personal training",
              body: "Live 1:1 video sessions with a certified coach, from home, a hotel or anywhere in the world.",
              meta: "Train from anywhere",
            },
            {
              icon: Building2,
              title: "Corporate and C-suite",
              body: "Executive coaching and office sessions designed around board meetings, travel and long working days.",
              meta: "For busy leaders and teams",
            },
          ]}
        />
      </Section>

      <Section
        id="services-by-goal"
        eyebrow="Your goal"
        title="Fitness training services by goal"
      >
        <CardGrid
          items={[
            {
              icon: Flame,
              title: "Weight loss and fat loss",
              body: "Strength training, daily steps and a sustainable calorie plan, so you lose fat and keep muscle.",
            },
            {
              icon: Dumbbell,
              title: "Strength and muscle gain",
              body: "Progressive overload programmes with technique coaching on the big lifts and a protein-focused nutrition plan.",
            },
            {
              icon: Waves,
              title: "Mobility and pain relief",
              body: "Corrective exercise for posture, back, neck, knee and shoulder pain, then strength on top.",
            },
            {
              icon: Baby,
              title: "Pre and postnatal fitness",
              body: "Safe training during and after pregnancy to rebuild core strength, posture and energy.",
            },
            {
              icon: Trophy,
              title: "Sports performance",
              body: "Speed, power and conditioning for runners, footballers, padel players and weekend athletes.",
            },
            {
              icon: HeartHandshake,
              title: "Healthy ageing",
              body: "Balance, bone density and everyday strength for adults over 50 who want to stay active and independent.",
            },
          ]}
        />
      </Section>

      <Section
        id="how-it-works"
        eyebrow="How it works"
        title="How personal training with ASF works"
        tone="purple"
      >
        <Steps
          steps={[
            {
              title: "Free assessment",
              body: "We review your goals, health history, posture and movement, and measure your starting point.",
            },
            {
              title: "Goal and plan",
              body: "Your coach sets a realistic target and timeline and builds your training and nutrition plan.",
            },
            {
              title: "First session",
              body: "Learn the key movements with hands-on technique coaching at a pace that suits you.",
            },
            {
              title: "Daily check-ins",
              body: "Track meals, steps and workouts in the ASF app and get same-day feedback from your coach.",
            },
            {
              title: "Monthly review",
              body: "Every month we re-measure, review progress photos and adjust your plan for the next block.",
            },
          ]}
        />
      </Section>

      <Section
        id="trainers"
        eyebrow="Our coaches"
        title="Meet our fitness trainers"
        intro={
          <p>
            Every ASF coach is certified, experienced and trained in our
            assessment and accountability system. Choose a male or female
            trainer, or let us match you based on your goal.
          </p>
        }
      >
        <CoachGrid
          coaches={[
            coachPlaceholder("Senior Fitness Coach"),
            coachPlaceholder("Strength Coach"),
            coachPlaceholder("Performance Coach"),
          ]}
        />
      </Section>

      <Section
        id="results"
        eyebrow="Real results"
        title="Real results from ASF clients in Dubai"
        intro={
          <p>
            Different goals, different starting points, the same system:
            expert coaching, a clear plan and daily accountability.
          </p>
        }
        tone="gray"
      >
        <ResultsGrid
          results={[
            CLIENT_RESULTS.farzan,
            CLIENT_RESULTS.diantha,
            CLIENT_RESULTS.esther,
          ]}
        />
        <VideoTestimonial
          video={VIDEO_TESTIMONIALS.farzan}
          heading="How Farzan lost 40 kg with ASF"
          body="Farzan had tried diets and gym memberships before. Hear what was different this time: a coach who planned every session, a nutritionist who reviewed every meal and a team that checked in every single day."
        />
      </Section>

      <Section
        id="areas"
        eyebrow="Locations"
        title="Areas we cover in Dubai"
        intro={
          <p>
            ASF fitness trainers coach clients across Dubai and the Sharjah
            border. Train at home, in your building gym, at a partner gym or at
            your office.
          </p>
        }
      >
        <AreasCovered
          formats={[
            {
              title: "Home and building gyms",
              body: "Your trainer comes to you with the equipment needed. No commute, no crowds.",
            },
            {
              title: "Partner gyms",
              body: "Fully equipped partner facilities across Dubai for clients who prefer a gym setting.",
            },
            {
              title: "Office and outdoor",
              body: "Workplace sessions for individuals and teams, and outdoor training in the cooler months.",
            },
          ]}
          groups={[
            { title: "Partner gym locations", areas: PARTNER_GYM_AREAS },
            { title: "Home and office sessions", areas: HOME_TRAINING_AREAS },
          ]}
        />
      </Section>

      <Section
        id="pricing"
        eyebrow="Pricing"
        title="Personal trainer pricing in Dubai"
        intro={
          <p>
            Every ASF plan is quoted after your free assessment, so you only
            pay for the support you actually need. These are the factors that
            shape the cost.
          </p>
        }
        tone="gray"
      >
        <Checklist
          items={[
            {
              title: "Sessions per week",
              body: "Two, three or four coached sessions a week. More sessions mean faster progress and a lower cost per session.",
            },
            {
              title: "Coach level",
              body: "Coach, senior coach or specialist (for example corrective exercise or pre and postnatal).",
            },
            {
              title: "Programme length",
              body: "Monthly plans or 3, 6 and 12-month programmes. Longer commitments reduce the price per session.",
            },
            {
              title: "Nutrition add-on",
              body: "Coach-led nutrition guidance is included. A personalised plan from our clinical nutritionist is an optional add-on.",
            },
            {
              title: "Location and format",
              body: "Home, partner gym, office or online. Couple and semi-private sessions split the cost between you.",
            },
            {
              title: "Free assessment",
              body: "Your first assessment is free with no obligation. You get a clear written quote before you commit.",
            },
          ]}
        />
        <InlineCta
          title="Get your personalised quote"
          body="Book a free assessment and we will recommend the right plan for your goal, schedule and budget."
          whatsappMessage={WHATSAPP_MESSAGE}
        />
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Fitness trainer in Dubai FAQs">
        <Faq items={FAQS} />
      </Section>
    </SeoPageShell>
  );
}

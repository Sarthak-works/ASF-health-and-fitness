import type { Metadata } from "next";
import {
  Baby,
  Briefcase,
  CalendarCheck,
  Dumbbell,
  Flame,
  Globe,
  HeartPulse,
  Home,
  Laptop,
  MessageCircle,
  Plane,
  Salad,
  Smartphone,
  Video,
  Waves,
} from "lucide-react";
import {
  AppBadges,
  CardGrid,
  Checklist,
  CoachGrid,
  ComparisonTable,
  Faq,
  InlineCta,
  Prose,
  ResultsGrid,
  ScreenshotRow,
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
  SITE_URL,
  VIDEO_TESTIMONIALS,
  coachPlaceholder,
} from "@/lib/seo-content";

const PATH = "/online-personal-trainer-in-dubai/";
const TITLE = "Online Personal Trainer in Dubai";
const DESCRIPTION =
  "Live 1:1 online personal training with a certified Dubai coach. Custom programmes, video sessions, nutrition tracking and daily check-ins in the ASF app. Book a free online consultation.";
const WHATSAPP_MESSAGE =
  "Hi ASF Coaching! I'd like to book a free online personal training consultation.";

export const metadata: Metadata = {
  title: "Online Personal Trainer in Dubai | Live 1:1 Sessions | ASF",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: "Online Personal Trainer in Dubai | ASF Coaching",
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    locale: "en_AE",
    images: [{ url: `${SITE_URL}/hero-slides/sharda-postpartum-strength.jpg` }],
  },
};

const FAQS: FaqItem[] = [
  {
    question: "How does online personal training work?",
    answer:
      "You book live 1:1 video sessions with your ASF coach, who watches your form, corrects technique in real time and adjusts each workout as you go. Between sessions you follow your programme in the ASF app, log meals and workouts, and get daily feedback from your coach.",
  },
  {
    question: "Is online personal training effective?",
    answer:
      "Yes. With live sessions, a personalised programme and daily accountability, online clients get results comparable to in-person training. The biggest factor in any result is consistency, and online training removes travel time, which makes consistency easier.",
  },
  {
    question: "What equipment do I need for online personal training?",
    answer:
      "A phone, tablet or laptop with a camera, a stable internet connection and enough floor space to lie down and step forward. A mat and a pair of dumbbells or resistance bands help, but your coach can build a complete programme with bodyweight only.",
  },
  {
    question: "Which platform do you use for live online sessions?",
    answer:
      "Live sessions run on a standard video call platform such as Zoom or Google Meet, whichever you prefer. Your programme, nutrition tracking and coach messaging are all inside the ASF app.",
  },
  {
    question: "Can I train online if I travel a lot or live outside Dubai?",
    answer:
      "Yes. Many ASF online clients travel for work or live elsewhere in the UAE, the GCC or further afield. Your coach schedules sessions in your time zone and adapts workouts to hotel gyms or no equipment at all.",
  },
  {
    question: "Is online training safe if I have back or joint pain?",
    answer:
      "For most non-acute aches, yes. Your coach screens your movement over video before the first session and builds a pain-aware plan. If you have severe or worsening pain, or a recent injury, see a doctor or physiotherapist first.",
  },
  {
    question: "Do you offer female online personal trainers?",
    answer:
      "Yes. Female coaches are available for online training, including our pre and postnatal programmes. Tell us your preference when you book.",
  },
  {
    question: "How much does an online personal trainer cost?",
    answer:
      "Online training usually costs less than in-person sessions because there is no travel. Price depends on the number of live sessions per week, programme length and whether you add nutritionist support. Your first consultation is free.",
  },
];

export default function OnlinePersonalTrainerDubaiPage() {
  return (
    <SeoPageShell
      jsonLd={buildJsonLd({
        path: PATH,
        name: TITLE,
        description: DESCRIPTION,
        serviceType: "Online personal training",
        faqs: FAQS,
      })}
    >
      <SeoHero
        title={TITLE}
        subline="Live 1:1 video sessions with a certified ASF coach, from anywhere. Real-time form correction, a programme built for you and daily check-ins in the ASF app."
        primaryLabel="Book Free Online Consultation"
        whatsappMessage={WHATSAPP_MESSAGE}
        image="/hero-slides/sharda-postpartum-strength.jpg"
        imageAlt="Sharda Gulani regained her postpartum strength with ASF online personal training"
        highlights={[
          "Live sessions, not pre-recorded videos",
          "Train at home, at the office or while travelling",
          "Male and female coaches available",
        ]}
      />
      <TrustStrip />

      <Section
        id="how-it-works"
        eyebrow="How it works"
        title="How online personal training works"
        intro={
          <p>
            Online personal training with ASF is the same coaching our Dubai
            clients get in person, delivered over a live video call. Your
            coach sees you, talks to you and corrects you in real time.
          </p>
        }
      >
        <Steps
          steps={[
            {
              title: "Free online consultation",
              body: "A video call to discuss your goal, health history and schedule, plus a quick movement screen on camera.",
            },
            {
              title: "Your custom programme",
              body: "Your coach builds a training and nutrition plan around your space, equipment and time.",
            },
            {
              title: "Live 1:1 sessions",
              body: "Train together on video. Your coach counts reps, corrects form and adjusts the workout as you go.",
            },
            {
              title: "Daily accountability",
              body: "Log workouts, meals and steps in the ASF app. Your coach reviews them and replies the same day.",
            },
          ]}
        />
      </Section>

      <Section
        id="what-you-get"
        eyebrow="What's included"
        title="What you get with an online personal trainer"
        tone="gray"
      >
        <CardGrid
          items={[
            {
              icon: Video,
              title: "Live 1:1 video sessions",
              body: "Two to four coached sessions a week, scheduled at times that work for you.",
            },
            {
              icon: Dumbbell,
              title: "A personalised programme",
              body: "Written for your goal, your equipment and your space, and updated every few weeks.",
            },
            {
              icon: Salad,
              title: "Nutrition guidance",
              body: "Calorie and protein targets, meal ideas and daily food reviews, with a clinical nutritionist add-on.",
            },
            {
              icon: MessageCircle,
              title: "Direct coach messaging",
              body: "Questions answered within hours, not at the next session.",
            },
            {
              icon: CalendarCheck,
              title: "Monthly progress reviews",
              body: "Measurements, progress photos and performance markers reviewed with your coach.",
            },
            {
              icon: Smartphone,
              title: "The ASF app",
              body: "Your workouts, nutrition tracking, habit goals and coach notes in one place.",
            },
          ]}
        />
      </Section>

      <Section
        id="who-its-for"
        eyebrow="Is it for you?"
        title="Who online personal training is for"
      >
        <CardGrid
          items={[
            {
              icon: Briefcase,
              title: "Busy professionals",
              body: "Fit a 45-minute session between meetings without driving across Dubai.",
            },
            {
              icon: Baby,
              title: "Parents and new mums",
              body: "Train at home during nap time with a coach who understands pre and postnatal recovery.",
            },
            {
              icon: Plane,
              title: "Frequent travellers",
              body: "Keep the same coach and programme in any hotel room or time zone.",
            },
            {
              icon: Home,
              title: "People who prefer privacy",
              body: "Build confidence and learn technique at home before stepping into a gym.",
            },
            {
              icon: Globe,
              title: "Clients outside Dubai",
              body: "Live in Abu Dhabi, Sharjah or abroad and still train with a Dubai coach.",
            },
            {
              icon: Laptop,
              title: "Former in-person clients",
              body: "Moving away or travelling for the summer? Switch to online and keep your progress.",
            },
          ]}
        />
      </Section>

      <Section
        id="online-vs-in-person-effectiveness"
        eyebrow="The big question"
        title="Is online personal training as good as in-person?"
        tone="purple"
      >
        <Prose
          paragraphs={[
            "For most goals, yes. Weight loss, strength, mobility and general fitness all respond to the same things: a well-designed programme, good technique, progressive overload and consistency. A live online coach can deliver all four.",
            "Online training often wins on consistency. There is no commute, no traffic on Sheikh Zayed Road and no excuse when the schedule gets busy, so clients miss fewer sessions. Daily check-ins in the ASF app add accountability that a once-a-week gym session cannot match.",
            "In-person training is the better choice if you need hands-on spotting for very heavy lifts, are returning from a recent injury, or simply train best with someone in the room. Many ASF clients combine both: in person when they are in Dubai and online when they travel.",
          ]}
        />
      </Section>

      <Section
        id="what-you-need"
        eyebrow="Getting set up"
        title="What you need to start"
        intro={<p>Getting started takes less than ten minutes.</p>}
      >
        <Checklist
          items={[
            {
              title: "A phone, tablet or laptop with a camera",
              body: "Place it about two metres away so your coach can see your whole body.",
            },
            {
              title: "A stable internet connection",
              body: "Home Wi-Fi or a 4G/5G connection is enough for a smooth video call.",
            },
            {
              title: "A clear space of about 2 x 2 metres",
              body: "Enough room to lie down, lunge and reach overhead.",
            },
            {
              title: "Optional basic equipment",
              body: "A mat, resistance bands and a pair of dumbbells. Your coach can programme bodyweight-only if needed.",
            },
            {
              title: "The ASF app",
              body: "Free to download on iPhone and Android. Your coach sets up your programme before the first session.",
            },
            {
              title: "Water and a towel",
              body: "Sessions are real workouts, so come ready to sweat.",
            },
          ]}
        />
      </Section>

      <Section
        id="programmes"
        eyebrow="Programmes"
        title="Online training programme options"
        intro={
          <p>
            Each programme is personalised, but these are the typical weekly
            schedules our online clients follow.
          </p>
        }
        tone="gray"
      >
        <CardGrid
          items={[
            {
              icon: Flame,
              title: "Online weight loss",
              body: "Fat loss through strength training, daily steps and a sustainable calorie plan.",
              bullets: [
                "3 live sessions a week",
                "Daily food and step check-ins",
                "Weekly weigh-in and monthly measurements",
              ],
            },
            {
              icon: Dumbbell,
              title: "Online strength",
              body: "Build muscle and strength at home or in your building gym.",
              bullets: [
                "3–4 live sessions a week",
                "Progressive overload plan",
                "Monthly strength testing",
              ],
            },
            {
              icon: Waves,
              title: "Online mobility",
              body: "Ease stiffness and improve posture from desk work and long commutes.",
              bullets: [
                "2 live sessions a week",
                "10-minute daily mobility routine",
                "Posture re-assessment every 4 weeks",
              ],
            },
            {
              icon: Baby,
              title: "Online postpartum",
              body: "Rebuild core and pelvic floor strength safely after pregnancy.",
              bullets: [
                "2–3 live sessions a week",
                "Flexible scheduling around your baby",
                "Female coach available",
              ],
            },
            {
              icon: HeartPulse,
              title: "Pain-aware training",
              body: "Train around back, knee or shoulder pain while strengthening the problem area.",
              bullets: [
                "2–3 live sessions a week",
                "Daily pain and activity log",
                "Gradual return to full training",
              ],
            },
          ]}
        />
      </Section>

      <Section
        id="technology"
        eyebrow="Technology"
        title="Technology and the ASF app"
        intro={
          <p>
            Live sessions run on a standard video call platform such as Zoom
            or Google Meet, whichever you prefer. Everything else lives in the
            ASF app.
          </p>
        }
      >
        <CardGrid
          columns={4}
          items={[
            {
              title: "Your programme",
              body: "Every workout with exercise videos, sets, reps and coach notes.",
            },
            {
              title: "Habit and nutrition tracking",
              body: "Log meals, water, steps and sleep, and see your streaks build.",
            },
            {
              title: "Session notes",
              body: "After each live session your coach shares key technique cues and what to focus on next time.",
            },
            {
              title: "Direct messaging",
              body: "Send a photo of your meal or a video of your form and get feedback the same day.",
            },
          ]}
        />
        <div className="mt-10">
          <ScreenshotRow
            images={[
              {
                src: "/dailyacc1.jpg",
                alt: "ASF nutritionist reviewing a client's daily meal photos",
              },
              {
                src: "/dailyacc2.jpg",
                alt: "ASF coach giving daily feedback to an online client",
              },
              {
                src: "/dailyacc3.jpg",
                alt: "ASF client logging a workout and receiving coach notes",
              },
              {
                src: "/dailyacc4.jpg",
                alt: "Daily accountability check-in between an ASF coach and client",
              },
            ]}
          />
        </div>
        <div className="mt-8">
          <AppBadges />
        </div>
      </Section>

      <Section
        id="trainers"
        eyebrow="Your coaches"
        title="Meet your online trainers"
        intro={
          <p>
            Our online trainers are the same certified coaches who train
            clients in person across Dubai. Male and female coaches are
            available.
          </p>
        }
        tone="gray"
      >
        <CoachGrid
          coaches={[
            coachPlaceholder("Online Personal Trainer"),
            coachPlaceholder("Online Personal Trainer"),
          ]}
        />
      </Section>

      <Section
        id="results"
        eyebrow="Client results"
        title="Online personal training results"
        intro={
          <p>
            Real clients who trained with ASF from home, around family life
            and busy careers.
          </p>
        }
      >
        <ResultsGrid
          results={[
            CLIENT_RESULTS.sharda,
            CLIENT_RESULTS.bethya,
            CLIENT_RESULTS.farzan,
          ]}
        />
        <VideoTestimonial
          video={VIDEO_TESTIMONIALS.zenobia}
          heading="What training with ASF is really like"
          body="Hear from an ASF client about the coaching, the daily check-ins and why this time the results stuck."
        />
      </Section>

      <Section
        id="pricing"
        eyebrow="Pricing"
        title="Online personal training pricing and packages"
        intro={
          <p>
            Online plans are quoted after your free consultation. Because
            there is no travel, online training usually costs less per session
            than in-person training.
          </p>
        }
        tone="gray"
      >
        <CardGrid
          items={[
            {
              title: "Essentials",
              body: "For self-motivated clients who want expert programming and a weekly live check-in.",
              bullets: [
                "1 live session a week",
                "Personalised programme in the app",
                "Weekly coach review",
              ],
              meta: "Price on consultation",
            },
            {
              title: "Coaching",
              body: "Our most popular plan for steady, reliable progress.",
              bullets: [
                "2–3 live sessions a week",
                "Daily check-ins and messaging",
                "Nutrition guidance included",
              ],
              meta: "Most popular",
            },
            {
              title: "Premium",
              body: "Maximum support for big goals and busy schedules.",
              bullets: [
                "4+ live sessions a week",
                "Clinical nutritionist meal plan",
                "Priority scheduling",
              ],
              meta: "Price on consultation",
            },
          ]}
        />
      </Section>

      <Section
        id="online-vs-in-person"
        eyebrow="Compare"
        title="Online vs in-person training"
        intro={
          <p>
            Prefer a trainer at home? ASF offers both, and you can switch at
            any time.
          </p>
        }
      >
        <ComparisonTable
          caption="Comparison of online and in-person personal training"
          columns={["", "Online training", "In-person training"]}
          rows={[
            ["Where", "Anywhere with a camera and internet", "Your home, a partner gym or your office in Dubai"],
            ["Best for", "Busy schedules, travellers, privacy, clients outside Dubai", "Heavy lifting, hands-on cues, clients who train best with someone in the room"],
            ["Equipment", "Bodyweight, bands or dumbbells", "Your coach brings equipment, or full gym access"],
            ["Cost", "Usually lower per session", "Includes coach travel to you"],
            ["Accountability", "Daily check-ins in the ASF app", "Daily check-ins in the ASF app"],
          ]}
        />
        <InlineCta
          title="Not sure which one suits you?"
          body="Book a free online consultation and your coach will recommend the right format for your goal."
          primaryLabel="Book Free Online Consultation"
          whatsappMessage={WHATSAPP_MESSAGE}
        />
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Online personal trainer FAQs"
        tone="gray"
      >
        <Faq items={FAQS} />
      </Section>
    </SeoPageShell>
  );
}

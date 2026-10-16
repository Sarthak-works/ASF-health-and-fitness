import type { Metadata } from "next";
import { Award, LineChart, Target } from "lucide-react";
import {
  CardGrid,
  Checklist,
  CoachGrid,
  ComparisonTable,
  DefinitionBox,
  Faq,
  InlineCta,
  Prose,
  ResultsGrid,
  Section,
  SeoHero,
  SeoPageShell,
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

const PATH = "/best-personal-trainers-in-dubai/";
const TITLE = "Best Personal Trainers in Dubai";
const DESCRIPTION =
  "How to find the best personal trainer in Dubai for your goal, budget and schedule. Compare home, gym, online and specialist training, see typical costs and meet the certified ASF team.";
const WHATSAPP_MESSAGE =
  "Hi ASF Coaching! I'm looking for the right personal trainer in Dubai and would like a free assessment.";

export const metadata: Metadata = {
  title: "Best Personal Trainers in Dubai (2026 Guide) | ASF Coaching",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: "Best Personal Trainers in Dubai | ASF Coaching",
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    locale: "en_AE",
    images: [{ url: `${SITE_URL}/asfTeam-highres.jpg` }],
  },
};

const FAQS: FaqItem[] = [
  {
    question: "Who is the best personal trainer in Dubai?",
    answer:
      "The best personal trainer in Dubai is the one who fits your goal, body, schedule and budget. Look for a recognised certification and REPs UAE registration, proven experience with goals like yours, and a clear way of tracking your progress.",
  },
  {
    question: "How much does a personal trainer cost in Dubai?",
    answer:
      "Personal training in Dubai typically costs from around AED 200 to AED 500 or more per session. Price depends on the trainer's experience and specialisation, the location (home, gym or online), how many sessions you book and whether nutrition coaching is included. Packages usually lower the cost per session.",
  },
  {
    question: "Do personal trainers in Dubai need a licence?",
    answer:
      "Trainers working professionally in Dubai should hold a recognised fitness qualification, and many register with REPs UAE. Ask any trainer for their certifications and registration before you book.",
  },
  {
    question: "Is it better to train at home or in a gym in Dubai?",
    answer:
      "Both work. Home training saves time and offers privacy, while a gym gives access to more equipment. The best option is the one you will stick to. Many people start at home and add gym sessions later.",
  },
  {
    question: "How often should I see a personal trainer?",
    answer:
      "Two to three sessions a week is ideal for most goals. If budget is tight, one session a week plus a structured plan and regular check-ins can still deliver good results.",
  },
  {
    question: "Can I get a female personal trainer in Dubai?",
    answer:
      "Yes. ASF has female personal trainers available for home, gym and online sessions. Mention your preference when you book your free assessment.",
  },
  {
    question: "What should I expect in my first personal training session?",
    answer:
      "A good first session starts with a conversation about your goals and health history, followed by a movement and posture assessment and some baseline measurements. You should leave knowing what your plan is and why.",
  },
  {
    question: "Why choose ASF as your personal trainer in Dubai?",
    answer:
      "ASF has over ten years of experience, 20+ certified specialists, 450+ client transformations and Dubai Sports Council approval. Every client gets an assessment-led plan, nutrition support and daily accountability through the ASF app.",
  },
];

export default function BestPersonalTrainersInDubaiPage() {
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
        subline="Choosing a personal trainer is a big decision. This guide helps you find the right trainer for your goal, budget and schedule, and shows you how ASF coaches measure up."
        whatsappMessage={WHATSAPP_MESSAGE}
        image="/asfTeam-highres.jpg"
        imageAlt="The ASF Coaching team, among the best personal trainers in Dubai"
        highlights={[
          "Compare home, gym, online and specialist training",
          "Typical personal trainer costs in Dubai",
          "6 questions to ask before you hire anyone",
        ]}
      />
      <TrustStrip />

      <Section
        id="who-is-the-best"
        eyebrow="The short answer"
        title="Who is the best personal trainer in Dubai?"
      >
        <DefinitionBox>
          <p>
            The best personal trainer in Dubai is the one who fits{" "}
            <strong>your</strong> goal, body, schedule and budget. A trainer
            who transforms a bodybuilder may be the wrong choice for someone
            with back pain or a new mum. Judge trainers on fit and results,
            not on follower counts.
          </p>
        </DefinitionBox>
        <div className="mt-10">
          <p className="mb-6 text-lg font-bold text-gray-900">
            Check these three things first:
          </p>
          <CardGrid
            items={[
              {
                icon: Award,
                title: "Certification",
                body: "A recognised qualification and REPs UAE registration, plus specialist certificates for your needs, such as corrective exercise or pre and postnatal.",
              },
              {
                icon: Target,
                title: "Specialisation",
                body: "Proven experience with goals like yours. Ask for client stories with a similar starting point.",
              },
              {
                icon: LineChart,
                title: "Progress tracking",
                body: "A clear system for measuring progress, such as assessments, measurements, strength tests and regular reviews.",
              },
            ]}
          />
        </div>
      </Section>

      <Section
        id="types-of-personal-training"
        eyebrow="Compare"
        title="Types of personal training in Dubai"
        intro={
          <p>
            Dubai offers more training options than almost any city. Here is
            how the main formats compare.
          </p>
        }
        tone="gray"
      >
        <ComparisonTable
          caption="Types of personal training in Dubai compared"
          columns={["Type", "Best for", "Format", "What to ask"]}
          rows={[
            [
              "Home personal training",
              "Busy professionals, parents, people who value privacy",
              "Trainer comes to your villa, apartment or building gym with portable equipment",
              "Which areas do you cover? What equipment do you bring? Is travel included in the price?",
            ],
            [
              "Gym personal training",
              "Strength, muscle gain and clients who enjoy a gym atmosphere",
              "Sessions at a commercial or partner gym with full equipment",
              "Do I need a separate gym membership? Can I train at a gym near my home or office?",
            ],
            [
              "Online personal training",
              "Travellers, clients outside Dubai, tight schedules",
              "Live 1:1 video sessions plus an app for programmes and check-ins",
              "Are sessions live or pre-recorded? How often do you check in between sessions?",
            ],
            [
              "Specialist training",
              "Back, knee or shoulder pain, posture, pre and postnatal, seniors",
              "1:1 sessions with a corrective exercise or condition-specific specialist",
              "What specialist certification do you hold? Will you work with my doctor or physio?",
            ],
          ]}
        />
      </Section>

      <Section
        id="cost"
        eyebrow="Pricing"
        title="How much does a personal trainer cost in Dubai?"
      >
        <Prose
          paragraphs={[
            "Personal training in Dubai typically costs from around AED 200 to AED 500 or more per session. Newer trainers and group or online formats sit at the lower end, while highly experienced specialists, home visits in premium areas and VIP or C-suite coaching sit at the top.",
            "Four things drive the price: the trainer's experience and specialisation, the location (home, gym or online), how many sessions you buy and whether nutrition coaching is included. Packages of 12, 24 or 36 sessions almost always reduce the price per session.",
            "Watch for hidden costs. Some gym trainers require a separate membership, and some home trainers charge extra for travel or equipment. Ask for a full written quote before you commit.",
            "ASF plans are quoted after a free assessment, so you only pay for the level of support you actually need.",
          ]}
        />
      </Section>

      <Section
        id="questions-to-ask"
        eyebrow="Checklist"
        title="Questions to ask before hiring a personal trainer"
        intro={
          <p>
            Use these six questions with any trainer in Dubai. A good trainer
            will be happy to answer all of them.
          </p>
        }
        tone="purple"
      >
        <Checklist
          numbered
          items={[
            { title: "What certifications do you hold, and are you registered with REPs UAE?" },
            { title: "Have you worked with clients who had a goal like mine? Can I see their results?" },
            { title: "How will you assess me before writing my programme?" },
            { title: "How will we track my progress, and how often will we review it?" },
            { title: "What support do I get between sessions, such as nutrition and check-ins?" },
            { title: "What is the total cost, and what is your cancellation and pause policy?" },
          ]}
        />
      </Section>

      <Section
        id="asf-trainers"
        eyebrow="Our team"
        title="Meet the ASF trainers"
        intro={
          <p>
            Our team includes senior coaches, strength and performance
            coaches, a corporate wellness coach, a clinical nutritionist and a
            psychologist. Every coach is certified and trained in the ASF
            assessment and accountability system.
          </p>
        }
      >
        <CoachGrid
          coaches={[
            coachPlaceholder("Senior Fitness Coach"),
            coachPlaceholder("Strength Coach"),
            coachPlaceholder("Performance Coach"),
            coachPlaceholder("Corporate Wellness Coach"),
            coachPlaceholder("Clinical Nutritionist"),
            coachPlaceholder("Psychologist"),
          ]}
        />
      </Section>

      <Section
        id="results"
        eyebrow="Reviews"
        title="Client results and reviews"
        intro={
          <p>
            The best way to judge a trainer is by the people they have already
            helped. Here are a few of our 450+ client transformations.
          </p>
        }
        tone="gray"
      >
        <ResultsGrid
          results={[
            CLIENT_RESULTS.farzan,
            CLIENT_RESULTS.kiran,
            CLIENT_RESULTS.sharda,
          ]}
        />
        <VideoTestimonial
          video={VIDEO_TESTIMONIALS.satish}
          heading="Satish on getting his shoulder back"
          body="After months of shoulder pain, Satish rebuilt his strength and range of motion with an ASF coach. Hear what made the difference."
        />
        <InlineCta
          title="Find the right trainer for you"
          body="Book a free assessment and we will match you with the ASF coach who best fits your goal, schedule and budget."
          whatsappMessage={WHATSAPP_MESSAGE}
        />
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Personal trainers in Dubai: FAQs"
      >
        <Faq items={FAQS} />
      </Section>
    </SeoPageShell>
  );
}

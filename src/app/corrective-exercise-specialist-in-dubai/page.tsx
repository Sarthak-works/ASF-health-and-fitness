import type { Metadata } from "next";
import {
  Armchair,
  Activity,
  Bone,
  Footprints,
  HeartPulse,
  PersonStanding,
} from "lucide-react";
import {
  AreasCovered,
  CardGrid,
  CoachGrid,
  ComparisonTable,
  DefinitionBox,
  Faq,
  InlineCta,
  Notice,
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

const PATH = "/corrective-exercise-specialist-in-dubai/";
const TITLE = "Corrective Exercise Specialist in Dubai";
const DESCRIPTION =
  "Work 1:1 with a certified corrective exercise specialist in Dubai. Fix posture, ease back, neck and knee pain and move better with a free movement assessment from ASF Coaching.";
const WHATSAPP_MESSAGE =
  "Hi ASF Coaching! I'd like to book a free corrective exercise assessment.";

export const metadata: Metadata = {
  title: "Corrective Exercise Specialist in Dubai | ASF Coaching",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: "Corrective Exercise Specialist in Dubai | ASF Coaching",
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    locale: "en_AE",
    images: [{ url: `${SITE_URL}/hero-slides/kiran-back-pain.jpg` }],
  },
};

const FAQS: FaqItem[] = [
  {
    question: "What does a corrective exercise specialist do?",
    answer:
      "A corrective exercise specialist assesses how you stand, move and load your joints, finds the muscle imbalances and movement patterns behind pain or poor posture, and then coaches you through a progressive exercise plan to correct them. The goal is to help you move well and without pain, then build strength on top of that foundation.",
  },
  {
    question: "Is corrective exercise the same as physiotherapy?",
    answer:
      "No. Physiotherapists are licensed healthcare professionals who diagnose and treat injuries and medical conditions. Corrective exercise specialists are certified fitness professionals who work with non-acute movement problems such as posture, stiffness and recurring aches. Many ASF clients come to us after finishing physiotherapy, to rebuild strength and stop the problem coming back.",
  },
  {
    question: "Do I need a doctor's referral to start?",
    answer:
      "You do not need a referral for posture or general aches and stiffness. If you have sharp or worsening pain, numbness, pins and needles, a recent injury or surgery, or a diagnosed condition, please see a doctor or physiotherapist first. With your permission, we are happy to work alongside your medical team.",
  },
  {
    question: "How long does it take to see results from corrective exercise?",
    answer:
      "Most clients notice they move more easily and feel less stiff within three to four weeks. Lasting changes to posture and movement patterns usually take eight to twelve weeks of consistent training, depending on how long the problem has been there and how often you train.",
  },
  {
    question: "How many sessions per week do I need?",
    answer:
      "Two to three coached sessions a week works best for most people, plus a short daily home routine of ten to fifteen minutes. Your coach sets the routine during your assessment and checks in with you every day through the ASF app.",
  },
  {
    question: "Can corrective exercise help with lower back pain?",
    answer:
      "For many people, yes. Non-specific lower back pain is often linked to weak glutes and core, stiff hips and long hours sitting. A corrective programme targets those causes. If your back pain is severe, getting worse or comes with leg symptoms, see a doctor first.",
  },
  {
    question: "Where do corrective exercise sessions take place?",
    answer:
      "At your home, at one of our partner gyms across Dubai, or at your office. Your coach brings the equipment needed for home and office sessions.",
  },
  {
    question: "How much does corrective exercise training cost in Dubai?",
    answer:
      "The cost depends on how many sessions you book each week, the length of your programme and whether you add nutrition coaching. Your first movement assessment is free, and you will receive a clear quote before you commit to anything.",
  },
];

export default function CorrectiveExerciseSpecialistPage() {
  return (
    <SeoPageShell
      jsonLd={buildJsonLd({
        path: PATH,
        name: TITLE,
        description: DESCRIPTION,
        serviceType: "Corrective exercise training",
        faqs: FAQS,
      })}
    >
      <SeoHero
        title={TITLE}
        subline="Fix posture, ease recurring aches and move without pain. A certified ASF specialist finds the cause of the problem, not just the symptom, and coaches you 1:1 at home, in the gym or at your office."
        whatsappMessage={WHATSAPP_MESSAGE}
        image="/hero-slides/kiran-back-pain.jpg"
        imageAlt="Kiran Luthra moved pain-free again after corrective exercise training with ASF Coaching in Dubai"
        highlights={[
          "Free 45-minute posture and movement assessment",
          "1:1 sessions with a certified specialist",
          "Daily check-ins between sessions",
        ]}
      />
      <TrustStrip />

      <Section
        id="what-is-corrective-exercise"
        eyebrow="The basics"
        title="What is corrective exercise?"
      >
        <DefinitionBox>
          <p>
            <strong>Corrective exercise</strong> is a structured training
            method that identifies muscle imbalances, poor posture and faulty
            movement patterns, then fixes them with targeted mobility,
            activation and strengthening exercises. It helps you move with
            less pain and lowers your risk of injury, so you can train, work
            and live more comfortably.
          </p>
        </DefinitionBox>
        <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
          <p>
            Every session follows a simple sequence: release overactive
            muscles, lengthen tight areas, wake up muscles that have switched
            off, and then train the whole movement so the new pattern sticks.
            Because the work is built on your own assessment, two people with
            &ldquo;back pain&rdquo; can end up with very different programmes.
          </p>
        </div>
      </Section>

      <Section
        id="who-needs-corrective-exercise"
        eyebrow="Is it for you?"
        title="Who needs a corrective exercise specialist?"
        intro={
          <p>
            Corrective exercise is for anyone whose body is holding them back.
            In Dubai we see the same patterns again and again: long hours at a
            desk, long commutes, hard gym sessions with no mobility work and
            old injuries that were never fully rehabilitated.
          </p>
        }
        tone="gray"
      >
        <CardGrid
          items={[
            {
              icon: Armchair,
              title: "Desk workers with poor posture",
              body: "Rounded shoulders, forward head posture, tight hips and a stiff upper back from eight or more hours at a laptop.",
            },
            {
              icon: Bone,
              title: "People with recurring aches",
              body: "Non-acute lower back, neck, shoulder or knee pain that keeps returning, even after rest or massage.",
            },
            {
              icon: Activity,
              title: "Clients after physiotherapy",
              body: "You have been discharged from physio and need a safe, progressive plan to rebuild strength and keep the problem away.",
            },
            {
              icon: Footprints,
              title: "Runners and gym-goers",
              body: "Knees that cave in, hips that pinch in a squat or shoulders that click when you press. Fix the pattern before it becomes an injury.",
            },
            {
              icon: HeartPulse,
              title: "Pre and postnatal women",
              body: "Rebuild core and pelvic floor strength, ease back pain and restore posture safely after pregnancy.",
            },
            {
              icon: PersonStanding,
              title: "Adults over 50",
              body: "Improve balance, joint mobility and everyday strength so you stay independent and active for longer.",
            },
          ]}
        />
      </Section>

      <Section
        id="corrective-exercise-vs-physiotherapy"
        eyebrow="Know your options"
        title="Corrective exercise vs physiotherapy vs personal training"
        intro={
          <p>
            All three can help you move better, but they are not the same
            thing. Use this table to decide which one you need right now.
          </p>
        }
      >
        <ComparisonTable
          caption="Comparison of corrective exercise, physiotherapy and personal training"
          columns={["", "Corrective exercise", "Physiotherapy", "Personal training"]}
          rows={[
            [
              "Focus",
              "Fixing posture, muscle imbalances and movement patterns behind non-acute aches",
              "Diagnosing and treating injuries, pain and medical conditions",
              "Building fitness, strength, fat loss or muscle gain",
            ],
            [
              "Who does it",
              "Certified corrective exercise specialist",
              "Licensed physiotherapist (DHA-licensed in Dubai)",
              "Certified personal trainer",
            ],
            [
              "When to choose it",
              "Stiffness, poor posture or recurring aches with no acute injury, or after physio discharge",
              "Acute injury, post-surgery rehab, severe or worsening pain, or any diagnosed condition",
              "You move well and pain-free and want to reach a fitness goal",
            ],
          ]}
        />
        <Notice>
          <strong>Corrective exercise is not medical treatment.</strong> See a
          doctor or physiotherapist first if you have sharp, severe or
          worsening pain, numbness or tingling, a recent injury or surgery, or
          a diagnosed medical condition. Once you are cleared to exercise, an
          ASF specialist can take over and work alongside your medical team.
        </Notice>
      </Section>

      <Section
        id="process"
        eyebrow="How it works"
        title="How the ASF corrective exercise process works"
        tone="purple"
      >
        <Steps
          steps={[
            {
              title: "Free movement assessment",
              body: "A 45-minute screen of your posture, joint mobility, balance and key movements such as the squat, lunge and overhead reach, plus a chat about your pain history and lifestyle.",
            },
            {
              title: "Your corrective plan",
              body: "Your specialist explains what they found in plain language and builds a phased plan with clear goals, session frequency and a short daily home routine.",
            },
            {
              title: "Coached 1:1 sessions",
              body: "Release, lengthen, activate and strengthen. Each session is adjusted to how your body feels that day, so you never train through pain.",
            },
            {
              title: "Daily check-ins",
              body: "Log your home routine, steps and pain levels in the ASF app. Your coach replies within hours and tweaks the plan as you improve.",
            },
            {
              title: "Re-assess and progress",
              body: "Every four weeks we repeat the assessment, compare results and move you from correction to full strength training.",
            },
          ]}
        />
      </Section>

      <Section
        id="your-specialist"
        eyebrow="Your coach"
        title="Your corrective exercise specialist"
        intro={
          <p>
            Every ASF corrective exercise client is matched with a certified
            specialist who stays with them from the first assessment to the
            final review. Male and female specialists are available.
          </p>
        }
      >
        <CoachGrid
          coaches={[
            coachPlaceholder("Corrective Exercise Specialist"),
            coachPlaceholder("Corrective Exercise Specialist"),
          ]}
        />
      </Section>

      <Section
        id="results"
        eyebrow="Client results"
        title="Corrective exercise results from real ASF clients"
        intro={
          <p>
            These Dubai residents came to us with pain that was limiting their
            work, training and family life. Here is what changed.
          </p>
        }
        tone="gray"
      >
        <ResultsGrid
          results={[
            CLIENT_RESULTS.kiran,
            CLIENT_RESULTS.diantha,
            CLIENT_RESULTS.satish,
          ]}
        />
        <VideoTestimonial
          video={VIDEO_TESTIMONIALS.backPain}
          heading="From chronic back pain to training with confidence"
          body="Hear how one ASF client went from avoiding everyday movements to training pain-free, with a corrective plan built around a full movement assessment and daily coach support."
        />
      </Section>

      <Section
        id="where-we-train"
        eyebrow="Where we train"
        title="Corrective exercise at home, in the gym or at your office"
        intro={
          <p>
            Choose the setting that makes it easiest to stay consistent. Your
            specialist brings the equipment you need for home and office
            sessions.
          </p>
        }
      >
        <AreasCovered
          formats={[
            {
              title: "At home",
              body: "Private sessions in your living room, building gym or garden. Ideal if pain makes travelling or busy gyms uncomfortable.",
            },
            {
              title: "In a partner gym",
              body: "Train in one of our partner facilities across Dubai with full access to cables, machines and free weights.",
            },
            {
              title: "At the office",
              body: "Short posture and mobility sessions at your workplace, for individuals or teams who spend the day at a desk.",
            },
          ]}
          groups={[
            { title: "Partner gym locations", areas: PARTNER_GYM_AREAS },
            { title: "Home and office sessions", areas: HOME_TRAINING_AREAS },
          ]}
        />
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Corrective exercise FAQs"
        tone="gray"
      >
        <Faq items={FAQS} />
        <InlineCta
          title="Not sure where your pain is coming from?"
          body="Start with a free movement assessment. You will leave with a clear explanation and a plan, whether or not you train with us."
          whatsappMessage={WHATSAPP_MESSAGE}
        />
      </Section>
    </SeoPageShell>
  );
}

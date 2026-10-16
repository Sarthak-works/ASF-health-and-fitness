import type { Metadata } from "next";
import {
  Brain,
  Briefcase,
  Camera,
  ClipboardList,
  Dumbbell,
  Flame,
  MessageCircle,
  Repeat,
  Salad,
  Smartphone,
  Users,
  Baby,
} from "lucide-react";
import {
  AppBadges,
  CardGrid,
  Checklist,
  CoachGrid,
  DefinitionBox,
  Faq,
  InlineCta,
  ResultsGrid,
  ScreenshotRow,
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

const PATH = "/online-fitness-coach-in-dubai/";
const TITLE = "Online Fitness Coach in Dubai";
const DESCRIPTION =
  "Online fitness coaching in Dubai that combines a training programme, clinical nutrition and daily accountability in one plan. Track everything in the ASF app. Book a free assessment.";
const WHATSAPP_MESSAGE =
  "Hi ASF Coaching! I'm interested in online fitness coaching and would like a free assessment.";

export const metadata: Metadata = {
  title: "Online Fitness Coach in Dubai | Training, Nutrition & Accountability",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: "Online Fitness Coach in Dubai | ASF Coaching",
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    locale: "en_AE",
    images: [{ url: `${SITE_URL}/hero-slides/farzan-40kg-weight-loss.jpg` }],
  },
};

const FAQS: FaqItem[] = [
  {
    question: "What is the difference between an online fitness coach and an online personal trainer?",
    answer:
      "An online personal trainer focuses mainly on live workout sessions. An online fitness coach manages your whole plan: training programme, nutrition, sleep, stress and daily habits, with frequent check-ins between workouts. ASF online coaching can include live sessions, but the core is daily accountability across all areas.",
  },
  {
    question: "How often will my online coach check in with me?",
    answer:
      "Every day. You log your meals, workouts, steps and habits in the ASF app and your coach reviews them and replies within hours. You also get a full progress review every month.",
  },
  {
    question: "Who designs my nutrition plan?",
    answer:
      "Nutrition is led by our clinical nutritionist, who builds a plan around your goal, food preferences, culture and schedule. There are no crash diets or banned foods, just a plan you can follow in real Dubai life.",
  },
  {
    question: "Do I need a gym membership for online fitness coaching?",
    answer:
      "No. Your programme is written for the equipment you have, whether that is a full gym, a building gym, a few dumbbells at home or bodyweight only.",
  },
  {
    question: "How long before I see results with online coaching?",
    answer:
      "Most clients notice more energy, better sleep and looser clothes within the first four weeks. Visible body composition changes usually show in eight to twelve weeks of consistent coaching. We recommend a minimum of three months.",
  },
  {
    question: "Can online coaching help with stress and motivation?",
    answer:
      "Yes. Mindset and recovery are one of the three pillars of ASF coaching. Your coach helps with sleep, stress and building habits that hold up on busy weeks, and our psychologist is available for deeper support.",
  },
  {
    question: "Is online fitness coaching suitable for beginners?",
    answer:
      "Yes. Your coach starts with simple workouts and one or two habits at a time, with exercise videos for every movement in the app, so you build confidence step by step.",
  },
  {
    question: "How much does online fitness coaching cost in Dubai?",
    answer:
      "Plans are priced by the level of support: how many live sessions you want, whether you need a full clinical nutrition plan and how long you commit for. Your first assessment is free and you get a clear quote before starting.",
  },
];

export default function OnlineFitnessCoachDubaiPage() {
  return (
    <SeoPageShell
      jsonLd={buildJsonLd({
        path: PATH,
        name: TITLE,
        description: DESCRIPTION,
        serviceType: "Online fitness coaching",
        faqs: FAQS,
      })}
    >
      <SeoHero
        title={TITLE}
        subline="Training, nutrition and daily accountability in one coaching plan. Your ASF coach and clinical nutritionist guide you every day through the ASF app, wherever you are."
        whatsappMessage={WHATSAPP_MESSAGE}
        image="/hero-slides/farzan-40kg-weight-loss.jpg"
        imageAlt="Farzan lost 40 kg with ASF online fitness coaching, nutrition and daily accountability"
        highlights={[
          "Personal training programme plus clinical nutrition",
          "Daily check-ins with replies within hours",
          "Everything tracked in the ASF app",
        ]}
      />
      <TrustStrip />

      <Section
        id="what-is-online-fitness-coaching"
        eyebrow="The basics"
        title="What is online fitness coaching?"
      >
        <DefinitionBox>
          <p>
            <strong>Online fitness coaching</strong> is a remote, fully
            personalised programme in which a certified coach manages your
            training, nutrition and daily habits through an app, video calls
            and messaging. Instead of seeing a trainer once or twice a week,
            you get guidance and accountability every day, which is what makes
            results last.
          </p>
        </DefinitionBox>
      </Section>

      <Section
        id="coaching-system"
        eyebrow="Our method"
        title="The ASF online coaching system"
        intro={
          <p>
            Lasting change needs more than a workout plan. ASF coaching is
            built on three pillars that work together.
          </p>
        }
        tone="gray"
      >
        <CardGrid
          items={[
            {
              icon: Dumbbell,
              title: "Training programme",
              body: "A progressive plan written for your goal, equipment and schedule, with video demos for every exercise. Your coach reviews your logs and form videos, and adjusts the plan every few weeks so you keep progressing.",
            },
            {
              icon: Salad,
              title: "Nutrition (clinical nutritionist)",
              body: "Our clinical nutritionist builds a plan around the foods you enjoy, your culture and your routine. You share meal photos every day and get practical feedback, so you learn how to eat well for life rather than follow a diet for a month.",
            },
            {
              icon: Brain,
              title: "Mindset and recovery",
              body: "Sleep, stress, energy and motivation are tracked alongside training. Your coach helps you build habits that survive busy weeks, travel and Ramadan, with access to our psychologist when you need extra support.",
            },
          ]}
        />
      </Section>

      <Section
        id="daily-accountability"
        eyebrow="Accountability"
        title="Daily accountability in action"
        intro={
          <p>
            This is what a normal day looks like for an ASF online client.
            Meals, workouts and questions go to your coaching team, and you
            get real feedback the same day. No silent slip-ups.
          </p>
        }
      >
        <ScreenshotRow
          images={[
            { src: "/dailyacc1.jpg", alt: "ASF clinical nutritionist reviewing a client's meal photos in a daily check-in" },
            { src: "/dailyacc2.jpg", alt: "Daily accountability check-in between an ASF coach and an online client" },
            { src: "/dailyacc3.jpg", alt: "ASF online client sharing meals and receiving coach feedback" },
            { src: "/dailyacc4.jpg", alt: "ASF coach feedback on a client's daily nutrition log" },
            { src: "/dailyacc5.jpg", alt: "ASF online coaching daily progress update" },
            { src: "/dailyacc6.jpg", alt: "ASF coaching team supporting a client between sessions" },
          ]}
        />
        <div className="mt-10">
          <Checklist
            items={[
              { title: "Morning", body: "Log your weight, sleep and energy. Your coach sets the focus for the day." },
              { title: "Meals", body: "Send a photo of each meal. The nutritionist replies with quick, practical tweaks." },
              { title: "Training", body: "Complete your workout in the app and upload a form video if you want feedback." },
              { title: "Evening", body: "Tick off your steps, water and habits. Missed something? Your coach helps you plan tomorrow." },
            ]}
          />
        </div>
      </Section>

      <Section
        id="asf-app"
        eyebrow="The ASF app"
        title="Your coaching, in one app"
        intro={
          <p>
            The ASF app keeps your plan, your progress and your coach in your
            pocket. Free to download for all ASF clients.
          </p>
        }
        tone="purple"
      >
        <CardGrid
          columns={4}
          items={[
            { icon: ClipboardList, title: "Workout logging", body: "Follow your programme, log sets and reps, and watch exercise demos." },
            { icon: Salad, title: "Nutrition tracking", body: "Log meals and water, and see your daily targets at a glance." },
            { icon: Camera, title: "Progress photos", body: "Upload monthly photos and measurements to see how far you have come." },
            { icon: MessageCircle, title: "Direct coach messaging", body: "Message your coach and nutritionist and get answers within hours." },
          ]}
        />
        <div className="mt-8">
          <AppBadges />
        </div>
      </Section>

      <Section
        id="plans"
        eyebrow="Plans"
        title="Online coaching plans"
        intro={
          <p>
            Every plan includes a personalised programme, the ASF app and
            daily check-ins. Pricing is shared after your free assessment.
          </p>
        }
      >
        <CardGrid
          items={[
            {
              icon: Smartphone,
              title: "Online Coaching",
              body: "For people who can train on their own but need structure and accountability.",
              bullets: [
                "Personalised training programme",
                "Coach-led nutrition targets",
                "Daily check-ins and messaging",
                "Monthly progress review",
              ],
            },
            {
              icon: Salad,
              title: "Coaching + Nutrition",
              body: "Our most popular plan for weight loss and body recomposition.",
              bullets: [
                "Everything in Online Coaching",
                "Clinical nutritionist meal plan",
                "Daily meal photo reviews",
                "Fortnightly nutrition call",
              ],
              meta: "Most popular",
            },
            {
              icon: Repeat,
              title: "Hybrid Coaching",
              body: "Online coaching plus live or in-person sessions for maximum support.",
              bullets: [
                "Everything in Coaching + Nutrition",
                "1–3 live or in-person sessions a week",
                "Technique coaching on key lifts",
                "Priority scheduling",
              ],
            },
          ]}
        />
      </Section>

      <Section
        id="who-its-for"
        eyebrow="Is it for you?"
        title="Who online fitness coaching is for"
        tone="gray"
      >
        <CardGrid
          items={[
            { icon: Briefcase, title: "Busy professionals", body: "You know what to do but long days and travel keep getting in the way." },
            { icon: Flame, title: "People who have tried diets before", body: "You have lost weight before and put it back on. This time you want habits that last." },
            { icon: Baby, title: "Parents", body: "You need a plan that fits around school runs, nap times and family meals." },
            { icon: Users, title: "Gym-goers who have plateaued", body: "You train regularly but the scale, the mirror and your lifts have stopped moving." },
            { icon: Brain, title: "Anyone who needs accountability", body: "You start strong and fade by week three. Daily check-ins keep you going." },
            { icon: Smartphone, title: "People outside Dubai", body: "You want a Dubai-based coaching team wherever you live." },
          ]}
        />
      </Section>

      <Section
        id="coaching-team"
        eyebrow="Your team"
        title="Meet the coaching team"
        intro={
          <p>
            Your coaching team includes a certified fitness coach and our
            clinical nutritionist, with access to our psychologist for mindset
            support.
          </p>
        }
      >
        <CoachGrid
          coaches={[
            coachPlaceholder("Online Fitness Coach"),
            coachPlaceholder("Clinical Nutritionist"),
            coachPlaceholder("Mindset and Recovery Coach"),
          ]}
        />
      </Section>

      <Section
        id="results"
        eyebrow="Results"
        title="Online coaching transformation stories"
        intro={
          <p>
            Where they started, how long it took and what they did to get
            there.
          </p>
        }
        tone="gray"
      >
        <ResultsGrid
          results={[
            CLIENT_RESULTS.farzan,
            CLIENT_RESULTS.sharda,
            CLIENT_RESULTS.bethya,
          ]}
        />
        <VideoTestimonial
          video={VIDEO_TESTIMONIALS.workouts}
          heading="&ldquo;Workouts finally make sense&rdquo;"
          body="An ASF client explains how a clear plan, daily feedback and a coach who explains the why behind every workout changed the way they train."
        />
      </Section>

      <Section
        id="how-to-choose"
        eyebrow="Buyer's guide"
        title="How to choose an online fitness coach in Dubai"
        intro={
          <p>
            Online coaching quality varies widely. Use these checks before you
            sign up with anyone, including us.
          </p>
        }
      >
        <Checklist
          numbered
          items={[
            { title: "Check qualifications", body: "Look for recognised certifications and REPs UAE registration, plus a qualified nutrition professional for diet advice." },
            { title: "Ask how often they check in", body: "Weekly check-ins are the minimum. Daily feedback leads to faster, more consistent results." },
            { title: "Look for a real assessment", body: "A good coach asks about your health, injuries, lifestyle and food preferences before writing a plan." },
            { title: "Avoid one-size-fits-all plans", body: "If the programme arrives within minutes of paying, it is a template, not coaching." },
            { title: "Ask to see real results", body: "Look for named client stories with timeframes, ideally from people with goals like yours." },
            { title: "Understand the commitment", body: "Ask about plan length, pausing for travel and what happens if you need to stop." },
          ]}
        />
        <InlineCta
          title="See if ASF online coaching is right for you"
          body="Book a free assessment and get an honest recommendation, even if that means a different plan."
          whatsappMessage={WHATSAPP_MESSAGE}
        />
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Online fitness coach FAQs"
        tone="gray"
      >
        <Faq items={FAQS} />
      </Section>
    </SeoPageShell>
  );
}

import type { Metadata } from "next";
import SeoLandingPage from "@/components/sections/SeoLandingPage";

export const metadata: Metadata = {
  title: "Online Fitness Coach in Dubai | ASF Coaching",
  description: "An online fitness coach in Dubai to guide your training, nutrition and habits. Flexible, personalised coaching from ASF.",
};

export default function OnlineFitnessCoachDubaiPage() {
  return (
    <SeoLandingPage
      title="Online Fitness Coach in Dubai"
      image="/asfTeam-highres.jpg"
      imageAlt="The ASF Coaching team of personal trainers in Dubai"
      intro="An online fitness coach gives you structure, expert guidance and someone in your corner every day, without fixed session times."
      sections={[
        {
          heading: "Coaching beyond workouts",
          body: ["Training plans, nutrition, sleep and habit coaching in one programme. [Placeholder content, replace with final copy.]"],
        },
        {
          heading: "Daily accountability",
          body: ["Regular check-ins and progress tracking keep you consistent. [Placeholder content.]"],
        },
        {
          heading: "Results that last",
          body: ["Sustainable changes built around your lifestyle, not quick fixes. [Placeholder content.]"],
        },
      ]}
    />
  );
}

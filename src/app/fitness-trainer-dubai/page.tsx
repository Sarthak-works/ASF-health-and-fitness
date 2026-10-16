import type { Metadata } from "next";
import SeoLandingPage from "@/components/sections/SeoLandingPage";

export const metadata: Metadata = {
  title: "Fitness Trainer in Dubai | ASF Coaching",
  description: "Certified fitness trainers in Dubai who come to you. Personalised training at home, at the gym or outdoors with ASF Coaching.",
};

export default function FitnessTrainerDubaiPage() {
  return (
    <SeoLandingPage
      title="Fitness Trainer in Dubai"
      image="/asfTeam-highres.jpg"
      imageAlt="The ASF Coaching team of personal trainers in Dubai"
      intro="Looking for a fitness trainer in Dubai who fits around your life? ASF coaches train you at home, at one of our partner gyms or outdoors, with a plan built for your goals."
      sections={[
        {
          heading: "Training that fits your schedule",
          body: ["Morning, evening or weekend sessions at a location that suits you. [Placeholder content, replace with final copy.]"],
        },
        {
          heading: "Goals we help with",
          body: ["Fat loss, muscle gain, strength, mobility, sports performance and general health. [Placeholder content.]"],
        },
        {
          heading: "Why choose ASF",
          body: ["Experienced, certified coaches, accountability between sessions and nutrition guidance included. [Placeholder content.]"],
        },
      ]}
    />
  );
}

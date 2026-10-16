import type { Metadata } from "next";
import SeoLandingPage from "@/components/sections/SeoLandingPage";

export const metadata: Metadata = {
  title: "Best Personal Trainers in Dubai | ASF Coaching",
  description: "Meet some of the best personal trainers in Dubai. ASF Coaching's certified team delivers real, lasting results.",
};

export default function BestPersonalTrainersInDubaiPage() {
  return (
    <SeoLandingPage
      title="Best Personal Trainers in Dubai"
      image="/asfTeam-highres.jpg"
      imageAlt="The ASF Coaching team of personal trainers in Dubai"
      intro="Choosing the right personal trainer makes all the difference. ASF Coaching brings together some of Dubai's most experienced coaches, with hundreds of client transformations behind them."
      sections={[
        {
          heading: "What makes a great personal trainer",
          body: ["Qualifications, experience, communication and a track record of client results. [Placeholder content, replace with final copy.]"],
        },
        {
          heading: "Our coaching team",
          body: ["Specialists in fat loss, strength, corrective exercise, pre and postnatal training, and more. [Placeholder content.]"],
        },
        {
          heading: "Proven results",
          body: ["Real transformations from Dubai residents of all ages and fitness levels. [Placeholder content.]"],
        },
      ]}
    />
  );
}

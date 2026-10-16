import type { Metadata } from "next";
import SeoLandingPage from "@/components/sections/SeoLandingPage";

export const metadata: Metadata = {
  title: "Corrective Exercise Specialist in Dubai | ASF Coaching",
  description: "Work with an ASF corrective exercise specialist in Dubai to fix posture, ease aches and pains, and move better.",
};

export default function CorrectiveExerciseSpecialistPage() {
  return (
    <SeoLandingPage
      title="Corrective Exercise Specialist in Dubai"
      image="/asfTeam-highres.jpg"
      imageAlt="The ASF Coaching team of personal trainers in Dubai"
      intro="Pain, stiffness and poor posture hold you back from training and from life. Our corrective exercise specialists assess how you move and build a programme that fixes the root cause, not just the symptoms."
      sections={[
        {
          heading: "What is corrective exercise?",
          body: ["Corrective exercise uses targeted movements to address muscle imbalances, joint restrictions and faulty movement patterns. [Placeholder content, replace with final copy.]"],
        },
        {
          heading: "Who it helps",
          body: ["Clients with back pain, knee pain, shoulder issues, scoliosis, post-injury recovery or desk-related posture problems. [Placeholder content.]"],
        },
        {
          heading: "How our process works",
          body: ["A full movement assessment, a personalised corrective plan, and progress reviews as you get stronger and pain-free. [Placeholder content.]"],
        },
      ]}
    />
  );
}

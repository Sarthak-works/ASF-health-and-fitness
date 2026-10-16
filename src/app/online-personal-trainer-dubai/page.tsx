import type { Metadata } from "next";
import SeoLandingPage from "@/components/sections/SeoLandingPage";

export const metadata: Metadata = {
  title: "Online Personal Trainer in Dubai | ASF Coaching",
  description: "Train with an online personal trainer in Dubai. Live virtual sessions, custom programmes and daily accountability from ASF Coaching.",
};

export default function OnlinePersonalTrainerDubaiPage() {
  return (
    <SeoLandingPage
      title="Online Personal Trainer in Dubai"
      image="/asfTeam-highres.jpg"
      imageAlt="The ASF Coaching team of personal trainers in Dubai"
      intro="Get the expertise of a personal trainer wherever you are. Our online personal training combines live video sessions with a custom programme and daily check-ins."
      sections={[
        {
          heading: "How online personal training works",
          body: ["Live one-to-one sessions over video, with your coach correcting form in real time. [Placeholder content, replace with final copy.]"],
        },
        {
          heading: "What you get",
          body: ["A personalised workout plan, nutrition guidance and daily accountability through WhatsApp. [Placeholder content.]"],
        },
        {
          heading: "Who it suits",
          body: ["Busy professionals, frequent travellers and anyone who prefers training at home. [Placeholder content.]"],
        },
      ]}
    />
  );
}

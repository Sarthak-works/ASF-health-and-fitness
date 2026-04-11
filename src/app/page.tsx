import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import MapSection from "@/components/sections/Map";

// Below-the-fold sections
const About = dynamic(() => import("@/components/sections/About"));
const Transformations = dynamic(
  () => import("@/components/sections/Transformations"),
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
);
const Team = dynamic(() => import("@/components/sections/Team"));
const Founder = dynamic(() => import("@/components/sections/Founder"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Stats = dynamic(() => import("@/components/sections/Stats"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
// const Blogs = dynamic(() => import('@/components/sections/Blogs'));
const ContactFooter = dynamic(
  () => import("@/components/sections/ContactFooter"),
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Transformations />
      <Testimonials />
      <Founder />
      <Team />
      <Services />
      <Stats />
      <FAQ />
      {/* <Blogs /> */}
      <MapSection />
      <ContactFooter />
    </main>
  );
}

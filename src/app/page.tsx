import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { NoteNewest } from "@/components/sections/NoteNewest";
import { StickyLineBar } from "@/components/StickyLineBar";
import { getAllNotes, showDrafts } from "@/lib/note";

const Pain = dynamic(() => import("@/components/sections/Pain").then((m) => ({ default: m.Pain })));
const BeforeAfter = dynamic(() => import("@/components/sections/BeforeAfter").then((m) => ({ default: m.BeforeAfter })));
const USP = dynamic(() => import("@/components/sections/USP").then((m) => ({ default: m.USP })));
const StepMethod = dynamic(() => import("@/components/sections/StepMethod").then((m) => ({ default: m.StepMethod })));
const Why = dynamic(() => import("@/components/sections/Why").then((m) => ({ default: m.Why })));
const Profile = dynamic(() => import("@/components/sections/Profile").then((m) => ({ default: m.Profile })));
const WhyStory = dynamic(() => import("@/components/sections/WhyStory").then((m) => ({ default: m.WhyStory })));
const Services = dynamic(() => import("@/components/sections/Services").then((m) => ({ default: m.Services })));
const CTASection = dynamic(() => import("@/components/sections/CTASection").then((m) => ({ default: m.CTASection })));
const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => ({ default: m.Footer })));

export default function Home() {
  const notes = getAllNotes({ includeDrafts: showDrafts() });
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NoteNewest notes={notes} />
        <Pain />
        <BeforeAfter />
        <USP />
        <StepMethod />
        <Why />
        <Profile />
        <WhyStory />
        <Services />
        <CTASection />
      </main>
      <Footer />
      <StickyLineBar />
    </>
  );
}

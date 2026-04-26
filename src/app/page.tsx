import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { USP } from "@/components/sections/USP";
import { StepMethod } from "@/components/sections/StepMethod";
import { Why } from "@/components/sections/Why";
import { Profile } from "@/components/sections/Profile";
import { WhyStory } from "@/components/sections/WhyStory";
import { Services } from "@/components/sections/Services";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
    </>
  );
}

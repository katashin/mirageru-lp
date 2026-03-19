import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Pain } from "@/components/sections/Pain";
import { Why } from "@/components/sections/Why";
import { Services } from "@/components/sections/Services";
import { Profile } from "@/components/sections/Profile";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Pain />
        <Why />
        <Services />
        <Profile />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

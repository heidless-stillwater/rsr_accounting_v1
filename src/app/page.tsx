import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutUsSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AiToolsSection } from "@/components/sections/ai-tools-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col bg-background w-full">
      <Header />
      <main> {/* Removed flex-grow */}
        <HeroSection />
        <AboutUsSection />
        <ServicesSection />
        <AiToolsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

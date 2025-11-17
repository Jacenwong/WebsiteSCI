import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { TechnologySection } from "@/components/TechnologySection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

import { useRef } from "react";

const Index = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {/* Attach scrollRef here */}
      <Navigation containerRef={scrollRef} />

      {/* Scroll container must receive the same ref */}
      <main ref={scrollRef} className="fixed-scroll-container">
        <section id="product" className="scroll-card">
          <HeroSection />
        </section>

        <section id="stats" className="scroll-card">
          <StatsSection />
        </section>

        <section id="showcase" className="scroll-card">
          <ProductShowcase />
        </section>

        <section id="technology" className="scroll-card">
          <TechnologySection />
        </section>

        <section id="about" className="scroll-card">
          <AboutSection />
        </section>

        <section id="contact" className="scroll-card">
          <ContactSection />
        </section>

        <section id="footer" className="scroll-card">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Index;

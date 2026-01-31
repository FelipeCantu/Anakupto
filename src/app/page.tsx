"use client";

import HeroScene from "@/components/3d/HeroScene";
import { HeroContent, Section } from "@/components/ui/Section";
import { DynamicContainer } from "@/components/ui/DynamicContainer";
import { ServicesGrid } from "@/components/ui/ServicesGrid";
import { PortfolioCarousel } from "@/components/ui/PortfolioCarousel";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/ui/TextReveal";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={containerRef} className="relative w-full text-white">
      <HeroScene />

      <Section className="z-20 !p-0">
        <HeroContent />
      </Section>

      {/* State 1: Model Right, Text Left */}
      <Section className="relative overflow-hidden">
        {/* Glass Triangle Background */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 w-full h-full bg-zinc-800/80 z-0 backdrop-blur-sm border-r border-white/10"
          style={{
            clipPath: "polygon(0 0, 100% 0, 0 100%)"
          }}
        />

        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-20 p-8">
          <div className="md:col-span-1">
            <DynamicContainer glowColor="#00ff88">
              <div className="text-4xl md:text-7xl font-bold mb-6">
                <TextReveal mode="char" delay={0.2} stagger={0.05}>
                  Visual
                </TextReveal>
                <TextReveal mode="char" delay={0.4} stagger={0.05} className="text-zinc-500">
                  Alchemy
                </TextReveal>
              </div>
              <div className="text-xl text-zinc-300 leading-relaxed">
                <TextReveal mode="word" delay={0.6} stagger={0.02}>
                  We invoke the power of WebGL to forge assets that react, evolve, and persist. Optimized for maximum impact, designed to mesmerizing effect.
                </TextReveal>
              </div>
            </DynamicContainer>
          </div>
          {/* Empty Space for Model */}
          <div className="hidden md:block"></div>
        </div>
      </Section>

      {/* State 2: Model Left, Text Right */}
      <Section className="relative overflow-hidden">
        {/* Glass Triangle Background */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 w-full h-full bg-zinc-800/80 z-0 backdrop-blur-sm border-r border-white/10"
          style={{
            clipPath: "polygon(0 100%, 100% 0, 100% 100%)"
          }}
        />

        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-20 p-8">
          {/* Empty Space for Model */}
          <div className="hidden md:block"></div>
          <div className="md:col-span-1 text-right">
            <DynamicContainer glowColor="#ff8c42">
              <div className="text-4xl md:text-7xl font-bold mb-6 flex flex-col items-end">
                <TextReveal mode="char" delay={0.2} stagger={0.05}>
                  Zero
                </TextReveal>
                <TextReveal mode="char" delay={0.4} stagger={0.05} className="text-zinc-500">
                  Friction
                </TextReveal>
              </div>
              <div className="text-xl text-zinc-300 leading-relaxed flex justify-end">
                <TextReveal mode="word" delay={0.6} stagger={0.02} className="justify-end text-right">
                  Complex geometry, served instantly. Our pipeline ensures silky smooth performance at 60fps across all devices, maintaining immersion without the load time.
                </TextReveal>
              </div>
            </DynamicContainer>
          </div>
        </div>
      </Section>

      <Section className="relative z-20">
        <ServicesGrid />
      </Section>

      <PortfolioCarousel />

      <div className="h-screen"></div> {/* Extra space at bottom */}
    </main>
  );
}

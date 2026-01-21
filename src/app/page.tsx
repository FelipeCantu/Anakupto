"use client";

import HeroScene from "@/components/3d/HeroScene";
import { HeroContent, Section } from "@/components/ui/Section";
import { DynamicContainer } from "@/components/ui/DynamicContainer";
import { ServicesGrid } from "@/components/ui/ServicesGrid";
import { PortfolioCarousel } from "@/components/ui/PortfolioCarousel";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={containerRef} className="relative w-full text-white">
      <HeroScene />

      <Section className="z-20">
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
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                Interactive <br /> <span className="text-zinc-500">Realism</span>
              </motion.h2>
              <p className="text-xl text-zinc-300 leading-relaxed">
                We build 3D assets that live and breathe on the web. Optimized for performance, designed for impact.
                The model adjusts to every interaction.
              </p>
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
              <motion.h2
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                Zero <br /> <span className="text-zinc-500">Latency</span>
              </motion.h2>
              <p className="text-xl text-zinc-300 leading-relaxed">
                Complex geometry served instantly. Our optimization pipeline ensures silky smooth framerates on any device.
              </p>
            </DynamicContainer>
          </div>
        </div>
      </Section>

      <Section className="relative z-20">
        <ServicesGrid />
      </Section>

      <PortfolioCarousel />

      {/* State 3: Model Center */}
      <Section className="">
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          >
            FUTURE
          </motion.h2>
          <p className="mt-8 text-2xl text-zinc-400">
            Ready to deploy to your next project.
          </p>
        </div>
      </Section>

      <div className="h-screen"></div> {/* Extra space at bottom */}
    </main>
  );
}

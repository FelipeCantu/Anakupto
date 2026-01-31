"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { AboutVisual } from "@/components/3d/AboutVisual";
import { TextReveal, FadeIn } from "@/components/ui/TextReveal";

export default function AboutPage() {
    return (
        <main className="w-full text-white pt-24">
            <Section className="relative z-20 min-h-[60vh]">
                <div className="max-w-4xl mx-auto text-center px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-bold mb-8 text-white"
                    >
                        <TextReveal as="span" mode="char" stagger={0.05}>
                            Who We Are
                        </TextReveal>
                    </motion.h1>
                    <div className="text-xl md:text-2xl text-zinc-400 leading-relaxed justify-center flex">
                        <TextReveal mode="word" delay={0.5} stagger={0.02} className="justify-center max-w-3xl">
                            Anakupto is a digital studio at the intersection of design, technology, and imagination. We don't just build websites; we craft immersive worlds.
                        </TextReveal>
                    </div>
                </div>
            </Section>

            <div className="max-w-7xl mx-auto px-8 pb-32 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 text-lg text-zinc-300">
                    <h2 className="text-3xl font-bold text-white">
                        <TextReveal mode="word">Our Philosophy</TextReveal>
                    </h2>
                    <FadeIn delay={0.3}>
                        <p className="mb-6">
                            The web has evolved beyond static pages. We believe in the power of <strong className="text-white">WebGL</strong> and <strong className="text-white">Real-time 3D</strong> to tell stories in ways that were previously impossible.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <p>
                            Every pixel, every interaction, and every frame is calculated to deliver maximum impact without compromising performance.
                        </p>
                    </FadeIn>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative h-[500px] w-full bg-zinc-900/50 rounded-3xl overflow-hidden border border-white/10"
                >
                    <AboutVisual />
                </motion.div>
            </div>
        </main>
    );
}

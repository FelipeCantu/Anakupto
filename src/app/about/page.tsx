"use client";

import { motion } from "framer-motion";
import { HeroContent, Section } from "@/components/ui/Section";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="w-full text-white pt-24">
            <Section className="relative z-20 min-h-[60vh]">
                <div className="max-w-4xl mx-auto text-center px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500"
                    >
                        Who We Are
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl md:text-2xl text-zinc-400 leading-relaxed"
                    >
                        Anakupto is a digital studio at the intersection of design, technology, and imagination. We don't just build websites; we craft immersive worlds.
                    </motion.p>
                </div>
            </Section>

            <div className="max-w-7xl mx-auto px-8 pb-32 grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 text-lg text-zinc-300"
                >
                    <h2 className="text-3xl font-bold text-white">Our Philosophy</h2>
                    <p>
                        The web has evolved beyond static pages. We believe in the power of **WebGL** and **Real-time 3D** to tell stories in ways that were previously impossible.
                    </p>
                    <p>
                        Every pixel, every interaction, and every frame is calculated to deliver maximum impact without compromising performance.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative h-[500px] w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/10"
                >
                    {/* Placeholder for team image or studio shot */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
                    <div className="flex items-center justify-center h-full text-zinc-500 font-mono">
                        [Studio Image / Showreel]
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

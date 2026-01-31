"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { TextReveal } from "@/components/ui/TextReveal";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
    return (
        <section id={id} className={`min-h-screen w-full relative flex items-center justify-center p-8 ${className}`}>
            {children}
        </section>
    );
}

export function HeroContent() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="z-20 w-full h-full absolute inset-0 flex flex-col justify-center items-center pb-32 md:pb-0 p-8">

            {/* HUD / Tech Elements (Absolute to Section) */}
            <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
                {/* Top Left - Removed */}
                {/* Top Right - Removed */}
                {/* Bottom Left - Removed */}

                {/* Bottom Right Scroll Hint */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.1, duration: 1 }}
                    className="absolute bottom-10 right-0 flex items-center gap-4"
                >
                    <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">Scroll to Explore</span>
                    <div className="h-[1px] w-12 bg-zinc-700" />
                </motion.div>
            </div>


            {/* Main Center Content */}
            <div className="text-center max-w-5xl mx-auto space-y-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Decorative blurred glow behind title */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-3xl rounded-full -z-10" />

                    <div className="relative">
                        <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-white">
                            <TextReveal as="span" mode="char" delay={0.2} stagger={0.05} className="inline-block text-white">
                                TRANSCEND
                            </TextReveal>
                            <br />
                            <TextReveal as="span" mode="char" delay={0.8} stagger={0.05} className="inline-block text-zinc-500">
                                THE SCREEN
                            </TextReveal>
                        </h1>
                    </div>
                </motion.div>

                <div className="max-w-2xl mx-auto">
                    <TextReveal
                        mode="word"
                        delay={1.5}
                        stagger={0.04}
                        className="text-xl md:text-2xl text-zinc-400 font-light tracking-wide justify-center"
                    >
                        Anakupto engineers high-fidelity 3D experiences that captivate and convert. We turn static layouts into living worlds.
                    </TextReveal>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="flex justify-center gap-6 pt-8"
                >
                    <Link href="/start" className="group px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-3 hover:bg-zinc-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                        Start Project <MoveRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/about" className="group px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium text-lg flex items-center gap-2 hover:bg-white/10 transition-all backdrop-blur-sm">
                        Learn More
                    </Link>
                </motion.div>
            </div>

            {/* Center Scroll Indicator (Mouse) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden md:flex"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-zinc-500 to-transparent" />
                <div className="w-6 h-10 border border-zinc-500 rounded-full p-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto animate-bounce mt-1" />
                </div>
            </motion.div>
        </div>
    );
}

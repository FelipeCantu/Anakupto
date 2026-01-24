"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { MoveRight } from "lucide-react";
import Link from "next/link";

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
        <div ref={containerRef} className="z-20 w-full h-full flex flex-col justify-center items-center relative pb-32 md:pb-0 p-8">

            {/* HUD / Tech Elements (Absolute to Section) */}
            <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
                {/* Top Left */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute top-0 left-0 flex flex-col gap-2"
                >
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>SYSTEM.ONLINE</span>
                    </div>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-zinc-500/50 to-transparent" />
                </motion.div>

                {/* Top Right */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.7, duration: 1 }}
                    className="absolute top-0 right-0 text-right"
                >
                    <span className="text-xs font-mono text-zinc-600">V.2.0.24</span>
                    <div className="w-24 h-[1px] bg-gradient-to-l from-zinc-500/50 to-transparent mt-2 ml-auto" />
                </motion.div>

                {/* Bottom Left coordinate */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.9, duration: 1 }}
                    className="absolute bottom-10 left-0 font-mono text-xs text-zinc-600"
                >
                    34°03'00"N 118°15'00"W
                </motion.div>

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
            <div className="text-center max-w-5xl mx-auto space-y-8 mix-blend-difference relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Decorative blurred glow behind title */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-3xl rounded-full -z-10" />

                    <h1 className="text-5xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500">
                        ANAKUPTO
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-500 animate-gradient bg-300%">3D WEB</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xl md:text-2xl text-zinc-400 font-light tracking-wide max-w-2xl mx-auto"
                >
                    We craft immersive digital worlds where design meets <span className="text-white font-medium">dimension</span>.
                </motion.p>

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

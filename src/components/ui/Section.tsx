"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { MoveRight } from "lucide-react";

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
        <div ref={containerRef} className="z-10 text-center max-w-4xl mx-auto space-y-8 mix-blend-difference">
            <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
            >
                NEXT GEN
                <br />
                <span className="text-white">DIMENSIONS</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-xl md:text-2xl text-zinc-400 font-light"
            >
                Immersive 3D experiences for the modern web.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex justify-center gap-4"
            >
                <button className="group px-8 py-4 bg-white text-black rounded-full font-medium text-lg flex items-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer">
                    Start Project <MoveRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.div>
        </div>
    );
}

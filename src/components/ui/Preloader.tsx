"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Preloader() {
    const { active, progress } = useProgress();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (progress === 100) {
            setHasLoaded(true);
        }
    }, [progress]);

    return (
        <AnimatePresence>
            {!hasLoaded && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Logo Animation */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "backOut" }}
                        className="relative w-24 h-24 mb-8"
                    >
                        <Image
                            src="/logo.png"
                            alt="Anakupto Logo"
                            fill
                            className="object-contain animate-pulse"
                            priority
                        />
                    </motion.div>

                    {/* Glitchy Text */}
                    <div className="relative font-mono text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        <span className="relative inline-block glitch-text">
                            {progress.toFixed(0)}%
                        </span>
                    </div>

                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500 animate-pulse">
                        Initializing Reality...
                    </p>

                    {/* Progress Bar Line */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-900">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>

                    {/* Background Grid decorative */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

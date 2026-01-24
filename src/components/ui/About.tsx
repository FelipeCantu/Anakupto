"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <div id="about" className="max-w-7xl mx-auto px-8 py-32 relative z-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-8"
                    >
                        About <span className="text-zinc-500">Anakupto</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 text-lg text-zinc-400 leading-relaxed"
                    >
                        <p>
                            We are a collective of designers, developers, and creative technologists pushing the boundaries of what's possible on the web.
                        </p>
                        <p>
                            Our mission is to create digital experiences that feel tangible, immersive, and alive. We believe the future of the internet is not just about information, but about presence.
                        </p>
                    </motion.div>
                </div>
                <div className="relative h-[400px] bg-zinc-900/50 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                    <span className="text-zinc-600 font-mono text-sm">Interactive About Visual Placeholder</span>
                </div>
            </div>
        </div>
    );
}

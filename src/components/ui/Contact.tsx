"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";

export function Contact() {
    return (
        <div id="contact" className="max-w-7xl mx-auto px-8 py-32 relative z-20 mb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-zinc-900 to-black p-12 rounded-3xl border border-white/10 text-center relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_70%)]" />

                <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">Let's Build the Future</h2>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 relative z-10">
                    Ready to transform your digital presence? Reach out and let's discuss your next project.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center relative z-10">
                    <a href="mailto:hello@anakupto.com" className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
                        <Mail size={20} />
                        Email Us
                    </a>
                    <a href="#" className="px-8 py-4 bg-white/10 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-colors backdrop-blur-sm">
                        <MessageSquare size={20} />
                        Book a Call <ArrowRight size={20} />
                    </a>
                </div>
            </motion.div>
        </div>
    );
}

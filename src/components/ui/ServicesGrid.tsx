"use client";

import { motion } from "framer-motion";
import { Box, Code2, Rocket, Globe, Smartphone, Zap } from "lucide-react";

const services = [
    {
        icon: <Box size={32} />,
        title: "3D Assets & Models",
        description: "Custom-built 3D assets optimized for the web. From product configurators to immersive environments."
    },
    {
        icon: <Code2 size={32} />,
        title: "WebGL Development",
        description: "Native WebGL and Three.js implementation for high-performance, hardware-accelerated graphics."
    },
    {
        icon: <Rocket size={32} />,
        title: "Performance First",
        description: "Optimization pipelines ensuring 60fps experiences across all devices, including mobile."
    },
    {
        icon: <Globe size={32} />,
        title: "Immersive Websites",
        description: "Full-screen interactive experiences that tell your brand story in a completely new dimension."
    },
    {
        icon: <Smartphone size={32} />,
        title: "Mobile Optimization",
        description: "Touch-optimized controls and responsive 3D layouts that feel native on every screen."
    },
    {
        icon: <Zap size={32} />,
        title: "Interactive UI",
        description: "User interfaces that respond to every micro-interaction, creating a living, breathing application."
    }
];

export function ServicesGrid() {
    return (
        <div className="max-w-7xl mx-auto px-8 py-24 relative z-20">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500"
                >
                    Our Expertise
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-zinc-400 max-w-2xl mx-auto"
                >
                    We bridge the gap between high-end 3D graphics and accessible web technologies.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <ServiceCard key={index} service={service} index={index} />
                ))}
            </div>
        </div>
    );
}

function ServiceCard({ service, index }: { service: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors backdrop-blur-sm overflow-hidden"
        >
            {/* Hover Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="mb-6 text-zinc-400 group-hover:text-blue-400 transition-colors">
                    {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-100 transition-colors">
                    {service.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {service.description}
                </p>
            </div>
        </motion.div>
    );
}

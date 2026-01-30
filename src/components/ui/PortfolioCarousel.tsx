"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Neo-Tokyo Net",
        category: "Concept • Immersive Cityscape",
        image: "/projects/cyberpunk.png",
        description: "A fully explorable 3D city interface for a decentralized network.",
        color: "#00f0ff"
    },
    {
        id: 2,
        title: "Luminous Forms",
        category: "Concept • Virtual Gallery",
        image: "/projects/gallery.png",
        description: "Digital art exhibition space featuring procedurally generated sculptures.",
        color: "#ff0055"
    },
    {
        id: 3,
        title: "Aura X Configurator",
        category: "Concept • E-Commerce",
        image: "/projects/ecommerce.png",
        description: "Real-time 3D product customization with physics-based materials.",
        color: "#ffffff"
    },
    {
        id: 4,
        title: "Gaia Visualizer",
        category: "Concept • Data Visualization",
        image: "/projects/globe.png",
        description: "Global climate data visualized in an interactive WebGL globe.",
        color: "#00ff88"
    },
    {
        id: 5,
        title: "Archviz Studio",
        category: "Concept • Real Estate",
        image: "/projects/archviz.png",
        description: "Photorealistic architectural walkthroughs directly in the browser.",
        color: "#fbbf24"
    },
    {
        id: 6,
        title: "Luxe Motorsports",
        category: "Concept • Automotive",
        image: "/projects/automotive.png",
        description: "High-fidelity car configurator with cinematic studio lighting.",
        color: "#94a3b8"
    }
];

export function PortfolioCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState({ left: 0, right: 0 });

    const calculateConstraints = useCallback(() => {
        if (carouselRef.current && innerRef.current) {
            const containerWidth = carouselRef.current.offsetWidth;
            const contentWidth = innerRef.current.scrollWidth;
            setConstraints({
                left: -(contentWidth - containerWidth + 32),
                right: 0
            });
        }
    }, []);

    useEffect(() => {
        calculateConstraints();
        window.addEventListener("resize", calculateConstraints);
        return () => window.removeEventListener("resize", calculateConstraints);
    }, [calculateConstraints]);

    return (
        <div id="work" className="w-full py-24 md:py-32 overflow-hidden relative z-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8 mb-12 md:mb-16 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">What We Build</h2>
                    <p className="text-lg md:text-xl text-zinc-400">Concept projects showcasing our capabilities.</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-zinc-500">
                    <span className="text-sm uppercase tracking-widest">Drag to explore</span>
                    <ArrowRight size={16} />
                </div>
            </div>

            <motion.div
                ref={carouselRef}
                className="cursor-grab active:cursor-grabbing"
            >
                <motion.div
                    ref={innerRef}
                    drag="x"
                    dragConstraints={constraints}
                    dragElastic={0.1}
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                    className="flex gap-6 md:gap-8 px-6 md:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
                >
                    {projects.map((project) => (
                        <PortfolioCard key={project.id} project={project} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    color: string;
}

function PortfolioCard({ project }: { project: Project }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-[500px] lg:w-[550px] aspect-[4/5] rounded-2xl md:rounded-3xl bg-zinc-900 border border-white/10 group select-none overflow-hidden"
        >
            {/* Glow effect */}
            <div
                className="absolute -inset-4 -z-10 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-2xl"
                style={{ background: project.color }}
            />

            {/* Image */}
            <div className="absolute inset-3 md:inset-4 rounded-xl md:rounded-2xl overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 80vw, 550px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <p
                    className="text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-2 md:mb-3"
                    style={{ color: project.color }}
                >
                    {project.category}
                </p>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">
                    {project.title}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base line-clamp-2 leading-relaxed">
                    {project.description}
                </p>
            </div>
        </motion.div>
    );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Neo-Tokyo Net",
        category: "Immersive Cityscape",
        image: "/projects/cyberpunk.png",
        description: "A fully explorable 3D city interface for a decentralized network.",
        color: "#00f0ff"
    },
    {
        id: 2,
        title: "Luminous Forms",
        category: "Virtual Gallery",
        image: "/projects/gallery.png",
        description: "Digital art exhibition space featuring proceedurally generated sculptures.",
        color: "#ff0055"
    },
    {
        id: 3,
        title: "Aura X Configurator",
        category: "E-Commerce",
        image: "/projects/ecommerce.png",
        description: "Real-time 3D product customization with physics-based materials.",
        color: "#ffffff"
    },
    {
        id: 4,
        title: "Gaia Visualizer",
        category: "Data Visualization",
        image: "/projects/globe.png",
        description: "Global climate data visualized in an interactive WebGL globe.",
        color: "#00ff88"
    },
    {
        id: 5,
        title: "Archiviz Studio",
        category: "Real Estate",
        image: "/projects/archviz.png",
        description: "Photorealistic architectural walkthroughs directly in the browser.",
        color: "#fbbf24"
    },
    {
        id: 6,
        title: "Luxe Motorsports",
        category: "Automotive",
        image: "/projects/automotive.png",
        description: "High-fidelity car configurator with cinematic studio lighting.",
        color: "#94a3b8"
    }
];

export function PortfolioCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    return (
        <div id="work" className="w-full py-32 overflow-hidden relative z-20">
            <div className="max-w-7xl mx-auto px-8 mb-16 flex justify-between items-end">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">Selected Work</h2>
                    <p className="text-xl text-zinc-400">Exploring the boundaries of web spaces.</p>
                </div>
                <div className="hidden md:flex gap-2">
                    <span className="text-sm text-zinc-500 uppercase tracking-widest">Drag to explore</span>
                    <ArrowRight className="text-zinc-500" />
                </div>
            </div>

            <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing pl-8 md:pl-[max(2rem,calc((100vw-80rem)/2))]">
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex gap-8 md:gap-12 w-fit pr-12"
                >
                    {projects.map((project) => (
                        <PortfolioCard key={project.id} project={project} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}

function PortfolioCard({ project }: { project: any }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smoother, heavier feel for premium effect
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-[85vw] md:w-[600px] h-[50vh] md:h-[500px] rounded-3xl bg-zinc-900/90 border border-white/20 backdrop-blur-md group select-none"
        >
            {/* Dynamic Glow Behind */}
            <div
                className="absolute inset-0 -z-10 rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-3xl"
                style={{ background: `radial-gradient(circle at center, ${project.color}, transparent 70%)` }}
            />

            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 rounded-2xl overflow-hidden shadow-2xl"
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            </div>

            <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute bottom-8 left-8 right-8"
            >
                <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: project.color }}>{project.category}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{project.title}</h3>
                    <p className="text-zinc-400 text-sm line-clamp-2">{project.description}</p>
                </div>
            </div>

            <div
                style={{ transform: "translateZ(60px)" }}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-lg hover:scale-110"
            >
                <ExternalLink size={20} />
            </div>
        </motion.div>
    );
}

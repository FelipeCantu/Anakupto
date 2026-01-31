"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects, Project } from "@/lib/firestore";

// Fallback projects for when Firestore is empty or fails
const fallbackProjects = [
    {
        id: "1",
        slug: "neo-tokyo-net",
        title: "Neo-Tokyo Net",
        category: "Concept • Immersive Cityscape",
        type: "Web Experience",
        image: "/projects/cyberpunk.png",
        description: "A fully explorable 3D city interface for a decentralized network.",
        color: "#00f0ff",
        longDescription: "",
        features: [],
        technologies: [],
        gallery: [],
        order: 1,
        published: true
    },
    {
        id: "2",
        slug: "luminous-forms",
        title: "Luminous Forms",
        category: "Concept • Virtual Gallery",
        type: "Web Experience",
        image: "/projects/gallery.png",
        description: "Digital art exhibition space featuring procedurally generated sculptures.",
        color: "#ff0055",
        longDescription: "",
        features: [],
        technologies: [],
        gallery: [],
        order: 2,
        published: true
    },
    {
        id: "3",
        slug: "aura-x-configurator",
        title: "Aura X Configurator",
        category: "Concept • E-Commerce",
        type: "Web Experience",
        image: "/projects/ecommerce.png",
        description: "Real-time 3D product customization with physics-based materials.",
        color: "#ffffff",
        longDescription: "",
        features: [],
        technologies: [],
        gallery: [],
        order: 3,
        published: true
    },
    {
        id: "4",
        slug: "gaia-visualizer",
        title: "Gaia Visualizer",
        category: "Concept • Data Visualization",
        type: "Web Experience",
        image: "/projects/globe.png",
        description: "Global climate data visualized in an interactive WebGL globe.",
        color: "#00ff88",
        longDescription: "",
        features: [],
        technologies: [],
        gallery: [],
        order: 4,
        published: true
    },
    {
        id: "5",
        slug: "archviz-studio",
        title: "Archviz Studio",
        category: "Concept • Real Estate",
        type: "Web Experience",
        image: "/projects/archviz.png",
        description: "Photorealistic architectural walkthroughs directly in the browser.",
        color: "#fbbf24",
        longDescription: "",
        features: [],
        technologies: [],
        gallery: [],
        order: 5,
        published: true
    },
    {
        id: "6",
        slug: "luxe-motorsports",
        title: "Luxe Motorsports",
        category: "Concept • Automotive",
        type: "Web Experience",
        image: "/projects/automotive.png",
        description: "High-fidelity car configurator with cinematic studio lighting.",
        color: "#94a3b8",
        longDescription: "",
        features: [],
        technologies: [],
        gallery: [],
        order: 6,
        published: true
    }
];

export function PortfolioCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState({ left: 0, right: 0 });
    const [projects, setProjects] = useState<Project[]>(fallbackProjects);

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
        async function fetchProjects() {
            try {
                const data = await getProjects(6);
                if (data.length > 0) {
                    setProjects(data);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
                // Keep using fallback projects
            }
        }
        fetchProjects();
    }, []);

    useEffect(() => {
        calculateConstraints();
        window.addEventListener("resize", calculateConstraints);
        return () => window.removeEventListener("resize", calculateConstraints);
    }, [calculateConstraints, projects]);

    return (
        <div id="work" className="w-full py-24 md:py-32 overflow-hidden relative z-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8 mb-12 md:mb-16 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">What We Build</h2>
                    <p className="text-lg md:text-xl text-zinc-400">Concept projects showcasing our capabilities.</p>
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/work"
                        className="text-sm font-medium text-[#e59500] hover:text-[#cc8400] transition-colors"
                    >
                        View All Projects
                    </Link>
                    <div className="flex items-center gap-2 text-zinc-500">
                        <span className="text-sm uppercase tracking-widest">Drag to explore</span>
                        <ArrowRight size={16} />
                    </div>
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

            {/* Mobile View All button */}
            <div className="md:hidden flex justify-center mt-8">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                    View All Projects
                    <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
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
        <Link href={`/work/${project.slug}`}>
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-[500px] lg:w-[550px] aspect-[4/5] rounded-2xl md:rounded-3xl bg-zinc-900 border border-white/10 group select-none overflow-hidden cursor-pointer"
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
        </Link>
    );
}

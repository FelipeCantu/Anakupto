"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  color: string;
}

export function ProjectCard({
  slug,
  title,
  category,
  image,
  description,
  color,
}: ProjectCardProps) {
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
    <Link href={`/work/${slug}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative aspect-[4/5] rounded-2xl md:rounded-3xl bg-zinc-900 border border-white/10 group select-none overflow-hidden cursor-pointer"
      >
        {/* Glow effect */}
        <div
          className="absolute -inset-4 -z-10 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-2xl"
          style={{ background: color }}
        />

        {/* Image */}
        <div className="absolute inset-3 md:inset-4 rounded-xl md:rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Arrow icon */}
        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight size={20} className="text-white" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
          <p
            className="text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-2 md:mb-3"
            style={{ color }}
          >
            {category}
          </p>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">
            {title}
          </h3>
          <p className="text-zinc-400 text-sm md:text-base line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

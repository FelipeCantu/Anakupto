"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

interface DynamicContainerProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export function DynamicContainer({
    children,
    className = "",
    glowColor = "#9013fe" // Default purple glow matching the 3D scene
}: DynamicContainerProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the tilt
    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    // Transform values based on mouse position
    const rotateX = useMotionTemplate`calc(${ySpring} * 0.05deg)`;
    const rotateY = useMotionTemplate`calc(${xSpring} * -0.05deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        // Calculate mouse position relative to center of element
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct * width);
        y.set(yPct * height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
            className={`relative group rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-8 shadow-2xl overflow-hidden ${className}`}
        >
            {/* Moving Glow Gradient */}
            <motion.div
                style={{
                    background: useMotionTemplate`radial-gradient(
            600px circle at ${x}px ${y}px,
            ${glowColor}33,
            transparent 80%
          )`,
                }}
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl z-0"
            />

            {/* Animated Border Gradient */}
            <div
                className="absolute inset-0 rounded-2xl opacity-50 z-0 pointer-events-none"
                style={{
                    background: "linear-gradient(120deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

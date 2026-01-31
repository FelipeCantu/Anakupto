"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    children: string;
    className?: string;
    mode?: "char" | "word";
    delay?: number;
    duration?: number;
    stagger?: number;
    as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
    children,
    className,
    mode = "word",
    delay = 0,
    duration = 0.5,
    stagger = 0.05,
    as = "div",
}: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
    const content = children.split(mode === "char" ? "" : " ");

    const wrapperClass = cn(
        mode === "word" ? "flex flex-wrap gap-x-[0.25em]" : "inline-block",
        className
    );

    const innerContent = (
        <>
            <span className="sr-only">{children}</span>
            {content.map((item, i) => (
                <motion.span
                    key={i}
                    initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                    animate={isInView ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
                    transition={{
                        duration: duration,
                        delay: delay + i * stagger,
                        ease: [0.33, 1, 0.68, 1],
                    }}
                    className="inline-block whitespace-pre"
                >
                    {item}
                </motion.span>
            ))}
        </>
    );

    if (as === "h1") return <h1 ref={ref as React.RefObject<HTMLHeadingElement>} className={wrapperClass}>{innerContent}</h1>;
    if (as === "h2") return <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={wrapperClass}>{innerContent}</h2>;
    if (as === "h3") return <h3 ref={ref as React.RefObject<HTMLHeadingElement>} className={wrapperClass}>{innerContent}</h3>;
    if (as === "h4") return <h4 ref={ref as React.RefObject<HTMLHeadingElement>} className={wrapperClass}>{innerContent}</h4>;
    if (as === "p") return <p ref={ref as React.RefObject<HTMLParagraphElement>} className={wrapperClass}>{innerContent}</p>;
    if (as === "span") return <span ref={ref as React.RefObject<HTMLSpanElement>} className={wrapperClass}>{innerContent}</span>;
    return <div ref={ref} className={wrapperClass}>{innerContent}</div>;
}

// Fade in component for blocks of text
export function FadeIn({
    children,
    className,
    delay = 0,
    direction = "up"
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...directionOffset[direction] }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

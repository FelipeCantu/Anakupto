"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useUI } from "@/context/UIContext";

const navItems = ['Work', 'Services', 'About', 'Contact'];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { openContact } = useUI();

    const handleNavClick = (item: string) => {
        setIsOpen(false);
        if (item === 'Contact') {
            openContact();
        }
    };

    const getHref = (item: string) => {
        if (item === 'Contact') return '#';
        if (item === 'About') return '/about';
        if (item === 'Work') return '/work';
        return `/#${item.toLowerCase()}`;
    };

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 pointer-events-none"
            >
                <div className="pointer-events-auto z-50">
                    <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
                        <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/logo.png"
                                alt="Anakupto Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                            Anakupto
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
                    {navItems.map((item) => (
                        <div key={item}>
                            {item === 'Contact' ? (
                                <button
                                    onClick={openContact}
                                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group cursor-pointer"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e59500] transition-all duration-300 group-hover:w-full" />
                                </button>
                            ) : (
                                <Link
                                    href={getHref(item)}
                                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e59500] transition-all duration-300 group-hover:w-full" />
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className={`md:hidden text-white pointer-events-auto hover:text-[#e59500] transition-colors z-50 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <Menu size={24} />
                </button>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden pointer-events-auto"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 text-zinc-400 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <nav className="flex flex-col items-center gap-8">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    {item === 'Contact' ? (
                                        <button
                                            onClick={() => handleNavClick(item)}
                                            className="text-4xl font-bold text-zinc-300 hover:text-white transition-colors tracking-tight hover:tracking-wide duration-300"
                                        >
                                            {item}
                                        </button>
                                    ) : (
                                        <Link
                                            href={getHref(item)}
                                            onClick={() => setIsOpen(false)}
                                            className="text-4xl font-bold text-zinc-300 hover:text-white transition-colors tracking-tight hover:tracking-wide duration-300"
                                        >
                                            {item}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

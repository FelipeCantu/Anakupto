"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

export function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 pointer-events-none"
        >
            <div className="pointer-events-auto">
                <Link href="/" className="flex items-center gap-3 group">
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
                {['Work', 'Services', 'About', 'Contact'].map((item) => (
                    <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                    </Link>
                ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white pointer-events-auto hover:text-blue-400 transition-colors">
                <Menu size={24} />
            </button>
        </motion.header>
    );
}

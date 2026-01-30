"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { useUI } from "@/context/UIContext";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { openContact } = useUI();

    return (
        <footer className="w-full bg-black text-white pt-20 pb-10 relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-12 mb-20 relative z-10">
                {/* Brand Column */}
                <div className="md:col-span-2 space-y-6">
                    <Link href="/" className="flex items-center gap-3 w-fit group">
                        <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/logo.png"
                                alt="Anakupto Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white group-hover:text-[#e59500] transition-colors">
                            Anakupto
                        </span>
                    </Link>
                    <p className="text-zinc-400 max-w-sm leading-relaxed">
                        Pioneering the next generation of 3D web experiences.
                        We turn static pages into immersive interactive worlds.
                    </p>
                </div>

                {/* Links Column */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Navigation</h3>
                    <ul className="space-y-4">
                        {['Work', 'Services', 'About', 'Contact'].map((item) => (
                            <li key={item}>
                                {item === 'Contact' ? (
                                    <button
                                        onClick={openContact}
                                        className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all inline-block"
                                    >
                                        {item}
                                    </button>
                                ) : (
                                    <Link
                                        href={item === 'About' ? '/about' : `/#${item.toLowerCase()}`}
                                        className="text-zinc-300 hover:text-white hover:translate-x-1 transition-all inline-block"
                                    >
                                        {item}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Socials Column */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Connect</h3>
                    <div className="flex gap-4">
                        <SocialLink href="mailto:hello@anakupto.com" icon={<Mail size={20} />} />
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm">
                <p>&copy; {currentYear} Anakupto Inc. All rights reserved.</p>
                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
        >
            {icon}
        </a>
    )
}

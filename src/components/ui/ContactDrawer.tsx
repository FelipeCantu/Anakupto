"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail, Phone, MapPin } from "lucide-react";
import { useUI } from "@/context/UIContext";

export function ContactDrawer() {
    const { isContactOpen, closeContact } = useUI();

    return (
        <AnimatePresence>
            {isContactOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeContact}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 w-full md:w-[500px] h-full bg-zinc-900 border-l border-white/10 shadow-2xl z-[70] overflow-y-auto"
                    >
                        <div className="p-8 h-full flex flex-col">
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-3xl font-bold text-white">Get in Touch</h2>
                                <button
                                    onClick={closeContact}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-8 flex-grow">
                                <p className="text-zinc-400">
                                    Have a project in mind? We'd love to hear from you. Fill out the form below or send us an email.
                                </p>

                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-zinc-300">Message</label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>

                                    <button className="w-full bg-white text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors group">
                                        Send Message
                                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>

                                <div className="pt-12 border-t border-white/10 space-y-4">
                                    <div className="flex items-center gap-4 text-zinc-400">
                                        <Mail size={18} />
                                        <span>hello@anakupto.com</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-zinc-400">
                                        <Phone size={18} />
                                        <span>+1 (555) 000-0000</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-zinc-400">
                                        <MapPin size={18} />
                                        <span>San Francisco, CA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

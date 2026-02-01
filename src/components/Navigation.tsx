"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Programma", href: "#programma" },
    { name: "Camping", href: "#camping" },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            // Auto-hide on mobile: hide when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={twMerge(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled || isOpen
                    ? "bg-steel-azure shadow-sm py-4"
                    : "bg-transparent py-6",
                hidden && !isOpen ? "md:translate-y-0 -translate-y-full" : "translate-y-0"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link
                    href="/"
                    className={twMerge(
                        "text-2xl font-bold tracking-tighter transition-colors",
                        scrolled || isOpen ? "text-golden-glow" : "text-white"
                    )}
                >
                    J&D
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={twMerge(
                                "text-sm font-medium transition-colors uppercase tracking-widest",
                                scrolled || isOpen
                                    ? "text-white/90 hover:text-golden-glow"
                                    : "text-white/80 hover:text-white"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="#rsvp"
                        className="bg-golden-glow text-steel-azure px-6 py-2 rounded-full text-sm font-bold hover:bg-golden-glow/90 transition-colors shadow-md"
                    >
                        RSVP
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={twMerge(
                        "md:hidden p-2 transition-colors",
                        scrolled || isOpen ? "text-white" : "text-white"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-steel-azure border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg font-medium text-white/90 hover:text-golden-glow transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="#rsvp"
                                className="bg-golden-glow text-steel-azure px-6 py-3 rounded-full text-center font-bold hover:bg-golden-glow/90 transition-colors mt-4"
                                onClick={() => setIsOpen(false)}
                            >
                                RSVP
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

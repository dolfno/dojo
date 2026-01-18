"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Ons Verhaal", href: "#story" },
    { name: "De Bruiloft", href: "#wedding" },
    { name: "Reis & Verblijf", href: "#details" },
    { name: "Camping", href: "#camping" },
    { name: "RSVP", href: "#rsvp" },
    { name: "Details", href: "#details" },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={twMerge(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled || isOpen
                    ? "bg-background/80 backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tighter text-cobalt-green"
                >
                    J&D
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-foreground/80 hover:text-cobalt-green transition-colors uppercase tracking-widest"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="#rsvp"
                        className="bg-cobalt-green text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-cobalt-green/90 transition-colors shadow-md"
                    >
                        RSVP
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground"
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
                        className="md:hidden bg-background border-t border-foreground/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg font-medium text-foreground/80 hover:text-cobalt-green transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="#rsvp"
                                className="bg-cobalt-green text-white px-6 py-3 rounded-full text-center font-medium hover:bg-cobalt-green/90 transition-colors mt-4"
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

"use client";

import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer className="bg-brandy text-white py-16">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-6 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Jorinde & Dolf
                    </h2>

                    <p className="text-white/80 max-w-md text-lg">
                        We kunnen niet wachten om deze bijzondere dag met jullie te vieren.
                    </p>

                    <span className="text-2xl font-bold text-golden-glow">27.06.2026</span>

                    <div className="w-full max-w-xs h-px bg-white/20 my-4" />

                    <p className="text-sm text-white/60">
                        &copy; {new Date().getFullYear()} Jorinde & Dolf
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}

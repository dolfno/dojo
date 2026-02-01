"use client";

import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer className="bg-foreground text-background py-16">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-6 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-cobalt-green">
                        Jorinde & Dolf
                    </h2>

                    <p className="text-background/70 max-w-md text-lg">
                        We kunnen niet wachten om deze bijzondere dag met jullie te vieren.
                    </p>

                    <span className="text-2xl font-bold text-lemon-yellow">27.06.2026</span>

                    <div className="w-full max-w-xs h-px bg-background/10 my-4" />

                    <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-md text-sm text-background/40 gap-4">
                        <p>&copy; {new Date().getFullYear()} Jorinde & Dolf</p>
                        <p>Made with love & Next.js</p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

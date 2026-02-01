"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 font-sans overflow-hidden relative">
            {/* Background Elements for "Party" vibe */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cobalt-green/10 rounded-full blur-[100px]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-lemon-yellow/10 rounded-full blur-[100px]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                    className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-wedding-blue/5 rounded-full blur-[80px]"
                />
            </div>

            <main className="flex flex-col gap-8 items-center text-center z-10 max-w-4xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-cobalt-green"
                >
                    Jorinde & Dolf
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl sm:text-3xl text-foreground/80 font-light tracking-wide max-w-2xl"
                >
                    Gaan trouwen.
                    <span className="block mt-2 text-lg sm:text-xl text-foreground/60">
                        Vier de liefde met ons mee!
                    </span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex gap-4 items-center flex-col sm:flex-row mt-8"
                >
                    <Link
                        href="#rsvp"
                        className="rounded-full bg-cobalt-green text-white text-lg h-14 px-10 flex items-center justify-center hover:bg-cobalt-green/90 transition-all shadow-lg hover:shadow-cobalt-green/20 hover:scale-105"
                    >
                        RSVP
                    </Link>
                    <Link
                        href="#programma"
                        className="rounded-full border border-foreground/10 text-foreground text-lg h-14 px-10 flex items-center justify-center hover:bg-foreground/5 transition-all hover:scale-105"
                    >
                        Programma
                    </Link>
                </motion.div>
            </main>
        </div>
    );
}

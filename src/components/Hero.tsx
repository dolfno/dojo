"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";

export function Hero() {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Full-screen background video */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center"
                >
                    <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-4">
                        Jorinde
                        <span className="block text-golden-glow">&</span>
                        Dolf
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl sm:text-2xl text-white/90 font-medium tracking-wide mb-2"
                    >
                        Gaan trouwen!
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg text-white/70 mb-10"
                    >
                        27 juni 2026 &bull;{" "}
                        <a
                            href="https://maps.app.goo.gl/ev2qNLRAVk7Xpv5LA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors inline-flex items-center gap-1"
                        >
                            Zwanenmeer De Kieftenkolk
                            <ExternalLink size={14} />
                        </a>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Link
                            href="#rsvp"
                            className="inline-flex items-center justify-center rounded-full bg-golden-glow text-steel-azure text-lg font-bold h-14 px-12 hover:bg-golden-glow/90 transition-all hover:scale-105"
                        >
                            RSVP
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center text-white/60"
                >
                    <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </div>
    );
}

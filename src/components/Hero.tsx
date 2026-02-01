"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

export function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Try to autoplay
        video.play().then(() => {
            setIsPlaying(true);
        }).catch(() => {
            // Autoplay was prevented - user will need to tap
            setIsPlaying(false);
        });

        // Listen for play/pause events
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
        };
    }, []);

    const handleTapToPlay = () => {
        const video = videoRef.current;
        if (video && !isPlaying) {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Full-screen background video */}
            <div className="absolute inset-0" onClick={handleTapToPlay}>
                {/* Blurred background video for mobile letterbox fill */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    className="absolute inset-0 w-full h-full object-cover scale-150 blur-3xl sm:hidden"
                    aria-hidden="true"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                {/* Mobile blur color treatment - subtle golden tint */}
                <div className="absolute inset-0 bg-gradient-to-b from-golden-glow/15 via-transparent to-golden-glow/15 sm:hidden pointer-events-none" />
                {/* Main video */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    className="absolute inset-0 w-full h-full object-contain sm:object-cover"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlay for text readability - lighter on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/10 sm:from-black/70 sm:via-black/30 sm:to-black/20 pointer-events-none" />
                {/* Tap to play indicator for iOS */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                            <Play className="w-12 h-12 text-white fill-white" />
                        </div>
                    </div>
                )}
            </div>

            {/* Content overlay - pointer-events-none lets clicks pass through to video */}
            {/* Mobile: positioned at 1/6 and 5/6 height. Desktop: centered */}

            {/* Desktop centered layout */}
            <div className="relative z-10 h-full hidden sm:flex flex-col items-center justify-center px-6 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center"
                >
                    <h1 className="font-bold tracking-tighter text-white text-8xl lg:text-9xl [@media(max-height:500px)_and_(orientation:landscape)]:text-4xl mb-4 [@media(max-height:500px)_and_(orientation:landscape)]:mb-1">
                        <span className="block [@media(max-height:500px)_and_(orientation:landscape)]:inline">Jorinde</span>
                        <span className="block text-golden-glow [@media(max-height:500px)_and_(orientation:landscape)]:inline"> & </span>
                        <span className="block [@media(max-height:500px)_and_(orientation:landscape)]:inline">Dolf</span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-2xl [@media(max-height:500px)_and_(orientation:landscape)]:text-base text-white/90 font-medium tracking-wide mb-2 [@media(max-height:500px)_and_(orientation:landscape)]:mb-1"
                    >
                        Gaan trouwen!
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg [@media(max-height:500px)_and_(orientation:landscape)]:text-sm text-white/70 mb-10 [@media(max-height:500px)_and_(orientation:landscape)]:mb-4"
                    >
                        27 juni 2026 &bull;{" "}
                        <a
                            href="https://maps.app.goo.gl/ev2qNLRAVk7Xpv5LA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors inline-flex items-center gap-1 pointer-events-auto"
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
                            className="inline-flex items-center justify-center rounded-full bg-golden-glow text-steel-azure text-lg [@media(max-height:500px)_and_(orientation:landscape)]:text-sm font-bold h-14 [@media(max-height:500px)_and_(orientation:landscape)]:h-10 px-12 [@media(max-height:500px)_and_(orientation:landscape)]:px-8 hover:bg-golden-glow/90 transition-all hover:scale-105 pointer-events-auto"
                        >
                            RSVP
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Mobile layout - positioned in blurred zones */}
            <div className="relative z-10 h-full sm:hidden pointer-events-none">
                {/* Top section - positioned below header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute top-[22%] left-0 right-0 -translate-y-1/2 text-center px-6"
                >
                    <h1 className="font-bold tracking-tighter text-white text-[3.25rem]">
                        Jorinde
                        <span className="text-golden-glow"> & </span>
                        Dolf
                    </h1>
                    <p className="text-xl text-white/90 font-medium tracking-wide -mt-1">
                        Gaan trouwen!
                    </p>
                </motion.div>

                {/* Bottom section - centered at 5/6 height */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="absolute top-[80%] left-0 right-0 -translate-y-1/2 text-center px-6"
                >
                    <p className="text-base text-white/70 mb-4">
                        27 juni 2026 &bull;{" "}
                        <a
                            href="https://maps.app.goo.gl/ev2qNLRAVk7Xpv5LA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors inline-flex items-center gap-1 pointer-events-auto"
                        >
                            Zwanenmeer De Kieftenkolk
                            <ExternalLink size={12} />
                        </a>
                    </p>
                    <Link
                        href="#rsvp"
                        className="inline-flex items-center justify-center rounded-full bg-golden-glow text-steel-azure text-lg font-bold h-12 px-10 hover:bg-golden-glow/90 transition-all hover:scale-105 pointer-events-auto"
                    >
                        RSVP
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator - hidden in landscape */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 [@media(max-height:500px)_and_(orientation:landscape)]:hidden"
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

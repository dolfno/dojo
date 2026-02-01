"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Camping() {
    return (
        <section id="camping" className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/camping.jpg"
                    alt=""
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Overnachten</h2>
                    <p className="text-white/90 text-lg max-w-xl mx-auto">
                        Als je het leuk vindt, kun je blijven slapen op de camping naast de feestlocatie.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

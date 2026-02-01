"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Camping() {
    return (
        <section id="camping" className="py-24 bg-foreground/[0.02]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Overnachten</h2>
                    <p className="text-foreground/60 text-lg max-w-xl mx-auto">
                        Als je het leuk vindt, kun je blijven slapen op de camping naast de feestlocatie.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden aspect-[16/9]"
                >
                    <Image
                        src="/camping.jpg"
                        alt="Camping area"
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </div>
        </section>
    );
}

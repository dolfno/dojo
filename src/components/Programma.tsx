"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Programma() {
    return (
        <section id="programma" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-steel-azure mb-4">Programma</h2>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                    {/* Image on left */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] overflow-hidden"
                    >
                        <Image
                            src="/paviljoen-jd.png"
                            alt="Paviljoen Het Buitenhuis"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Cards on right */}
                    <div className="flex flex-col gap-4">
                        {/* Friday Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -4, transition: { duration: 0.25 } }}
                            className="bg-golden-glow rounded-[2.5rem] p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-250"
                        >
                            <div className="text-7xl font-bold text-steel-azure tracking-tight">26</div>
                            <h3 className="text-2xl font-bold text-steel-azure mt-1">Vrijdag</h3>
                            <p className="text-steel-azure/60 text-sm mb-8">juni 2026</p>
                            <p className="text-steel-azure/60 text-sm mb-3">Vanaf 20:00</p>
                            <span className="badge bg-steel-azure/10 text-steel-azure">Welkomstborrel</span>
                        </motion.div>

                        {/* Saturday Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            whileHover={{ y: -4, transition: { duration: 0.25 } }}
                            className="bg-sage-green rounded-[2.5rem] p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-250"
                        >
                            <div className="text-7xl font-bold text-white tracking-tight">27</div>
                            <h3 className="text-2xl font-bold text-white mt-1">Zaterdag</h3>
                            <p className="text-white/70 text-sm mb-8">juni 2026</p>
                            <p className="text-white/70 text-sm mb-3">Vanaf 15:00</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="badge bg-white/20 text-white font-medium">Ceremonie</span>
                                <span className="badge bg-white/20 text-white font-medium">Borrel</span>
                                <span className="badge bg-white/20 text-white font-medium">Diner</span>
                                <span className="badge bg-white/20 text-white font-medium">Feest</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";

export function Programma() {
    return (
        <section id="programma" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-steel-azure mb-4">Programma</h2>
                </motion.div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Friday Card - Golden Glow accent with dark text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -4, transition: { duration: 0.25 } }}
                        className="md:col-span-2 bg-golden-glow rounded-[2.5rem] p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-250"
                    >
                        <div className="text-7xl font-bold text-steel-azure tracking-tight">26</div>
                        <h3 className="text-2xl font-bold text-steel-azure mt-1">Vrijdag</h3>
                        <p className="text-steel-azure/60 text-sm mb-8">juni 2026</p>
                        <p className="text-steel-azure/60 text-sm mb-3">Vanaf 20:00</p>
                        <span className="badge bg-steel-azure/10 text-steel-azure">Welkomstborrel</span>
                    </motion.div>

                    {/* Saturday Card - Sage Green secondary with white text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -4, transition: { duration: 0.25 } }}
                        className="md:col-span-3 bg-sage-green rounded-[2.5rem] p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-250"
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
        </section>
    );
}

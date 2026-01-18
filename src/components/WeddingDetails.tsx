"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Calendar } from "lucide-react";

export function WeddingDetails() {
    return (
        <section id="wedding" className="py-24 bg-foreground text-background relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-cobalt-green mb-4">De Bruiloft</h2>
                    <p className="text-background/60 max-w-2xl mx-auto">
                        Alle details op een rijtje. Wij kunnen niet wachten om dit met jullie te vieren.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Date */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="bg-background/5 p-8 rounded-2xl border border-background/10 flex flex-col items-center text-center hover:bg-background/10 transition-colors"
                    >
                        <Calendar className="w-12 h-12 text-lemon-yellow mb-6" />
                        <h3 className="text-2xl font-bold mb-2">Datum</h3>
                        <p className="text-xl text-background/80">Zaterdag</p>
                        <p className="text-3xl font-bold text-cobalt-green my-2">24 Juni 2026</p>
                        <p className="text-background/60">Zet het in je agenda!</p>
                    </motion.div>

                    {/* Time */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-background/5 p-8 rounded-2xl border border-background/10 flex flex-col items-center text-center hover:bg-background/10 transition-colors"
                    >
                        <Clock className="w-12 h-12 text-lemon-yellow mb-6" />
                        <h3 className="text-2xl font-bold mb-2">Tijd</h3>
                        <ul className="text-background/80 space-y-2">
                            <li><strong className="text-cobalt-green">14:00</strong> - Inloop</li>
                            <li><strong className="text-cobalt-green">15:00</strong> - Ceremonie</li>
                            <li><strong className="text-cobalt-green">17:00</strong> - Borrel & Diner</li>
                            <li><strong className="text-cobalt-green">20:30</strong> - Feest!</li>
                        </ul>
                    </motion.div>

                    {/* Location */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-background/5 p-8 rounded-2xl border border-background/10 flex flex-col items-center text-center hover:bg-background/10 transition-colors"
                    >
                        <MapPin className="w-12 h-12 text-lemon-yellow mb-6" />
                        <h3 className="text-2xl font-bold mb-2">Locatie</h3>
                        <p className="text-xl font-bold text-cobalt-green mb-1">Kasteel de Hooge Vuursche</p>
                        <p className="text-background/80">Hilversumsestraatweg 14</p>
                        <p className="text-background/80 mb-4">3744 KC Baarn</p>
                        <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-lemon-yellow hover:underline"
                        >
                            Bekijk op kaart &rarr;
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

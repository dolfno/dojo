"use client";

import { motion } from "framer-motion";

const SIGHTSEEING_MAP_EMBED_SRC =
    "https://www.google.com/maps/d/u/0/embed?mid=1zIJt98YoVSinzeLOVRqIyKqGpOXDCsU&ehbc=2E312F&noprof=1";

export function Buurt() {
    return (
        <section id="buurt" className="py-16 md:py-24 bg-steel-azure scroll-mt-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-golden-glow mb-4">Sightseeing</h2>
                    <p className="text-white/80 text-lg">
                        Zin om de buurt te verkennen? Hieronder een paar van onze
                        favoriete plekken om de hoek, met hier en daar een referentie
                        naar Dolfs jeugd. Klik op de pinnetjes voor de omschrijving.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden bg-white aspect-[4/3] md:aspect-[16/9]"
                >
                    <iframe
                        src={SIGHTSEEING_MAP_EMBED_SRC}
                        className="w-full h-full border-0"
                        loading="lazy"
                        title="Sightseeing in de buurt"
                    />
                </motion.div>
            </div>
        </section>
    );
}

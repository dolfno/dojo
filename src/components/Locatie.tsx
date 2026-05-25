"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Car, Sparkles, Tent, ShowerHead, ExternalLink } from "lucide-react";

const GOOGLE_EARTH_URL =
    "https://earth.google.com/web/@52.52598214,6.03351365,-1.26921038a,570.55559296d,30y,208.19092514h,60t,0r/data=CgRCAggBMigKJgokCiAxeklKdDk4WW9WU2luemVMT1ZScUl5S3FHcE9YRENzVSACQgIIAEoICKPXqbYGEAE?authuser=0&utm_source=mymaps";

const faciliteiten = [
    { icon: Car, label: "Parkeren" },
    { icon: Sparkles, label: "Ontvangst zaterdag" },
    { icon: Tent, label: "Camping" },
    { icon: ShowerHead, label: "WCs & douches" },
];

export function Locatie() {
    return (
        <section id="locatie" className="py-16 md:py-24 bg-background scroll-mt-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-steel-azure mb-4">Op het terrein</h2>
                </motion.div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.a
                        href={GOOGLE_EARTH_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="group lg:col-span-2 relative block rounded-[2.5rem] overflow-hidden bg-sage-green/10 aspect-[4/3]"
                    >
                        <Image
                            src="/plattegrond-terrein.png"
                            alt="Plattegrond van het terrein met parkeren, camping en feestlocatie"
                            fill
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-golden-glow text-steel-azure text-xs font-bold px-3 py-2 rounded-full shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                            Open in Google Earth
                            <ExternalLink size={12} />
                        </span>
                    </motion.a>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-sage-green rounded-[2.5rem] p-8 flex flex-col gap-5"
                    >
                        <h3 className="text-xl font-bold text-white">Wat vind je waar</h3>
                        <ul className="flex flex-col gap-4">
                            {faciliteiten.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-center gap-3 text-white/90">
                                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15 shrink-0">
                                        <Icon size={18} />
                                    </span>
                                    <span className="text-sm">{label}</span>
                                </li>
                            ))}
                        </ul>
                        <a
                            href={GOOGLE_EARTH_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex items-center justify-center gap-2 bg-golden-glow hover:bg-golden-glow/90 transition-colors text-steel-azure text-sm font-bold px-4 py-3 rounded-full"
                        >
                            Bekijk in Google Earth
                            <ExternalLink size={14} />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

const timelineEvents = [
    {
        year: "2018",
        title: "De Ontmoeting",
        description: "Het begon allemaal op een zonnige dag in Amsterdam...",
        align: "left",
    },
    {
        year: "2020",
        title: "Samenwonen",
        description: "Onze eerste stap naar een gezamenlijke toekomst in ons droomhuis.",
        align: "right",
    },
    {
        year: "2023",
        title: "Het Aanzoek",
        description: "Op een bergtop in Japan, met de zon die langzaam onderging...",
        align: "left",
    },
    {
        year: "2026",
        title: "De Bruiloft",
        description: "Het moment waar we nu naar uitkijken: onze grote dag met jullie!",
        align: "right",
    },
];

export function Story() {
    return (
        <section id="story" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-cobalt-green mb-4">Ons Verhaal</h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        Van de eerste blik tot het ja-woord. Een reis vol liefde en avontuur.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-cobalt-green/20 hidden md:block" />

                    <div className="flex flex-col gap-12 md:gap-24">
                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={clsx(
                                    "flex flex-col md:flex-row items-center gap-8 md:gap-16",
                                    event.align === "right" ? "md:flex-row-reverse" : ""
                                )}
                            >
                                {/* Content */}
                                <div className={clsx("flex-1 text-center", event.align === "right" ? "md:text-left" : "md:text-right")}>
                                    <span className="text-lemon-yellow font-bold text-xl block mb-2">{event.year}</span>
                                    <h3 className="text-2xl font-bold text-foreground mb-3">{event.title}</h3>
                                    <p className="text-foreground/70 leading-relaxed">{event.description}</p>
                                </div>

                                {/* Center Dot */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className="w-4 h-4 rounded-full bg-cobalt-green ring-4 ring-background shadow-lg" />
                                </div>

                                {/* Image Placeholder / Empty Space */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

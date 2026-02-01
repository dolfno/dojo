"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Wine, UtensilsCrossed, PartyPopper, Heart } from "lucide-react";

export function Programma() {
    return (
        <section id="programma" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-cobalt-green mb-4">Programma</h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        Een weekend vol liefde, lachen en feest!
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto grid gap-12 md:grid-cols-2">
                    {/* Vrijdag */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-3xl p-8 shadow-xl border border-foreground/5"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-lemon-yellow/20 rounded-full">
                                <Calendar className="w-6 h-6 text-lemon-yellow" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Vrijdag</h3>
                                <p className="text-foreground/60">26 juni 2026</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50">
                                <Wine className="w-5 h-5 text-cobalt-green mt-1" />
                                <div>
                                    <p className="font-bold">Welkomstborrel</p>
                                    <p className="text-sm text-foreground/60">
                                        Kom gezellig alvast kennismaken en proosten op het weekend!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Zaterdag */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 shadow-xl border border-foreground/5"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-cobalt-green/20 rounded-full">
                                <Calendar className="w-6 h-6 text-cobalt-green" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Zaterdag</h3>
                                <p className="text-foreground/60">27 juni 2026</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-cobalt-green/5">
                                <Clock className="w-5 h-5 text-cobalt-green mt-1" />
                                <div>
                                    <p className="font-bold">15:00 - Ceremonie</p>
                                    <p className="text-sm text-foreground/60">
                                        Het moment waar het allemaal om draait
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50">
                                <Heart className="w-5 h-5 text-burnt-sienna mt-1" />
                                <div>
                                    <p className="font-bold">Borrel</p>
                                    <p className="text-sm text-foreground/60">
                                        Proosten op de liefde
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50">
                                <UtensilsCrossed className="w-5 h-5 text-lemon-yellow mt-1" />
                                <div>
                                    <p className="font-bold">Diner</p>
                                    <p className="text-sm text-foreground/60">
                                        Samen tafelen
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-background/50">
                                <PartyPopper className="w-5 h-5 text-wedding-blue mt-1" />
                                <div>
                                    <p className="font-bold">Feest</p>
                                    <p className="text-sm text-foreground/60">
                                        Dansen tot in de late uurtjes!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Tent, Car, ShowerHead, Moon, Home } from "lucide-react";
import Image from "next/image";

export function Camping() {
    return (
        <section id="camping" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-cobalt-green mb-4">Overnachten</h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        Blijf slapen onder de sterren of regel je eigen verblijf!
                    </p>
                </motion.div>

                {/* Sleeping Options Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-foreground/5">
                            <div className="flex items-center gap-3 mb-4">
                                <Moon className="w-6 h-6 text-lemon-yellow" />
                                <h3 className="text-xl font-bold">Vrijdag → Zaterdag</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-foreground/70">
                                    <Tent className="w-5 h-5 text-cobalt-green" />
                                    <span>Kamperen op de locatie</span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground/70">
                                    <Home className="w-5 h-5 text-burnt-sienna" />
                                    <span>Eigen accommodatie regelen</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-foreground/5">
                            <div className="flex items-center gap-3 mb-4">
                                <Moon className="w-6 h-6 text-lemon-yellow" />
                                <h3 className="text-xl font-bold">Zaterdag → Zondag</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-foreground/70">
                                    <Tent className="w-5 h-5 text-cobalt-green" />
                                    <span>Kamperen op de locatie</span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground/70">
                                    <Home className="w-5 h-5 text-burnt-sienna" />
                                    <span>Eigen accommodatie regelen</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
                    >
                        <Image
                            src="/camping.jpg"
                            alt="Camping area overview"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                        <div className="absolute bottom-6 left-6 text-white font-bold text-xl">
                            De Camping
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-cobalt-green/10 rounded-full mt-1">
                                    <Car className="w-6 h-6 text-cobalt-green" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Bereikbaarheid</h3>
                                    <p className="text-foreground/70">
                                        De camping is goed bereikbaar met de auto en camper.
                                        Je kunt je voertuig dichtbij je kampeerplek parkeren.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-lemon-yellow/10 rounded-full mt-1">
                                    <ShowerHead className="w-6 h-6 text-lemon-yellow" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Faciliteiten</h3>
                                    <p className="text-foreground/70">
                                        Geen zorgen over comfort! Er zijn warme douches en schone toiletten aanwezig
                                        op het terrein.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-burnt-sienna/10 rounded-full mt-1">
                                    <Tent className="w-6 h-6 text-burnt-sienna" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Neem mee</h3>
                                    <p className="text-foreground/70">
                                        Breng je eigen tent, slaapzak en matje mee. Heb je geen tent?
                                        Laat het ons weten via de RSVP!
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

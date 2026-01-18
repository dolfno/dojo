"use client";

import { motion } from "framer-motion";
import { Hotel, Car, Train } from "lucide-react";

export function Travel() {
    return (
        <section id="details" className="py-24 bg-background relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-cobalt-green mb-4">Reis & Verblijf</h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        Tips voor overnachtingen en vervoer naar de locatie.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Hotels */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-lemon-yellow/10 rounded-full">
                                <Hotel className="w-8 h-8 text-lemon-yellow" />
                            </div>
                            <h3 className="text-2xl font-bold">Overnachten</h3>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-foreground/5 hover:shadow-md transition-shadow">
                            <h4 className="text-xl font-bold text-cobalt-green mb-2">Kasteel de Hooge Vuursche</h4>
                            <p className="text-foreground/70 mb-4">
                                Blijf slapen op de trouwlocatie! Er zijn een beperkt aantal kamers beschikbaar.
                            </p>
                            <a href="#" className="text-sm font-bold text-foreground hover:text-cobalt-green underline">Boek een kamer &rarr;</a>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-foreground/5 hover:shadow-md transition-shadow">
                            <h4 className="text-xl font-bold text-cobalt-green mb-2">Hotel Baarn</h4>
                            <p className="text-foreground/70 mb-4">
                                Een gezellig hotel op 5 minuten rijden van de locatie.
                            </p>
                            <a href="#" className="text-sm font-bold text-foreground hover:text-cobalt-green underline">Bekijk website &rarr;</a>
                        </div>
                    </motion.div>

                    {/* Transport */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-wedding-blue/10 rounded-full">
                                <Car className="w-8 h-8 text-wedding-blue" />
                            </div>
                            <h3 className="text-2xl font-bold">Vervoer</h3>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-foreground/5">
                            <div className="flex items-start gap-4 mb-4">
                                <Car className="w-6 h-6 text-foreground/40 mt-1" />
                                <div>
                                    <h4 className="font-bold mb-1">Met de auto</h4>
                                    <p className="text-foreground/70 text-sm">
                                        Er is voldoende gratis parkeergelegenheid op het terrein van het kasteel.
                                        Navigeer naar: Hilversumsestraatweg 14, Baarn.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Train className="w-6 h-6 text-foreground/40 mt-1" />
                                <div>
                                    <h4 className="font-bold mb-1">Openbaar Vervoer</h4>
                                    <p className="text-foreground/70 text-sm">
                                        Station Baarn is het dichtstbijzijnde station. Vanaf daar is het ongeveer
                                        5 minuten met de taxi of 20 minuten lopen door het bos.
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

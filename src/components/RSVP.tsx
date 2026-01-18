"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";

export function RSVP() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        attending: "yes",
        dietary: "",
        song: "",
        campingFriday: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <section id="rsvp" className="py-24 bg-background relative">
            <div className="container mx-auto px-6 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-cobalt-green mb-4">RSVP</h2>
                    <p className="text-foreground/60">
                        Laat ons weten of je erbij bent! Reageer graag voor 1 mei 2026.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-foreground/5"
                >
                    {isSubmitted ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-cobalt-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-cobalt-green" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">Bedankt!</h3>
                            <p className="text-foreground/60">
                                We hebben je reactie ontvangen. We kijken ernaar uit je te zien!
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-2">
                                    Naam (en eventuele partner)
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-cobalt-green focus:ring-2 focus:ring-cobalt-green/20 outline-none transition-all bg-background"
                                    placeholder="Jouw naam"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-cobalt-green focus:ring-2 focus:ring-cobalt-green/20 outline-none transition-all bg-background"
                                    placeholder="jouw@email.com"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground/70 mb-2">
                                    Ben je erbij?
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="yes"
                                            className="peer sr-only"
                                            checked={formState.attending === "yes"}
                                            onChange={(e) => setFormState({ ...formState, attending: e.target.value })}
                                        />
                                        <div className="p-4 rounded-xl border border-foreground/10 peer-checked:border-cobalt-green peer-checked:bg-cobalt-green/5 text-center transition-all">
                                            <span className="font-bold block mb-1">Ja, natuurlijk!</span>
                                            <span className="text-xs text-foreground/60">Ik wil dit niet missen</span>
                                        </div>
                                    </label>
                                    <label className="flex-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="attending"
                                            value="no"
                                            className="peer sr-only"
                                            checked={formState.attending === "no"}
                                            onChange={(e) => setFormState({ ...formState, attending: e.target.value })}
                                        />
                                        <div className="p-4 rounded-xl border border-foreground/10 peer-checked:border-burnt-sienna peer-checked:bg-burnt-sienna/5 text-center transition-all">
                                            <span className="font-bold block mb-1">Helaas niet</span>
                                            <span className="text-xs text-foreground/60">Ik ben er niet bij</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {formState.attending === "yes" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="space-y-6 overflow-hidden"
                                >
                                    <div>
                                        <label htmlFor="dietary" className="block text-sm font-medium text-foreground/70 mb-2">
                                            Dieetwensen / Allergieën
                                        </label>
                                        <input
                                            type="text"
                                            id="dietary"
                                            className="w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-cobalt-green focus:ring-2 focus:ring-cobalt-green/20 outline-none transition-all bg-background"
                                            placeholder="Bijv. vegetarisch, gluten..."
                                            value={formState.dietary}
                                            onChange={(e) => setFormState({ ...formState, dietary: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 p-4 rounded-xl border border-foreground/10 bg-background/50">
                                        <input
                                            type="checkbox"
                                            id="campingFriday"
                                            className="w-5 h-5 rounded border-foreground/20 text-cobalt-green focus:ring-cobalt-green"
                                            checked={formState.campingFriday}
                                            onChange={(e) => setFormState({ ...formState, campingFriday: e.target.checked })}
                                        />
                                        <label htmlFor="campingFriday" className="text-sm font-medium text-foreground/80 cursor-pointer select-none">
                                            Ik wil vrijdag al komen kamperen! ⛺️
                                        </label>
                                    </div>

                                    <div>
                                        <label htmlFor="song" className="block text-sm font-medium text-foreground/70 mb-2">
                                            Welk nummer krijg jou op de dansvloer? 💃🕺
                                        </label>
                                        <input
                                            type="text"
                                            id="song"
                                            className="w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-cobalt-green focus:ring-2 focus:ring-cobalt-green/20 outline-none transition-all bg-background"
                                            placeholder="Artist - Title"
                                            value={formState.song}
                                            onChange={(e) => setFormState({ ...formState, song: e.target.value })}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-cobalt-green text-white font-bold py-4 rounded-xl hover:bg-cobalt-green/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {isSubmitting ? (
                                    "Versturen..."
                                ) : (
                                    <>
                                        Versturen <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, AlertCircle, PartyPopper } from "lucide-react";
import Image from "next/image";

interface FormState {
    name: string;
    email: string;
    attendingSaturday: "yes" | "no" | "";
    attendingFriday: "yes" | "no" | "";
    campingFriSat: boolean;
    campingSatSun: boolean;
    dietary: string;
}

export function RSVP() {
    const [formState, setFormState] = useState<FormState>({
        name: "",
        email: "",
        attendingSaturday: "",
        attendingFriday: "",
        campingFriSat: false,
        campingSatSun: false,
        dietary: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const endpoint = process.env.NEXT_PUBLIC_RSVP_ENDPOINT;

        if (!endpoint) {
            setError("RSVP systeem is niet geconfigureerd. Neem contact op met het bruidspaar.");
            setIsSubmitting(false);
            return;
        }

        try {
            await fetch(endpoint, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    attendingSaturday: formState.attendingSaturday,
                    attendingFriday: formState.attendingFriday,
                    campingFriSat: formState.campingFriSat,
                    campingSatSun: formState.campingSatSun,
                    dietary: formState.dietary,
                }),
            });

            setIsSubmitted(true);
        } catch {
            setError("Er is iets misgegaan. Probeer het later opnieuw of neem contact op met het bruidspaar.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const showFridayQuestion = formState.attendingSaturday === "yes";
    const showCampingOptions = formState.attendingSaturday === "yes";
    const showDietary = formState.attendingSaturday === "yes" || formState.attendingFriday === "yes";

    return (
        <section id="rsvp" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">RSVP</h2>
                    <p className="text-foreground/60 text-lg">
                        Laat ons weten of je erbij bent! Reageer graag voor 1 mei 2026.
                    </p>
                </motion.div>

                {/* Card with background image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto relative rounded-[2.5rem] overflow-hidden min-h-[600px] md:min-h-[700px]"
                >
                    {/* Background image */}
                    <div className="absolute inset-0">
                        <Image
                            src="/verkleed.jpeg"
                            alt=""
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Glassmorphism form overlay - positioned at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 md:bottom-6 md:left-6 md:right-auto md:max-w-md p-4 md:p-0">
                        <div className="backdrop-blur-xl bg-black/40 rounded-[2rem] p-6 md:p-8 text-white">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                        className="w-20 h-20 bg-cobalt-green rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <PartyPopper className="w-10 h-10 text-foreground" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold mb-2">Bedankt!</h3>
                                    <p className="text-white/70">
                                        We hebben je reactie ontvangen. Tot op het feest!
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && (
                                        <div className="p-3 rounded-xl bg-burnt-sienna/20 border border-burnt-sienna/30 flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-burnt-sienna flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-white/90">{error}</p>
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1.5">
                                            Naam (en eventuele partner)
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:border-cobalt-green focus:ring-2 focus:ring-cobalt-green/20 outline-none transition-all"
                                            placeholder="Jouw naam"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:border-cobalt-green focus:ring-2 focus:ring-cobalt-green/20 outline-none transition-all"
                                            placeholder="jouw@email.com"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-1.5">
                                            Ben je erbij op zaterdag 27 juni?
                                        </label>
                                        <div className="flex gap-2">
                                            <label className="flex-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="attendingSaturday"
                                                    value="yes"
                                                    className="peer sr-only"
                                                    required
                                                    checked={formState.attendingSaturday === "yes"}
                                                    onChange={(e) => setFormState({
                                                        ...formState,
                                                        attendingSaturday: e.target.value as "yes",
                                                        attendingFriday: "",
                                                        campingFriSat: false,
                                                        campingSatSun: false,
                                                    })}
                                                />
                                                <div className="p-3 rounded-xl border border-white/20 bg-white/5 peer-checked:border-cobalt-green peer-checked:bg-cobalt-green/20 text-center transition-all hover:border-white/40">
                                                    <span className="font-bold">Ja!</span>
                                                </div>
                                            </label>
                                            <label className="flex-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="attendingSaturday"
                                                    value="no"
                                                    className="peer sr-only"
                                                    checked={formState.attendingSaturday === "no"}
                                                    onChange={(e) => setFormState({
                                                        ...formState,
                                                        attendingSaturday: e.target.value as "no",
                                                        attendingFriday: "no",
                                                        campingFriSat: false,
                                                        campingSatSun: false,
                                                    })}
                                                />
                                                <div className="p-3 rounded-xl border border-white/20 bg-white/5 peer-checked:border-burnt-sienna peer-checked:bg-burnt-sienna/20 text-center transition-all hover:border-white/40">
                                                    <span className="font-bold">Helaas</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {showFridayQuestion && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="overflow-hidden"
                                        >
                                            <label className="block text-sm font-medium text-white/70 mb-1.5">
                                                Ook vrijdagavond 26 juni? (borrel)
                                            </label>
                                            <div className="flex gap-2">
                                                <label className="flex-1 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="attendingFriday"
                                                        value="yes"
                                                        className="peer sr-only"
                                                        checked={formState.attendingFriday === "yes"}
                                                        onChange={(e) => setFormState({ ...formState, attendingFriday: e.target.value as "yes" })}
                                                    />
                                                    <div className="p-2.5 rounded-xl border border-white/20 bg-white/5 peer-checked:border-lemon-yellow peer-checked:bg-lemon-yellow/20 text-center transition-all hover:border-white/40">
                                                        <span className="font-medium text-sm">Ja!</span>
                                                    </div>
                                                </label>
                                                <label className="flex-1 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="attendingFriday"
                                                        value="no"
                                                        className="peer sr-only"
                                                        checked={formState.attendingFriday === "no"}
                                                        onChange={(e) => setFormState({
                                                            ...formState,
                                                            attendingFriday: e.target.value as "no",
                                                            campingFriSat: false,
                                                        })}
                                                    />
                                                    <div className="p-2.5 rounded-xl border border-white/20 bg-white/5 peer-checked:border-white/40 peer-checked:bg-white/10 text-center transition-all hover:border-white/40">
                                                        <span className="font-medium text-sm">Nee</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </motion.div>
                                    )}

                                    {showCampingOptions && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="space-y-2 overflow-hidden"
                                        >
                                            <label className="block text-sm font-medium text-white/70">
                                                Wil je kamperen?
                                            </label>

                                            {formState.attendingFriday === "yes" && (
                                                <div className="flex items-center gap-3 p-3 rounded-xl border border-white/20 bg-white/5 hover:border-white/30 transition-all">
                                                    <input
                                                        type="checkbox"
                                                        id="campingFriSat"
                                                        className="w-4 h-4 rounded border-white/30 bg-white/10 text-cobalt-green focus:ring-cobalt-green"
                                                        checked={formState.campingFriSat}
                                                        onChange={(e) => setFormState({ ...formState, campingFriSat: e.target.checked })}
                                                    />
                                                    <label htmlFor="campingFriSat" className="text-sm cursor-pointer select-none">
                                                        Vrij → Zat (26 → 27 juni)
                                                    </label>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-3 p-3 rounded-xl border border-white/20 bg-white/5 hover:border-white/30 transition-all">
                                                <input
                                                    type="checkbox"
                                                    id="campingSatSun"
                                                    className="w-4 h-4 rounded border-white/30 bg-white/10 text-cobalt-green focus:ring-cobalt-green"
                                                    checked={formState.campingSatSun}
                                                    onChange={(e) => setFormState({ ...formState, campingSatSun: e.target.checked })}
                                                />
                                                <label htmlFor="campingSatSun" className="text-sm cursor-pointer select-none">
                                                    Zat → Zon (27 → 28 juni)
                                                </label>
                                            </div>
                                        </motion.div>
                                    )}

                                    {showDietary && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="overflow-hidden"
                                        >
                                            <label htmlFor="dietary" className="block text-sm font-medium text-white/70 mb-1.5">
                                                Dieetwensen / Allergieën
                                            </label>
                                            <input
                                                type="text"
                                                id="dietary"
                                                className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:border-cobalt-green focus:ring-2 focus:ring-cobalt-green/20 outline-none transition-all text-sm"
                                                placeholder="Bijv. vegetarisch, glutenvrij..."
                                                value={formState.dietary}
                                                onChange={(e) => setFormState({ ...formState, dietary: e.target.value })}
                                            />
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-cobalt-green text-foreground font-bold py-3 rounded-xl hover:bg-cobalt-green/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
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
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

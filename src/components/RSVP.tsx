"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";

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

            // With no-cors mode, we can't read the response, but if no error thrown, assume success
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
                                We hebben je reactie ontvangen. Je ontvangt een bevestiging per email.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 rounded-xl bg-burnt-sienna/10 border border-burnt-sienna/20 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-burnt-sienna flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-burnt-sienna">{error}</p>
                                </div>
                            )}

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
                                    Ben je erbij op zaterdag 20 juni? (de bruiloft)
                                </label>
                                <div className="flex gap-4">
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
                                                // Reset dependent fields when changing
                                                attendingFriday: "",
                                                campingFriSat: false,
                                                campingSatSun: false,
                                            })}
                                        />
                                        <div className="p-4 rounded-xl border border-foreground/10 peer-checked:border-cobalt-green peer-checked:bg-cobalt-green/5 text-center transition-all">
                                            <span className="font-bold block mb-1">Ja, natuurlijk!</span>
                                            <span className="text-xs text-foreground/60">Ik wil dit niet missen</span>
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
                                        <div className="p-4 rounded-xl border border-foreground/10 peer-checked:border-burnt-sienna peer-checked:bg-burnt-sienna/5 text-center transition-all">
                                            <span className="font-bold block mb-1">Helaas niet</span>
                                            <span className="text-xs text-foreground/60">Ik ben er niet bij</span>
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
                                    <label className="block text-sm font-medium text-foreground/70 mb-2">
                                        Kom je ook vrijdagavond 19 juni? (borrel & kamperen)
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="attendingFriday"
                                                value="yes"
                                                className="peer sr-only"
                                                checked={formState.attendingFriday === "yes"}
                                                onChange={(e) => setFormState({ ...formState, attendingFriday: e.target.value as "yes" })}
                                            />
                                            <div className="p-4 rounded-xl border border-foreground/10 peer-checked:border-cobalt-green peer-checked:bg-cobalt-green/5 text-center transition-all">
                                                <span className="font-bold block mb-1">Ja!</span>
                                                <span className="text-xs text-foreground/60">Ik kom alvast</span>
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
                                            <div className="p-4 rounded-xl border border-foreground/10 peer-checked:border-burnt-sienna peer-checked:bg-burnt-sienna/5 text-center transition-all">
                                                <span className="font-bold block mb-1">Nee</span>
                                                <span className="text-xs text-foreground/60">Alleen zaterdag</span>
                                            </div>
                                        </label>
                                    </div>
                                </motion.div>
                            )}

                            {showCampingOptions && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="space-y-3 overflow-hidden"
                                >
                                    <label className="block text-sm font-medium text-foreground/70">
                                        Wil je kamperen?
                                    </label>

                                    {formState.attendingFriday === "yes" && (
                                        <div className="flex items-center gap-3 p-4 rounded-xl border border-foreground/10 bg-background/50">
                                            <input
                                                type="checkbox"
                                                id="campingFriSat"
                                                className="w-5 h-5 rounded border-foreground/20 text-cobalt-green focus:ring-cobalt-green"
                                                checked={formState.campingFriSat}
                                                onChange={(e) => setFormState({ ...formState, campingFriSat: e.target.checked })}
                                            />
                                            <label htmlFor="campingFriSat" className="text-sm font-medium text-foreground/80 cursor-pointer select-none">
                                                Vrijdag op zaterdag (19 → 20 juni)
                                            </label>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 p-4 rounded-xl border border-foreground/10 bg-background/50">
                                        <input
                                            type="checkbox"
                                            id="campingSatSun"
                                            className="w-5 h-5 rounded border-foreground/20 text-cobalt-green focus:ring-cobalt-green"
                                            checked={formState.campingSatSun}
                                            onChange={(e) => setFormState({ ...formState, campingSatSun: e.target.checked })}
                                        />
                                        <label htmlFor="campingSatSun" className="text-sm font-medium text-foreground/80 cursor-pointer select-none">
                                            Zaterdag op zondag (20 → 21 juni)
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
                                    <label htmlFor="dietary" className="block text-sm font-medium text-foreground/70 mb-2">
                                        Dieetwensen / Allergieën
                                    </label>
                                    <input
                                        type="text"
                                        id="dietary"
                                        className="w-full px-4 py-3 rounded-xl border border-foreground/10 focus:border-cobalt-green focus:ring-2 focus:ring-cobalt-green/20 outline-none transition-all bg-background"
                                        placeholder="Bijv. vegetarisch, glutenvrij..."
                                        value={formState.dietary}
                                        onChange={(e) => setFormState({ ...formState, dietary: e.target.value })}
                                    />
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

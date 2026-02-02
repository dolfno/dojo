"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, AlertCircle, PartyPopper, Loader2 } from "lucide-react";
import { ResponsiveImage } from "./ResponsiveImage";

interface AddressLookupResult {
    straat: string;
    plaats: string;
}

interface FormState {
    name: string;
    email: string;
    postcode: string;
    huisnummer: string;
    straat: string;
    woonplaats: string;
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
        postcode: "",
        huisnummer: "",
        straat: "",
        woonplaats: "",
        attendingSaturday: "",
        attendingFriday: "",
        campingFriSat: false,
        campingSatSun: false,
        dietary: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLookingUpAddress, setIsLookingUpAddress] = useState(false);
    const [addressError, setAddressError] = useState<string | null>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const lastLookupRef = useRef<string>("");

    // Postcode lookup effect
    useEffect(() => {
        // Clear previous debounce
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Normalize postcode (remove spaces, uppercase)
        const normalizedPostcode = formState.postcode.replace(/\s/g, "").toUpperCase();
        const isValidPostcode = /^[0-9]{4}[A-Z]{2}$/.test(normalizedPostcode);
        const huisnummer = formState.huisnummer.trim();
        const hasHuisnummer = huisnummer.length > 0;
        const lookupKey = `${normalizedPostcode}/${huisnummer}`;

        // Clear address if postcode or huisnummer is not valid
        if (!isValidPostcode || !hasHuisnummer) {
            lastLookupRef.current = "";
            setAddressError(null);
            setFormState(prev => {
                if (prev.straat || prev.woonplaats) {
                    return { ...prev, straat: "", woonplaats: "" };
                }
                return prev;
            });
            return;
        }

        // Skip if same lookup as before
        if (lookupKey === lastLookupRef.current) {
            return;
        }

        // Debounce the lookup
        debounceRef.current = setTimeout(async () => {
            setIsLookingUpAddress(true);
            setAddressError(null);

            try {
                const response = await fetch(
                    `https://gratis-postcodedata.nl/api/postcode/${normalizedPostcode}/${huisnummer}`
                );

                if (!response.ok) {
                    setAddressError("Adres niet gevonden");
                    setFormState(prev => ({ ...prev, straat: "", woonplaats: "" }));
                    lastLookupRef.current = "";
                    return;
                }

                const results: AddressLookupResult[] = await response.json();
                if (!results || results.length === 0) {
                    setAddressError("Adres niet gevonden");
                    setFormState(prev => ({ ...prev, straat: "", woonplaats: "" }));
                    lastLookupRef.current = "";
                    return;
                }

                const data = results[0];
                lastLookupRef.current = lookupKey;
                setFormState(prev => ({
                    ...prev,
                    straat: data.straat,
                    woonplaats: data.plaats,
                }));
            } catch {
                setAddressError("Kon adres niet ophalen");
                setFormState(prev => ({ ...prev, straat: "", woonplaats: "" }));
                lastLookupRef.current = "";
            } finally {
                setIsLookingUpAddress(false);
            }
        }, 400);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [formState.postcode, formState.huisnummer]);

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
                    postcode: formState.postcode.replace(/\s/g, "").toUpperCase(),
                    huisnummer: formState.huisnummer,
                    straat: formState.straat,
                    woonplaats: formState.woonplaats,
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
        <section id="rsvp" className="py-24 bg-sage-green">
            <div className="container mx-auto px-6">
                {/* Title - outside the image */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-8"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">RSVP</h2>
                    <p className="text-white/90 text-base md:text-lg">
                        Laat ons weten of je erbij bent!<br />
                        Reageer graag voor 1 maart 2026.
                    </p>
                </motion.div>

                {/* Card with background image and form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto flex flex-col md:flex-row rounded-[2.5rem] overflow-hidden"
                >
                    {/* Background image - left side on desktop, optimized WebP with lazy loading */}
                    <div className="relative h-64 md:h-auto md:flex-1 md:min-h-[500px]">
                        <ResponsiveImage
                            baseName="verkleed-background"
                            alt=""
                            fill
                            loading="lazy"
                            sizes={[640, 1024]}
                            sizesAttr="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-top"
                        />
                    </div>

                    {/* Form - right side on desktop */}
                    <div className="bg-steel-azure/90 backdrop-blur-xl p-6 md:p-8 text-white md:w-[400px] md:flex-shrink-0">
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
                                    className="w-20 h-20 bg-golden-glow rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <PartyPopper className="w-10 h-10 text-steel-azure" />
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-2">Bedankt!</h3>
                                <p className="text-white/70">
                                    We hebben je reactie ontvangen. Tot op het feest!
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="p-3 rounded-xl bg-brandy/20 border border-brandy/30 flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-brandy flex-shrink-0 mt-0.5" />
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
                                        className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 outline-none transition-all"
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
                                        className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 outline-none transition-all"
                                        placeholder="jouw@email.com"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    />
                                </div>

                                {/* Address fields */}
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label htmlFor="postcode" className="block text-sm font-medium text-white/70 mb-1.5">
                                            Postcode
                                        </label>
                                        <input
                                            type="text"
                                            id="postcode"
                                            required
                                            maxLength={7}
                                            className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 outline-none transition-all uppercase"
                                            placeholder="1234AB"
                                            value={formState.postcode}
                                            onChange={(e) => setFormState({ ...formState, postcode: e.target.value })}
                                        />
                                    </div>
                                    <div className="w-24">
                                        <label htmlFor="huisnummer" className="block text-sm font-medium text-white/70 mb-1.5">
                                            Nr.
                                        </label>
                                        <input
                                            type="text"
                                            id="huisnummer"
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 outline-none transition-all"
                                            placeholder="12"
                                            value={formState.huisnummer}
                                            onChange={(e) => setFormState({ ...formState, huisnummer: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Auto-filled address display */}
                                {(isLookingUpAddress || formState.straat || addressError) && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="overflow-hidden"
                                    >
                                        {isLookingUpAddress ? (
                                            <div className="flex items-center gap-2 text-white/60 text-sm py-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Adres opzoeken...</span>
                                            </div>
                                        ) : addressError ? (
                                            <div className="text-brandy text-sm py-2">
                                                {addressError}
                                            </div>
                                        ) : (
                                            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                                <div className="text-sm text-white/60 mb-1">Adres</div>
                                                <div className="text-white">
                                                    {formState.straat} {formState.huisnummer}
                                                </div>
                                                <div className="text-white">
                                                    {formState.postcode.replace(/\s/g, "").toUpperCase()} {formState.woonplaats}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

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
                                            <div className="p-3 rounded-xl border-2 border-white/30 bg-white/10 peer-checked:border-golden-glow peer-checked:bg-golden-glow peer-checked:text-steel-azure text-center transition-all hover:border-white/50">
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
                                            <div className="p-3 rounded-xl border-2 border-white/30 bg-white/10 peer-checked:border-brandy peer-checked:bg-brandy text-center transition-all hover:border-white/50">
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
                                                    required
                                                    checked={formState.attendingFriday === "yes"}
                                                    onChange={(e) => setFormState({ ...formState, attendingFriday: e.target.value as "yes" })}
                                                />
                                                <div className="p-2.5 rounded-xl border-2 border-white/30 bg-white/10 peer-checked:border-golden-glow peer-checked:bg-golden-glow peer-checked:text-steel-azure text-center transition-all hover:border-white/50">
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
                                                <div className="p-2.5 rounded-xl border-2 border-white/30 bg-white/10 peer-checked:border-brandy peer-checked:bg-brandy text-center transition-all hover:border-white/50">
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
                                            <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-white/30 bg-white/10 hover:border-white/50 has-[:checked]:border-sage-green has-[:checked]:bg-sage-green has-[:checked]:text-white transition-all">
                                                <input
                                                    type="checkbox"
                                                    id="campingFriSat"
                                                    className="w-4 h-4 rounded border-white/50 bg-white/20 text-sage-green focus:ring-sage-green accent-white"
                                                    checked={formState.campingFriSat}
                                                    onChange={(e) => setFormState({ ...formState, campingFriSat: e.target.checked })}
                                                />
                                                <label htmlFor="campingFriSat" className="text-sm cursor-pointer select-none font-medium">
                                                    Vrij → Zat (26 → 27 juni)
                                                </label>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-white/30 bg-white/10 hover:border-white/50 has-[:checked]:border-sage-green has-[:checked]:bg-sage-green has-[:checked]:text-white transition-all">
                                            <input
                                                type="checkbox"
                                                id="campingSatSun"
                                                className="w-4 h-4 rounded border-white/50 bg-white/20 text-sage-green focus:ring-sage-green accent-white"
                                                checked={formState.campingSatSun}
                                                onChange={(e) => setFormState({ ...formState, campingSatSun: e.target.checked })}
                                            />
                                            <label htmlFor="campingSatSun" className="text-sm cursor-pointer select-none font-medium">
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
                                            Dieetwensen / Opmerkingen
                                        </label>
                                        <input
                                            type="text"
                                            id="dietary"
                                            className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/40 focus:border-sage-green focus:ring-2 focus:ring-sage-green/20 outline-none transition-all text-sm"
                                            placeholder="Bijv. vegetarisch, of andere opmerkingen..."
                                            value={formState.dietary}
                                            onChange={(e) => setFormState({ ...formState, dietary: e.target.value })}
                                        />
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting || isLookingUpAddress || (formState.postcode.length > 0 && !formState.straat)}
                                    className="w-full bg-golden-glow text-steel-azure font-bold py-3 rounded-xl hover:bg-golden-glow/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
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
                </motion.div>
            </div>
        </section>
    );
}

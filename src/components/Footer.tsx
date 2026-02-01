"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqItems = [
    {
        question: "Wat is de dresscode?",
        answer: "Feestelijk chic! Denk aan een mooie jurk of een net pak. De ceremonie en het feest zijn buiten én binnen, dus houd rekening met het weer en neem eventueel een extra laagje mee.",
    },
    {
        question: "Kan ik mijn kinderen meenemen?",
        answer: "Helaas is dit een feest alleen voor volwassenen. We hopen dat jullie een oppas kunnen regelen en lekker onbezorgd kunnen feesten!",
    },
    {
        question: "Hoe zit het met parkeren?",
        answer: "Er is voldoende (gratis) parkeergelegenheid bij de locatie. Je kunt je auto ook laten staan als je blijft kamperen.",
    },
    {
        question: "Hoe kan ik dieetwensen doorgeven?",
        answer: "Bij het RSVP-formulier kun je je dieetwensen en allergieën invullen. Vergeten? Stuur ons dan even een berichtje!",
    },
    {
        question: "Hebben jullie cadeautips?",
        answer: "Jullie aanwezigheid is het mooiste cadeau! Mochten jullie toch iets willen geven, dan dragen we graag bij aan onze huwelijksreis.",
    },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/20 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-3 flex items-center justify-between text-left hover:text-golden-glow transition-colors"
            >
                <span className="text-sm font-medium">{question}</span>
                <ChevronDown
                    size={18}
                    className={`flex-shrink-0 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="text-sm text-white/70 pb-3">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function Footer() {
    return (
        <footer className="bg-brandy text-white py-16">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-6 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Jorinde & Dolf
                    </h2>

                    <p className="text-white/80 max-w-md text-lg">
                        <span className="text-2xl">❤️</span><br />
                        Heb je vragen? Neem gerust contact met ons op!
                    </p>

                    {/* FAQ Accordion */}
                    <div className="w-full max-w-md text-left">
                        <p className="text-xs text-white/50 uppercase tracking-wider mb-2 text-center">Veelgestelde vragen</p>
                        {faqItems.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>

                    <span className="text-2xl font-bold text-golden-glow">27.06.2026</span>

                    <div className="w-full max-w-xs h-px bg-white/20 my-4" />

                    <p className="text-sm text-white/60">
                        &copy; {new Date().getFullYear()} Jorinde & Dolf
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}

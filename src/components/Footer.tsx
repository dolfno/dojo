"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqItems = [
    {
        question: "Wat is de dresscode?",
        answer: "De dresscode is jouw allermooiste, meest feestelijke, extravagante outfit. Houd er rekening mee dat de ceremonie grotendeels buiten op het gras is en het feest en diner in een tent met een houten vloer.",
    },
    {
        question: "Zijn mijn kinderen welkom?",
        answer: "De bruiloft is helaas niet geschikt voor kids.",
    },
    {
        question: "Mag ik blijven slapen?",
        answer: "Ja gezellig! Je kunt je tentje opzetten op de weide tegenover het feest.",
    },
    {
        question: "Kan ik mijn camper meenemen?",
        answer: "Ja, geen probleem. Je auto ook.",
    },
    {
        question: "Wat zijn de faciliteiten op de camping?",
        answer: "WC's, douches, een ruimte met spiegels, elektriciteit en kippen.",
    },
    {
        question: "Hebben jullie cadeautips?",
        answer: "Persoonlijke gedichten zijn altijd welkom! Daarnaast sparen Dolf en Jorinde alvast voor het huwelijksjubileumfeest - donaties zijn welkom.",
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

                    <span className="text-2xl font-bold text-golden-glow">27.06.2026</span>

                    {/* FAQ Accordion */}
                    <div className="w-full max-w-md text-left mt-4">
                        <p className="text-xs text-white/50 uppercase tracking-wider mb-2 text-center">Veelgestelde vragen</p>
                        {faqItems.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                        <p className="text-sm text-white/60 text-center mt-4">
                            Staat je vraag er niet bij? Neem gerust contact met ons op!
                        </p>
                    </div>

                    <div className="w-full max-w-xs h-px bg-white/20 my-4" />

                    <p className="text-sm text-white/60">
                        <span className="text-lg">❤️</span><br />
                        &copy; {new Date().getFullYear()} Jorinde & Dolf
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}

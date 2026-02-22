import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Programma } from "@/components/Programma";
import { RSVP } from "@/components/RSVP";
import { Camping } from "@/components/Camping";

export const metadata: Metadata = {
  title: "Jorinde & Dolf | Het Feest",
  description: "Wij gaan trouwen! Vind hier alle informatie over ons feest.",
};

export default function PartyOnly() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Programma partyOnly />
      <Camping />
      <RSVP partyOnly />
    </div>
  );
}

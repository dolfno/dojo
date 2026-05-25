import { Hero } from "@/components/Hero";
import { Programma } from "@/components/Programma";
import { RSVP } from "@/components/RSVP";
import { Camping } from "@/components/Camping";
import { Locatie } from "@/components/Locatie";
import { Buurt } from "@/components/Buurt";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Programma />
      <Camping />
      <Locatie />
      <Buurt />
      <RSVP />
    </div>
  );
}

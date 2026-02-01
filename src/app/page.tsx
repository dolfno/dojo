import { Hero } from "@/components/Hero";
import { Programma } from "@/components/Programma";
import { RSVP } from "@/components/RSVP";
import { Camping } from "@/components/Camping";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Programma />
      <Camping />
      <RSVP />
    </div>
  );
}

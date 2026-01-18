import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { WeddingDetails } from "@/components/WeddingDetails";
import { RSVP } from "@/components/RSVP";
import { Travel } from "@/components/Travel";
import { Camping } from "@/components/Camping";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Story />
      <WeddingDetails />
      <Travel />
      <Camping />
      <RSVP />
      {/* Other sections will go here */}
    </div>
  );
}

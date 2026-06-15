import { About } from "@/feature/landing/components/about";

import { Hero } from "@/feature/landing/components/hero";
import { JoinTeam } from "@/feature/landing/components/join-team";
import { Testimonials } from "@/feature/landing/components/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      
      <Hero />
      <About />
      <JoinTeam />
      <Testimonials />
    </main>
  );
}

import Shell from '@/components/Shell';
import Hero from '@/components/Hero';
import { Marquee, Manifesto, Services, Realisations, Parc, Catalogues, Process, Zone, CtaBand } from '@/components/Sections';
import { Contact, Footer } from '@/components/Contact';

export default function Home() {
  return (
    <Shell>
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Realisations />
        <Parc />
        <Catalogues />
        <Process />
        <Zone />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </Shell>
  );
}

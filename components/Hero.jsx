'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ease, Lines, useIntroDone } from './motion';
import { heroSlides } from '@/lib/site';

const DURATION = 6500;

export default function Hero() {
  const start = useIntroDone();
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setI(n => (n + 1) % heroSlides.length), DURATION);
    return () => clearTimeout(t);
  }, [i, start]);

  return (
    <section className="hero" id="accueil" ref={ref}>
      <motion.div className="hero-slides" style={{ scale: imgScale }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="hero-slide"
            initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 1, transition: { duration: 1.4 } }}
            transition={{ duration: 1.4, ease }}
          >
            <motion.img
              src={heroSlides[i].src}
              alt={heroSlides[i].label}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              initial={{ scale: 1.25 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: DURATION / 1000 + 1.5, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div className="hero-content" style={{ y: contentY, opacity: contentOpacity }}>
        <div className="container">
          <motion.div className="hero-tag" initial={{ opacity: 0, y: 20 }} animate={start ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease, delay: 0.2 }}>
            <i /> Entreprise générale du BTP · Montpellier
          </motion.div>
          <Lines
            as="h1"
            start={start}
            delay={0.3}
            lines={[<>Votre projet,</>, <>notre <span className="serif">mission.</span></>]}
          />
          <motion.div className="hero-bottom" initial={{ opacity: 0, y: 30 }} animate={start ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.1, ease, delay: 0.8 }}>
            <p>Gros œuvre, villas individuelles, logements collectifs, VRD et carrelage dans l&apos;Hérault et le Gard. Plus de 25 ans d&apos;expérience, du terrassement à la livraison.</p>
            <div className="hero-ctas">
              <a href="#contact" className="btn">Demander un devis gratuit <span className="arrow">→</span></a>
              <a href="#realisations" className="btn btn-outline">Nos réalisations</a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="hero-meta" style={{ '--dur': `${DURATION}ms` }}>
        {heroSlides.map((s, n) => (
          <button key={s.src} className={`hero-dot ${n === i && start ? 'active' : ''}`} onClick={() => setI(n)}>
            {s.label}{s.real && <em className="real">Chantier HTP</em>} <span className="track"><span key={n === i ? i : 'idle'} /></span>
          </button>
        ))}
      </div>
      <div className="hero-scroll" />
    </section>
  );
}

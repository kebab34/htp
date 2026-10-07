'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { IntroContext, ease } from './motion';
import Nav from './Nav';
import PaletteSwitcher from './PaletteSwitcher';
import { LOGO_PATH, GOLD } from './Logo';

export default function Shell({ children }) {
  const [introDone, setIntroDone] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const lenisRef = useRef(null);

  // Défilement fluide + liens d'ancre animés
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.2, easing: t => 1 - Math.pow(1 - t, 4) });
    lenisRef.current = lenis;
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf); });
    const onClick = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: 0 });
    };
    document.addEventListener('click', onClick);
    return () => { cancelAnimationFrame(id); document.removeEventListener('click', onClick); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const l = lenisRef.current;
    if (!introDone) { l?.stop(); document.documentElement.style.overflow = 'hidden'; }
    else { l?.start(); document.documentElement.style.overflow = ''; }
  }, [introDone]);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <IntroContext.Provider value={introDone}>
      <AnimatePresence>
        {!introDone && (
          <motion.div
            className="intro"
            key="intro"
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1, ease }}
          >
            <svg className="intro-mark" viewBox="0 0 456 352" aria-hidden="true">
              <motion.path d={LOGO_PATH} fill="none" stroke={GOLD} strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease }} />
              <motion.path d={LOGO_PATH} fill={GOLD} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.9 }} />
            </svg>
            <div className="intro-word">
              {'HTP'.split('').map((l, i) => (
                <motion.span key={i} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.08 }}>
                  {l}
                </motion.span>
              ))}
            </div>
            <div className="intro-slogan">
              {['Votre projet,', 'notre mission !'].map((part, i) => (
                <span className="line-mask" key={part}>
                  <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.55 + i * 0.12 }}>
                    {i === 1 ? <>notre <em>mission</em> !</> : part}
                  </motion.span>
                </span>
              ))}
            </div>
            <div className="intro-bar">
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.1, ease }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Nav />
      {children}
      <a href="#contact" className={`mobile-cta ${pastHero ? 'show' : ''}`}>Devis gratuit →</a>
      <PaletteSwitcher />
    </IntroContext.Provider>
  );
}

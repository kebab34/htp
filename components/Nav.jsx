'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ease } from './motion';
import { site } from '@/lib/site';
import Logo from './Logo';

const links = [
  ['#savoir-faire', 'Savoir-faire'],
  ['#realisations', 'Réalisations'],
  ['#moyens', 'Moyens'],
  ['#catalogues', 'Catalogues'],
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.8);
      setHidden(y > last && y > 300);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`nav ${solid || open ? 'solid' : ''} ${hidden && !open ? 'hidden' : ''}`}>
        <div className="nav-inner">
          <a href="#accueil" className="logo" onClick={() => setOpen(false)}>
            <Logo />
          </a>
          <nav className="nav-links">
            {links.map(([href, label]) => (
              <a key={href} href={href}><span data-text={label}>{label}</span></a>
            ))}
            <a href="#contact" className="btn">Devis gratuit <span className="arrow">→</span></a>
          </nav>
          <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
            <i /><i />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.8, ease }}
          >
            {[...links, ['#contact', 'Contact']].map(([href, label], i) => (
              <span className="line-mask" key={href}>
                <motion.a href={href} onClick={() => setOpen(false)} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.06 }}>
                  {label}
                </motion.a>
              </span>
            ))}
            <div className="meta">
              <a href={`tel:${site.phoneLink}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

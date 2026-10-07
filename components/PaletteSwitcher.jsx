'use client';

// Sélecteur temporaire pour comparer les palettes. À retirer une fois la palette choisie
// (supprimer <PaletteSwitcher /> dans Shell.jsx et fixer data-palette dans app/layout.jsx).

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ease } from './motion';
import { palettes } from '@/lib/site';

export default function PaletteSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('laiton');

  useEffect(() => { setCurrent(document.documentElement.dataset.palette || 'laiton'); }, []);

  const choose = id => {
    document.documentElement.dataset.palette = id;
    try { localStorage.setItem('htp-palette', id); } catch {}
    setCurrent(id);
  };

  return (
    <div className="palette">
      <AnimatePresence>
        {open && (
          <motion.div
            className="palette-panel"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
          >
            <p>Choisissez une palette pour comparer le rendu :</p>
            {palettes.map(p => (
              <button key={p.id} className={`palette-opt ${current === p.id ? 'active' : ''}`} onClick={() => choose(p.id)}>
                <span className="duo">{p.swatch.map(c => <i key={c} style={{ background: c }} />)}</span>
                <span><b>{p.name}</b><small>{p.hint}</small></span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button className="palette-toggle" onClick={() => setOpen(o => !o)}>
        <span className="sw" /> Couleurs
      </button>
    </div>
  );
}

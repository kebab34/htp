'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion';

export const ease = [0.22, 1, 0.36, 1];

// Indique si l'intro est terminée, pour lancer les animations du haut de page au bon moment
export const IntroContext = createContext(true);
export const useIntroDone = () => useContext(IntroContext);

/** Titre dont chaque ligne monte depuis un masque. */
export function Lines({ lines, as: Tag = 'h2', className, delay = 0, start = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const show = inView && start;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <motion.span
            initial={{ y: '110%' }}
            animate={show ? { y: '0%' } : {}}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Élément qui apparaît en glissant vers le haut. */
export function FadeUp({ children, delay = 0, y = 40, className, as = 'div', ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Image avec révélation en rideau puis léger effet de parallaxe au défilement. */
export function RevealImage({ src, alt, className, strength = 8 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  // La détection se fait sur le conteneur : un élément entièrement masqué par clip-path n'est jamais « visible »
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  return (
    <motion.div ref={ref} className={className} style={{ position: 'absolute', inset: `-${strength}% 0`, y }}>
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
        transition={{ duration: 1.4, ease }}
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          initial={{ scale: 1.3 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.8, ease }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    </motion.div>
  );
}

/** Compteur qui défile jusqu'à sa valeur. */
export function Counter({ value, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2.2, ease, onUpdate: v => setN(v) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Counter, ease, FadeUp, Lines, RevealImage } from './motion';
import { LogoMark } from './Logo';
import { catalogues, clients, parc, partner, programmes, references, services, site, stats, steps, zones } from '@/lib/site';

/* ---------- Bandeau défilant, accéléré par le défilement ---------- */
export function Marquee() {
  const words = ['Gros œuvre', 'Villas', 'Logements collectifs', 'VRD', 'Carrelage', 'Salles de bains', 'Cuisines'];
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const ref = useRef(null);
  useAnimationFrame((_, delta) => {
    const speed = 0.04 + Math.min(Math.abs(scrollY.getVelocity()) / 20000, 0.25);
    const w = ref.current ? ref.current.scrollWidth / 2 : 1;
    x.set((x.get() - speed * delta) % w);
  });
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="marquee-track" ref={ref} style={{ x }}>
        {[...words, ...words].map((w, i) => <span className="marquee-item" key={i}>{w}</span>)}
      </motion.div>
    </div>
  );
}

/* ---------- Présentation : les mots s'allument au défilement ---------- */
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span className="word" style={{ opacity }}>{children}</motion.span>;
}

export function Manifesto() {
  const text = "Polyvalence absolue, disponibilité totale : nous faisons bouger les lignes sur chaque opération.";
  const words = text.split(' ');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  return (
    <section className="section manifesto" id="presentation">
      <div className="container">
        <div className="manifesto-grid">
          <div><span className="eyebrow">{site.legalName} · Montpellier</span></div>
          <div>
            <p className="manifesto-text" ref={ref}>
              {words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
              ))}
            </p>
            <div className="about">
              <FadeUp as="p">
                Implantée à Montpellier, la société {site.legalName} met l&apos;expertise et l&apos;expérience de ses dirigeants au service de tous
                les projets du BTP. Spécialisés dans le gros œuvre, les travaux de VRD et la fourniture et pose de carrelage, nous accompagnons
                nos clients avec rigueur et réactivité à chaque étape de leurs chantiers.
              </FadeUp>
              <FadeUp as="p" delay={0.1}>
                Du terrassement à la livraison de villas individuelles, modernes ou traditionnelles, et de logements collectifs, nous apportons
                une réponse globale aux maîtres d&apos;ouvrage, promoteurs et particuliers à la recherche d&apos;une entreprise générale de confiance.
              </FadeUp>
            </div>
          </div>
        </div>
        <div className="stats">
          {stats.map((s, i) => (
            <FadeUp className="stat" key={s.label} delay={i * 0.1}>
              <strong><Counter value={s.value} decimals={s.decimals} /><sup>{s.suffix}</sup></strong>
              <span>{s.label}</span>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Savoir-faire : image collante qui change selon le pôle ---------- */
export function Services() {
  const [active, setActive] = useState(0);
  return (
    <section className="section" id="savoir-faire" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Savoir-faire</span>
            <Lines lines={[<>Du terrassement</>, <>aux <span className="serif">finitions.</span></>]} />
          </div>
          <FadeUp as="p" className="lead">Gros œuvre, villas, logements collectifs, VRD et carrelage : la polyvalence de nos équipes au service de tout type de projet architectural.</FadeUp>
        </div>
        <div className="services">
          <div className="services-sticky">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="img"
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                exit={{ opacity: 1 }}
                transition={{ duration: 1.1, ease }}
              >
                <motion.img src={services[active].img} alt={services[active].title} initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease }} />
              </motion.div>
            </AnimatePresence>
            <span className="counter">0{active + 1} / 0{services.length}</span>
          </div>
          <div>
            {services.map((s, i) => (
              <motion.article className="service" key={s.title} onViewportEnter={() => setActive(i)} viewport={{ margin: '-45% 0% -45% 0%' }}>
                <div className="service-mobile-img"><img src={s.img} alt={s.title} loading="lazy" /></div>
                <FadeUp><div className="num">0{i + 1}</div></FadeUp>
                <Lines as="h3" lines={[s.title]} />
                <FadeUp as="p" delay={0.1}>{s.text}</FadeUp>
                <FadeUp as="ul" className="tags" delay={0.2}>{s.tags.map(t => <li key={t}>{t}</li>)}</FadeUp>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Réalisations : programmes HTP + visionneuse ---------- */
function Lightbox({ prog, onClose }) {
  const [i, setI] = useState(0);
  const n = prog.images.length;
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI(v => (v + 1) % n);
      if (e.key === 'ArrowLeft') setI(v => (v - 1 + n) % n);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [n, onClose]);
  const img = prog.images[i];
  return (
    <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={onClose} data-lenis-prevent>
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img key={img.src} src={img.src} alt={prog.title} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }} />
        </AnimatePresence>
        <div className="lightbox-bar">
          <div><strong>{prog.title}</strong><span>{prog.place} · {prog.type}{img.perspective ? ' · Perspective d’architecte' : ''}</span></div>
          {n > 1 && (
            <div className="lightbox-nav">
              <button onClick={() => setI((i - 1 + n) % n)} aria-label="Précédente">←</button>
              <span>{i + 1} / {n}</span>
              <button onClick={() => setI((i + 1) % n)} aria-label="Suivante">→</button>
            </div>
          )}
        </div>
        <button className="lightbox-close" onClick={onClose} aria-label="Fermer">×</button>
      </div>
    </motion.div>
  );
}

export function Realisations() {
  const [open, setOpen] = useState(null);
  return (
    <section className="section" id="realisations">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Nos chantiers, notre savoir-faire</span>
            <Lines lines={[<>Nos <span className="serif">réalisations</span></>]} />
          </div>
          <FadeUp as="p" className="lead">Résidences, immeubles et bâtiments mixtes réalisés par HTP dans l&apos;Hérault et le Gard. Cliquez sur un programme pour voir les photos.</FadeUp>
        </div>
        <div className="gallery">
          {programmes.map((p, i) => (
            <motion.figure
              key={p.title}
              className={`ref ${i % 4 === 0 || i % 4 === 3 ? 'wide' : ''}`}
              onClick={() => setOpen(p)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease }}
            >
              <RevealImage className="ref-img" src={p.images[0].src} alt={`${p.title} – ${p.place}`} />
              {p.images[0].perspective && <span className="badge">Perspective</span>}
              <figcaption>
                <div><strong>{p.title}</strong><span>{p.place} · {p.type}</span></div>
                <span className="plus">{p.images.length > 1 ? p.images.length : '+'}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="refs">
          <FadeUp className="refs-head">
            <h3>Principales opérations 2025 – 2026</h3>
            <span>{references.length} chantiers</span>
          </FadeUp>
          <div className="refs-table" role="table">
            <div className="refs-row refs-th" role="row">
              <span>Opération</span><span>Lieu</span><span>Maître d&apos;ouvrage</span><span>Maître d&apos;œuvre</span><span>Nature</span><span>Année</span>
            </div>
            {references.map((r, i) => (
              <motion.div className="refs-row" role="row" key={r.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: i * 0.05 }}>
                <strong>{r.name}</strong><span>{r.place}</span><span>{r.mo}</span><span>{r.moe}</span><span>{r.scope}</span><span className="year">{r.year}</span>
              </motion.div>
            ))}
          </div>
          <FadeUp className="clients">
            <span>Ils nous font confiance</span>
            <ul>{clients.map(c => <li key={c}>{c}</li>)}</ul>
          </FadeUp>
        </div>
      </div>
      <AnimatePresence>{open && <Lightbox prog={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/* ---------- Parc matériel ---------- */
export function Parc() {
  return (
    <section className="section section-dark" id="moyens">
      <div className="container parc">
        <div className="parc-text">
          <span className="eyebrow">Nos moyens</span>
          <Lines lines={[<>{parc.surface}</>, <>de parc <span className="serif">matériel</span></>]} />
          <FadeUp as="p" className="lead" style={{ marginTop: '1.5rem' }}>{parc.text}</FadeUp>
        </div>
        <div className="parc-grid">
          {parc.images.map((src, i) => (
            <div className={`parc-img p${i}`} key={src}>
              <RevealImage src={src} alt="Parc matériel HTP à Montpellier" strength={6} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Dekor & Design : défilement horizontal piloté par le défilement vertical ---------- */
export function Catalogues() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, p => {
    const t = trackRef.current;
    if (!t) return 0;
    return -p * Math.max(t.scrollWidth - window.innerWidth, 0);
  });
  return (
    <>
      <section className="h-scroll section-dark" id="catalogues" ref={ref} style={{ '--h': `${catalogues.length * 50 + 100}vh` }}>
        <div className="h-scroll-sticky">
          <motion.div className="h-scroll-track" ref={trackRef} style={{ x }}>
            <div className="cat-intro">
              <span className="eyebrow">Partenaire · {partner.name}</span>
              <Lines lines={[<>Nos</>, <span className="serif" key="c">catalogues</span>]} />
              <FadeUp as="p" className="lead">{partner.activities}. Choisissez vos matériaux, nos équipes les posent.</FadeUp>
            </div>
            {catalogues.map((c, i) => (
              <a className="cat-card" key={c.title} href={c.href} target={c.href === '#' ? undefined : '_blank'} rel="noopener">
                <img src={c.img} alt={`Catalogue ${c.title} – ${partner.name}`} loading="lazy" />
                <span className="cat-n">0{i + 1}</span>
                <div className="cat-body">
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <span className="cat-link">Voir le catalogue ↗</span>
                </div>
              </a>
            ))}
          </motion.div>
          <div className="cat-progress"><motion.span style={{ scaleX: scrollYProgress }} /></div>
        </div>
      </section>

      <section className="section section-dark partner" style={{ paddingTop: 0 }}>
        <div className="container partner-grid">
          <div className="partner-photos">
            <div className="partner-img a"><RevealImage src="/images/htp/dekor-showroom-1.jpg" alt={`Showroom ${partner.name}`} /></div>
            <div className="partner-img b"><RevealImage src="/images/htp/dekor-showroom-2.jpg" alt={`Showroom ${partner.name}`} /></div>
          </div>
          <div>
            <span className="eyebrow">Showrooms</span>
            <Lines lines={[<>{partner.name}</>]} />
            <FadeUp as="p" className="lead" style={{ margin: '1.5rem 0 2rem' }}>{partner.text}</FadeUp>
            <FadeUp as="ul" className="showrooms">
              {partner.showrooms.map(s => <li key={s.name}><span>{s.name}</span>{s.address}</li>)}
            </FadeUp>
            <FadeUp className="brands">
              <span>Nos principales marques</span>
              <ul>{partner.brands.map(b => <li key={b}>{b}</li>)}</ul>
            </FadeUp>
            {partner.url !== '#' && (
              <FadeUp><a className="btn" href={partner.url} target="_blank" rel="noopener">Visiter le site {partner.name} <span className="arrow">↗</span></a></FadeUp>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Méthode ---------- */
export function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.6'] });
  return (
    <section className="section" id="methode">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Notre méthode</span>
            <Lines lines={[<>Votre projet</>, <>en <span className="serif">4 étapes</span></>]} />
          </div>
          <FadeUp as="p" className="lead">Un accompagnement clair du premier rendez-vous à la remise des clés.</FadeUp>
        </div>
        <div className="steps" ref={ref}>
          <div className="steps-line"><motion.span style={{ scaleX: scrollYProgress }} /></div>
          {steps.map((s, i) => (
            <FadeUp className="step" key={s.title} delay={i * 0.12}>
              <span className="n">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Zone d'intervention ---------- */
export function Zone() {
  return (
    <section className="section" id="zone" style={{ paddingTop: 0 }}>
      <div className="container zone">
        <div>
          <span className="eyebrow">Zone d&apos;intervention</span>
          <Lines lines={[<>Hérault</>, <><span className="serif">&</span> Gard</>]} />
          <FadeUp as="p" className="lead" style={{ marginTop: '1.5rem' }}>
            Depuis notre siège de Montpellier, nous intervenons dans tout l&apos;Hérault (34), le Gard (30) et jusqu&apos;aux Bouches-du-Rhône.
          </FadeUp>
        </div>
        <div>
          {Object.entries(zones).map(([dep, cities]) => (
            <FadeUp className="zone-col" key={dep}>
              <h3>{dep} <span>{cities.length} communes</span></h3>
              <ul className="chips">
                {cities.map((c, i) => (
                  <motion.li key={c} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: i * 0.025 }}>
                    {c}
                  </motion.li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Grand appel à l'action ---------- */
export function CtaBand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  return (
    <section className="cta-band" ref={ref}>
      <motion.div className="bg" style={{ y }}><img src="/images/hero-villa-crepuscule.jpg" alt="" loading="lazy" /></motion.div>
      <div className="container">
        <FadeUp className="cta-mark"><LogoMark /></FadeUp>
        <Lines lines={[<>Votre projet,</>, <>notre <span className="serif">mission.</span></>]} />
        <FadeUp className="actions" delay={0.2}>
          <a href="#contact" className="btn btn-light">Demander un devis gratuit <span className="arrow">→</span></a>
          <a href={`tel:${site.phoneLink}`} className="btn btn-outline">Appeler · {site.phone}</a>
        </FadeUp>
      </div>
    </section>
  );
}

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FadeUp, Lines } from './motion';
import { site } from '@/lib/site';
import Logo from './Logo';

const projets = ['Construction de villa', 'Logements collectifs', 'Gros œuvre / maçonnerie', 'VRD / terrassement', 'Carrelage / salle de bain', 'Autre'];

export function Contact() {
  // Pour l'instant le formulaire ouvre la messagerie du visiteur.
  // À REMPLACER une fois en ligne par un service d'envoi (Formspree, Web3Forms…) pour recevoir les demandes directement.
  const onSubmit = e => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `Nom : ${d.get('nom')}\nTéléphone : ${d.get('tel')}\nEmail : ${d.get('email')}\nProjet : ${d.get('projet')}\nVille : ${d.get('ville')}\n\n${d.get('message')}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Demande de devis – ${d.get('projet')}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="section" id="contact">
      <div className="container contact">
        <div>
          <span className="eyebrow">Contact</span>
          <Lines lines={[<>Parlons de</>, <>votre <span className="serif">projet</span></>]} />
          <FadeUp as="p" className="lead" style={{ marginTop: '1.5rem' }}>Devis gratuit et sans engagement. Nous vous répondons rapidement.</FadeUp>
          <FadeUp as="ul" className="contact-list" delay={0.1}>
            <li><span>Téléphone</span><a href={`tel:${site.phoneLink}`}>{site.phone}</a></li>
            <li><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><span>Siège social</span><b>{site.street}<br />{site.postalCode} {site.city}</b></li>
            <li><span>Horaires</span><b>{site.hours}</b></li>
          </FadeUp>
        </div>
        <FadeUp as="form" className="form" onSubmit={onSubmit} delay={0.15}>
          <div className="row">
            <div className="field"><input id="nom" name="nom" placeholder=" " required autoComplete="name" /><label htmlFor="nom">Nom et prénom *</label></div>
            <div className="field"><input id="tel" name="tel" type="tel" placeholder=" " required autoComplete="tel" /><label htmlFor="tel">Téléphone *</label></div>
          </div>
          <div className="field"><input id="email" name="email" type="email" placeholder=" " autoComplete="email" /><label htmlFor="email">Email</label></div>
          <div className="row">
            <div className="field">
              <select id="projet" name="projet" defaultValue={projets[0]}>{projets.map(p => <option key={p}>{p}</option>)}</select>
              <label htmlFor="projet">Type de projet</label>
            </div>
            <div className="field"><input id="ville" name="ville" placeholder=" " /><label htmlFor="ville">Ville du projet</label></div>
          </div>
          <div className="field"><textarea id="message" name="message" rows={4} placeholder=" " /><label htmlFor="message">Décrivez votre projet</label></div>
          <button className="btn" type="submit">Envoyer ma demande <span className="arrow">→</span></button>
          <p className="form-note">Réponse sous 48 h ouvrées.</p>
        </FadeUp>
      </div>
    </section>
  );
}

export function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo className="footer-brand" />
            <p style={{ maxWidth: '26rem' }}>{site.legalName} · {site.baseline}. Gros œuvre, villas, logements collectifs, VRD et carrelage à Montpellier, dans l&apos;Hérault et le Gard.</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <a href="#savoir-faire">Savoir-faire</a>
            <a href="#moyens">Nos moyens</a>
            <a href="#catalogues">Catalogues</a>
            <a href="#realisations">Réalisations</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={`tel:${site.phoneLink}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p>{site.street}, {site.postalCode} {site.city}</p>
          </div>
        </div>
        <motion.div className="footer-word" style={{ y }} aria-hidden="true">HTP</motion.div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.legalName} · SIRET : {site.siret} · Assurance décennale : {site.decennale}</span>
          <a href="#">Mentions légales</a>
        </div>
      </div>
    </footer>
  );
}

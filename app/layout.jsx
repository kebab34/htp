import { Manrope, Instrument_Serif } from 'next/font/google';
import { site } from '@/lib/site';
import './globals.css';

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: 'HTP – Entreprise de gros œuvre, maçonnerie & construction à Montpellier | Hérault & Gard',
  description:
    "SAS HTP, entreprise générale du BTP à Montpellier depuis plus de 25 ans : gros œuvre, maçonnerie, construction de villas et de logements collectifs, VRD, carrelage. Intervention dans l'Hérault (34) et le Gard (30). Devis gratuit.",
  keywords: ['entreprise gros œuvre Montpellier', 'entreprise BTP Montpellier', 'VRD Hérault', 'constructeur villa Montpellier', 'maçon Montpellier', 'entreprise maçonnerie Hérault', 'construction maison Gard', 'gros œuvre Nîmes', 'constructeur maison Hérault', 'pose carrelage Montpellier'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'HTP – Votre projet, notre mission !',
    description: "Entreprise générale du BTP à Montpellier : gros œuvre, villas, logements collectifs, VRD et carrelage.",
    images: ['/images/htp/mas-du-padre-2.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = { themeColor: '#0e0e0d' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: site.name,
  legalName: site.legalName,
  slogan: site.slogan,
  logo: `${site.url}/favicon.svg`,
  description: "Entreprise générale du BTP à Montpellier : gros œuvre, maçonnerie, villas, logements collectifs, VRD et carrelage, dans l'Hérault et le Gard.",
  url: site.url,
  telephone: site.phoneLink,
  email: site.email,
  image: `${site.url}/images/htp/mas-du-padre-2.jpg`,
  address: { '@type': 'PostalAddress', streetAddress: site.street, addressLocality: site.city, postalCode: site.postalCode, addressRegion: 'Occitanie', addressCountry: 'FR' },
  areaServed: [{ '@type': 'AdministrativeArea', name: 'Hérault' }, { '@type': 'AdministrativeArea', name: 'Gard' }],
  knowsAbout: ['Gros œuvre', 'Maçonnerie', 'VRD', 'Terrassement', 'Viabilisation', 'Construction de villas', 'Logements collectifs', 'Carrelage', 'Salles de bains'],
};

// Applique la palette choisie avant l'affichage (évite un flash de couleurs)
const paletteScript = `try{var p=new URLSearchParams(location.search).get('palette')||localStorage.getItem('htp-palette');if(p)document.documentElement.dataset.palette=p}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="fr" data-palette="laiton" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: paletteScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

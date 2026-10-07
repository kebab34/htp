// ============================================================
//  INFORMATIONS DU SITE — c'est ici qu'on modifie les contenus
//  Source : plaquette « Présentation HTP ». « À COMPLÉTER » = encore provisoire.
// ============================================================

export const site = {
  name: 'HTP',
  legalName: 'SAS HTP',
  slogan: 'Votre projet, notre mission !',
  baseline: 'Entreprise générale du BTP',
  url: 'https://www.htp-construction.fr', // À COMPLÉTER : vrai nom de domaine
  phone: '06 08 57 73 98',
  phoneLink: '+33608577398',
  email: 'htp-34@hotmail.com',
  street: '10 Parc du Club Millénaire, 1025 avenue Henri Becquerel',
  city: 'Montpellier',
  postalCode: '34070',
  hours: 'Lundi – Vendredi, 8h – 18h', // À COMPLÉTER : à confirmer
  siret: 'à compléter', // À COMPLÉTER
  decennale: 'à compléter', // À COMPLÉTER : assureur + n° de contrat
};

export const stats = [
  { value: 25, suffix: '+', label: "années d'expérience" },
  { value: 1.3, decimals: 1, suffix: ' M€', label: "chiffre d'affaires 2025" },
  { value: 2500, suffix: ' m²', label: 'de parc matériel' },
  { value: 80, suffix: '+', label: 'logements en chantier en 2025' },
];

// Photos de l'accueil : `real: true` = chantier HTP, sinon photo d'ambiance (banque d'images)
export const heroSlides = [
  { src: '/images/hero-villa-piscine.jpg', label: 'Villas contemporaines' },
  { src: '/images/htp/mas-du-padre-2.jpg', label: 'Résidence Mas du Padre', real: true },
  { src: '/images/hero-villa-crepuscule.jpg', label: 'Villas sur mesure' },
  { src: '/images/htp/mas-du-padre-1.jpg', label: 'Mas du Padre · Balaruc', real: true },
];

export const services = [
  {
    title: 'Gros œuvre & maçonnerie',
    text: 'Structure et maçonnerie, voiles béton, immeubles et villas, chantiers complexes. Le cœur de métier de HTP depuis plus de 25 ans.',
    tags: ['Structure & maçonnerie', 'Immeubles & villas', 'Chantiers complexes'],
    img: '/images/htp/notre-dame-1.jpg',
  },
  {
    title: 'Villas individuelles',
    text: "Villas modernes ou traditionnelles, du terrassement jusqu'à la livraison, pour les particuliers comme pour les investisseurs.",
    tags: ['Construction neuve', 'Modernes ou traditionnelles', 'Clés en main'],
    img: '/images/hero-villa-baies.jpg',
  },
  {
    title: 'Logements collectifs',
    text: "Résidences et bâtiments d'habitation pour promoteurs et maîtres d'ouvrage : une entreprise générale fiable, réactive et rigoureuse.",
    tags: ['Résidences', 'Reprises de chantier', 'Promoteurs & bailleurs'],
    img: '/images/htp/glenn-miller-1.jpg',
  },
  {
    title: 'VRD & aménagement',
    text: 'Voirie et réseaux divers : terrassement, réseaux, voirie et viabilisation de vos terrains et opérations.',
    tags: ['Terrassement', 'Réseaux & voirie', 'Viabilisation'],
    img: '/images/htp/notre-dame-2.jpg',
  },
  {
    title: 'Carrelage & finitions',
    text: 'Fourniture et pose de carrelage et faïence, sanitaires et salles de bains, avec les matériaux haut de gamme de Dekor & Design.',
    tags: ['Carrelage & faïence', 'Sanitaires', 'Salles de bains'],
    img: '/images/htp/dekor-showroom-2.jpg',
  },
];

// Société partenaire
export const partner = {
  name: 'Dekor & Design',
  url: 'https://www.dekordesign.fr',
  activities: 'Revêtement · Céramique · Salles de bains · Dressing · Cuisines',
  text: "Pour des aménagements intérieurs et extérieurs d'exception, HTP travaille en étroite collaboration avec Dekor & Design : la précision technique de la pose alliée à des matériaux haut de gamme (céramiques, marbres, pierres et mobilier d'agencement).",
  showrooms: [
    { name: 'Siège', address: '535 avenue André Ampère, 34170 Castelnau-le-Lez' },
    { name: 'Showroom Cannes', address: '4 boulevard Étienne Astegiano, 06400 Cannes' },
    { name: 'Showroom & dépôt Le Muy', address: "2204 route d'Aix, 83490 Le Muy" },
  ],
  brands: ['VitrA', 'QUA Granite', 'Majorca Ceramiche', 'Kütahya Porselen', 'Kobos Banyo', 'Soprano Mutfak', 'Bien'],
};

// Catalogues Dekor & Design 2026 (PDF dans public/catalogue/). Les couvertures servent de visuels.
// Sans `pdf`, la carte renvoie vers le site Dekor & Design.
export const catalogues = [
  { title: 'Cuisines', text: 'Sur mesure, design & art de vivre', img: '/images/catalogues/cuisines.jpg', href: '/catalogue/catalogue-cuisines-2026.pdf', pdf: true, pages: 44 },
  { title: 'Salle de bains', text: 'Meubles, robinetterie, douche & bain', img: '/images/catalogues/salle-de-bains.jpg', href: '/catalogue/catalogue-salle-de-bains-2026.pdf', pdf: true, pages: 50 },
  { title: 'Menuiserie', text: 'Fenêtres, coulissants, volets & façades', img: '/images/catalogues/menuiserie.jpg', href: '/catalogue/catalogue-menuiserie-2026.pdf', pdf: true, pages: 24 },
  { title: "Portes d'entrée", text: 'Aluminium, PVC & mixte', img: '/images/catalogues/portes-entree.jpg', href: '/catalogue/catalogue-portes-entree-2026.pdf', pdf: true, pages: 20 },
  { title: 'Extérieur', text: 'Pergolas, fermetures & éclairage', img: '/images/catalogues/exterieur.jpg', href: '/catalogue/catalogue-exterieur-2026.pdf', pdf: true, pages: 27 },
  { title: 'Carrelage & céramique', text: 'Grands formats, marbres, pierres, extérieur', img: '/images/cat-carrelage.jpg', href: 'https://www.dekordesign.fr' },
  { title: 'Dressing', text: 'Rangements et mobilier d’agencement', img: '/images/htp/dekor-showroom-1.jpg', href: 'https://www.dekordesign.fr' },
];

// Programmes réalisés par HTP (photos de la plaquette). `perspective` = image d'architecte, pas une photo.
export const programmes = [
  {
    title: 'Programme Glenn Miller', place: 'Clapiers (34)', type: 'Logements collectifs',
    images: [{ src: '/images/htp/glenn-miller-1.jpg' }, { src: '/images/htp/glenn-miller-2.jpg' }, { src: '/images/htp/glenn-miller-3.jpg' }],
  },
  {
    title: 'Programme Mas du Padre', place: 'Balaruc-les-Bains (34)', type: 'Logements collectifs',
    images: [{ src: '/images/htp/mas-du-padre-2.jpg' }, { src: '/images/htp/mas-du-padre-1.jpg' }],
  },
  {
    title: 'Programme Skyway', place: 'Montpellier (34)', type: 'Immeuble de logements',
    images: [{ src: '/images/htp/skyway-perspective.jpg', perspective: true }, { src: '/images/htp/skyway-chantier.jpg' }],
  },
  {
    title: 'Programme Notre-Dame', place: 'Castelnau-le-Lez (34)', type: 'Bâtiment mixte',
    images: [{ src: '/images/htp/notre-dame-1.jpg' }, { src: '/images/htp/notre-dame-2.jpg' }],
  },
  {
    title: 'Programme Le Mind', place: 'La Grande-Motte (34)', type: 'Résidence',
    images: [{ src: '/images/htp/le-mind-perspective.jpg', perspective: true }, { src: '/images/htp/le-mind-chantier.jpg' }],
  },
  {
    title: 'Programme La Noria', place: 'Lattes (34)', type: 'Logements collectifs',
    images: [{ src: '/images/htp/la-noria.jpg' }],
  },
];

// Principales réalisations récentes (tableau de la plaquette, montants non publiés)
export const references = [
  { name: 'Résidence Caillebotte Canabou', place: 'Marguerittes (30)', mo: 'Premalis', moe: 'Pomobat', year: 2025, scope: '20 logements (reprise de chantier)' },
  { name: 'Résidence Margarida Genestet', place: 'Marguerittes (30)', mo: 'Premalis', moe: 'Pomobat', year: 2025, scope: '22 logements' },
  { name: 'Résidence Le Claux', place: 'Vailhauquès (34)', mo: 'Premalis', moe: 'Pomobat', year: 2025, scope: '15 logements' },
  { name: 'Salon 2', place: 'Roquemaure (30)', mo: 'Premalis', moe: 'RS Ingénierie', year: 2025, scope: '24 logements + 9 villas' },
  { name: '3 villas', place: 'Nîmes (30)', mo: 'CB Sud Invest', moe: 'Liva MO', year: 2025, scope: '3 villas' },
  { name: 'Savonnerie Salon', place: 'Salon-de-Provence (13)', mo: 'Unidev', moe: 'Liva MO', year: 2026, scope: 'Industriel' },
  { name: 'Bacchus', place: 'Nîmes (30)', mo: 'SCI Bacchus', moe: 'Liva MO', year: 2026, scope: 'Industriel' },
  { name: 'Durand Recyclage', place: 'Nîmes (30)', mo: 'Durand Recyclage', moe: 'Liva MO', year: 2026, scope: 'Rénovation' },
];

export const clients = ['Premalis', 'Pomobat', 'CB Sud Invest', 'Unidev', 'RS Ingénierie', 'Liva MO', 'SCI Bacchus', 'Durand Recyclage'];

export const parc = {
  surface: '2 500 m²',
  text: "Notre parc matériel de 2 500 m² nous rend autonomes sur chaque opération : grue, banches, étaiements, échafaudages et engins sont disponibles immédiatement pour tenir vos délais.",
  images: ['/images/htp/parc-materiel-3.jpg', '/images/htp/parc-materiel-1.jpg', '/images/htp/parc-materiel-2.jpg'],
};

export const steps = [
  { title: 'Rencontre & étude', text: 'Visite du terrain, écoute de vos besoins, étude des plans avec votre architecte ou maître d’œuvre.' },
  { title: 'Devis détaillé', text: 'Un chiffrage clair, poste par poste, gratuit et sans engagement.' },
  { title: 'Chantier', text: 'Nos équipes et notre matériel en propre, avec rigueur et réactivité à chaque étape.' },
  { title: 'Livraison', text: 'Réception des travaux, levée des réserves et garantie décennale.' },
];

export const zones = {
  'Hérault (34)': ['Montpellier', 'Castelnau-le-Lez', 'Clapiers', 'Lattes', 'La Grande-Motte', 'Balaruc-les-Bains', 'Vailhauquès', 'Sète', 'Béziers', 'Agde', 'Lunel', 'Pérols', 'Mauguio', 'Frontignan', 'Saint-Jean-de-Védas', 'Juvignac', 'Jacou', 'Le Crès', 'Grabels', 'Pézenas'],
  'Gard (30)': ['Nîmes', 'Marguerittes', 'Roquemaure', 'Alès', 'Bagnols-sur-Cèze', 'Beaucaire', 'Vauvert', 'Saint-Gilles', 'Uzès', 'Sommières', 'Aigues-Mortes', 'Le Grau-du-Roi', 'Villeneuve-lès-Avignon', 'Caissargues'],
};

// Palettes proposées — le sélecteur en bas à gauche du site permet de les comparer
export const palettes = [
  { id: 'laiton', name: 'Noir & Or HTP', hint: 'Les couleurs du logo', swatch: ['#0e0e0d', '#e3b22c'] },
  { id: 'terracotta', name: 'Sable & Terracotta', hint: 'Chaleureux, méditerranéen', swatch: ['#f3ede4', '#c4623b'] },
  { id: 'marine', name: 'Bleu nuit & Or', hint: 'Confiance, solidité', swatch: ['#0f1d2c', '#d6a84e'] },
  { id: 'beton', name: 'Béton & Orange', hint: 'Dynamique, moderne', swatch: ['#e9e8e4', '#ff5b1f'] },
  { id: 'olive', name: 'Olive & Pierre', hint: 'Naturel, élégant', swatch: ['#1f2a22', '#c2a36b'] },
];

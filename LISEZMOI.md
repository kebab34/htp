# Site HTP – Maçonnerie & Construction

Site React (Next.js + Framer Motion), généré en pages statiques pour un bon référencement Google.

## Voir le site sur votre ordinateur

```bash
npm install      # une seule fois
npm run dev      # puis ouvrir http://localhost:3000
```

## Modifier les contenus

Toutes les informations sont dans **`lib/site.js`** : téléphone, email, chiffres, services,
liens des catalogues partenaires, réalisations, villes. Les lignes « À COMPLÉTER » sont provisoires.

Vos photos de chantier vont dans `public/images/` (de préférence en .jpg, 1600 px de large maximum).

## Mettre en ligne

```bash
npm run build    # crée le dossier out/
```

Déposez le contenu du dossier `out/` chez votre hébergeur (OVH, o2switch, Netlify, Vercel…).

## Photos

Les photos actuelles viennent de [Pexels](https://www.pexels.com) (licence libre, usage commercial autorisé).
Celles de la section Réalisations sont marquées « Photo d'illustration » : à remplacer par vos vrais chantiers.

## Palette de couleurs

Le bouton « Couleurs » en bas à gauche permet de comparer 5 palettes. Une fois votre choix fait :
1. dans `app/layout.jsx`, remplacer `data-palette="laiton"` par la palette choisie ;
2. dans `components/Shell.jsx`, supprimer la ligne `<PaletteSwitcher />`.

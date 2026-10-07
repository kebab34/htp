/** Site statique : `npm run build` produit le dossier `out/`, à déposer chez n'importe quel hébergeur. */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;

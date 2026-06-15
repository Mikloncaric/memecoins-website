import sharp from 'sharp';
import fs from 'fs';

// Logo SVG — 400x400 za X profile picture
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1a1205" />
      <stop offset="100%" stop-color="#06060a" />
    </radialGradient>
    <linearGradient id="solana" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14F195" />
      <stop offset="100%" stop-color="#9945FF" />
    </linearGradient>
  </defs>
  <circle cx="200" cy="200" r="200" fill="url(#bgGlow)" />
  <circle cx="200" cy="200" r="185" fill="none" stroke="#C9A227" stroke-width="2" opacity="0.15"/>
  <circle cx="200" cy="200" r="160" fill="none" stroke="#C9A227" stroke-width="1.5" opacity="0.2"/>
  <circle cx="200" cy="200" r="130" fill="none" stroke="#C9A227" stroke-width="1.5" opacity="0.25"/>
  <circle cx="200" cy="200" r="190" fill="none" stroke="#C9A227" stroke-width="4"/>
  <circle cx="200" cy="200" r="90" fill="#06060a" stroke="#C9A227" stroke-width="2.5"/>
  <text x="200" y="248" font-family="Georgia, serif" font-size="160" font-weight="900" text-anchor="middle" fill="url(#solana)">m</text>
</svg>`;

// 1. Generiraj logo PNG 400x400
await sharp(Buffer.from(logoSvg))
  .png()
  .toFile('logo-400x400.png');
console.log('✓ logo-400x400.png kreiran');

// 2. Logo za banner — manji, 200x200, pozadina transparentna
const logoSmallSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 400 400">
  <circle cx="200" cy="200" r="185" fill="none" stroke="#C9A227" stroke-width="3" opacity="0.3"/>
  <circle cx="200" cy="200" r="155" fill="none" stroke="#C9A227" stroke-width="2" opacity="0.35"/>
  <circle cx="200" cy="200" r="190" fill="none" stroke="#C9A227" stroke-width="5"/>
  <circle cx="200" cy="200" r="90" fill="rgba(6,6,10,0.85)" stroke="#C9A227" stroke-width="3"/>
  <text x="200" y="248" font-family="Georgia, serif" font-size="160" font-weight="900" text-anchor="middle" fill="#C9A227">m</text>
</svg>`;

// 3. Ubaci logo na banner (og-image.png)
const logoOverlay = await sharp(Buffer.from(logoSmallSvg))
  .png()
  .toBuffer();

// Dohvati dimenzije bannera
const bannerMeta = await sharp('og-image.png').metadata();
const bW = bannerMeta.width;
const bH = bannerMeta.height;

// Pozicioniraj logo lijevo, vertikalno centrirano
const left = Math.round(bW * 0.04);
const top  = Math.round((bH - 200) / 2);

await sharp('og-image.png')
  .composite([{ input: logoOverlay, left, top }])
  .png()
  .toFile('x-banner.png');
console.log('✓ x-banner.png kreiran');

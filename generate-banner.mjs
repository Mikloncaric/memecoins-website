import sharp from 'sharp';

// X banner format: 1500x500px
const bannerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="500" viewBox="0 0 1500 500">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#1a1205" />
      <stop offset="60%" stop-color="#0d0a04" />
      <stop offset="100%" stop-color="#06060a" />
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#C9A227" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#C9A227" stop-opacity="0" />
    </radialGradient>
    <filter id="blur">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
    <filter id="softglow">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="solana" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14F195" />
      <stop offset="100%" stop-color="#9945FF" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1500" height="500" fill="url(#bg)"/>

  <!-- Glow behind logo -->
  <circle cx="750" cy="250" r="260" fill="url(#glow)" filter="url(#blur)"/>

  <!-- Decorative rings — outer -->
  <circle cx="750" cy="250" r="420" fill="none" stroke="#C9A227" stroke-width="1" opacity="0.07"/>
  <circle cx="750" cy="250" r="350" fill="none" stroke="#C9A227" stroke-width="1" opacity="0.1"/>
  <circle cx="750" cy="250" r="280" fill="none" stroke="#C9A227" stroke-width="1.5" opacity="0.14"/>
  <circle cx="750" cy="250" r="220" fill="none" stroke="#C9A227" stroke-width="1.5" opacity="0.18"/>

  <!-- Logo outer border -->
  <circle cx="750" cy="250" r="165" fill="#06060a" stroke="#C9A227" stroke-width="3.5" filter="url(#softglow)"/>

  <!-- Logo inner ring -->
  <circle cx="750" cy="250" r="155" fill="none" stroke="#C9A227" stroke-width="1" opacity="0.4"/>

  <!-- The m -->
  <text
    x="750" y="315"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="210"
    font-weight="900"
    text-anchor="middle"
    fill="url(#solana)"
    filter="url(#softglow)"
  >m</text>

  <!-- Right side text -->
  <text x="980" y="230" font-family="Georgia, serif" font-size="52" font-weight="900" fill="#C9A227" opacity="0.95" letter-spacing="8">MEMECOINS</text>
  <text x="982" y="285" font-family="Arial, sans-serif" font-size="22" font-weight="400" fill="#C9A227" opacity="0.55" letter-spacing="3">THE HUB OF THE MEME ECONOMY</text>
  <text x="982" y="330" font-family="Arial, sans-serif" font-size="19" font-weight="400" fill="#0AA89E" opacity="0.8" letter-spacing="2">memecoinssol.xyz</text>

  <!-- Bottom line decoration -->
  <line x1="980" y1="305" x2="1420" y2="305" stroke="#C9A227" stroke-width="1" opacity="0.2"/>
</svg>`;

await sharp(Buffer.from(bannerSvg))
  .png()
  .toFile('x-banner-new.png');

console.log('✓ x-banner-new.png kreiran (1500x500)');

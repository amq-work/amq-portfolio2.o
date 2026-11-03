const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateOG() {
  const width = 1200;
  const height = 630;

  // 1. Load and resize the portrait photo
  const heroPath = path.join(__dirname, '..', 'public', 'images', 'hero-me.png');
  const heroBuffer = fs.readFileSync(heroPath);
  
  // Height for portrait
  const heroTargetHeight = 590;
  const heroResized = await sharp(heroBuffer)
    .resize({ height: heroTargetHeight, fit: 'contain' })
    .toBuffer();
  
  const heroMeta = await sharp(heroResized).metadata();
  const heroLeft = width - heroMeta.width - 15;
  const heroTop = height - heroMeta.height;

  // 2. SVG graphic containing full styling, typography, background gradients, and branding
  const svgGraphic = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGlow" cx="72%" cy="48%" r="60%">
        <stop offset="0%" stop-color="#242424" stop-opacity="0.9" />
        <stop offset="35%" stop-color="#141414" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#0a0a0a" stop-opacity="1" />
      </radialGradient>
      <radialGradient id="ambientHero" cx="78%" cy="45%" r="42%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12" />
        <stop offset="45%" stop-color="#ffffff" stop-opacity="0.03" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="accentDivider" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.0" />
      </linearGradient>
      <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="50" />
      </filter>
    </defs>

    <!-- Deep Midnight Canvas -->
    <rect width="${width}" height="${height}" fill="#0a0a0a" />
    <rect width="${width}" height="${height}" fill="url(#bgGlow)" />

    <!-- Ambient Glow behind portrait -->
    <circle cx="830" cy="330" r="290" fill="url(#ambientHero)" filter="url(#softBlur)" />

    <!-- Subtle Technical Background Grid Lines -->
    <g opacity="0.025" stroke="#ffffff" stroke-width="1">
      <line x1="80" y1="0" x2="80" y2="630" />
      <line x1="260" y1="0" x2="260" y2="630" />
      <line x1="440" y1="0" x2="440" y2="630" />
      <line x1="620" y1="0" x2="620" y2="630" />
      <line x1="0" y1="90" x2="1200" y2="90" />
      <line x1="0" y1="240" x2="1200" y2="240" />
      <line x1="0" y1="390" x2="1200" y2="390" />
      <line x1="0" y1="540" x2="1200" y2="540" />
    </g>

    <!-- Faint Massive Wordmark (Reflecting hero section bottom wordmark) -->
    <text x="76" y="598" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="146" font-weight="800" fill="#ffffff" fill-opacity="0.03" letter-spacing="-0.03em">Aayan</text>

    <!-- Outer Precision Border -->
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2" />

    <!-- TOP BRANDING ROW -->
    <g transform="translate(80, 72)">
      <!-- AMQ Monogram Box -->
      <rect width="70" height="34" rx="6" fill="#141414" stroke="rgba(255,255,255,0.16)" stroke-width="1" />
      <text x="35" y="23" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="0.08em">AMQ</text>

      <!-- Status Pill: Available for work -->
      <g transform="translate(86, 0)">
        <rect width="176" height="34" rx="17" fill="#141414" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
        <!-- Emerald Glow Dot -->
        <circle cx="20" cy="17" r="4" fill="#10b981" />
        <circle cx="20" cy="17" r="7" fill="none" stroke="#10b981" stroke-opacity="0.35" stroke-width="1.5" />
        <text x="34" y="22" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="rgba(255,255,255,0.88)" letter-spacing="0.02em">Available for work</text>
      </g>
    </g>

    <!-- EDITORIAL CONTENT COLUMN -->
    <g transform="translate(80, 185)">
      <!-- Label -->
      <text x="0" y="0" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="700" fill="#737373" letter-spacing="0.14em">PORTFOLIO</text>

      <!-- Name -->
      <text x="0" y="52" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="800" fill="#ffffff" letter-spacing="-0.03em">Aayan Qureshi</text>

      <!-- Professional Title -->
      <text x="0" y="98" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="25" font-weight="600" fill="#e0e0e0" letter-spacing="-0.02em">UI/UX &amp; Product Designer</text>

      <!-- Divider -->
      <line x1="0" y1="126" x2="420" y2="126" stroke="url(#accentDivider)" stroke-width="1.5" />

      <!-- Tagline / Bio -->
      <text x="0" y="162" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="400" fill="#9ca3af" line-height="1.5">
        <tspan x="0" dy="0">I design thoughtful digital experiences where</tspan>
        <tspan x="0" dy="26">user needs meet business goals.</tspan>
      </text>

      <!-- Domain Link Badge -->
      <g transform="translate(0, 235)">
        <rect width="250" height="38" rx="8" fill="#141414" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
        <text x="18" y="24" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#ffffff" letter-spacing="0.02em">aayanmq-portfolio.vercel.app</text>
        <path d="M222 19l4-4-4-4m4 4h-9" stroke="#888888" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </g>
  </svg>
  `;

  // 3. Render base SVG to PNG buffer
  const baseImg = await sharp(Buffer.from(svgGraphic))
    .png()
    .toBuffer();

  // 4. Composite hero portrait onto the base image
  const outPath = path.join(__dirname, '..', 'public', 'og-image.jpg');
  const info = await sharp(baseImg)
    .composite([
      {
        input: heroResized,
        top: heroTop,
        left: heroLeft
      }
    ])
    .jpeg({
      quality: 92,
      mozjpeg: true
    })
    .toFile(outPath);

  console.log('OG image created successfully at:', outPath);
  console.log('Image details:', info);
}

generateOG().catch(err => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});


/**
 * ChefMentor X – App Icon Generator
 * 
 * Run this script to generate all required icon sizes from an SVG source.
 * 
 * Prerequisites:
 *   npm install sharp
 * 
 * Usage:
 *   node scripts/generate-icons.js
 * 
 * If you don't have a source icon, this script creates one programmatically
 * using a solid orange background (#FF6B4A) with a white chef hat emoji.
 */

const fs = require('fs');
const path = require('path');

// Try to use sharp, otherwise provide manual instructions
let sharp;
try {
    sharp = require('sharp');
} catch (e) {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║          ChefMentor X – Icon Generation Guide               ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  'sharp' not installed. Create icons manually:               ║
║                                                              ║
║  Required files in ./assets/:                                ║
║                                                              ║
║  1. icon.png          – 1024×1024  (App Store icon)          ║
║  2. adaptive-icon.png – 1024×1024  (Android foreground)      ║
║  3. splash-icon.png   – 512×512    (Splash screen logo)      ║
║  4. favicon.png       – 48×48      (Web favicon)             ║
║                                                              ║
║  Design Guidelines:                                          ║
║  • Background:   #FF6B4A (ChefMentor brand orange)           ║
║  • Foreground:   White chef hat silhouette                   ║
║  • Corner radius: iOS auto-applies, keep square              ║
║  • Adaptive icon: Keep logo in center 66% (safe zone)        ║
║                                                              ║
║  Quick option – use Figma, Canva, or an online tool:         ║
║  1. Create 1024×1024 canvas                                  ║
║  2. Fill with #FF6B4A                                        ║
║  3. Add white 🧑‍🍳 chef hat icon centered                      ║
║  4. Export as PNG (no transparency for icon.png)              ║
║  5. Export with transparency for adaptive-icon.png            ║
║                                                              ║
║  Install sharp to run automatically:                         ║
║    npm install sharp                                         ║
║    node scripts/generate-icons.js                            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);
    process.exit(0);
}

const ASSETS_DIR = path.join(__dirname, '..', 'assets');

async function generateIcons() {
    console.log('🎨 Generating ChefMentor X icons...\n');

    // Create a base 1024x1024 icon with orange background
    const svgIcon = `
    <svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
      <rect width="1024" height="1024" fill="#FF6B4A" rx="0"/>
      <text x="512" y="620" font-size="500" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="bold">🧑‍🍳</text>
    </svg>
  `;

    // 1. icon.png – 1024×1024 (main app icon)
    await sharp(Buffer.from(svgIcon))
        .resize(1024, 1024)
        .png()
        .toFile(path.join(ASSETS_DIR, 'icon.png'));
    console.log('  ✓ icon.png (1024×1024)');

    // 2. adaptive-icon.png – 1024×1024 (Android foreground, with padding)
    const adaptiveSvg = `
    <svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
      <rect width="1024" height="1024" fill="transparent"/>
      <text x="512" y="620" font-size="400" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="bold">🧑‍🍳</text>
    </svg>
  `;
    await sharp(Buffer.from(adaptiveSvg))
        .resize(1024, 1024)
        .png()
        .toFile(path.join(ASSETS_DIR, 'adaptive-icon.png'));
    console.log('  ✓ adaptive-icon.png (1024×1024)');

    // 3. splash-icon.png – 512×512 (splash screen center icon)
    const splashSvg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="transparent"/>
      <text x="256" y="310" font-size="200" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="bold">🧑‍🍳</text>
    </svg>
  `;
    await sharp(Buffer.from(splashSvg))
        .resize(512, 512)
        .png()
        .toFile(path.join(ASSETS_DIR, 'splash-icon.png'));
    console.log('  ✓ splash-icon.png (512×512)');

    // 4. favicon.png – 48×48 (web)
    await sharp(Buffer.from(svgIcon))
        .resize(48, 48)
        .png()
        .toFile(path.join(ASSETS_DIR, 'favicon.png'));
    console.log('  ✓ favicon.png (48×48)');

    console.log('\n✅ All icons generated in ./assets/');
}

generateIcons().catch(console.error);

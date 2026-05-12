/**
 * Rasterize public/favicon.svg into a multi-size public/favicon.ico.
 *
 * Run: node scripts/build-favicon.mjs
 *
 * Why not ImageMagick: the macOS build uses its built-in MSVG renderer when
 * librsvg isn't installed, and that renderer doesn't honor stroke attributes
 * — strokes silently disappear. Sharp uses libvips which handles SVG via
 * librsvg under the hood and renders everything correctly.
 */
import {readFile, writeFile} from 'node:fs/promises';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = join(repoRoot, 'public', 'favicon.svg');
const icoPath = join(repoRoot, 'public', 'favicon.ico');
const previewPath = join(repoRoot, 'public', 'favicon-preview.png');

const sizes = [16, 24, 32, 48, 64];

const svg = await readFile(svgPath);

const pngs = await Promise.all(
  sizes.map((size) => sharp(svg, {density: 384}).resize(size, size).png().toBuffer()),
);

const ico = await pngToIco(pngs);
await writeFile(icoPath, ico);

// Also write a 256px preview PNG so we can eyeball the design without
// opening the ICO.
await sharp(svg, {density: 384}).resize(256, 256).png().toFile(previewPath);

console.log(`✓ favicon.ico — ${ico.length} bytes, ${sizes.length} sizes: ${sizes.join(',')}`);
console.log(`✓ favicon-preview.png — written for visual check`);

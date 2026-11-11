const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function createIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6 + 16 * count;
  
  let currentOffset = headerSize;
  const entries = [];
  
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // size
    entry.writeUInt32LE(currentOffset, 12); // offset
    
    entries.push(entry);
    currentOffset += buf.length;
  }
  
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(count, 4); // count
  
  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function main() {
  const logoPath = path.resolve('public/Logo.png');
  console.log('Extracting emblem from:', logoPath);

  // Extract emblem (left side of Logo.png up to x=885)
  const emblemRaw = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: 885, height: 724 })
    .png()
    .toBuffer();

  // Trim transparent boundaries
  const emblemTrimmed = await sharp(emblemRaw)
    .trim()
    .png()
    .toBuffer();

  const meta = await sharp(emblemTrimmed).metadata();
  console.log(`Trimmed emblem dimensions: ${meta.width}x${meta.height}`);

  // Helper to generate square padded icon
  async function generateSquareIcon(targetSize, paddingFactor = 0.9) {
    const innerSize = Math.round(targetSize * paddingFactor);
    const emblemResized = await sharp(emblemTrimmed)
      .resize(innerSize, innerSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();

    return sharp(emblemResized)
      .extend({
        top: Math.floor((targetSize - innerSize) / 2),
        bottom: Math.ceil((targetSize - innerSize) / 2),
        left: Math.floor((targetSize - innerSize) / 2),
        right: Math.ceil((targetSize - innerSize) / 2),
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();
  }

  // 1. Generate 512x512 icon
  const icon512 = await generateSquareIcon(512, 0.92);
  fs.writeFileSync('app/icon.png', icon512);
  fs.writeFileSync('public/icon.png', icon512);
  console.log('Wrote app/icon.png & public/icon.png (512x512)');

  // 2. Generate 192x192 icon
  const icon192 = await generateSquareIcon(192, 0.92);
  fs.writeFileSync('public/icon-192.png', icon192);
  console.log('Wrote public/icon-192.png (192x192)');

  // 3. Generate Apple touch icon 180x180
  const appleIcon = await generateSquareIcon(180, 0.92);
  fs.writeFileSync('app/apple-icon.png', appleIcon);
  fs.writeFileSync('public/apple-touch-icon.png', appleIcon);
  console.log('Wrote app/apple-icon.png & public/apple-touch-icon.png (180x180)');

  // 4. Generate multi-resolution favicon.ico (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const icoBuffers = [];
  for (const s of icoSizes) {
    const buf = await generateSquareIcon(s, 0.95);
    icoBuffers.push(buf);
  }
  const icoData = createIco(icoBuffers, icoSizes);
  fs.writeFileSync('app/favicon.ico', icoData);
  fs.writeFileSync('public/favicon.ico', icoData);
  console.log('Wrote app/favicon.ico & public/favicon.ico (16, 32, 48)');

  // Clean up any test files
  if (fs.existsSync('public/emblem-test.png')) fs.unlinkSync('public/emblem-test.png');
  if (fs.existsSync('public/test-favicon.ico')) fs.unlinkSync('public/test-favicon.ico');
  if (fs.existsSync('scripts/test-emblem.cjs')) fs.unlinkSync('scripts/test-emblem.cjs');

  console.log('All favicon and icon assets generated successfully!');
}

main().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});


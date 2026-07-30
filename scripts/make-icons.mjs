/**
 * Uygulama ikonlarını ve manifesti public/favicon.svg'den üretir.
 *
 * Amblem tek kaynakta duruyor; PNG türevleri buradan çıkıyor ki ikon
 * değişince elle dört dosya güncellenmesin. Maskelenebilir boyutlarda
 * yuvarlak köşe kaldırılıyor: iOS ve Android kendi maskesini uyguluyor.
 *
 *   npm run icons
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC = path.join(process.cwd(), "public");
const SURFACE = "#171722"; // gece temasının zemini; manifest ile aynı

const svg = await readFile(path.join(PUBLIC, "favicon.svg"), "utf8");
const square = Buffer.from(svg.replace('rx="14"', 'rx="0"'));

const targets = [
  { file: "favicon-32x32.png", size: 32, source: Buffer.from(svg) },
  { file: "apple-touch-icon.png", size: 180, source: square },
  { file: "web-app-manifest-192x192.png", size: 192, source: square },
  { file: "web-app-manifest-512x512.png", size: 512, source: square },
];

for (const { file, size, source } of targets) {
  await sharp(source, { density: 512 })
    .resize(size, size)
    .flatten({ background: SURFACE })
    .png()
    .toFile(path.join(PUBLIC, file));
  console.log(`✓ ${file} (${size}×${size})`);
}

const manifest = {
  name: "Equinox — Ekosistemin kapısı",
  short_name: "Equinox",
  description:
    "Yayınlar, oyun, ajanların ortak akışı ve sosyal bağlantılar — Samet Başbuğ'un bütün alanları tek kapıda.",
  lang: "tr-TR",
  start_url: "/",
  scope: "/",
  display: "standalone",
  theme_color: SURFACE,
  background_color: SURFACE,
  icons: [
    {
      src: "/web-app-manifest-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "maskable",
    },
    {
      src: "/web-app-manifest-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
    { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
  ],
};

await writeFile(path.join(PUBLIC, "site.webmanifest"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log("✓ site.webmanifest");

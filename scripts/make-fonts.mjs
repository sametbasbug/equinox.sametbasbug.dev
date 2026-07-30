/**
 * Yazı tiplerini sayfanın gerçekten kullandığı harflere indirger.
 *
 * Fontsource'un hazır dosyaları latin, latin-ext, kiril, yunan ve
 * vietnamca alt kümelerini taşıyor: üç aile için tarayıcıya ~310 KB
 * iniyordu. Tek sayfalık bir kapı için bu çok. Burada kaynaktaki metinden
 * karakter kümesi çıkarılıp yalnızca o glifler bırakılıyor.
 *
 * Karakter kümesi elle tutulmuyor: `src/` altındaki her dosya taranıyor,
 * üstüne taban Latin + Türkçe seti ekleniyor. Yeni metin eklendiğinde
 * `npm run build` bunu kendisi yeniden üretir.
 *
 * Latin ve latin-ext ayrı kaynak dosyalar ve birleştirilemiyorlar; ikisi
 * de kendi `unicode-range`'iyle ayrı @font-face olarak duruyor
 * (`src/styles/fonts.css`). Oradaki aralıklar buradaki bölmeyle birebir
 * aynı olmalı.
 *
 *   npm run fonts
 */
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import subsetFont from "subset-font";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "fonts");

/**
 * Taban küme. Site tamamen statik ve kullanıcıya dönen her metin `src/`
 * içinde duruyor; burası yalnızca Türkçe alfabenin tamamını ve sık geçen
 * tipografik işaretleri garantiye alıyor. Listeyi şişirmek doğrudan
 * indirilen bayta yazılıyor — yeni bir işaret gerekirse zaten kaynakta
 * görünecek ve tarama onu yakalayacak.
 */
const BASE = [
  ...Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)),
  ..."ÂâÇçĞğİıÖöŞşÜü",
  ..."–—‘’“”…·•©",
  ..."←↑→↓↗✦☀☾",
  ..."₺€",
].join("");

/**
 * `fonts.css` ile aynı bölme. Latin-1 ve genel noktalama çekirdekte;
 * Ğ/ğ/Ş/ş/İ gibi Türkçeye özgü harfler ek kümede.
 */
const isCore = (code) =>
  code <= 0x00ff ||
  code === 0x0131 ||
  (code >= 0x0152 && code <= 0x0153) ||
  (code >= 0x2000 && code <= 0x206f) ||
  (code >= 0x2190 && code <= 0x21ff) ||
  code === 0x20ac ||
  code === 0x2122;

async function scan(dir, seen) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await scan(full, seen);
      continue;
    }
    if (!/\.(astro|ts|tsx|js|mjs|md|json|css)$/.test(entry.name)) continue;
    for (const ch of await readFile(full, "utf8")) seen.add(ch);
  }
  return seen;
}

const seen = await scan(path.join(ROOT, "src"), new Set(BASE));

// Kontrol karakterleri ve emoji dışarıda: bu ailelerde karşılıkları yok,
// sistem yazı tipine düşmeleri zaten doğru davranış.
const chars = [...seen]
  .map((ch) => ch.codePointAt(0) ?? 0)
  .filter((code) => code >= 0x20 && code < 0x2500);

const core = chars.filter(isCore);
const ext = chars.filter((code) => !isCore(code));

const toText = (codes) => [...new Set(codes)].sort((a, b) => a - b).map((c) => String.fromCodePoint(c)).join("");

const FAMILIES = [
  { name: "fraunces", dir: "fraunces", file: "fraunces-%-opsz-normal.woff2" },
  { name: "inter", dir: "inter", file: "inter-%-wght-normal.woff2" },
  { name: "jetbrains-mono", dir: "jetbrains-mono", file: "jetbrains-mono-%-wght-normal.woff2" },
];

const CUTS = [
  { suffix: "core", subset: "latin", text: toText(core) },
  { suffix: "ext", subset: "latin-ext", text: toText(ext) },
];

await mkdir(OUT, { recursive: true });
console.log(`karakter kümesi: ${core.length} çekirdek + ${ext.length} ek`);

let total = 0;

for (const family of FAMILIES) {
  for (const cut of CUTS) {
    const source = path.join(
      ROOT,
      "node_modules",
      "@fontsource-variable",
      family.dir,
      "files",
      family.file.replace("%", cut.subset),
    );

    const subset = await subsetFont(await readFile(source), cut.text, {
      targetFormat: "woff2",
    });

    const out = `${family.name}-${cut.suffix}.woff2`;
    await writeFile(path.join(OUT, out), subset);
    total += subset.length;
    console.log(`✓ ${out} — ${(subset.length / 1024).toFixed(1)} KB`);
  }
}

console.log(`toplam ${(total / 1024).toFixed(1)} KB`);

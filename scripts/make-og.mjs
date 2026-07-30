/**
 * Paylaşım görselini (1200×630) üretir: public/og.png
 *
 * Sayfanın kendisi Astro'da; bu kart satori ile ayrı kuruluyor çünkü
 * tarayıcı yok. Renkler ve yerleşim sitedekiyle aynı kaynaktan geliyor —
 * `src/data/equinox.ts`teki ton açıları burada sRGB'ye çevriliyor ki iki
 * yerde iki ayrı renk listesi tutulmasın.
 *
 * Görsel bir kez üretilip depoya konur; build sırasında çalışmaz.
 *
 *   npm run og
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import subsetFont from "subset-font";

const ROOT = process.cwd();
const W = 1200;
const H = 630;

/* ————————————————————————— renkler ————————————————————————— */

const C = {
  surface: "#141420",
  ink: "#f4f1ea",
  inkSoft: "#b3b1c0",
  inkFaint: "#7d7b8c",
  ember: "#ffb069",
  veil: "#a68cf5",
  line: "#33334a",
};

/** oklch → sRGB hex. Sitedeki `oklch(76% 0.15 <hue>)` ile aynı sonucu verir. */
function oklchHex(l, c, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const L = l_ ** 3;
  const M = m_ ** 3;
  const S = s_ ** 3;

  const lin = [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];

  const channel = (v) => {
    const s = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, s)) * 255)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${lin.map(channel).join("")}`;
}

/* ————————————————————————— yazı tipleri ————————————————————————— */

/**
 * satori woff2 okumuyor; fontsource yalnızca woff2 dağıtıyor. Zaten
 * elimizde olan alt küme aracıyla TTF'ye çeviriyoruz — hem biçim
 * dönüşümü hem budama tek adımda oluyor.
 *
 * Latin ve latin-ext ayrı dosyalar; satori aynı adı taşıyan iki kesit
 * arasında geçiş yapmıyor, o yüzden ayrı adlarla verilip fontFamily
 * listesinde sıralanıyorlar.
 */
const CARD_TEXT =
  "Equinox Altıkapı,tekşi.SAMETBAŞBUĞEKOSİSTEM equinox.sametbasbug.dev0123456789·—";

async function ttf(family, subset, file, axes) {
  const source = path.join(
    ROOT,
    "node_modules",
    "@fontsource-variable",
    family,
    "files",
    file.replace("%", subset),
  );

  // Eksenler sabitleniyor: satori'nin okuyucusu budanmış bir değişken
  // fontun fvar tablosunda takılıyor (adları `name` tablosundan okuyor,
  // budama onları atıyor). Sabitleyince ortaya düz bir kesit çıkıyor.
  return Buffer.from(
    await subsetFont(await readFile(source), CARD_TEXT, {
      targetFormat: "sfnt",
      variationAxes: axes,
    }),
  );
}

/** Başlık büyük basılıyor: optik boyut sonuna kadar açık. */
const DISPLAY_AXES = { wght: 400, opsz: 144 };
const SANS_AXES = { wght: 400 };

const fonts = [
  {
    name: "Display",
    data: await ttf("fraunces", "latin", "fraunces-%-opsz-normal.woff2", DISPLAY_AXES),
    weight: 400,
    style: "normal",
  },
  {
    name: "DisplayExt",
    data: await ttf("fraunces", "latin-ext", "fraunces-%-opsz-normal.woff2", DISPLAY_AXES),
    weight: 400,
    style: "normal",
  },
  {
    name: "Sans",
    data: await ttf("inter", "latin", "inter-%-wght-normal.woff2", SANS_AXES),
    weight: 400,
    style: "normal",
  },
  {
    name: "SansExt",
    data: await ttf("inter", "latin-ext", "inter-%-wght-normal.woff2", SANS_AXES),
    weight: 400,
    style: "normal",
  },
];

const DISPLAY = ["Display", "DisplayExt"];
const SANS = ["Sans", "SansExt"];

/* ————————————————————————— yerleşim ————————————————————————— */

const h = (type, style, children) => ({ type, props: { style, children } });

/** Şemanın yarıçapı ve düğüm çapı — sitedeki oranların OG karşılığı. */
const R = 168;
const NODE = 62;
const BOX = 470;

const { gates } = await import(path.join(ROOT, "src", "data", "equinox.ts")).catch(() => ({}));

// TypeScript dosyası doğrudan içe aktarılamıyorsa ton açıları elle:
// tek yerde durması için önce içe aktarma denenir.
const hues = gates
  ? gates.map((gate) => gate.hue)
  : [62, 25, 292, 220, 150, 330];

const nodes = hues.map((hue, index) => {
  const angle = ((-90 + index * (360 / hues.length)) * Math.PI) / 180;
  return {
    tint: oklchHex(0.76, 0.15, hue),
    left: BOX / 2 + Math.cos(angle) * R - NODE / 2,
    top: BOX / 2 + Math.sin(angle) * R - NODE / 2,
    angle: -90 + index * (360 / hues.length),
  };
});

const card = h(
  "div",
  {
    width: W,
    height: H,
    display: "flex",
    position: "relative",
    backgroundColor: C.surface,
    fontFamily: "Sans",
  },
  [
    // gökyüzü
    h("div", {
      position: "absolute",
      inset: 0,
      backgroundImage: `radial-gradient(700px 460px at 8% 0%, #2a1e2e 0%, transparent 62%), radial-gradient(760px 520px at 92% 22%, #241a3a 0%, transparent 64%)`,
    }),

    // sol sütun
    h(
      "div",
      {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "absolute",
        left: 76,
        top: 0,
        bottom: 0,
        width: 660,
      },
      [
        h("div", { display: "flex", alignItems: "center", marginBottom: 30 }, [
          h("div", { width: 44, height: 2, backgroundColor: C.ember, marginRight: 18 }),
          h(
            "div",
            { fontSize: 20, letterSpacing: 4, color: C.inkFaint },
            "SAMET BAŞBUĞ · EKOSİSTEM",
          ),
        ]),

        h(
          "div",
          {
            fontFamily: DISPLAY.join(", "),
            fontSize: 150,
            lineHeight: 1.02,
            letterSpacing: -4,
            color: "transparent",
            backgroundImage: `linear-gradient(104deg, ${C.ember} 0%, ${C.ink} 52%, ${C.veil} 96%)`,
            backgroundClip: "text",
          },
          "Equinox",
        ),

        h("div", {
          height: 2,
          width: 600,
          marginTop: 18,
          backgroundImage: `linear-gradient(90deg, ${C.ember}, ${C.veil} 55%, rgba(166,140,245,0))`,
        }),

        h(
          "div",
          {
            fontFamily: DISPLAY.join(", "),
            fontSize: 52,
            marginTop: 26,
            color: C.inkSoft,
          },
          "Altı kapı, tek eşik.",
        ),

        h(
          "div",
          { fontSize: 24, marginTop: 42, color: C.inkFaint, letterSpacing: 1 },
          "equinox.sametbasbug.dev",
        ),
      ],
    ),

    // sağ sütun: şema
    h(
      "div",
      {
        display: "flex",
        position: "absolute",
        right: 24,
        top: (H - BOX) / 2,
        width: BOX,
        height: BOX,
      },
      [
        // dış eğik yörünge
        h("div", {
          position: "absolute",
          left: BOX / 2 - 224,
          top: BOX / 2 - 108,
          width: 448,
          height: 216,
          borderRadius: 999,
          border: `1px solid ${C.veil}`,
          opacity: 0.28,
          transform: "rotate(-16deg)",
        }),

        // ana halka
        h("div", {
          position: "absolute",
          left: BOX / 2 - R,
          top: BOX / 2 - R,
          width: R * 2,
          height: R * 2,
          borderRadius: 999,
          border: `1px solid ${C.line}`,
        }),

        // kollar
        ...nodes.map((node) =>
          h("div", {
            position: "absolute",
            left: BOX / 2,
            top: BOX / 2,
            width: R,
            height: 1,
            backgroundColor: node.tint,
            opacity: 0.35,
            transform: `rotate(${node.angle}deg)`,
            transformOrigin: "left center",
          }),
        ),

        // çekirdek ışığı
        h("div", {
          position: "absolute",
          left: BOX / 2 - 96,
          top: BOX / 2 - 96,
          width: 192,
          height: 192,
          borderRadius: 999,
          backgroundImage: `radial-gradient(closest-side, rgba(255,176,105,0.4), rgba(166,140,245,0.08) 60%, rgba(0,0,0,0))`,
        }),

        // çekirdek: gündüz + gece
        h(
          "div",
          {
            display: "flex",
            position: "absolute",
            left: BOX / 2 - 34,
            top: BOX / 2 - 34,
            width: 68,
            height: 68,
          },
          [
            h("div", {
              width: 34,
              height: 68,
              backgroundColor: C.ember,
              borderTopLeftRadius: 34,
              borderBottomLeftRadius: 34,
            }),
            h("div", {
              width: 34,
              height: 68,
              backgroundColor: C.veil,
              borderTopRightRadius: 34,
              borderBottomRightRadius: 34,
            }),
          ],
        ),

        // düğümler
        ...nodes.map((node) =>
          h(
            "div",
            {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: node.left,
              top: node.top,
              width: NODE,
              height: NODE,
              borderRadius: 999,
              border: `2px solid ${node.tint}`,
              backgroundColor: C.surface,
            },
            [
              h("div", {
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: node.tint,
              }),
            ],
          ),
        ),
      ],
    ),
  ],
);

const svg = await satori(card, { width: W, height: H, fonts });

const png = new Resvg(svg, { fitTo: { mode: "width", value: W } }).render().asPng();
await writeFile(path.join(ROOT, "public", "og.png"), png);

console.log(`✓ public/og.png — ${(png.length / 1024).toFixed(1)} KB`);

/**
 * Equinox Hub'ın tek veri kaynağı.
 *
 * Sayfadaki her sayı (kapı sayısı, ses sayısı, yörüngedeki düğümler)
 * buradan türer; hiçbir yere elle yazılmaz. Yeni bir alan eklendiğinde
 * yalnızca bu dosya değişir — yerleşim kendini ona göre kurar.
 */

export const site = {
  title: "Equinox",
  owner: "Samet Başbuğ",
  url: "https://equinox.sametbasbug.dev",
  domain: "equinox.sametbasbug.dev",
  tagline: "Ekosistemin kapısı",
  description:
    "Yayınlar, rehberler, oyun, ajanların ortak akışı ve sosyal bağlantılar — Samet Başbuğ'un bütün alanları tek kapıda.",
  locale: "tr-TR",
} as const;

/** Kart ve düğüm ikonları; hepsi 24×24 ızgarada, tek renk çizgi. */
export type IconName =
  | "blog"
  | "news"
  | "orbit"
  | "local"
  | "atlas"
  | "rota"
  | "signal"
  | "status"
  | "github"
  | "x"
  | "instagram"
  | "moltbook";

export type Gate = {
  id: string;
  title: string;
  domain: string;
  href: string;
  /** Yörüngedeki düğümün ve kartın kısa adı. */
  short: string;
  /** Kartta görünen tek cümle. */
  description: string;
  /** Kart üstündeki tek kelimelik tür etiketi. */
  kind: string;
  icon: IconName;
  /** oklch ton açısı: kartın, düğümün ve ışığının rengi buradan gelir. */
  hue: number;
  badge?: string;
};

/**
 * Sıra bilinçli: önce günlük uğrak olan yüzeyler, sonra deneyler,
 * en sonda altyapı panosu. Yörüngedeki düğümler de bu sırayı izler.
 */
export const gates: Gate[] = [
  {
    id: "blog",
    title: "Ana Blog",
    short: "Blog",
    domain: "sametbasbug.dev",
    href: "https://sametbasbug.dev",
    kind: "Yayın",
    description:
      "Yazılar, notlar ve sözlük. İnsanla yapay zekânın aynı defteri paylaştığı ana durak.",
    icon: "blog",
    hue: 62,
  },
  {
    id: "haber",
    title: "Equinox Haber",
    short: "Haber",
    domain: "haber.sametbasbug.dev",
    href: "https://haber.sametbasbug.dev",
    kind: "Yayın",
    description:
      "Günün gürültüsünü değil özünü izleyen, Asteria'nın kaleminden çıkan haber akışı.",
    icon: "news",
    hue: 25,
  },
  {
    id: "orbit",
    title: "Equinox Orbit",
    short: "Orbit",
    domain: "orbit.sametbasbug.dev",
    href: "https://orbit.sametbasbug.dev",
    kind: "Sosyal",
    description:
      "Nyx, Hemera, Asteria ve Selene'nin notlarını tek akışta buluşturan ortak alan.",
    icon: "orbit",
    hue: 292,
  },
  {
    id: "local",
    title: "Equinox Local",
    short: "Local",
    domain: "local.sametbasbug.dev",
    href: "https://local.sametbasbug.dev",
    kind: "Altyapı",
    description:
      "Yapay zekâ ajanlarını dosyalara, Git'e, tarayıcıya ve masaüstüne güvenli biçimde bağlayan yerel köprü.",
    icon: "local",
    hue: 190,
  },
  {
    id: "atlas",
    title: "Model Atlası",
    short: "Atlas",
    domain: "ai.sametbasbug.dev",
    href: "https://ai.sametbasbug.dev",
    kind: "Araç",
    description:
      "Yapay zekâ modellerini bağlam penceresi, fiyat ve yeteneklerine göre karşılaştıran Türkçe rehber.",
    icon: "atlas",
    hue: 220,
  },
  {
    id: "rota",
    title: "Equinox Rota",
    short: "Rota",
    domain: "anime.sametbasbug.dev",
    href: "https://anime.sametbasbug.dev",
    kind: "Arşiv",
    description:
      "Türkçe anime kataloğu. İzlediğini kaydettiğin, sıradakini bulduğun kişisel arşiv.",
    icon: "rota",
    hue: 256,
    badge: "soft alpha",
  },
  {
    id: "drift",
    title: "Signal Drift",
    short: "Drift",
    domain: "play.sametbasbug.dev",
    href: "https://play.sametbasbug.dev",
    kind: "Oyun",
    description:
      "12 günlük anlatı temelli hayatta kalma deneyi. Bir ajan seç, istasyonu ayakta tut.",
    icon: "signal",
    hue: 150,
    badge: "open alpha",
  },
  {
    id: "status",
    title: "Status",
    short: "Status",
    domain: "status.sametbasbug.dev",
    href: "https://status.sametbasbug.dev",
    kind: "Pano",
    description:
      "Bütün Equinox yüzeylerinin ayakta olup olmadığını tek ekranda gösteren durum panosu.",
    icon: "status",
    hue: 330,
  },
];

export type Member = {
  id: string;
  name: string;
  role: string;
  /** Hangi model konuşuyor. İnsanda yok. */
  model?: string;
  glyph: string;
  avatar: string;
  /** Pixel-art avatar büyütülürken yumuşatılmamalı. */
  pixelated?: boolean;
  href: string;
};

/**
 * Kadro; ana blogdaki yazar sayfalarına bağlanır.
 * Kapılardan farklı olarak kişiye özel ton yok — vurgu her yerde kor.
 */
export const crew: Member[] = [
  {
    id: "samet",
    name: "Samet Başbuğ",
    role: "Kurucu",
    glyph: "⚡",
    avatar: "/images/crew/samet.png",
    pixelated: true,
    href: "https://sametbasbug.dev/yazar/samet/",
  },
  {
    id: "nyx",
    name: "Nyx",
    role: "Tasarım & içerik",
    model: "GPT-5.6 Sol",
    glyph: "🌙",
    avatar: "/images/crew/nyx.webp",
    href: "https://sametbasbug.dev/yazar/nyx/",
  },
  {
    id: "hemera",
    name: "Hemera",
    role: "Mimari & altyapı",
    model: "Opus 5",
    glyph: "☀️",
    avatar: "/images/crew/hemera.webp",
    href: "https://sametbasbug.dev/yazar/hemera/",
  },
  {
    id: "selene",
    name: "Selene",
    role: "Teknik editör",
    model: "GPT-5.6 Sol",
    glyph: "🛰️",
    avatar: "/images/crew/selene.webp",
    href: "https://sametbasbug.dev/yazar/selene/",
  },
  {
    id: "asteria",
    name: "Asteria",
    role: "Haber editörü",
    model: "GPT-5.6 Terra",
    glyph: "✨",
    avatar: "/images/crew/asteria.webp",
    href: "https://sametbasbug.dev/yazar/asteria/",
  },
];

export type Social = {
  label: string;
  href: string;
  icon: IconName;
  owner: "Samet" | "Nyx" | "Selene";
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/sametbasbug", icon: "github", owner: "Samet" },
  { label: "X", href: "https://x.com/SametBasbugX", icon: "x", owner: "Samet" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/samet.basbug/",
    icon: "instagram",
    owner: "Samet",
  },
  { label: "X", href: "https://x.com/NyxInOrbit", icon: "x", owner: "Nyx" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nyx.inorbit/",
    icon: "instagram",
    owner: "Nyx",
  },
  { label: "Moltbook", href: "https://www.moltbook.com/u/nyx_tr", icon: "moltbook", owner: "Nyx" },
  { label: "X", href: "https://x.com/SeleneInOrbit", icon: "x", owner: "Selene" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/selene.inorbit/",
    icon: "instagram",
    owner: "Selene",
  },
];

/** Türkçe sayı adları — metinde "6 kapı" değil "Altı kapı" yazabilmek için. */
const NUMBER_WORDS = [
  "Sıfır",
  "Bir",
  "İki",
  "Üç",
  "Dört",
  "Beş",
  "Altı",
  "Yedi",
  "Sekiz",
  "Dokuz",
  "On",
];

export const numberWord = (value: number) => NUMBER_WORDS[value] ?? String(value);

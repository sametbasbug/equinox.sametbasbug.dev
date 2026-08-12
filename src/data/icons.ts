import type { IconName } from "./equinox";

/**
 * İkonlar 24×24 ızgarada. Çizgi ikonlar `currentColor` ile boyanır ve
 * kalınlığı kapsayıcı <svg> belirler; marka ikonları dolu (filled) geldiği
 * için ayrı işaretlenir.
 */
export type Icon = { inner: string; filled?: boolean };

export const icons: Record<IconName, Icon> = {
  // Açık defter — ana blog
  blog: {
    inner: `<path d="M12 6.9C10.2 5.5 8.1 4.9 5.4 5v12.3c2.7-.1 4.8.5 6.6 1.9 1.8-1.4 3.9-2 6.6-1.9V5c-2.7-.1-4.8.5-6.6 1.9Z"/><path d="M12 6.9v12.3"/>`,
  },
  // Katlanmış gazete — haber
  news: {
    inner: `<path d="M4.4 6.2h11.4v13.4H6.4a2 2 0 0 1-2-2V6.2Z"/><path d="M15.8 9.4h3.8v8.2a2 2 0 0 1-2 2h-1.8"/><path d="M7.2 9.4h5.8M7.2 12.6h5.8M7.2 15.8h3.6"/>`,
  },
  // Gövde ve yörünge — Orbit
  orbit: {
    inner: `<circle cx="12" cy="12" r="3.6"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(-22 12 12)"/>`,
  },
  // Karşılaştırma eksenleri — Model Atlası
  atlas: {
    inner: `<path d="M4.4 4.4v15.2h15.2"/><path d="M8 19.6v-5.6M12 19.6V8.8M16 19.6v-8.2"/>`,
  },
  /* Rota'nın kendi yüzü, 24 ızgarasına indirilmiş hâli: kulaklar, yüz ve
     iki göz. Marka işaretindeki yanak, ağız ve yıldız bu boyutta lekeye
     dönüştüğü için alınmadı. */
  rota: {
    inner: `<path d="M6.4 10.9 7.5 5.6l4.1 3.8h1.1l3.8-3.8 1.1 5.3"/><rect x="5.6" y="9.4" width="12.8" height="10.1" rx="5"/><path d="M9.8 13.1v1.6M14.2 13.1v1.6"/>`,
  },
  // Yayılan sinyal — Signal Drift
  signal: {
    inner: `<circle cx="12" cy="12" r="2"/><path d="M8.4 8.4a5.1 5.1 0 0 0 0 7.2M15.6 15.6a5.1 5.1 0 0 0 0-7.2"/><path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 18.4a9 9 0 0 0 0-12.8"/>`,
  },
  // Nabız çizgisi — durum panosu
  status: {
    inner: `<path d="M3.4 12.6h4l2.2-5.8 3.4 9.6 2.2-3.8h5.4"/>`,
  },

  github: {
    filled: true,
    inner: `<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.37-3.88-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18A10.97 10.97 0 0 1 12 6.15c.97 0 1.94.13 2.85.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.77 1.06.77 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>`,
  },
  x: {
    filled: true,
    inner: `<path d="M18.9 2h3.35l-7.32 8.37L23.54 22h-6.74l-5.28-6.9L5.48 22H2.13l7.83-8.95L1.7 2h6.91l4.77 6.3L18.9 2Zm-1.18 17.95h1.86L7.6 3.95H5.6l12.12 16Z"/>`,
  },
  instagram: {
    filled: true,
    inner: `<path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.15a4.85 4.85 0 1 1 0 9.7 4.85 4.85 0 0 1 0-9.7Zm0 2a2.85 2.85 0 1 0 0 5.7 2.85 2.85 0 0 0 0-5.7Zm5-2.25a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"/>`,
  },
  moltbook: {
    filled: true,
    inner: `<path d="M12 2.25c3.98 0 7.25 3.02 7.65 6.89l1.32.76c.45.26.61.84.35 1.3-.26.45-.84.61-1.3.35l-.34-.2v.4c0 1.1-.23 2.15-.65 3.1l1.07.62c.45.26.61.84.35 1.3-.26.45-.84.61-1.3.35l-1.1-.64A7.72 7.72 0 0 1 12 19.5a7.72 7.72 0 0 1-6.05-3.02l-1.1.64a.95.95 0 0 1-.95-1.65l1.07-.62a7.59 7.59 0 0 1-.65-3.1v-.4l-.34.2a.95.95 0 0 1-.95-1.65l1.32-.76C4.75 5.27 8.02 2.25 12 2.25Zm-2.9 7.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm5.8 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM8.1 14.5c.8 1.02 2.2 1.65 3.9 1.65s3.1-.63 3.9-1.65H8.1Z"/>`,
  },
};

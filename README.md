# Equinox

**Equinox**, Samet Başbuğ'un küçük web ekosisteminin giriş kapısı: yayın
yüzeyleri, deneyler, ajanların ortak akışı ve sosyal hesaplar tek yerde.

Yayında: **https://equinox.sametbasbug.dev**

## Ne olduğu

Tek sayfa. Bir kimlik bloğu, bir konsol, sosyal bağlantılar ve kadro
şeridi. Bilerek kısa: burası bir kapı, lobi değil. Sayfanın işi
ziyaretçiyi üç saniyede doğru alana göndermek.

Kapılar:

- **Ana Blog** — yazılar, notlar, sözlük
- **Equinox Haber** — haber akışı
- **Equinox Orbit** — ajanların ortak alanı
- **Model Atlası** — yapay zekâ modeli karşılaştırma rehberi
- **Equinox Rota** — Türkçe anime kataloğu ve kişisel arşiv
- **Signal Drift** — anlatı temelli hayatta kalma oyunu
- **Status** — durum panosu

## Tasarım

Ana blogla (`sametbasbug.dev`) aynı tasarım sistemini paylaşır: aynı
renk tokenleri, aynı üç yazı tipi, aynı gece/gündüz mantığı. İki site
yan yana konduğunda tek elden çıktığı anlaşılmalı — ama hub kendi
fikrini taşır.

**Eşik.** Ekinoks, gündüzle gecenin eşit olduğu an. Sayfanın adı bu
geçişi taşıyor: "Equinox" yazısı kordan tüle uzanan bir gradyanla
yazılıyor, hemen altından sağa doğru bir ufuk çizgisi çekiliyor.

**Konsol.** Sayfanın kalbi tek bir alet: solda yörünge, sağında panel.
Yörünge ekosistemin kendisi — ortada Equinox, çevresinde alanlar — ve
aynı zamanda kumandası. Bir düğüm seçilince yanındaki panel o alanın
kartına dönüşür: adı, alan adı, tanımı ve rengi. Halkalar döner,
düğümler durur; hareket eden bir hedefe tıklamak zorunda kalınmasın
diye. Masaüstünde üzerine gelmek seçmeye yeter, yani siteye gitmek yine
tek tık. Şema her ekranda var; telefonda küçülüp panelin üstüne oturur
ve düğümler orada 46 px'lik dokunma hedefleri olur.

Ayrı bir kart ızgarası yok, çünkü her alanın adı ve ikonu zaten
yörüngede duruyor — aynı listeyi iki kez göstermenin anlamı yoktu.

**Kapı.** Panelin sol kenarında ince bir ışık şeridi var ve aralıktan
içeri ışık sızıyor — açılan bir kapı. Rengi seçili alanın ton açısından
geliyor, yani panel her seçimde baştan renkleniyor.

**Tek durum.** Sitenin teması gece; anahtar yok, sistem tercihine de
bakılmıyor. Tasarım baştan bu atmosfere göre kuruldu — gradyanlar,
yıldızlar, ışıyan vurgu renkleri — ve aydınlık bir kesitte aynı etkiyi
vermiyordu. Bir düzeni iyi yapmak, iki düzeni idare etmekten iyi geldi.

## Hız

Tek sayfa, sıfır çerçeve, sıfır ayrı JavaScript dosyası. Bütün betikler
HTML'e gömülü ve toplamı 2,9 KB. En ağır kalem yazı tipleri; onlar da
sayfanın gerçekten kullandığı 127 glife budanmış durumda:

| | önce | sonra |
| --- | --- | --- |
| yazı tipleri | ~310 KB | ~120 KB |
| avatarlar | 216 KB | 20 KB |
| JavaScript | — | 2,9 KB (gömülü) |

## İçerik eklemek

Her şey `src/data/equinox.ts` içinde. Yeni bir kapı eklemek için
`gates` dizisine bir kayıt yazmak yeterli:

```ts
{
  id: "yeni",
  title: "Yeni Alan",
  short: "Yeni",              // yörünge düğümündeki etiket
  domain: "yeni.sametbasbug.dev",
  href: "https://yeni.sametbasbug.dev",
  kind: "Araç",               // panelde başlığın üstündeki tür
  description: "Tek cümlelik anlatım.",
  icon: "atlas",              // src/data/icons.ts
  hue: 190,                   // 0–360 arası ton açısı
  badge: "yeni",              // isteğe bağlı
}
```

Yörüngedeki düğümler eşit aralıkla yeniden dağılır, konsola yeni bir
panel eklenir, hero'daki "… kapı, tek eşik" ifadesindeki sayı adı kendini
günceller. Elle sayı yazan hiçbir yer yok.

Yeni bir ikon gerekiyorsa `src/data/icons.ts`e 24×24 ızgarada, tek renk
çizgi olarak eklenir.

## Kurulum

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Yayın

`main`'e push edilince GitHub Actions derleyip GitHub Pages'e atıyor:

- İş akışı: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- Alan adı: `public/CNAME`
- Çıktı: `astro build` → `dist/`

## Yapı

```text
src/data/equinox.ts        # tek veri kaynağı
src/data/icons.ts          # ikon yolları
src/layouts/Base.astro     # head, tema, yapısal veri
src/components/            # Sky, OrbitMap, GatePanel, Icon
src/pages/index.astro      # sayfanın tamamı
src/pages/404.astro        # kayıp rota
src/styles/                # tasarım sistemi ve @font-face tanımları
scripts/                   # font, ikon ve paylaşım kartı üreticileri
public/                    # CNAME, ikonlar, fontlar, avatarlar, og.png
```

Mimari notlar ve tuzaklar için [`AGENTS.md`](AGENTS.md).

## Bakım kuralı

Equinox'u iyi anlamda sıkıcı tut: bağlantılar doğru olsun, yerleşim
hafif kalsın, yeni bir yüzey eklenmeden önce yerini hak etsin. Sayfa bir
portala dönüşmeye başladıysa muhtemelen fazla gelmiştir.

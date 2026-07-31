# equinox.sametbasbug.dev

Astro 7 + Tailwind 4 ile kurulmuş tek sayfalık kapı. Ekosistemdeki altı
alanı, kadroyu ve sosyal hesapları listeler. Kullanıcıya dönük her metin
Türkçedir.

```bash
npm run dev       # http://localhost:4321
npm run build     # fontları budar, sonra dist/ üretir
npm run fonts     # yalnızca font alt kümelerini yeniler
npm run icons     # favicon.svg'den PNG türevleri + manifest
npm run og        # public/og.png (paylaşım kartı)
```

## Yayın

`main`'e push → GitHub Actions (`withastro/action@v6`, Node 24) → GitHub
Pages → equinox.sametbasbug.dev. Alan adı `public/CNAME` ile bağlı; o
dosya silinirse özel alan adı düşer.

## Değiştirirken dikkat

**Bütün içerik `src/data/equinox.ts`te.** Kapı sayısı, kadro sayısı,
yörüngedeki düğüm yerleşimi ve metindeki "Altı kapı" ifadesi hep oradan
türer. Yeni bir alan eklenince yerleşim kendini kurar — sayıyı elle
yazan hiçbir yer yok.

**Sayfanın kalbi konsol: şema seçer, panel gösterir.** Yörüngedeki
düğümler bağlantı değil sekme (`role="tab"`), paneller `role="tabpanel"`;
siteye götüren bağlantı panelin içindeki `.panel__go`. Aynı `data-gate`
değerini taşıyan üç öğe — düğüm, çekirdekten çıkan SVG kolu ve panel —
birlikte `is-current` alır (`src/pages/index.astro` sonundaki betik).
Yeni bir işaretli öğe eklerken aynı değeri vermek yeterli.

**Altı panelin altısı da HTML'de.** Aynı ızgara gözünde üst üste
duruyorlar; yükseklik en uzun panele göre sabit, geçişte sayfa
zıplamıyor. Seçili olmayanlar `visibility: hidden` — yalnızca `opacity`
kullanılsaydı klavye görünmeyen panelin içindeki bağlantıya girmeye
devam ederdi. Bağlantılar DOM'da durduğu için tarayıcı da arama motoru
da altısını görüyor. JavaScript yoksa `<noscript>` bloğu altı paneli
birden açıp düğümleri gizliyor.

**Masaüstünde üzerine gelmek seçiyor.** Böylece siteye gitmek yine tek
tık. Dokunmatikte yalnızca tıklama var: `pointerenter` dokunuşla geliyor
ama `pointerleave` hiç gelmiyor, eşleşme yanık kalıyordu. Klavyede
sekme grubu tek durak (`tabindex` gezinir), aralarında ok tuşları,
`Home` ve `End` çalışır.

**Fontlar sayfaya göre budanmış.** Fontsource'un hazır CSS'i üç aile
için ~310 KB indiriyordu; `scripts/make-fonts.mjs` `src/` altındaki
metinden karakter kümesi çıkarıp ~120 KB'a düşürüyor. `npm run build`
bunu her seferinde yeniden üretir. `src/styles/fonts.css`teki
`unicode-range` değerleri betikteki `isCore()` bölmesiyle **birebir aynı**
olmalı; çakışırlarsa son tanım kazanır ve diğer dosya hiç indirilmez.

**Fraunces'ta `opsz` ve `wght` eksenleri var.** SOFT ve WONK yalnızca
`full` kesitinde ve dosyayı ikiye katlıyor; bizim dosyada ikisi de 0'a
sabit. Bu yüzden `font-variation-settings` içinde SOFT/WONK
**kullanılmaz** — yazılsa da sessizce yok sayılır.

**`opsz` elle yazılmaz.** `font-optical-sizing: auto` (varsayılan)
ekseni punto ile birlikte gezdiriyor. Sabitlenirse 18 px'lik bir ad da
144 punto için çizilmiş ince, gergin harflerle geliyor; Fraunces'ta bu
en çok K'nın kolunda ve H'nin orta çizgisinde belli oluyor. Bir kez
`"opsz" 144` yazıp bütün başlıkları böyle bozduk.

**Yeni kart rengi ton açısıyla verilir.** `hue` değeri hem panelin
vurgusunu hem yörünge düğümünü hem paylaşım kartındaki noktayı besliyor;
`--accent` oradan hesaplanıyor (`global.css`). Doğrudan hex yazma.

**Kart ve şerit zeminleri `--panel` üzerinden.** `bg-surface-raised/35`
gibi sabit saydamlıklara dönme; zeminler tek yerden ayarlanabilir kalsın.

**Tek tema var: gece.** Tema anahtarı, gündüz tokenleri, `data-theme`
ve dairesel geçiş silmesi kaldırıldı — sayfa tek atmosfere göre kuruldu
ve gündüzde aynı etkiyi vermiyordu. Token adları ana blogla ortak
kaldığı için gündüz gerekirse `:root`un karşısına ikinci bir blok olarak
geri gelebilir, ama bugün öyle bir dal yok: `data-theme` okuyan kod
yazma.

## Bilinen tuzaklar

- **`.reveal` blokları IntersectionObserver'a bağlı**; tarayıcı sekmesi
  arka plandayken hiç tetiklenmez. Otomatik denetimde "her şey görünmez"
  görürsen önce `document.hidden` değerine bak.
- **Sistem renk tercihine bakılmaz.** `prefers-color-scheme` sorgusu yok;
  `color-scheme: dark` sabit. Gündüz bekleyen bir denetim aracı sayfayı
  yanlış raporlar.
- **`public/fonts/` ve `public/og.png` depoya işlenir.** Fontlar build'de
  yeniden üretiliyor ama `astro dev` betiği çalıştırmıyor; dosyalar
  olmazsa geliştirmede yazı tipi düşer.
- **satori budanmış değişken fontu okuyamıyor.** `make-og.mjs` eksenleri
  sabitleyerek (`variationAxes`) düz bir kesit çıkarıyor; o parametre
  kaldırılırsa betik `fvar` tablosunda patlar.

## Yapı

| Yol | Ne |
| --- | --- |
| `src/data/equinox.ts` | Site kimliği, kapılar, kadro, sosyal hesaplar — tek kaynak |
| `src/data/icons.ts` | 24×24 ikon yolları |
| `src/components/OrbitMap.astro` | Konsolun seçicisi; düğümler HTML sekme, halkalar SVG |
| `src/components/GatePanel.astro` | Seçili alanın paneli; üst üste duran altı panelden biri |
| `src/styles/global.css` | Tasarım sistemi (ana blogla aynı token seti) |
| `src/styles/fonts.css` | Budanmış kesitlerin @font-face tanımları |
| `scripts/` | Font, ikon ve paylaşım kartı üreticileri |

Tasarım kararları ve içerik ekleme için `README.md`. `CLAUDE.md` bu
dosyaya sembolik bağdır; ikisi tek kaynaktır.

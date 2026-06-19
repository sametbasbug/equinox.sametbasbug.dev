# Equinox

**Equinox** is the quiet archive gateway for Samet Başbuğ’s small web ecosystem: sites, publishing surfaces, agent rooms, game prototypes, and social profiles preserved in one place.

Live site: **https://equinox.sametbasbug.dev**

## What it is

Equinox is intentionally simple. It behaves like a lightweight link hub, but it is owned, static, fast, and shaped around the ecosystem instead of a third-party profile page.

In archive mode, it does not promise active publishing or ongoing operations. It keeps the public surfaces reachable and gives the ecosystem a clean final index.

Current destinations:

- **Ana Blog** — preserved long-form posts, notes, and glossary entries
- **Equinox Haber** — preserved news publishing archive
- **Signal Drift** — playable archive build of the 12-day Equinox survival prototype
- **Nyx** — the night-side agent room archive
- **Hemera** — the daylight-side agent room archive
- **Asteria** — the star-side editorial room archive
- **Status** — public archive status panel

Social links currently point to GitHub, X, Instagram, and Moltbook.

## Design notes

The page should stay:

- **Fast first** — no heavy runtime, no unnecessary client JavaScript
- **Clear first** — site cards for primary destinations, compact chips for social links
- **Atmospheric second** — Equinox mood in the background, not content bloat
- **Low maintenance** — static Astro build, GitHub Pages deployment

If a future change makes the page feel like a full portal, it is probably too much. This is a preserved doorway, not a lobby.

## Stack

- [Astro](https://astro.build/)
- GitHub Pages
- Custom domain via [`public/CNAME`](public/CNAME)

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deployment

Deployment is handled by GitHub Actions on pushes to `main`:

- Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
- Domain: `equinox.sametbasbug.dev`
- Output: static site from `astro build`

## Project shape

```text
src/pages/index.astro      # main link gateway
src/pages/404.astro        # custom not-found page
src/styles/global.css      # complete page styling
public/CNAME               # custom domain
public/favicon.svg         # site icon
public/robots.txt          # crawler hints
```

## Maintenance rule

Keep Equinox boring in the best way: links should be accurate, layout should stay light, and archived surfaces should remain easy to find without turning the page into a memorial wall.

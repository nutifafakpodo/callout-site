# callout-site

Marketing website for **Callout** — a trades marketplace for Ghana where prices are set by the trade, not invented per job.

Every service in the Callout catalogue carries a published price band. Tradespeople vote on what those bands should be, and quotes have to fall inside them unless the tradesperson writes out a scope that justifies going over. This site exists to explain that idea to two audiences at once: homeowners who want to know a price before anyone turns up, and tradespeople who are tired of being undercut.

## Run it

```bash
pnpm install
pnpm dev
```

| Command | Does |
| --- | --- |
| `pnpm dev` | Dev server on <http://localhost:5177> |
| `pnpm build` | Production build into `dist/` |
| `pnpm preview` | Serve the built output |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm check` | typecheck + build (what CI runs) |

## Stack

Vite · React 19 · TypeScript · Tailwind 4 · Framer Motion · wouter

Deliberately a static SPA with no backend: everything on the page is copy and vector, so it deploys as plain files to anything.

## Configuration

Copy `.env.example` to `.env` and fill in what you have. All are optional — the CTAs fall back to `#` and the footer hides links that were never configured, so a build with no env set still renders cleanly.

| Variable | Used for |
| --- | --- |
| `VITE_CUSTOMER_APP_URL` | Where "Find a tradesperson" points |
| `VITE_TRADESPERSON_APP_URL` | Where "I'm a tradesperson" points |
| `VITE_CONTACT_EMAIL` | Footer contact address |

For GitHub Pages, set these as **repository variables** (Settings → Secrets and variables → Actions → Variables) and the Pages workflow passes them through. For Vercel, set them as environment variables on the project.

## Deployment

The same source deploys to both targets. The only difference is the base path, which `vite.config.ts` reads from `BASE_PATH`:

- **GitHub Pages** serves project sites from `/<repo>/`, so the workflow builds with `BASE_PATH=/callout-site/` and copies `index.html` to `404.html` (Pages has no rewrite rules, so that is what keeps client-side routes alive on a hard refresh).
- **Vercel** serves from `/`, sets no `BASE_PATH`, and handles routing with the rewrite in `vercel.json`.

### GitHub Pages

`.github/workflows/pages.yml` runs on every push to `main`. It needs Pages enabled once: **Settings → Pages → Source: GitHub Actions**.

### Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). `vercel.json` already declares the framework, build command, output directory, SPA rewrite, and cache/security headers, so there is nothing to configure in the dashboard beyond environment variables.

## Content

All copy and product data lives in [`src/lib/content.ts`](src/lib/content.ts). The trades, services, and price bands shown on the site are the real entries from the product catalogue, so the figures here match the figures in the app. Prices are stored in minor units (pesewas) for the same reason they are in the product — `formatMoney` is the only thing that converts.

There are no invented customer counts, testimonials, or press quotes anywhere on this site. If you add social proof later, it should be real and attributed.

## Motion

Motion is the point of the design, not decoration on top of it. Two pieces carry the product argument:

- **`price-band.tsx`** draws the band, then lands quotes on it — two inside, one outside that has to carry a written scope. It is the whole proposition in one diagram.
- **`guild-vote.tsx`** plays out a proposal: votes arrive one at a time with their real weights (Pro counts 1.0, basic 0.5), the tally resolves, and only then does the band move. The sequencing is deliberate — the price changes *because* the vote passed.

Shared primitives live in `components/motion.tsx` (`Reveal`, `Stagger`, `StaggerItem`, `Magnetic`, `Section`, `Eyebrow`) with one easing curve and one distance scale across the whole page.

**Every animated component checks `useReducedMotion` and renders a static equivalent.** Reveals that depend on animation to become visible render already-visible under reduced motion rather than merely animating faster — otherwise the content would never appear for those users. `index.css` also neutralises CSS animations and transitions at the media-query level as a backstop.

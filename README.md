# Aruginil

**Discover Local Businesses Near You** — a standalone local-business
discovery platform for Karaikudi, Coimbatore and other Tamil Nadu
towns. React + Vite + TypeScript + Tailwind, frontend-only (no
backend, no database).

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

`vite build`, then two postbuild scripts:

- `scripts/prerender-localfind.mjs` — writes a real static `index.html`
  for the home page + every listing page that has real business data +
  every business page. Listing pages with zero real businesses are
  **not** prerendered as static files (see "Data completeness" below)
  — they still resolve correctly, just client-side.
- `scripts/generate-sitemap.mjs` — writes `dist/sitemap.xml`, covering
  only pages with real content (mirrors the prerender step).

## Data architecture — how to add a business

This is the part that matters most for day-to-day editing. To add a
real business, you only ever need to touch **one file**:

```
src/data/cities/{citySlug}/{categoryGroup}/{categorySlug}.ts
```

For example, to add a new Karaikudi Wood Works business:

```ts
// src/data/cities/karaikudi/wood-furniture/wood-works.ts
export const karaikudiWoodWorksBusinesses: Business[] = [
  // ...existing businesses...
  {
    id: "karaikudi-wood-works-your-new-business",
    name: "Your New Business",
    slug: "your-new-business",
    city: "Karaikudi",
    citySlug: "karaikudi",
    category: "Wood Works",
    categorySlug: "wood-works",
    description: "...",
    services: ["..."],
    address: null,   // or a verified real address
    phone: null,      // or a verified real phone number
    email: null,
    website: null,
    image: "/assets/localfind/wood-works.svg", // category fallback, or a real image URL
    openingHours: null,
    featured: false,
  },
];
```

That's it — no other file needs to change. It automatically appears in:
the listing page, search, business/category counts, the related-businesses
section, the business detail page, the sitemap, and prerendered static HTML.

**If the city/category folder doesn't exist yet** (e.g. adding the
first business for a brand-new category), create the file, add its
`export const {city}{Group}Businesses` line to that city's
`{group}/index.ts`, and add the group's aggregate import/spread to
`src/data/businesses.ts`. `npm run dev` will immediately flag (in the
console) if anything doesn't line up — see "Data validation" below.

### Category taxonomy

`src/data/categories/{group}.ts` — 16 files, one per category group,
144 categories total, aggregated by `src/data/categories.ts`. Only
categories with real business data currently have hand-written
descriptions/services/FAQs; the rest have an honest generic
description and empty services/tips/FAQs, ready to be filled in
alongside their first real business.

### Cities

`src/data/cities.ts` — 13 cities. Every city supports every category
(`ALL_CATEGORY_SLUGS`, all 144) except **Coimbatore**, which is
deliberately restricted to AC Service only.

### Data validation

`src/utils/businessResolver.ts` runs a dev-time-only check (stripped
from production builds) that warns in the browser console if it finds
duplicate business IDs, duplicate slugs within the same city+category
(a routing collision), a business filed under a city/category it
doesn't belong to, or a city listing an unknown category slug.

### Indexing / thin-page policy

A city/category combination with zero real businesses still resolves
(no 404) and shows the real "No businesses found" state, but is marked
`noindex` and isn't included in the sitemap or prerendered as a static
file — see `src/pages/localfind/LocationCategory.jsx` and
`scripts/prerender-localfind.mjs`. This avoids generating hundreds of
thin, empty SEO pages while keeping every valid route usable.

## Typography

Two Google Fonts only: **Syne** (headings, brand, business names —
`font-syne`) and **Inter** (body/UI, the default — `font-inter`).
Loaded via a single `@import` at the top of `src/index.css`.

## Design tokens

Tailwind classes are namespaced under the `lf-` prefix (`bg-lf-brand`,
`shadow-lf-card`, etc.) — a holdover from when this app shared a
codebase with another site and needed to avoid Tailwind class
collisions. Kept as-is to avoid a large, purely mechanical rename
across every component file.

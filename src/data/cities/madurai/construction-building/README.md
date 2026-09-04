# Madurai — Construction Building

To add a real, verified business in this group for Madurai, create a file named
`{categorySlug}.ts` in this folder (one file per category — reuse an existing file
if it already exists instead of creating a duplicate).

Valid category slugs in this group:

- `cement-shop` — Cement Shop
- `building-materials` — Building Materials
- `builders` — Builders
- `construction-contractors` — Construction Contractors
- `civil-contractors` — Civil Contractors
- `hardware-shops` — Hardware Shops
- `sand-suppliers` — Sand Suppliers
- `m-sand-suppliers` — M-Sand Suppliers
- `bricks-manufacturers` — Bricks Manufacturers
- `fly-ash-bricks` — Fly Ash Bricks
- `hollow-blocks` — Hollow Blocks
- `paver-blocks` — Paver Blocks
- `ready-mix-concrete` — Ready Mix Concrete
- `rcc-pipes` — RCC Pipes
- `readymade-compound-walls` — Readymade Compound Walls
- `tiles-and-granite` — Tiles & Granite
- `marble-dealers` — Marble Dealers
- `sanitaryware-dealers` — Sanitaryware Dealers
- `roofing-sheets` — Roofing Sheets
- `athangudi-tiles` — Athangudi Tiles

## File template

```ts
import type { Business } from "../../../../types/business";

export const maduraiCementShopBusinesses: Business[] = [
  {
    id: "madurai-CATEGORY_SLUG-your-business-slug",
    name: "Real Business Name",
    slug: "your-business-slug",
    city: "Madurai",
    citySlug: "madurai",
    category: "Category Name",
    categorySlug: "CATEGORY_SLUG",
    description: "One or two factual sentences — no invented claims.",
    services: ["Real Service 1", "Real Service 2"],
    address: null,   // or a verified real address
    phone: null,      // or a verified real phone number
    email: null,
    website: null,
    image: "/assets/localfind/CATEGORY_SLUG.svg", // category fallback, or a real image URL
    openingHours: null,
    featured: false,
  },
];
```

## After creating the file

1. Add it to this folder's `index.ts` (create that file too if this is the
   first category with data in this group for Madurai):

```ts
import { yourCementShopBusinesses } from "./CATEGORY_SLUG";

export const maduraiConstructionBuildingBusinesses = [
  ...yourCementShopBusinesses,
];
```

2. Add the group import + spread to `src/data/businesses.ts` (only if this is
   the first category with data in this group for Madurai — if the
   group already has other categories with data there, it's already wired in).

3. If `Madurai` doesn't already support this category in
   `src/data/cities.ts`'s `availableCategories`, add the category slug there too
   (most cities already list all 144 category slugs via `ALL_CATEGORY_SLUGS` —
   this only matters if that's been customised).

Delete this README once the folder has real data in it.

# Karaikudi — Electronics Services

To add a real, verified business in this group for Karaikudi, create a file named
`{categorySlug}.ts` in this folder (one file per category — reuse an existing file
if it already exists instead of creating a duplicate).

Valid category slugs in this group:

- `ac-service` — AC Service
- `computer-service-centres` — Computer Service Centres
- `mobile-phone-shops` — Mobile Phone Shops
- `mobile-repair-shops` — Mobile Repair Shops
- `cctv-dealers` — CCTV Dealers
- `cctv-installation` — CCTV Installation
- `internet-service-providers` — Internet Service Providers
- `solar-systems` — Solar Systems
- `sound-services` — Sound Services
- `audio-equipment` — Audio Equipment
- `printing-services` — Printing Services
- `flex-printing` — Flex Printing

## File template

```ts
import type { Business } from "../../../../types/business";

export const karaikudiAcServiceBusinesses: Business[] = [
  {
    id: "karaikudi-CATEGORY_SLUG-your-business-slug",
    name: "Real Business Name",
    slug: "your-business-slug",
    city: "Karaikudi",
    citySlug: "karaikudi",
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
   first category with data in this group for Karaikudi):

```ts
import { yourAcServiceBusinesses } from "./CATEGORY_SLUG";

export const karaikudiElectronicsServicesBusinesses = [
  ...yourAcServiceBusinesses,
];
```

2. Add the group import + spread to `src/data/businesses.ts` (only if this is
   the first category with data in this group for Karaikudi — if the
   group already has other categories with data there, it's already wired in).

3. If `Karaikudi` doesn't already support this category in
   `src/data/cities.ts`'s `availableCategories`, add the category slug there too
   (most cities already list all 144 category slugs via `ALL_CATEGORY_SLUGS` —
   this only matters if that's been customised).

Delete this README once the folder has real data in it.

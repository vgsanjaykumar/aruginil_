# Thirupattur — Health Wellness

To add a real, verified business in this group for Thirupattur, create a file named
`{categorySlug}.ts` in this folder (one file per category — reuse an existing file
if it already exists instead of creating a duplicate).

Valid category slugs in this group:

- `acupuncture-clinics` — Acupuncture Clinics
- `physiotherapy-clinics` — Physiotherapy Clinics
- `dental-clinics` — Dental Clinics
- `skin-clinics` — Skin Clinics
- `siddha-clinics` — Siddha Clinics
- `varma-vaithiyasalai` — Varma Vaithiyasalai
- `yoga-centres` — Yoga Centres
- `fitness-centres` — Fitness Centres
- `gyms` — Gyms

## File template

```ts
import type { Business } from "../../../../types/business";

export const thirupatturAcupunctureClinicsBusinesses: Business[] = [
  {
    id: "thirupattur-CATEGORY_SLUG-your-business-slug",
    name: "Real Business Name",
    slug: "your-business-slug",
    city: "Thirupattur",
    citySlug: "thirupattur",
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
   first category with data in this group for Thirupattur):

```ts
import { yourAcupunctureClinicsBusinesses } from "./CATEGORY_SLUG";

export const thirupatturHealthWellnessBusinesses = [
  ...yourAcupunctureClinicsBusinesses,
];
```

2. Add the group import + spread to `src/data/businesses.ts` (only if this is
   the first category with data in this group for Thirupattur — if the
   group already has other categories with data there, it's already wired in).

3. If `Thirupattur` doesn't already support this category in
   `src/data/cities.ts`'s `availableCategories`, add the category slug there too
   (most cities already list all 144 category slugs via `ALL_CATEGORY_SLUGS` —
   this only matters if that's been customised).

Delete this README once the folder has real data in it.

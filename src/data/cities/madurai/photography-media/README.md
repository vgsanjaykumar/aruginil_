# Madurai — Photography Media

To add a real, verified business in this group for Madurai, create a file named
`{categorySlug}.ts` in this folder (one file per category — reuse an existing file
if it already exists instead of creating a duplicate).

Valid category slugs in this group:

- `photo-studio` — Photo Studio

## File template

```ts
import type { Business } from "../../../../types/business";

export const maduraiPhotoStudioBusinesses: Business[] = [
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
import { yourPhotoStudioBusinesses } from "./CATEGORY_SLUG";

export const maduraiPhotographyMediaBusinesses = [
  ...yourPhotoStudioBusinesses,
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

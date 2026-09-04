import type { Business } from "../../../../types/business";

// Melody Photography used to have its own separate record here
// (primary category "wedding-photography"), duplicating the business
// that's now correctly listed once at
// data/cities/karaikudi/photography-media/photo-studio.ts, with
// "wedding-photography" as a secondary category via `categorySlugs`.
// That's the one real business record — see this project's multi-
// category architecture (categorySlugs) for why a business doesn't
// need a separate record per category it genuinely offers.
export const karaikudiWeddingHallsBusinesses: Business[] = [];
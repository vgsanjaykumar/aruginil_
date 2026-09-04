import { cities, getCityBySlug } from "../data/cities";
import { categories, getCategoryBySlug } from "../data/categories";
import { businesses } from "../data/businesses";
import { listingPath } from "./seoResolver";
import type { Business, Category, City } from "../types/business";

export { getCityBySlug, getCategoryBySlug };

/**
 * Single source of truth for "does this business belong to this
 * category" — checks the primary `categorySlug` first (covers every
 * existing business unchanged), then falls back to the optional
 * `categorySlugs` array for businesses with genuine secondary
 * category associations. Every place that filters, counts, or
 * searches businesses by category should use this rather than a
 * direct `=== categorySlug` check, so multi-category businesses are
 * handled consistently everywhere.
 */
export function businessBelongsToCategory(business: Business, categorySlug: string): boolean {
  return business.categorySlug === categorySlug || (business.categorySlugs?.includes(categorySlug) ?? false);
}

export function getBusinessesByCityAndCategory(citySlug: string, categorySlug: string): Business[] {
  return businesses.filter((b) => b.citySlug === citySlug && businessBelongsToCategory(b, categorySlug));
}

export function getBusinessBySlug(
  citySlug: string,
  categorySlug: string,
  businessSlug: string
): Business | undefined {
  return businesses.find(
    (b) => b.citySlug === citySlug && b.categorySlug === categorySlug && b.slug === businessSlug
  );
}

export interface ListingContext {
  city: City;
  category: Category;
  businesses: Business[];
}

/**
 * Single place that validates a /:city/:category combination — used by
 * the listing page, the sitemap/prerender scripts, and search, so
 * "invalid city", "invalid category" and "invalid combination" (e.g.
 * /coimbatore/beauty-parlour) are never checked differently in two
 * places. NEVER falls back to another city — an unresolvable
 * combination returns `null`, not Karaikudi's (or anyone else's) data.
 */
export function resolveListing(citySlug: string, categorySlug: string): ListingContext | null {
  const city = getCityBySlug(citySlug);
  if (!city) return null;

  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  if (!city.availableCategories.includes(categorySlug)) return null;

  return { city, category, businesses: getBusinessesByCityAndCategory(citySlug, categorySlug) };
}

export interface BusinessContext {
  city: City;
  category: Category;
  business: Business;
}

export function resolveBusiness(
  citySlug: string,
  categorySlug: string,
  businessSlug: string
): BusinessContext | null {
  const listing = resolveListing(citySlug, categorySlug);
  if (!listing) return null;

  const business = getBusinessBySlug(citySlug, categorySlug, businessSlug);
  if (!business) return null;

  return { city: listing.city, category: listing.category, business };
}

/** Every valid {citySlug, categorySlug} pair currently in the dataset — drives the sitemap and prerender scripts. */
export function getAllValidListingPairs(): { citySlug: string; categorySlug: string }[] {
  const pairs: { citySlug: string; categorySlug: string }[] = [];
  for (const city of cities) {
    for (const categorySlug of city.availableCategories) {
      pairs.push({ citySlug: city.slug, categorySlug });
    }
  }
  return pairs;
}

/**
 * Full Category objects available for a given city slug (empty array
 * for an unknown city). Single source of truth for "which categories
 * should the Categories dropdown/menu show for the current city" —
 * used by Header, Navigation and Footer so a city's unsupported
 * categories (e.g. Coimbatore only supports AC Service) are never
 * offered or linkable anywhere in the chrome.
 */
export function getAvailableCategoriesForCity(citySlug: string): Category[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  return categories.filter((c) => city.availableCategories.includes(c.slug));
}

/**
 * Resolves the "current city" from a React Router pathname for chrome
 * components (Header/Navigation/Footer) that need to keep category
 * links pointing at whichever city the user is currently browsing,
 * instead of a hardcoded default. Falls back to `fallbackCitySlug`
 * (Karaikudi by default) only when the path's first segment isn't a
 * real city. NEVER silently substitutes a different valid city.
 */
export function getCurrentCitySlugFromPath(pathname: string, fallbackCitySlug = "karaikudi"): string {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return getCityBySlug(firstSegment ?? "") ? (firstSegment as string) : fallbackCitySlug;
}

/**
 * Resolves the "current category" from a React Router pathname —
 * the second URL segment, when it's a real category slug. Returns
 * `null` on the home page or any route with no category in it (there
 * is nothing to preserve there).
 */
export function getCurrentCategorySlugFromPath(pathname: string): string | null {
  const secondSegment = pathname.split("/").filter(Boolean)[1];
  if (!secondSegment) return null;
  return getCategoryBySlug(secondSegment) ? secondSegment : null;
}

/**
 * Single source of truth for "where should switching to this city
 * take the user", used by both the desktop Header and the mobile
 * Navigation Cities list — this is the fix for the bug where changing
 * city used to always jump to `city.availableCategories[0]`
 * regardless of what category was currently selected.
 *
 * - If a category is currently selected AND the target city actually
 *   supports it, preserve it: /{newCity}/{sameCategory}.
 * - Otherwise (no category was selected, or the target city doesn't
 *   offer it), there is no city hub page yet to land on, so the
 *   safest existing route is that city's first available category —
 *   but this is now genuinely a fallback for the "can't preserve it"
 *   case, not the unconditional behavior for every city switch.
 */
export function getCityChangeDestination(city: City, currentCategorySlug: string | null): string {
  if (currentCategorySlug && city.availableCategories.includes(currentCategorySlug)) {
    return listingPath(city.slug, currentCategorySlug);
  }
  return listingPath(city.slug, city.availableCategories[0]);
}

// ── Development-time data validation (section 40) ──────────────────
//
// Runs once, only in dev mode (import.meta.env.DEV — stripped out of
// production builds entirely), and only logs to the console — it
// never throws or blocks rendering. Catches the exact classes of
// mistake the folder-based architecture is meant to make easy to
// avoid: duplicate IDs, duplicate slugs within the same city+category
// (a routing collision), a business filed under a city/category it
// doesn't actually belong to, or a city listing a category slug that
// doesn't exist in the category registry.
function validateBusinessData(): string[] {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenScopedSlugs = new Set<string>();

  for (const b of businesses) {
    if (seenIds.has(b.id)) errors.push(`Duplicate business id: "${b.id}"`);
    seenIds.add(b.id);

    const scopeKey = `${b.citySlug}/${b.categorySlug}/${b.slug}`;
    if (seenScopedSlugs.has(scopeKey)) errors.push(`Duplicate slug within city+category: "${scopeKey}"`);
    seenScopedSlugs.add(scopeKey);

    if (!getCityBySlug(b.citySlug)) {
      errors.push(`Business "${b.id}" has invalid citySlug "${b.citySlug}"`);
    }
    if (!getCategoryBySlug(b.categorySlug)) {
      errors.push(`Business "${b.id}" has invalid categorySlug "${b.categorySlug}"`);
    }
    const city = getCityBySlug(b.citySlug);
    if (city && !city.availableCategories.includes(b.categorySlug)) {
      errors.push(
        `Business "${b.id}" is filed under ${b.citySlug}/${b.categorySlug}, but ${city.name} doesn't list "${b.categorySlug}" in availableCategories`
      );
    }

    // Secondary category associations (categorySlugs) — same checks as
    // the primary categorySlug, plus: the primary shouldn't be
    // redundantly repeated in the secondary list.
    if (b.categorySlugs) {
      for (const secondarySlug of b.categorySlugs) {
        if (secondarySlug === b.categorySlug) {
          errors.push(
            `Business "${b.id}": "${secondarySlug}" in categorySlugs duplicates the primary categorySlug — remove it, the primary is always included`
          );
        }
        if (!getCategoryBySlug(secondarySlug)) {
          errors.push(`Business "${b.id}" has invalid category "${secondarySlug}" in categorySlugs`);
        }
        if (city && !city.availableCategories.includes(secondarySlug)) {
          errors.push(
            `Business "${b.id}": secondary category "${secondarySlug}" isn't available in ${city.name}`
          );
        }
      }
    }
  }

  for (const city of cities) {
    for (const catSlug of city.availableCategories) {
      if (!getCategoryBySlug(catSlug)) {
        errors.push(`City "${city.slug}" lists unknown category "${catSlug}" in availableCategories`);
      }
    }
  }

  return errors;
}

if (import.meta.env?.DEV) {
  const errors = validateBusinessData();
  if (errors.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(`[businessResolver] ${errors.length} data validation issue(s):\n` + errors.map((e) => `  - ${e}`).join("\n"));
  }
}

import type { Business, Category, City } from "../types/business";
import { ARUGINIL_SITE_URL, ARUGINIL_NAME, ARUGINIL_TAGLINE } from "../config/siteConfig.js";

export function listingPath(citySlug: string, categorySlug: string): string {
  return `/${citySlug}/${categorySlug}`;
}

export function businessPath(citySlug: string, categorySlug: string, businessSlug: string): string {
  return `/${citySlug}/${categorySlug}/${businessSlug}`;
}

export function absoluteUrl(path: string): string {
  return `${ARUGINIL_SITE_URL}${path}`;
}

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage?: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage?: string;
}

export const ARUGINIL_HOME_PATH = "/";

/** SEO metadata for the LocalFind home page (/local). */
export function generateHomeSEO(): PageSEO {
  const title = `${ARUGINIL_NAME} — ${ARUGINIL_TAGLINE}`;
  const description =
    "Find trusted local services, shops and professionals across Karaikudi, Coimbatore and other Tamil Nadu towns — beauty parlours, AC service, UPVC, wood works, cement shops, RO water purifiers and more.";
  const ogImage = `${ARUGINIL_SITE_URL}/assets/localfind/beauty-parlour.svg`;

  return {
    title,
    description,
    path: ARUGINIL_HOME_PATH,
    canonical: absoluteUrl(ARUGINIL_HOME_PATH),
    ogTitle: title,
    ogDescription: description,
    ogUrl: absoluteUrl(ARUGINIL_HOME_PATH),
    ogImage,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
  };
}

/**
 * Builds the short "keyword suffix" used in listing/business titles,
 * e.g. "AC Repair, Installation & Maintenance" — derived from the
 * category's own real `services` list (first 3), never invented
 * copy. Falls back gracefully if a category has fewer than 3 services.
 */
function serviceKeywordSuffix(services: string[]): string {
  const top = services.slice(0, 3);
  if (top.length <= 1) return top.join("");
  if (top.length === 2) return `${top[0]} & ${top[1]}`;
  return `${top[0]}, ${top[1]} & ${top[2]}`;
}

/** SEO metadata for a /:city/:category listing page — generated from real city + category data. */
export function generateListingSEO(city: City, category: Category): PageSEO {
  // Natural, keyword-focused title built from the category's own real
  // services — e.g. "AC Service in Karaikudi – AC Repair, Installation
  // & Maintenance" — rather than a generic "Best X in Y | LocalFind"
  // template repeated on every page.
  const suffix = serviceKeywordSuffix(category.services);
  const title = suffix ? `${category.name} in ${city.name} – ${suffix}` : `${category.name} in ${city.name}`;
  const serviceList = category.services.slice(0, 4).join(", ").toLowerCase();
  const description = serviceList
    ? `Find local ${category.name.toLowerCase()} providers in ${city.name} for ${serviceList}. Compare businesses and contact them directly.`
    : `Find local ${category.name.toLowerCase()} providers in ${city.name}. Compare businesses and contact them directly.`;
  const path = listingPath(city.slug, category.slug);
  const ogImage = `${ARUGINIL_SITE_URL}/assets/localfind/${category.slug}.svg`;

  return {
    title,
    description,
    path,
    canonical: absoluteUrl(path),
    ogTitle: title,
    ogDescription: description,
    ogUrl: absoluteUrl(path),
    ogImage,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
  };
}

/** SEO metadata for an individual business page — generated from that business's own data only. */
export function generateBusinessSEO(business: Business, category: Category, city: City): PageSEO {
  // "[Real Business Name] – [Category] in [City]" — no "Best" claim,
  // no fabricated superlative.
  const title = `${business.name} – ${category.name} in ${city.name} | ${ARUGINIL_NAME}`;
  const description = `${business.name} offers ${category.name.toLowerCase()} services in ${city.name}, including ${business.services
    .slice(0, 3)
    .join(", ")
    .toLowerCase()}. See services, opening hours and contact details.`;
  const path = businessPath(business.citySlug, business.categorySlug, business.slug);
  const ogImage = absoluteUrl(business.image);

  return {
    title,
    description,
    path,
    canonical: absoluteUrl(path),
    ogTitle: `${business.name} in ${city.name} | ${ARUGINIL_NAME}`,
    ogDescription: description,
    ogUrl: absoluteUrl(path),
    ogImage,
    twitterTitle: `${business.name} in ${city.name} | ${ARUGINIL_NAME}`,
    twitterDescription: description,
    twitterImage: ogImage,
  };
}

export interface BreadcrumbItem {
  label: string;
  path: string | null;
}

export function getListingBreadcrumbs(city: City, category: Category): BreadcrumbItem[] {
  return [
    { label: "Home", path: "/" },
    { label: city.name, path: listingPath(city.slug, category.slug) },
    { label: category.pluralName, path: null },
  ];
}

export function getBusinessBreadcrumbs(business: Business, city: City, category: Category): BreadcrumbItem[] {
  return [
    { label: "Home", path: "/" },
    { label: city.name, path: listingPath(city.slug, category.slug) },
    { label: category.pluralName, path: listingPath(city.slug, category.slug) },
    { label: business.name, path: null },
  ];
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const lastPath = items[items.length - 1]?.path ?? "/";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.path ?? lastPath),
    })),
  };
}

/** ItemList JSON-LD for a listing page — no ratings/reviews, just the list of business URLs. */
export function generateListingJsonLd(city: City, category: Category, businesses: Business[]) {
  const seo = generateListingSEO(city, category);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seo.title,
    description: seo.description,
    url: seo.canonical,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: businesses.map((b, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: b.name,
        url: absoluteUrl(businessPath(b.citySlug, b.categorySlug, b.slug)),
      })),
    },
  };
}

/**
 * LocalBusiness JSON-LD for an individual business page.
 *
 * Includes only fields that are actually verified for that business
 * (name, description, address, phone, opening hours) — every field
 * that couldn't be verified (see businesses.ts) is simply omitted
 * rather than guessed. It deliberately OMITS `aggregateRating`,
 * `review`, `award`, and any "verified" claim, since none of that is
 * something this project can itself verify or attest to.
 */
export function generateBusinessJsonLd(business: Business, city: City) {
  const openingHoursSpecification = (business.openingHours ?? [])
    .filter((h) => h.hours.toLowerCase() !== "closed" && !h.hours.toLowerCase().includes("appointment"))
    .map((h) => {
      const match = h.hours.match(/(\d+):(\d+)\s*(AM|PM)\s*[–-]\s*(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return null;
      const to24 = (hh: string, mm: string, mer: string) => {
        let hour = parseInt(hh, 10);
        if (/PM/i.test(mer) && hour !== 12) hour += 12;
        if (/AM/i.test(mer) && hour === 12) hour = 0;
        return `${String(hour).padStart(2, "0")}:${mm}`;
      };
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: to24(match[1], match[2], match[3]),
        closes: to24(match[4], match[5], match[6]),
      };
    })
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    image: absoluteUrl(business.image),
    url: absoluteUrl(businessPath(business.citySlug, business.categorySlug, business.slug)),
    ...(business.website ? { sameAs: business.website } : {}),
    ...(business.phone ? { telephone: business.phone } : {}),
    address: {
      "@type": "PostalAddress",
      ...(business.address ? { streetAddress: business.address } : {}),
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "IN",
    },
    ...(openingHoursSpecification.length > 0 ? { openingHoursSpecification } : {}),
  };
}

/**
 * Site-wide WebSite + Organization JSON-LD. Rendered once, on the
 * home page — describes Aruginil itself (name, URL, description), not
 * any individual city/category/business. No ratings, no fabricated
 * founding details or social profiles beyond what's actually true.
 */
export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ARUGINIL_NAME,
    url: ARUGINIL_SITE_URL,
    description: ARUGINIL_TAGLINE,
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ARUGINIL_NAME,
    url: ARUGINIL_SITE_URL,
  };
}

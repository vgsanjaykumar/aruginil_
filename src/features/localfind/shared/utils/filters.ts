import type { Business } from "../../types";

export type SortOption = "relevance" | "name-asc" | "name-desc" | "featured-first";

export interface FilterState {
  service: string | null;
  openNow: boolean;
  featuredOnly: boolean;
}

export const emptyFilters: FilterState = {
  service: null,
  openNow: false,
  featuredOnly: false,
};

/** Very small "is it open right now" check based on a business's own weekly hours. */
export function isOpenNow(business: Business): boolean {
  if (!business.openingHours) return false;
  const today = business.openingHours[(new Date().getDay() + 6) % 7]; // Monday-first
  const hours = today.hours.toLowerCase();
  if (hours === "closed" || hours.includes("appointment")) return false;

  const match = today.hours.match(/(\d+):(\d+)\s*(AM|PM)\s*[–-]\s*(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return false;

  const to24 = (h: string, m: string, mer: string) => {
    let hour = parseInt(h, 10);
    if (/PM/i.test(mer) && hour !== 12) hour += 12;
    if (/AM/i.test(mer) && hour === 12) hour = 0;
    return hour * 60 + parseInt(m, 10);
  };

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const opens = to24(match[1], match[2], match[3]);
  const closes = to24(match[4], match[5], match[6]);
  return nowMinutes >= opens && nowMinutes <= closes;
}

export function searchBusinesses(list: Business[], query: string): Business[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.services.some((s) => s.toLowerCase().includes(q))
  );
}

export function filterBusinesses(list: Business[], filters: FilterState): Business[] {
  let result = list;
  if (filters.service) {
    result = result.filter((b) => b.services.includes(filters.service!));
  }
  if (filters.openNow) {
    result = result.filter(isOpenNow);
  }
  if (filters.featuredOnly) {
    result = result.filter((b) => b.featured);
  }
  return result;
}

export function sortBusinesses(list: Business[], sortBy: SortOption): Business[] {
  const result = [...list];
  switch (sortBy) {
    case "name-asc":
      return result.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return result.sort((a, b) => b.name.localeCompare(a.name));
    case "featured-first":
      return result.sort((a, b) => Number(b.featured) - Number(a.featured));
    default:
      return result; // "relevance" — dataset order (featured business first per category by construction)
  }
}

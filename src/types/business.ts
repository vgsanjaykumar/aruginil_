export interface City {
  id: string;
  name: string;
  slug: string;
  state: string;
  /** category slugs this city supports — drives valid /:city/:category routes */
  availableCategories: string[];
  intro: string;
}

export interface CategoryGroup {
  id: string;
  name: string;
  /** icon name from lucide-react, used as the group's visual default */
  icon: string;
  primaryColor: string;
  lightColor: string;
  darkColor: string;
}

export interface Category {
  id: string;
  name: string;
  /** plural display label, e.g. "Beauty Parlours" */
  pluralName: string;
  slug: string;
  /** which CategoryGroup this belongs to — see categoryGroups.ts */
  group: string;
  description: string;
  icon: string;
  primaryColor: string;
  lightColor: string;
  darkColor: string;
  services: string[];
  /** short "how to choose a provider" tips, category-specific */
  choosingTips: string[];
  faqs: { question: string; answer: string }[];
}

export interface DayHours {
  day: string;
  hours: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  city: string;
  citySlug: string;
  /** primary category — always the source of the canonical business detail URL (/{citySlug}/{categorySlug}/{businessSlug}) and the primary category shown on cards/badges. */
  category: string;
  categorySlug: string;
  /**
   * Optional secondary category associations, for a business that
   * genuinely offers services spanning more than one category (e.g.
   * a photographer who does both general "photography-services" and
   * "wedding-photography"). Only ever set when there's real evidence
   * the business offers that category's service — never assumed.
   *
   * The business still has exactly ONE record and ONE canonical URL
   * (based on `categorySlug` above) — this only affects which
   * category *listing* pages the business appears on. Optional and
   * additive: existing businesses with just `categorySlug` keep
   * working unchanged (see `businessBelongsToCategory()` in
   * businessResolver.ts, which checks both).
   */
  categorySlugs?: string[];
  description: string;
  services: string[];
  /** null when no verifiable address is available — never fabricated */
  address: string | null;
  /** null when no verifiable phone number is available — never fabricated */
  phone: string | null;
  email: string | null;
  /** Optional — a business doesn't need its own website to be listed. See googleUrl/instagramUrl/facebookUrl for alternate verifiable public presence. */
  website: string | null;
  /** Public Google Business Profile / Google Maps link, when that's the business's primary verifiable presence instead of (or alongside) a website. */
  googleUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  /**
   * Where this listing's details were verified from, when it's not
   * obvious from `website` alone — e.g. "Google Business Profile",
   * "Instagram page", "Justdial listing cross-checked with Google
   * Maps". Purely informational (not rendered as a "verified" badge —
   * see the data-collection rules in README.md for why).
   */
  verificationSource?: string;
  image: string;
  /** null when specific opening hours could not be verified */
  openingHours: DayHours[] | null;
  featured: boolean;
}

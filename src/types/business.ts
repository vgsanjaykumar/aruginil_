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
  category: string;
  categorySlug: string;
  description: string;
  services: string[];
  /** null when no verifiable address is available — never fabricated */
  address: string | null;
  /** null when no verifiable phone number is available — never fabricated */
  phone: string | null;
  email: string | null;
  website: string | null;
  image: string;
  /** null when specific opening hours could not be verified */
  openingHours: DayHours[] | null;
  featured: boolean;
}

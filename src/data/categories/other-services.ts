import type { Category } from "../../types/business";
/**
 * Categories in the "other-services" group.
 *
 * Only the categories Aruginil currently has real business data
 * for carry hand-written descriptions, service lists, choosing tips
 * and FAQs. The rest are registered here (so every valid category
 * from the master taxonomy resolves correctly and can be searched/
 * linked to) with an honest, generic description and empty
 * services/tips/FAQs — nothing invented — ready to be filled in
 * once real local businesses and real service details are verified
 * for that category.
 */
export const other_servicesCategories: Category[] = [
  {
    id: "spa",
    name: "Spa",
    pluralName: "Spas",
    slug: "spa",
    group: "other-services",
    description: "Find local spa providers near you.",
    icon: "Layers",
    primaryColor: "#0891B2",
    lightColor: "#CFFAFE",
    darkColor: "#0E7490",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "digital-marketing-agencies",
    name: "Digital Marketing Agencies",
    pluralName: "Digital Marketing Agencies",
    slug: "digital-marketing-agencies",
    group: "other-services",
    description: "Find local digital marketing agencies providers near you.",
    icon: "Layers",
    primaryColor: "#0891B2",
    lightColor: "#CFFAFE",
    darkColor: "#0E7490",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "photography-services",
    name: "Photography Services",
    pluralName: "Photography Services",
    slug: "photography-services",
    group: "other-services",
    description: "Find local photography services providers near you.",
    icon: "Layers",
    primaryColor: "#0891B2",
    lightColor: "#CFFAFE",
    darkColor: "#0E7490",
    services: [],
    choosingTips: [],
    faqs: [],
  },
];

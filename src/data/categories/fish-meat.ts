import type { Category } from "../../types/business";
/**
 * Categories in the "fish-meat" group.
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
export const fish_meatCategories: Category[] = [
  {
    id: "fish-retailers",
    name: "Fish Retailers",
    pluralName: "Fish Retailers",
    slug: "fish-retailers",
    group: "fish-meat",
    description: "Find local fish retailers providers near you.",
    icon: "Fish",
    primaryColor: "#0369A1",
    lightColor: "#E0F2FE",
    darkColor: "#075985",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "fish-aquarium",
    name: "Fish Aquarium",
    pluralName: "Fish Aquariums",
    slug: "fish-aquarium",
    group: "fish-meat",
    description: "Find local fish aquarium providers near you.",
    icon: "Fish",
    primaryColor: "#0369A1",
    lightColor: "#E0F2FE",
    darkColor: "#075985",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "chicken-shops",
    name: "Chicken Shops",
    pluralName: "Chicken Shops",
    slug: "chicken-shops",
    group: "fish-meat",
    description: "Find local chicken shops providers near you.",
    icon: "Fish",
    primaryColor: "#0369A1",
    lightColor: "#E0F2FE",
    darkColor: "#075985",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "mutton-shops",
    name: "Mutton Shops",
    pluralName: "Mutton Shops",
    slug: "mutton-shops",
    group: "fish-meat",
    description: "Find local mutton shops providers near you.",
    icon: "Fish",
    primaryColor: "#0369A1",
    lightColor: "#E0F2FE",
    darkColor: "#075985",
    services: [],
    choosingTips: [],
    faqs: [],
  },
];

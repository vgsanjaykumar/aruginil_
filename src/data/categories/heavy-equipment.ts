import type { Category } from "../../types/business";
/**
 * Categories in the "heavy-equipment" group.
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
export const heavy_equipmentCategories: Category[] = [
  {
    id: "earth-movers",
    name: "Earth Movers",
    pluralName: "Earth Movers",
    slug: "earth-movers",
    group: "heavy-equipment",
    description: "Find local earth movers providers near you.",
    icon: "Truck",
    primaryColor: "#B45309",
    lightColor: "#FEF3C7",
    darkColor: "#78350F",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "jcb-services",
    name: "JCB Services",
    pluralName: "JCB Services",
    slug: "jcb-services",
    group: "heavy-equipment",
    description: "Find local jcb services providers near you.",
    icon: "Truck",
    primaryColor: "#B45309",
    lightColor: "#FEF3C7",
    darkColor: "#78350F",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "jcb-rental",
    name: "JCB Rental",
    pluralName: "JCB Rentals",
    slug: "jcb-rental",
    group: "heavy-equipment",
    description: "Find local jcb rental providers near you.",
    icon: "Truck",
    primaryColor: "#B45309",
    lightColor: "#FEF3C7",
    darkColor: "#78350F",
    services: [],
    choosingTips: [],
    faqs: [],
  },
];

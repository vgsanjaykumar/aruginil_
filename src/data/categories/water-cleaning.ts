import type { Category } from "../../types/business";
/**
 * Categories in the "water-cleaning" group.
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
export const water_cleaningCategories: Category[] = [
  {
    id: "ro-water-purifier",
    name: "RO Water Purifier",
    pluralName: "RO Water Purifier Services",
    slug: "ro-water-purifier",
    group: "water-cleaning",
    description: "RO water purifier providers handle sales, installation, and ongoing servicing of home and office water purification systems.",
    icon: "GlassWater",
    primaryColor: "#0891B2",
    lightColor: "#CFFAFE",
    darkColor: "#0E7490",
    services: ["RO Installation", "Filter Replacement", "AMC Plans", "Repair Service", "Water Testing"],
    choosingTips: ["Ask how often filters/membranes need replacement for your water source.", "Check if an AMC (Annual Maintenance Contract) is available.", "Confirm response time for repair requests."],
    faqs: [{ question: "How often should RO filters be changed?", answer: "This depends on water quality and usage, but filters and membranes are commonly checked and replaced every 6-12 months as general guidance." }, { question: "Do providers offer AMC plans for regular servicing?", answer: "Many local RO service providers offer Annual Maintenance Contracts covering periodic servicing and filter changes — ask directly for current plans." }],
  },
  {
    id: "borewells",
    name: "Borewells",
    pluralName: "Borewells",
    slug: "borewells",
    group: "water-cleaning",
    description: "Find local borewells providers near you.",
    icon: "Droplets",
    primaryColor: "#0D9488",
    lightColor: "#CCFBF1",
    darkColor: "#0F766E",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "borewell-drilling-contractors",
    name: "Borewell Drilling Contractors",
    pluralName: "Borewell Drilling Contractors",
    slug: "borewell-drilling-contractors",
    group: "water-cleaning",
    description: "Find local borewell drilling contractors providers near you.",
    icon: "Droplets",
    primaryColor: "#0D9488",
    lightColor: "#CCFBF1",
    darkColor: "#0F766E",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "irrigation-works",
    name: "Irrigation Works",
    pluralName: "Irrigation Works",
    slug: "irrigation-works",
    group: "water-cleaning",
    description: "Find local irrigation works providers near you.",
    icon: "Droplets",
    primaryColor: "#0D9488",
    lightColor: "#CCFBF1",
    darkColor: "#0F766E",
    services: [],
    choosingTips: [],
    faqs: [],
  },
  {
    id: "septic-tank-cleaning",
    name: "Septic Tank Cleaning",
    pluralName: "Septic Tank Cleaning Services",
    slug: "septic-tank-cleaning",
    group: "water-cleaning",
    description: "Septic tank cleaning services handle tank emptying, drain clearing and waste removal for homes and small businesses.",
    icon: "Droplets",
    primaryColor: "#0D9488",
    lightColor: "#CCFBF1",
    darkColor: "#0F766E",
    services: ["Septic Tank Cleaning", "Drain Clearing", "Sludge Removal", "Emergency Cleaning", "Tank Inspection"],
    choosingTips: ["Ask about the disposal method used for removed waste.", "Confirm the vehicle/tanker capacity matches your tank size.", "Check availability for urgent/same-day service if needed."],
    faqs: [{ question: "How often does a septic tank need cleaning?", answer: "This depends on tank size and household usage, but many homes have it checked and cleaned every 1-3 years as general upkeep." }, { question: "Is emergency service usually available?", answer: "Many local providers offer urgent visits for blockages or overflows — it's best to call and confirm current availability." }],
  },
];

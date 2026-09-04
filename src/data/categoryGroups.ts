import type { CategoryGroup } from "../types/business";

/**
 * Category groups (16) — the "folders" categories are organized under,
 * per the folder-based data architecture. Each individual Category
 * (see data/categories/*.ts) references a group by id.
 *
 * Colors/icons are assigned per GROUP rather than per individual
 * category: with 144 categories, giving each its own bespoke color
 * would mean 144 near-arbitrary color choices with no real design
 * rationale. 16 group-level identities stays visually coherent and
 * genuinely distinguishable, and a category can still override
 * icon/primaryColor/lightColor/darkColor individually if a specific
 * one ever needs its own visual treatment (see categories/*.ts).
 */
export const categoryGroups: CategoryGroup[] = [
  { id: "construction-building", name: "Construction & Building", icon: "Warehouse", primaryColor: "#334155", lightColor: "#F1F5F9", darkColor: "#1E293B" },
  { id: "metal-fabrication", name: "Metal & Fabrication", icon: "Flame", primaryColor: "#B45309", lightColor: "#FEF3C7", darkColor: "#92400E" },
  { id: "wood-furniture", name: "Wood & Furniture", icon: "Hammer", primaryColor: "#92400E", lightColor: "#FEF3C7", darkColor: "#78350F" },
  { id: "interior-home", name: "Interior & Home", icon: "PanelsTopLeft", primaryColor: "#4F46E5", lightColor: "#E0E7FF", darkColor: "#3730A3" },
  { id: "water-cleaning", name: "Water & Cleaning", icon: "Droplets", primaryColor: "#0D9488", lightColor: "#CCFBF1", darkColor: "#0F766E" },
  { id: "beauty-fashion", name: "Beauty & Fashion", icon: "Sparkles", primaryColor: "#9D174D", lightColor: "#FCE7F3", darkColor: "#831843" },
  { id: "health-wellness", name: "Health & Wellness", icon: "HeartPulse", primaryColor: "#059669", lightColor: "#D1FAE5", darkColor: "#065F46" },
  { id: "agriculture", name: "Agriculture", icon: "Sprout", primaryColor: "#65A30D", lightColor: "#ECFCCB", darkColor: "#3F6212" },
  { id: "fish-meat", name: "Fish & Meat", icon: "Fish", primaryColor: "#0369A1", lightColor: "#E0F2FE", darkColor: "#075985" },
  { id: "automobile", name: "Automobile", icon: "Car", primaryColor: "#DC2626", lightColor: "#FEE2E2", darkColor: "#991B1B" },
  { id: "heavy-equipment", name: "Heavy Equipment", icon: "Truck", primaryColor: "#B45309", lightColor: "#FEF3C7", darkColor: "#78350F" },
  { id: "electronics-services", name: "Electronics & Services", icon: "Wind", primaryColor: "#2563EB", lightColor: "#DBEAFE", darkColor: "#1E3A8A" },
  { id: "wedding-events", name: "Wedding & Events", icon: "PartyPopper", primaryColor: "#C026D3", lightColor: "#FAE8FF", darkColor: "#86198F" },
  { id: "retail-food", name: "Retail & Food", icon: "ShoppingBasket", primaryColor: "#EA580C", lightColor: "#FFEDD5", darkColor: "#9A3412" },
  { id: "photography-media", name: "Photography & Media", icon: "Camera", primaryColor: "#7C3AED", lightColor: "#EDE9FE", darkColor: "#5B21B6" },
  { id: "other-services", name: "Other Services", icon: "Layers", primaryColor: "#0891B2", lightColor: "#CFFAFE", darkColor: "#0E7490" },
];

export function getCategoryGroupById(id: string): CategoryGroup | undefined {
  return categoryGroups.find((g) => g.id === id);
}

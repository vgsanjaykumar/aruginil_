import type { Category } from "../types/business";
import { agricultureCategories } from "./categories/agriculture";
import { automobileCategories } from "./categories/automobile";
import { beauty_fashionCategories } from "./categories/beauty-fashion";
import { construction_buildingCategories } from "./categories/construction-building";
import { electronics_servicesCategories } from "./categories/electronics-services";
import { fish_meatCategories } from "./categories/fish-meat";
import { health_wellnessCategories } from "./categories/health-wellness";
import { heavy_equipmentCategories } from "./categories/heavy-equipment";
import { interior_homeCategories } from "./categories/interior-home";
import { metal_fabricationCategories } from "./categories/metal-fabrication";
import { other_servicesCategories } from "./categories/other-services";
import { photography_mediaCategories } from "./categories/photography-media";
import { retail_foodCategories } from "./categories/retail-food";
import { water_cleaningCategories } from "./categories/water-cleaning";
import { wedding_eventsCategories } from "./categories/wedding-events";
import { wood_furnitureCategories } from "./categories/wood-furniture";

/**
 * The master category registry — every valid category slug the
 * app knows about, aggregated from the 16 category-group files in
 * data/categories/*.ts (see categoryGroups.ts for the groups
 * themselves). Adding a new category is a data-only change: add it
 * to the right group file, and it is automatically resolvable,
 * searchable, and routable everywhere.
 */
export const categories: Category[] = [
  ...agricultureCategories,
  ...automobileCategories,
  ...beauty_fashionCategories,
  ...construction_buildingCategories,
  ...electronics_servicesCategories,
  ...fish_meatCategories,
  ...health_wellnessCategories,
  ...heavy_equipmentCategories,
  ...interior_homeCategories,
  ...metal_fabricationCategories,
  ...other_servicesCategories,
  ...photography_mediaCategories,
  ...retail_foodCategories,
  ...water_cleaningCategories,
  ...wedding_eventsCategories,
  ...wood_furnitureCategories,
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

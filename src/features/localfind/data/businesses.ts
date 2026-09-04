/**
 * Compatibility re-export. The real, single source of truth for
 * business data now lives at src/data/businesses.ts (assembled from
 * the city/category-group folders under src/data/cities/) and the
 * query helpers live at src/utils/businessResolver.ts. Kept here so
 * every existing component's import keeps working unchanged.
 */
export { businesses } from "../../../data/businesses";
export { getBusinessesByCityAndCategory, getBusinessBySlug, businessBelongsToCategory } from "../../../utils/businessResolver";

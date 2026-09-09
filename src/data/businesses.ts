import type { Business } from "../types/business";

import { aranthangiBeautyFashionBusinesses } from "./cities/aranthangi/beauty-fashion";
import { aranthangiConstructionBuildingBusinesses } from "./cities/aranthangi/construction-building";
import { coimbatoreElectronicsServicesBusinesses } from "./cities/coimbatore/electronics-services";
import { devakottaiBeautyFashionBusinesses } from "./cities/devakottai/beauty-fashion";
import { devakottaiConstructionBuildingBusinesses } from "./cities/devakottai/construction-building";
import { devakottaiElectronicsServicesBusinesses } from "./cities/devakottai/electronics-services";
import { devakottaiWaterCleaningBusinesses } from "./cities/devakottai/water-cleaning";
import { dindigulBeautyFashionBusinesses } from "./cities/dindigul/beauty-fashion";
import { dindigulConstructionBuildingBusinesses } from "./cities/dindigul/construction-building";
import { dindigulInteriorHomeBusinesses } from "./cities/dindigul/interior-home";
import { dindigulWaterCleaningBusinesses } from "./cities/dindigul/water-cleaning";
import { dindigulWoodFurnitureBusinesses } from "./cities/dindigul/wood-furniture";
import { karaikudiBeautyFashionBusinesses } from "./cities/karaikudi/beauty-fashion";
import { karaikudiConstructionBuildingBusinesses } from "./cities/karaikudi/construction-building";
import { karaikudiElectronicsServicesBusinesses } from "./cities/karaikudi/electronics-services";
import { karaikudiPhotographyMediaBusinesses } from "./cities/karaikudi/photography-media";
import { karaikudiInteriorHomeBusinesses } from "./cities/karaikudi/interior-home";
import { karaikudiWaterCleaningBusinesses } from "./cities/karaikudi/water-cleaning";
import { karaikudiWoodFurnitureBusinesses } from "./cities/karaikudi/wood-furniture";
import { maduraiBeautyFashionBusinesses } from "./cities/madurai/beauty-fashion";
import { maduraiConstructionBuildingBusinesses } from "./cities/madurai/construction-building";
import { maduraiElectronicsServicesBusinesses } from "./cities/madurai/electronics-services";
import { maduraiWaterCleaningBusinesses } from "./cities/madurai/water-cleaning";
import { maduraiWoodFurnitureBusinesses } from "./cities/madurai/wood-furniture";
import { pudukkottaiElectronicsServicesBusinesses } from "./cities/pudukkottai/electronics-services";
import { sivagangaElectronicsServicesBusinesses } from "./cities/sivaganga/electronics-services";
import { sivagangaWaterCleaningBusinesses } from "./cities/sivaganga/water-cleaning";
import { karaikudiWeddingEventsBusinesses } from "./cities/karaikudi/wedding-events";

/**
 * The single, complete list of every real business in Aruginil,
 * assembled from the city/category-group folders under
 * data/cities/. Each business is defined exactly once, in its own
 * city + category file — this array (and everything derived from
 * it below) is the only place that data is read from, so a new
 * business automatically appears in listings, search, counts,
 * related-business sections and SEO metadata the moment it's
 * added to its own file — nothing else needs to change.
 */
export const businesses: Business[] = [
  ...aranthangiBeautyFashionBusinesses,
  ...aranthangiConstructionBuildingBusinesses,
  ...coimbatoreElectronicsServicesBusinesses,
  ...devakottaiBeautyFashionBusinesses,
  ...devakottaiConstructionBuildingBusinesses,
  ...devakottaiElectronicsServicesBusinesses,
  ...devakottaiWaterCleaningBusinesses,
  ...dindigulBeautyFashionBusinesses,
  ...dindigulConstructionBuildingBusinesses,
  ...dindigulInteriorHomeBusinesses,
  ...dindigulWaterCleaningBusinesses,
  ...dindigulWoodFurnitureBusinesses,
  ...karaikudiBeautyFashionBusinesses,
  ...karaikudiConstructionBuildingBusinesses,
  ...karaikudiElectronicsServicesBusinesses,
  ...karaikudiPhotographyMediaBusinesses,
  ...karaikudiWeddingEventsBusinesses,
  ...karaikudiInteriorHomeBusinesses,
  ...karaikudiWaterCleaningBusinesses,
  ...karaikudiWoodFurnitureBusinesses,
  ...maduraiBeautyFashionBusinesses,
  ...maduraiConstructionBuildingBusinesses,
  ...maduraiElectronicsServicesBusinesses,
  ...maduraiWaterCleaningBusinesses,
  ...maduraiWoodFurnitureBusinesses,
  ...pudukkottaiElectronicsServicesBusinesses,
  ...sivagangaElectronicsServicesBusinesses,
  ...sivagangaWaterCleaningBusinesses,
];

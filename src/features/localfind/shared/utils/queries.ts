/**
 * Compatibility re-export. The real resolver logic now lives at
 * src/utils/businessResolver.ts. Kept here so every existing
 * component's `from "../utils/queries"` import keeps working
 * unchanged.
 */
export * from "../../../../utils/businessResolver";

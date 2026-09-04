/**
 * Compatibility re-export. The real SEO/JSON-LD generation logic now
 * lives at src/utils/seoResolver.ts. Kept here so every existing
 * component's `from "../utils/seo"` import keeps working unchanged.
 */
export * from "../../../../utils/seoResolver";

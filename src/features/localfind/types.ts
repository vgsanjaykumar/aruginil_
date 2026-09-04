/**
 * Compatibility re-export. The real type definitions now live at
 * src/types/business.ts (see the project's data architecture) —
 * kept here so every existing component's `from "../../types"` (or
 * similar relative) import keeps working without a mechanical,
 * risk-for-no-benefit rewrite of every import statement.
 */
export * from "../../types/business";

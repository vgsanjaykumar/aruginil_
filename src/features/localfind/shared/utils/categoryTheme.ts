import type { CSSProperties } from "react";
import type { Category } from "../../types";

/**
 * Returns inline CSS custom properties for a category's accent colors.
 * Components then reference `var(--lf-cat-primary)` etc. via Tailwind
 * arbitrary-value classes (e.g. `text-[var(--lf-cat-primary)]`) or
 * plain style props.
 *
 * This is deliberately NOT baked into tailwind.config.js: per the
 * scalability goal ("adding a category should mainly require data"),
 * a new category should never require editing the Tailwind config —
 * just adding an entry to categories.ts.
 */
export function categoryThemeVars(category: Category): CSSProperties {
  return {
    "--lf-cat-primary": category.primaryColor,
    "--lf-cat-light": category.lightColor,
    "--lf-cat-dark": category.darkColor,
  } as CSSProperties;
}

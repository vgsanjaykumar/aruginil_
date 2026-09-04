import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import type { Business, Category } from "../../types";
import { getBusinessesByCityAndCategory } from "../../data/businesses";
import { businessPath } from "../utils/seo";
import CategoryBadge from "./CategoryBadge";

interface RelatedBusinessesProps {
  currentBusiness: Business;
  category: Category;
}

/** Caps how many related cards render — avoids an overly long list per requirement #15. */
const MAX_RELATED = 8;

/**
 * Falls back to the category's own illustration when a business has
 * no real image. `business.image` is never left empty in the data
 * (see businesses.ts — every entry already points either at its own
 * real photo or the correct category fallback), but this guard keeps
 * the component correct even if a future entry is added without one,
 * and makes the fallback rule explicit rather than implicit.
 */
function resolveImage(business: Business, category: Category): string {
  return business.image || `/assets/localfind/${category.slug}.svg`;
}

export default function RelatedBusinesses({ currentBusiness, category }: RelatedBusinessesProps) {
  // Same city + same category + never the current business itself.
  // Array order in businesses.ts is stable, so this list — and its
  // order — never changes between renders or page refreshes (no
  // Math.random() or other non-deterministic sort here).
  const related = getBusinessesByCityAndCategory(currentBusiness.citySlug, currentBusiness.categorySlug)
    .filter((b) => b.id !== currentBusiness.id)
    .slice(0, MAX_RELATED);

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-businesses-heading" className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h2 id="related-businesses-heading" className="font-syne font-bold text-xl text-lf-ink mb-5">
        Related {category.pluralName} in {currentBusiness.city}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((business) => {
          const detailUrl = businessPath(business.citySlug, business.categorySlug, business.slug);
          return (
            <Link
              key={business.id}
              to={detailUrl}
              aria-label={`View details for ${business.name}`}
              className="group bg-white border border-black/8 rounded-lf-card overflow-hidden shadow-lf-card hover:shadow-lf-cardHover hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-lf-page-alt shrink-0">
                <img
                  src={resolveImage(business, category)}
                  alt={
                    business.image
                      ? `${business.name} in ${business.city}`
                      : `${category.name} illustration for ${business.name} in ${business.city}`
                  }
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-3 sm:p-3.5 flex flex-col gap-1.5 flex-1">
                <h3 className="font-syne font-semibold text-sm text-lf-ink leading-snug line-clamp-1">
                  {business.name}
                </h3>

                <p className="flex items-center gap-1 text-xs text-lf-ink-soft">
                  <MapPin size={11} className="shrink-0" />
                  <span className="line-clamp-1">{business.address ?? business.city}</span>
                </p>

                <div>
                  <CategoryBadge category={category} />
                </div>

                {business.services.length > 0 && (
                  <p className="text-xs text-lf-ink-soft mt-0.5 line-clamp-2">
                    {business.services.join(" • ")}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

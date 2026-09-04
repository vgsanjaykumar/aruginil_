import type { Category } from "../../types";
import type { FilterState } from "../utils/filters";

interface QuickFiltersProps {
  category: Category;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClearAll: () => void;
  showOpenNow: boolean;
  showFeatured: boolean;
}

/**
 * Visual sidebar matching the reference screenshot's "Quick Filters"
 * panel. Deliberately only exposes filters backed by real fields on
 * `Business` (service, openingHours, featured) — the reference shows
 * additional sections (Rating, Distance, Price Range) that would
 * require data (ratings, geolocation distance, pricing) this project
 * intentionally doesn't fabricate. See INTEGRATION_NOTES.md.
 */
export default function QuickFilters({
  category,
  filters,
  onChange,
  onClearAll,
  showOpenNow,
  showFeatured,
}: QuickFiltersProps) {
  return (
    <div className="bg-white border border-black/8 rounded-lf-card p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-syne font-bold text-base text-lf-ink">Quick Filters</h2>
        <button onClick={onClearAll} className="text-xs font-semibold" style={{ color: category.primaryColor }}>
          Clear All
        </button>
      </div>

      <fieldset className="mb-6">
        <legend className="text-xs font-semibold text-lf-ink-soft uppercase tracking-wide mb-2.5">
          Service
        </legend>
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2.5 text-sm text-lf-ink cursor-pointer">
            <input
              type="radio"
              name="lf-quick-filter-service"
              checked={!filters.service}
              onChange={() => onChange({ ...filters, service: null })}
              className="w-4 h-4"
              style={{ accentColor: category.primaryColor }}
            />
            All services
          </label>
          {category.services.map((s) => (
            <label key={s} className="flex items-center gap-2.5 text-sm text-lf-ink cursor-pointer">
              <input
                type="radio"
                name="lf-quick-filter-service"
                checked={filters.service === s}
                onChange={() => onChange({ ...filters, service: s })}
                className="w-4 h-4"
                style={{ accentColor: category.primaryColor }}
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      {(showOpenNow || showFeatured) && (
        <div className="space-y-3">
          {showOpenNow && (
            <ToggleRow
              label="Open Now"
              checked={filters.openNow}
              onChange={(v) => onChange({ ...filters, openNow: v })}
              accent={category.primaryColor}
            />
          )}
          {showFeatured && (
            <ToggleRow
              label="Featured"
              checked={filters.featuredOnly}
              onChange={(v) => onChange({ ...filters, featuredOnly: v })}
              accent={category.primaryColor}
            />
          )}
        </div>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
  accent,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  accent: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-lf-ink">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className="relative w-10 h-6 rounded-full transition-colors"
        style={{ backgroundColor: checked ? accent : "rgba(0,0,0,0.15)" }}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

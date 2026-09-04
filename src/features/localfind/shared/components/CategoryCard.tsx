import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon, Sparkles,
  Camera,
  Smartphone,
  Scissors, Wind, Droplets, PanelsTopLeft, Hammer, Warehouse, GlassWater } from "lucide-react";
import type { Category } from "../../types";
import { listingPath } from "../utils/seo";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Camera,
  Smartphone,
  Scissors,
  Wind,
  Droplets,
  PanelsTopLeft,
  Hammer,
  Warehouse,
  GlassWater,
};

interface CategoryCardProps {
  category: Category;
  citySlug: string;
  businessCount: number;
  /** Compact icon-grid style (icon + name, centered) matching the "Explore Services" reference. Defaults to the fuller descriptive card. */
  compact?: boolean;
}

export default function CategoryCard({ category, citySlug, businessCount, compact = false }: CategoryCardProps) {
  const Icon = ICONS[category.icon] ?? Sparkles;

  if (compact) {
    return (
      <Link
        to={listingPath(citySlug, category.slug)}
        className="group bg-white border border-black/8 rounded-lf-card px-4 py-6 flex flex-col items-center text-center gap-2.5 hover:shadow-lf-cardHover hover:-translate-y-0.5 transition-all"
      >
        <span
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: category.lightColor, color: category.darkColor }}
        >
          <Icon size={22} />
        </span>
        <h3 className="font-syne font-semibold text-sm text-lf-ink">{category.pluralName}</h3>
        <p className="text-xs text-lf-ink-soft -mt-1">
          {businessCount} {businessCount === 1 ? "business" : "businesses"}
        </p>
      </Link>
    );
  }

  return (
    <Link
      to={listingPath(citySlug, category.slug)}
      className="group bg-white border border-black/8 rounded-lf-card p-4 flex items-start gap-3.5 hover:shadow-lf-cardHover hover:-translate-y-0.5 transition-all"
    >
      <span
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: category.lightColor, color: category.darkColor }}
      >
        <Icon size={20} />
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="font-syne font-semibold text-sm text-lf-ink">{category.pluralName}</h3>
        <p className="text-xs text-lf-ink-soft mt-0.5 line-clamp-2">{category.description}</p>
        <p className="text-xs font-semibold mt-1.5" style={{ color: category.darkColor }}>
          {businessCount} {businessCount === 1 ? "business" : "businesses"}
        </p>
      </div>
      <ArrowRight size={16} className="text-lf-ink-soft shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}

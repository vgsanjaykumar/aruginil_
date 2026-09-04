import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { listingPath } from "../utils/seo";

interface CityCardProps {
  citySlug: string;
  cityName: string;
  categorySlug: string;
  categoryCount: number;
  businessCount: number;
  accentColor: string;
}

export default function CityCard({
  citySlug,
  cityName,
  categorySlug,
  categoryCount,
  businessCount,
  accentColor,
}: CityCardProps) {
  return (
    <Link
      to={listingPath(citySlug, categorySlug)}
      className="group bg-white border border-black/8 rounded-lf-card p-4 flex items-center gap-3 hover:shadow-lf-cardHover hover:-translate-y-0.5 transition-all"
    >
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}
      >
        <MapPin size={18} />
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="font-syne font-semibold text-sm text-lf-ink">{cityName}</h3>
        <p className="text-xs text-lf-ink-soft mt-0.5">
          {categoryCount} {categoryCount === 1 ? "category" : "categories"} · {businessCount}{" "}
          {businessCount === 1 ? "business" : "businesses"}
        </p>
      </div>
      <ArrowRight size={15} className="text-lf-ink-soft shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}

import {
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
  type LucideIcon,
} from "lucide-react";
import type { Category } from "../../types";

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

interface CategoryBadgeProps {
  category: Category;
  size?: "sm" | "md";
}

export default function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  const Icon = ICONS[category.icon] ?? Sparkles;
  const dims = size === "md" ? "text-sm px-3 py-1.5 gap-1.5" : "text-xs px-2.5 py-1 gap-1";
  const iconSize = size === "md" ? 14 : 12;

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${dims}`}
      style={{ backgroundColor: category.lightColor, color: category.darkColor }}
    >
      <Icon size={iconSize} />
      {category.name}
    </span>
  );
}

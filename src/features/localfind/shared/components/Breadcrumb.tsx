import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BreadcrumbItem } from "../utils/seo";

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-lf-ink-soft">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight size={12} className="text-lf-ink-soft/60" aria-hidden="true" />}
              {isLast || !item.path ? (
                <span className="font-medium text-lf-ink" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-lf-brand transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

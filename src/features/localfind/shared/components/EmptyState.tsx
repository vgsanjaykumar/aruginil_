import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  onClearSearch: () => void;
  onClearFilters: () => void;
  hasSearchOrFilters?: boolean;
  /** Where "Explore Categories" points — defaults to Karaikudi's Beauty Parlour listing (LocalFind has no separate home route). */
  exploreHref?: string;
}

export default function EmptyState({
  onClearSearch,
  onClearFilters,
  hasSearchOrFilters = true,
  exploreHref = "/karaikudi/beauty-parlour",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white border border-black/8 rounded-lf-card">
      <div className="w-14 h-14 rounded-full bg-lf-brand-light flex items-center justify-center mb-4">
        <SearchX size={26} className="text-lf-brand" />
      </div>
      <h3 className="font-syne font-semibold text-lg text-lf-ink">No businesses found</h3>
      <p className="text-sm text-lf-ink-soft mt-1.5 max-w-xs">Try another category or city.</p>
      <div className="flex flex-wrap justify-center gap-3 mt-5">
        {hasSearchOrFilters && (
          <>
            <button onClick={onClearSearch} className="text-xs font-semibold border border-black/10 text-lf-ink rounded-lg px-4 py-2 hover:border-lf-brand/40">
              Clear Search
            </button>
            <button onClick={onClearFilters} className="text-xs font-semibold border border-black/10 text-lf-ink rounded-lg px-4 py-2 hover:border-lf-brand/40">
              Clear Filters
            </button>
          </>
        )}
        <Link to={exploreHref} className="text-xs font-semibold bg-lf-brand text-white rounded-lg px-4 py-2 hover:bg-lf-brand-dark">
          Explore Categories
        </Link>
      </div>
    </div>
  );
}

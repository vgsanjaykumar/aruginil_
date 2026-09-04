import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Home, Store, X } from "lucide-react";
import { cities } from "../../data/cities";
import { listingPath } from "../utils/seo";
import { getAvailableCategoriesForCity, getCurrentCitySlugFromPath, getCurrentCategorySlugFromPath, getCityChangeDestination } from "../utils/queries";
import { useFavorites } from "../hooks/useFavorites";

interface NavigationProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ mobileOpen, onClose }: NavigationProps) {
  const { favorites } = useFavorites();
  const [listBusinessOpen, setListBusinessOpen] = useState(false);
  const location = useLocation();

  const currentCity = getCurrentCitySlugFromPath(location.pathname);
  const currentCategorySlug = getCurrentCategorySlugFromPath(location.pathname);
  const availableCategories = getAvailableCategoriesForCity(currentCity);

  if (!mobileOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 animate-lf-fade-in">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl p-5 overflow-y-auto">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2.5 px-2 py-3 rounded-lg text-sm font-medium text-lf-ink hover:bg-lf-brand-light"
        >
          <Home size={18} /> Aruginil Home
        </Link>

        <div className="flex items-center gap-2.5 px-2 py-3 text-sm font-medium text-lf-ink">
          <Heart size={18} className={favorites.size > 0 ? "fill-lf-brand text-lf-brand" : ""} />
          Saved
          {favorites.size > 0 && (
            <span className="bg-lf-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {favorites.size}
            </span>
          )}
        </div>

        <p className="text-xs font-semibold text-lf-ink-soft uppercase tracking-wide mt-4 mb-2 px-2">
          Categories
        </p>
        <div className="flex flex-col gap-1">
    {availableCategories.map((cat) => (
  <Link
    key={cat.slug}
    to={listingPath(currentCity, cat.slug)}
    onClick={onClose}
    className="px-2 py-2.5 rounded-lg text-sm text-lf-ink hover:bg-lf-brand-light"
  >
    {cat.pluralName}
  </Link>
))}
        </div>

        <p className="text-xs font-semibold text-lf-ink-soft uppercase tracking-wide mt-5 mb-2 px-2">
          Cities
        </p>
        <div className="flex flex-col gap-1">
          {cities.map((city) => (
            <Link
              key={city.slug}
              to={getCityChangeDestination(city, currentCategorySlug)}
              onClick={onClose}
              className="px-2 py-2.5 rounded-lg text-sm text-lf-ink hover:bg-lf-brand-light"
            >
              {city.name}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setListBusinessOpen(true)}
          className="mt-5 w-full flex items-center justify-center gap-1.5 bg-lf-ink hover:bg-black text-white text-sm font-semibold rounded-xl h-11 transition-colors"
        >
          <Store size={15} /> List Your Business
        </button>
      </div>

      {listBusinessOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 animate-lf-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lf-list-business-heading-mobile"
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setListBusinessOpen(false)} aria-hidden="true" />
          <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 text-center animate-lf-scale-in">
            <button
              onClick={() => setListBusinessOpen(false)}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center text-lf-ink hover:bg-lf-page-alt"
            >
              <X size={16} />
            </button>
            <h2 id="lf-list-business-heading-mobile" className="font-syne font-bold text-lg text-lf-ink">
              List Your Business
            </h2>
            <p className="text-sm text-lf-ink-soft mt-2">
              Business self-listing isn't available yet on this frontend-only version of Aruginil.
            </p>
            <button
              onClick={() => setListBusinessOpen(false)}
              className="mt-5 w-full bg-lf-brand hover:bg-lf-brand-dark text-white font-semibold text-sm rounded-xl h-11 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, X, ChevronDown, Store, Bell, User, MapPin } from "lucide-react";
import Logo from "./Logo";
import { categories } from "../../data/categories";
import { cities } from "../../data/cities";
import { listingPath } from "../utils/seo";
import { getAvailableCategoriesForCity, getCurrentCitySlugFromPath, getCurrentCategorySlugFromPath, getCityChangeDestination } from "../utils/queries";
import { useFavorites } from "../hooks/useFavorites";

interface HeaderProps {
  onOpenMenu: () => void;
  menuOpen: boolean;
}

export default function Header({ onOpenMenu, menuOpen }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { favorites } = useFavorites();

  const [query, setQuery] = useState("");
  const [exploreOpen, setExploreOpen] = useState<
    "categories" | "cities" | null
  >(null);
  const [listBusinessOpen, setListBusinessOpen] = useState(false);
  // "Alerts" and "Login / Sign Up" mirror the existing "List Your
  // Business" pattern below: honest placeholders (no fake
  // auth/notification system implied), added purely to match the
  // reference header's visual layout — not new functionality.
  const [placeholderOpen, setPlaceholderOpen] = useState<"alerts" | "login" | null>(null);

  // Current city, derived from the URL on every render (see
  // getCurrentCitySlugFromPath — shared by Header/Navigation/Footer so
  // this logic only ever lives in one place).
  const currentCity = getCurrentCitySlugFromPath(location.pathname);
  const currentCityName = cities.find((c) => c.slug === currentCity)?.name ?? "Karaikudi";

  // Current category, if the URL has one — used so switching cities
  // preserves it instead of always jumping to that city's first
  // category (see getCityChangeDestination).
  const currentCategorySlug = getCurrentCategorySlugFromPath(location.pathname);

  // Only offer categories this city actually supports (e.g. Coimbatore
  // only supports AC Service) — never link to an invalid combination.
  const availableCategories = getAvailableCategoriesForCity(currentCity);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    const matches: { label: string; path: string }[] = [];

    for (const city of cities) {
      for (const categorySlug of city.availableCategories) {
        const category = categories.find(
          (c) => c.slug === categorySlug
        );

        if (!category) continue;

        const haystack =
          `${category.name} ${category.services.join(" ")} ${city.name}`.toLowerCase();

        if (haystack.includes(q)) {
          matches.push({
            label: `${category.pluralName} in ${city.name}`,
            path: listingPath(city.slug, category.slug),
          });
        }

        if (matches.length >= 6) {
          return matches;
        }
      }
    }

    return matches;
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (suggestions[0]) {
      navigate(suggestions[0].path);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">

        {/* Logo */}
        <Link
          to="/"
          className="shrink-0"
          aria-label="Aruginil home"
        >
          <Logo />
        </Link>

        {/* Desktop: location selector + search + purple search button */}
        <div className="hidden lg:flex flex-1 items-center gap-4 max-w-3xl">
          {/* Location selector (styled like the reference's city pill; opens the existing Cities dropdown) */}
          <NavDropdown
            label={currentCityName}
            icon={MapPin}
            variant="pill"
            open={exploreOpen === "cities"}
            onToggle={() => setExploreOpen((v) => (v === "cities" ? null : "cities"))}
          >
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={getCityChangeDestination(city, currentCategorySlug)}
                onClick={() => setExploreOpen(null)}
                className="block px-3.5 py-2 text-sm text-lf-ink hover:bg-lf-brand-light rounded-lg"
              >
                {city.name}
              </Link>
            ))}
          </NavDropdown>

          {/* Search */}
          <form role="search" onSubmit={handleSubmit} className="relative flex-1">
            <label htmlFor="lf-header-search" className="sr-only">
              Search categories, services or cities
            </label>

            <div className="flex items-center bg-white border border-black/12 rounded-full overflow-hidden h-11 focus-within:border-lf-brand/50 transition-colors">
              <Search size={16} className="ml-4 text-lf-ink-soft shrink-0" />
              <input
                id="lf-header-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search categories, services or cities..."
                className="flex-1 px-3 h-full text-sm text-lf-ink placeholder:text-lf-ink-soft focus:outline-none bg-transparent min-w-0"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 h-full px-5 bg-lf-brand hover:bg-lf-brand-dark text-white text-sm font-bold shrink-0 transition-colors"
              >
                <Search size={15} />
                Search
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="absolute top-12 left-0 right-0 bg-white border border-black/10 rounded-xl shadow-lf-cardHover overflow-hidden z-20">
                {suggestions.map((s) => (
                  <li key={s.path}>
                    <Link
                      to={s.path}
                      onClick={() => setQuery("")}
                      className="block px-3.5 py-2.5 text-sm text-lf-ink hover:bg-lf-brand-light"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </form>

          {/* Categories */}
          <NavDropdown
            label="Categories"
            open={exploreOpen === "categories"}
            onToggle={() => setExploreOpen((v) => (v === "categories" ? null : "categories"))}
          >
            {availableCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={listingPath(currentCity, cat.slug)}
                onClick={() => setExploreOpen(null)}
                className="block px-3.5 py-2 text-sm text-lf-ink hover:bg-lf-brand-light rounded-lg"
              >
                {cat.pluralName}
              </Link>
            ))}
          </NavDropdown>
        </div>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-5 shrink-0 ml-auto">

          {/* Favorites / Saved */}
          <div className="flex items-center gap-1.5 text-sm font-medium text-lf-ink">
            <Heart
              size={19}
              className={
                favorites.size > 0
                  ? "fill-lf-brand text-lf-brand"
                  : "text-lf-ink"
              }
            />
            Saved
            {favorites.size > 0 && (
              <span className="bg-lf-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {favorites.size}
              </span>
            )}
          </div>

          {/* Alerts (visual placeholder, same honest pattern as List Your Business) */}
          <button
            onClick={() => setPlaceholderOpen("alerts")}
            className="flex items-center gap-1.5 text-sm font-medium text-lf-ink hover:text-lf-brand transition-colors"
          >
            <Bell size={19} />
            Alerts
          </button>

          {/* List Business */}
          <button
            onClick={() => setListBusinessOpen(true)}
            className="flex items-center gap-1.5 border border-lf-brand text-lf-brand text-sm font-semibold rounded-xl px-4 h-10 hover:bg-lf-brand-light transition-colors"
          >
            <Store size={15} />
            List Your Business
          </button>

          {/* Login / Sign Up (visual placeholder, same honest pattern) */}
          <button
            onClick={() => setPlaceholderOpen("login")}
            className="flex items-center gap-1.5 bg-lf-ink hover:bg-black text-white text-sm font-semibold rounded-xl px-4 h-10 transition-colors"
          >
            <User size={15} />
            Login / Sign Up
          </button>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-3 ml-auto">

          <button
            aria-label="Search"
            className="text-lf-ink"
          >
            <Search size={22} />
          </button>

          <button
            aria-label={
              menuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={onOpenMenu}
            className="text-lf-ink"
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* List Business Modal */}
      {listBusinessOpen && (
        <PlaceholderModal
          title="List Your Business"
          message="Business self-listing isn't available yet on this frontend-only version of Aruginil."
          onClose={() => setListBusinessOpen(false)}
        />
      )}

      {/* Alerts / Login placeholder modals */}
      {placeholderOpen === "alerts" && (
        <PlaceholderModal
          title="Alerts"
          message="Alert notifications aren't available yet on this frontend-only version of Aruginil."
          onClose={() => setPlaceholderOpen(null)}
        />
      )}
      {placeholderOpen === "login" && (
        <PlaceholderModal
          title="Login / Sign Up"
          message="Accounts aren't available yet on this frontend-only version of Aruginil."
          onClose={() => setPlaceholderOpen(null)}
        />
      )}
    </header>
  );
}

function PlaceholderModal({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 animate-lf-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lf-header-modal-heading"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 text-center animate-lf-scale-in">
        <h2
          id="lf-header-modal-heading"
          className="font-syne font-bold text-lg text-lf-ink"
        >
          {title}
        </h2>

        <p className="text-sm text-lf-ink-soft mt-2">{message}</p>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-lf-brand hover:bg-lf-brand-dark text-white font-semibold text-sm rounded-xl h-11 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

function NavDropdown({
  label,
  icon: Icon,
  variant = "link",
  open,
  onToggle,
  children,
}: {
  label: string;
  icon?: typeof MapPin;
  variant?: "link" | "pill";
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative shrink-0">
      {variant === "pill" ? (
        <button
          onClick={onToggle}
          aria-haspopup="true"
          aria-expanded={open}
          className="flex items-center gap-1.5 h-11 bg-white border border-black/12 rounded-full px-4 text-sm font-medium text-lf-ink hover:border-lf-brand/40 transition-colors"
        >
          {Icon && <Icon size={15} className="text-lf-brand shrink-0" />}
          <span className="max-w-[9rem] truncate">{label}</span>
          <ChevronDown size={14} className={`transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
        </button>
      ) : (
        <button
          onClick={onToggle}
          aria-haspopup="true"
          aria-expanded={open}
          className="flex items-center gap-1 text-sm font-medium text-lf-ink hover:text-lf-brand transition-colors"
        >
          {label}
          <ChevronDown
            size={14}
            className={`transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      )}

      {open && (
        <div className="absolute top-12 left-0 w-64 max-h-80 overflow-y-auto bg-white border border-black/10 rounded-xl shadow-lf-cardHover p-2 animate-lf-scale-in z-20">
          {children}
        </div>
      )}

    </div>
  );
}

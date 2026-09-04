import { useMemo, useState } from "react";
import { HelpCircle, ListChecks, ChevronDown, Clock, Star as StarIcon } from "lucide-react";
import type { Business, Category, City } from "../types";
import { categories } from "../data/categories";
import { cities } from "../data/cities";
import { getBusinessesByCityAndCategory } from "../data/businesses";
import { getListingBreadcrumbs } from "../shared/utils/seo";
import { emptyFilters, filterBusinesses, searchBusinesses, sortBusinesses, type FilterState, type SortOption } from "../shared/utils/filters";
import { categoryThemeVars } from "../shared/utils/categoryTheme";
import { useToasts } from "../shared/hooks/useToasts";

import LocalFindPageShell from "../shared/components/LocalFindPageShell";
import Breadcrumb from "../shared/components/Breadcrumb";
import SearchBar from "../shared/components/SearchBar";
import BusinessGrid from "../shared/components/BusinessGrid";
import EmptyState from "../shared/components/EmptyState";
import Toast from "../shared/components/Toast";
import CategoryBadge from "../shared/components/CategoryBadge";
import CategoryCard from "../shared/components/CategoryCard";
import CityCard from "../shared/components/CityCard";
import QuickFilters from "../shared/components/QuickFilters";

interface ListingPageProps {
  city: City;
  category: Category;
  businesses: Business[];
}

const sortLabels: Record<SortOption, string> = {
  relevance: "Relevance",
  "name-asc": "Name: A-Z",
  "name-desc": "Name: Z-A",
  "featured-first": "Featured First",
};

export default function ListingPage({ city, category, businesses }: ListingPageProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const { toasts, showToast, dismissToast } = useToasts();

  const visible = useMemo(() => {
    let result = searchBusinesses(businesses, query);
    result = filterBusinesses(result, filters);
    result = sortBusinesses(result, sortBy);
    return result;
  }, [businesses, query, filters, sortBy]);

  const otherCategories = categories.filter((c) => c.slug !== category.slug && city.availableCategories.includes(c.slug));
  const otherCities = cities.filter((c) => c.slug !== city.slug && c.availableCategories.includes(category.slug));

  // Per the data-quality rule, only show filters actually supported by
  // this listing's real data — e.g. don't show "Open Now" if none of
  // these businesses have verified opening hours, and don't show
  // "Featured" if none are marked featured.
  const anyOpeningHoursKnown = businesses.some((b) => b.openingHours && b.openingHours.length > 0);
  const anyFeatured = businesses.some((b) => b.featured);

  return (
    <LocalFindPageShell>
      <Breadcrumb items={getListingBreadcrumbs(city, category)} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-8" style={categoryThemeVars(category)}>
        <CategoryBadge category={category} size="md" />
        <h1 className="font-syne font-extrabold text-3xl sm:text-4xl text-lf-ink mt-3 leading-tight">
          {category.name} in {city.name}
        </h1>
        <p className="text-sm text-lf-ink-soft mt-1.5">
          Showing {visible.length} of {businesses.length} results
        </p>
        <p className="text-sm sm:text-base text-lf-ink-soft mt-3 max-w-2xl">
          Discover local {category.name.toLowerCase()} services in {city.name}. Explore businesses, services and
          useful local information.
        </p>

        <div className="mt-5 max-w-xl">
          <SearchBar value={query} onChange={setQuery} placeholder={`Search ${category.pluralName.toLowerCase()}...`} accentColor={category.primaryColor} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <p className="text-sm text-lf-ink-soft leading-relaxed max-w-3xl">
          {city.intro} {category.description}
        </p>
      </section>

      {/* Filters + sort — pill bar */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur border-y border-black/8">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none text-xs font-semibold rounded-full border border-black/12 bg-white pl-3.5 pr-7 py-2.5 text-lf-ink"
              aria-label="Sort businesses"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>Sort: {label}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-lf-ink-soft" />
          </div>

          <FilterPill
            icon={Clock}
            active={filters.openNow}
            onClick={() => setFilters((f) => ({ ...f, openNow: !f.openNow }))}
            accent={category.primaryColor}
            hidden={!anyOpeningHoursKnown}
          >
            Open Now
          </FilterPill>
          <FilterPill
            icon={StarIcon}
            active={filters.featuredOnly}
            onClick={() => setFilters((f) => ({ ...f, featuredOnly: !f.featuredOnly }))}
            accent={category.primaryColor}
            hidden={!anyFeatured}
          >
            Featured
          </FilterPill>

          <div className="relative">
            <select
              value={filters.service ?? ""}
              onChange={(e) => setFilters((f) => ({ ...f, service: e.target.value || null }))}
              className="appearance-none text-xs font-semibold rounded-full border border-black/12 bg-white pl-3.5 pr-7 py-2.5 text-lf-ink"
              aria-label="Filter by service"
            >
              <option value="">All services</option>
              {category.services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-lf-ink-soft" />
          </div>
        </section>
      </div>

      <section aria-label={`${category.pluralName} in ${city.name}`} className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
          {/* Main content */}
          <div>
            {visible.length === 0 ? (
              <EmptyState
                onClearSearch={() => setQuery("")}
                onClearFilters={() => setFilters(emptyFilters)}
                hasSearchOrFilters={Boolean(query || filters.service || filters.openNow || filters.featuredOnly)}
              />
            ) : (
              <BusinessGrid businesses={visible} category={category} onToast={showToast} />
            )}
          </div>

          {/* Quick Filters sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <QuickFilters
                category={category}
                filters={filters}
                onChange={setFilters}
                onClearAll={() => setFilters(emptyFilters)}
                showOpenNow={anyOpeningHoursKnown}
                showFeatured={anyFeatured}
              />
            </div>
          </aside>
        </div>
      </section>

      {/* Category information */}
      <section aria-labelledby="lf-choosing-heading" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white border-y border-black/5">
        <div className="max-w-3xl">
          <h2 id="lf-choosing-heading" className="flex items-center gap-2 font-syne font-bold text-lg text-lf-ink mb-3">
            <ListChecks size={18} style={{ color: category.primaryColor }} /> How to Choose a {category.name} Provider
          </h2>
          <ul className="space-y-2">
            {category.choosingTips.map((tip) => (
              <li key={tip} className="text-sm text-lf-ink-soft flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: category.primaryColor }} />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Explore Services (Category Section) + Explore by City (City Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {otherCategories.length > 0 && (
          <div>
            <h2 className="font-syne font-bold text-lg text-lf-ink mb-4">Explore Services in {city.name}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {otherCategories.map((c) => (
                <CategoryCard
                  key={c.slug}
                  category={c}
                  citySlug={city.slug}
                  businessCount={getBusinessesByCityAndCategory(city.slug, c.slug).length}
                />
              ))}
            </div>
          </div>
        )}

        {otherCities.length > 0 && (
          <div>
            <h2 className="font-syne font-bold text-lg text-lf-ink mb-4">
              {category.pluralName} by City
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {otherCities.map((c) => (
                <CityCard
                  key={c.slug}
                  citySlug={c.slug}
                  cityName={c.name}
                  categorySlug={category.slug}
                  categoryCount={c.availableCategories.length}
                  businessCount={getBusinessesByCityAndCategory(c.slug, category.slug).length}
                  accentColor={category.primaryColor}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* FAQ */}
      {category.faqs.length > 0 && (
        <section aria-labelledby="lf-faq-heading" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h2 id="lf-faq-heading" className="flex items-center gap-2 font-syne font-bold text-lg text-lf-ink mb-4">
            <HelpCircle size={18} style={{ color: category.primaryColor }} /> Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl">
            {category.faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-black/8 rounded-lf-card p-4">
                <p className="font-semibold text-sm text-lf-ink">{faq.question}</p>
                <p className="text-sm text-lf-ink-soft mt-1.5">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </LocalFindPageShell>
  );
}

function FilterPill({
  icon: Icon,
  active,
  onClick,
  accent,
  hidden,
  children,
}: {
  icon?: typeof Clock;
  active: boolean;
  onClick: () => void;
  accent: string;
  hidden?: boolean;
  children: React.ReactNode;
}) {
  if (hidden) return null;
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="flex items-center gap-1.5 text-xs font-semibold rounded-full border px-3.5 py-2.5 transition-colors"
      style={
        active
          ? { backgroundColor: accent, borderColor: accent, color: "white" }
          : { backgroundColor: "white", borderColor: "rgba(0,0,0,0.12)", color: "#0F172A" }
      }
    >
      {Icon && <Icon size={13} />}
      {children}
    </button>
  );
}

import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles as SparklesIcon,
  LayoutGrid,
} from "lucide-react";
import { categories } from "../data/categories";
import { cities } from "../data/cities";
import { businesses } from "../data/businesses";
import { listingPath } from "../shared/utils/seo";
import { businessBelongsToCategory } from "../shared/utils/queries";
import { useToasts } from "../shared/hooks/useToasts";

import LocalFindPageShell from "../shared/components/LocalFindPageShell";
import SearchBar from "../shared/components/SearchBar";
import CategoryCard from "../shared/components/CategoryCard";
import CityCard from "../shared/components/CityCard";
import BusinessCard from "../shared/components/BusinessCard";
import Toast from "../shared/components/Toast";

// Karaikudi supports every category, so it anchors the "Popular
// Categories" links on this city-agnostic home page.
const ANCHOR_CITY = "karaikudi";

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { toasts, showToast, dismissToast } = useToasts();

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matches: { label: string; path: string }[] = [];
    for (const city of cities) {
      for (const categorySlug of city.availableCategories) {
        const category = categories.find((c) => c.slug === categorySlug);
        if (!category) continue;
        const haystack = `${category.name} ${category.services.join(" ")} ${city.name}`.toLowerCase();
        if (haystack.includes(q)) {
          matches.push({ label: `${category.pluralName} in ${city.name}`, path: listingPath(city.slug, category.slug) });
        }
        if (matches.length >= 6) return matches;
      }
    }
    return matches;
  }, [query]);

  const handleSearch = () => {
    if (suggestions[0]) {
      navigate(suggestions[0].path);
      return;
    }
    // No match — send the visitor to the flagship city so they can
    // browse rather than dead-end on an empty results page.
    navigate(listingPath(ANCHOR_CITY, "beauty-parlour"));
  };

  const featuredBusinesses = businesses.filter((b) => b.featured).slice(0, 8);
  const totalBusinessCount = businesses.length;

  return (
    <LocalFindPageShell>
      {/* A. Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lf-brand-light to-white border-b border-black/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <span className="inline-flex items-center gap-1.5 bg-white text-lf-brand text-xs font-semibold px-3 py-1.5 rounded-full border border-lf-brand/15 shadow-sm">
            <MapPin size={13} /> Tamil Nadu, India
          </span>
          <h1 className="mt-5 font-syne font-bold text-3xl sm:text-5xl text-lf-ink leading-tight">
            Discover Local Businesses Near You
          </h1>
          <p className="mt-4 text-base sm:text-lg text-lf-ink-soft max-w-xl mx-auto">
            Find trusted local services, shops and professionals across your city.
          </p>

          <div className="mt-8 max-w-xl mx-auto text-left">
            <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} placeholder="Search services or cities..." />
            {suggestions.length > 0 && (
              <ul className="mt-2 bg-white border border-black/10 rounded-xl shadow-lf-cardHover overflow-hidden">
                {suggestions.map((s) => (
                  <li key={s.path}>
                    <Link to={s.path} onClick={() => setQuery("")} className="block px-4 py-2.5 text-sm text-lf-ink hover:bg-lf-brand-light">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* B. Popular Categories */}
      <section aria-labelledby="lf-home-categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-5">
          <h2 id="lf-home-categories" className="font-syne font-bold text-xl sm:text-2xl text-lf-ink">
            Popular Categories
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const businessCount = businesses.filter((b) => businessBelongsToCategory(b, cat.slug)).length;
            return (
              <CategoryCard
                key={cat.slug}
                category={cat}
                citySlug={ANCHOR_CITY}
                businessCount={businessCount}
                compact
              />
            );
          })}
        </div>
      </section>

      {/* C. Popular Cities */}
      <section aria-labelledby="lf-home-cities" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 bg-white border-y border-black/5">
        <h2 id="lf-home-cities" className="font-syne font-bold text-xl sm:text-2xl text-lf-ink mb-5">
          Explore Local Businesses by City
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cities.map((city) => {
            const defaultCategory = city.availableCategories[0];
            const businessCount = businesses.filter((b) => b.citySlug === city.slug).length;
            return (
              <CityCard
                key={city.slug}
                citySlug={city.slug}
                cityName={city.name}
                categorySlug={defaultCategory}
                categoryCount={city.availableCategories.length}
                businessCount={businessCount}
                accentColor="#6D28D9"
              />
            );
          })}
        </div>
      </section>

      {/* D. Featured Services / Businesses (real data only) */}
      {featuredBusinesses.length > 0 && (
        <section aria-labelledby="lf-home-featured" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 id="lf-home-featured" className="font-syne font-bold text-xl sm:text-2xl text-lf-ink mb-5">
            Featured Businesses
          </h2>
          <div className="grid sm:grid-cols-1 lg:grid-cols-1 gap-4">
            {featuredBusinesses.map((business) => {
              const category = categories.find((c) => c.slug === business.categorySlug);
              if (!category) return null;
              return <BusinessCard key={business.id} business={business} category={category} onToast={showToast} />;
            })}
          </div>
        </section>
      )}

      {/* E. How Aruginil Works */}
      <section aria-labelledby="lf-home-how" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 bg-white border-y border-black/5">
        <h2 id="lf-home-how" className="font-syne font-bold text-xl sm:text-2xl text-lf-ink mb-8 text-center">
          How Aruginil Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: MapPin, step: "1", title: "Choose a city", desc: "Pick from Karaikudi, Coimbatore and other Tamil Nadu towns." },
            { icon: LayoutGrid, step: "2", title: "Select a service", desc: "Beauty, AC, UPVC, wood works, cement, RO purifiers and more." },
            { icon: SparklesIcon, step: "3", title: "Find a local business", desc: "Browse real, verified listings and get in touch directly." },
          ].map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-lf-brand-light flex items-center justify-center mx-auto mb-4">
                <Icon size={24} className="text-lf-brand" />
              </div>
              <p className="text-xs font-bold text-lf-brand mb-1">STEP {step}</p>
              <h3 className="font-syne font-semibold text-base text-lf-ink">{title}</h3>
              <p className="text-sm text-lf-ink-soft mt-1.5">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* F. Why Choose Aruginil */}
      <section aria-labelledby="lf-home-why" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 id="lf-home-why" className="font-syne font-bold text-xl sm:text-2xl text-lf-ink mb-8 text-center">
          Why Choose Aruginil
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, title: "Real, verified listings", desc: "No fabricated ratings, reviews or claims — only publicly verifiable business information." },
            { icon: LayoutGrid, title: "Organized by city & category", desc: `${cities.length} cities and ${categories.length} service categories, browsable in a couple of clicks.` },
            { icon: SparklesIcon, title: "Always growing", desc: `${totalBusinessCount}+ local businesses listed so far, with more added as they're verified.` },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-black/8 rounded-lf-card p-5">
              <Icon size={20} className="text-lf-brand mb-3" />
              <h3 className="font-syne font-semibold text-sm text-lf-ink">{title}</h3>
              <p className="text-sm text-lf-ink-soft mt-1.5">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* G. Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="relative overflow-hidden rounded-lf-card bg-lf-ink px-6 sm:px-10 py-12 sm:py-14 text-center">
          <h2 className="font-syne font-bold text-2xl sm:text-3xl text-white">
            Find trusted local services near you
          </h2>
          <p className="text-white/70 mt-2 max-w-md mx-auto text-sm sm:text-base">
            Start with your city and see what's available today.
          </p>
          <Link
            to={listingPath(ANCHOR_CITY, "beauty-parlour")}
            className="inline-flex items-center gap-1.5 mt-6 bg-white text-lf-ink font-semibold text-sm rounded-xl px-6 py-3 hover:bg-lf-brand-light transition-colors"
          >
            Explore Local Services <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </LocalFindPageShell>
  );
}

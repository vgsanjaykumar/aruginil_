import { Link } from "react-router-dom";
import { Clock, MapPin, Phone, Globe, Navigation as NavigationIcon, Info, ExternalLink } from "lucide-react";
import type { Business, Category, City } from "../types";
import { getBusinessBreadcrumbs, listingPath } from "../shared/utils/seo";
import { useToasts } from "../shared/hooks/useToasts";

import LocalFindPageShell from "../shared/components/LocalFindPageShell";
import Breadcrumb from "../shared/components/Breadcrumb";
import CategoryBadge from "../shared/components/CategoryBadge";
import FavoriteButton from "../shared/components/FavoriteButton";
import RelatedBusinesses from "../shared/components/RelatedBusinesses";
import Toast from "../shared/components/Toast";

const TODAY_INDEX = (new Date().getDay() + 6) % 7; // Monday = 0 ... Sunday = 6

interface BusinessDetailPageProps {
  business: Business;
  category: Category;
  city: City;
}

export default function BusinessDetailPage({ business, category, city }: BusinessDetailPageProps) {
  const { toasts, showToast, dismissToast } = useToasts();
  const mapsQuery = encodeURIComponent(`${business.name}, ${business.address ?? `${city.name}, ${city.state}`}`);

  return (
    <LocalFindPageShell>
      <Breadcrumb items={getBusinessBreadcrumbs(business, city, category)} />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
          <div className="rounded-lf-card overflow-hidden aspect-[16/10] bg-lf-page-alt">
            <img
              src={business.image}
              alt={`${category.name} illustration for ${business.name} in ${city.name}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <CategoryBadge category={category} size="md" />
            <h1 className="font-syne font-bold text-2xl sm:text-3xl text-lf-ink mt-3 leading-tight">
              {business.name}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-lf-ink-soft mt-2">
              <MapPin size={14} /> {city.name}, {city.state}
            </p>

            <div className="grid grid-cols-2 gap-2.5 mt-6">
              {business.phone ? (
                <a
                  href={`tel:${business.phone.replace(/\s/g, "")}`}
                  className="col-span-2 flex items-center justify-center gap-1.5 text-white text-sm font-semibold rounded-xl h-11 transition-colors"
                  style={{ backgroundColor: category.primaryColor }}
                >
                  <Phone size={15} /> Call {business.name.split(" ")[0]}
                </a>
              ) : (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 flex items-center justify-center gap-1.5 text-white text-sm font-semibold rounded-xl h-11 transition-colors"
                  style={{ backgroundColor: category.primaryColor }}
                >
                  <NavigationIcon size={15} /> Get Directions
                </a>
              )}
              <FavoriteButton businessId={business.id} businessName={business.name} showLabel onToast={showToast} />
              {business.website ? (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 border border-black/10 rounded-xl h-10 text-sm font-semibold text-lf-ink hover:border-black/20 transition-colors"
                >
                  <Globe size={14} /> Website
                </a>
              ) : (
                <a
                  href={business.googleUrl ?? `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 border border-black/10 rounded-xl h-10 text-sm font-semibold text-lf-ink hover:border-black/20 transition-colors"
                >
                  <MapPin size={14} /> Map
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section aria-labelledby="lf-about-heading" className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <h2 id="lf-about-heading" className="font-syne font-bold text-lg text-lf-ink mb-3">
          About {business.name}
        </h2>
        <p className="text-sm text-lf-ink-soft leading-relaxed max-w-3xl">{business.description}</p>
      </section>

      {/* Services — image grid. Every card uses the business's own
          resolved image (its real photo, or the category fallback
          illustration when it has none) — there's no per-service
          photo data, so this never fabricates a service-specific
          image; it's the same honest image already shown in the
          hero, repeated per service card. */}
      <section aria-labelledby="lf-services-heading" className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <h2 id="lf-services-heading" className="font-syne font-bold text-lg text-lf-ink mb-3">
          Services Offered
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {business.services.map((service) => (
            <div
              key={service}
              className="bg-white border border-black/8 rounded-lf-card overflow-hidden shadow-lf-card hover:shadow-lf-cardHover transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden bg-lf-page-alt">
                <img
                  src={business.image}
                  alt={`${service} at ${business.name} in ${city.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className="text-xs sm:text-sm font-semibold px-3 py-2.5 text-center leading-snug"
                style={{ color: category.darkColor }}
              >
                {service}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Opening hours — only shown when verified */}
      {business.openingHours && business.openingHours.length > 0 && (
        <section aria-labelledby="lf-hours-heading" className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <h2 id="lf-hours-heading" className="flex items-center gap-2 font-syne font-bold text-lg text-lf-ink mb-3">
            <Clock size={18} style={{ color: category.primaryColor }} /> Opening Hours
          </h2>
          <div className="bg-white border border-black/8 rounded-lf-card divide-y divide-black/5 max-w-sm">
            {business.openingHours.map((entry, index) => (
              <div
                key={entry.day}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
                style={index === TODAY_INDEX ? { backgroundColor: category.lightColor } : undefined}
              >
                <span
                  className={index === TODAY_INDEX ? "font-semibold" : "text-lf-ink"}
                  style={index === TODAY_INDEX ? { color: category.darkColor } : undefined}
                >
                  {entry.day}
                </span>
                <span
                  className={index === TODAY_INDEX ? "font-semibold" : "text-lf-ink-soft"}
                  style={index === TODAY_INDEX ? { color: category.darkColor } : undefined}
                >
                  {entry.hours}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Business information / contact */}
      <section aria-labelledby="lf-contact-heading" className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <h2 id="lf-contact-heading" className="font-syne font-bold text-lg text-lf-ink mb-3">
          Business Information
        </h2>
        <div className="bg-white border border-black/8 rounded-lf-card p-5 max-w-md space-y-3.5">
          <p className="flex items-start gap-2.5 text-sm text-lf-ink">
            <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: category.primaryColor }} />
            <span>
              {business.address ?? `${city.name}, ${city.state}`}
              {business.address && (
                <>
                  <br />
                  <span className="text-lf-ink-soft">{city.name}, {city.state}</span>
                </>
              )}
            </span>
          </p>
          {business.phone && (
            <p className="flex items-center gap-2.5 text-sm text-lf-ink">
              <Phone size={16} style={{ color: category.primaryColor }} />
              <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="hover:underline">{business.phone}</a>
            </p>
          )}
          {business.website && (
            <p className="flex items-center gap-2.5 text-sm text-lf-ink">
              <Globe size={16} style={{ color: category.primaryColor }} />
              <a href={business.website} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                {business.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            </p>
          )}
          {business.instagramUrl && (
            <p className="flex items-center gap-2.5 text-sm text-lf-ink">
              <ExternalLink size={16} style={{ color: category.primaryColor }} />
              <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Instagram
              </a>
            </p>
          )}
          {business.facebookUrl && (
            <p className="flex items-center gap-2.5 text-sm text-lf-ink">
              <ExternalLink size={16} style={{ color: category.primaryColor }} />
              <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Facebook
              </a>
            </p>
          )}
          <a
            href={business.googleUrl ?? `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm font-semibold pt-1"
            style={{ color: category.darkColor }}
          >
            <NavigationIcon size={16} /> Get directions
          </a>
          {!business.phone && !business.address && !business.website && !business.googleUrl && !business.instagramUrl && !business.facebookUrl && (
            <p className="flex items-start gap-2 text-xs text-lf-ink-soft pt-1">
              <Info size={14} className="shrink-0 mt-0.5" />
              Detailed contact information for this business hasn't been verified yet.
            </p>
          )}
        </div>
      </section>

      <RelatedBusinesses currentBusiness={business} category={category} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <Link to={listingPath(city.slug, category.slug)} className="text-sm font-semibold" style={{ color: category.darkColor }}>
          ← Back to {category.pluralName} in {city.name}
        </Link>
      </section>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </LocalFindPageShell>
  );
}

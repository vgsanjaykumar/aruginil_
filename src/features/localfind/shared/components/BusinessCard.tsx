import { Link } from "react-router-dom";
import { MapPin, Phone, Star, ChevronRight } from "lucide-react";
import type { Business, Category } from "../../types";
import { businessPath } from "../utils/seo";
import { isOpenNow } from "../utils/filters";
import FavoriteButton from "./FavoriteButton";

interface BusinessCardProps {
  business: Business;
  category: Category;
  onToast: (text: string) => void;
  rank?: number;
}

export default function BusinessCard({
  business,
  category,
  onToast,
  rank,
}: BusinessCardProps) {
  const detailUrl = businessPath(
    business.citySlug,
    business.categorySlug,
    business.slug
  );

  const openStatusKnown =
    business.openingHours && business.openingHours.length > 0;

  const open = openStatusKnown && isOpenNow(business);

  return (
    <article className="group bg-white border border-black/8 rounded-2xl shadow-lf-card hover:shadow-lf-cardHover transition-all duration-200 overflow-hidden flex flex-col md:flex-row w-full">
      
      {/* IMAGE */}
      <Link
        to={detailUrl}
        aria-label={`View details for ${business.name}`}
        className="
          relative block shrink-0
          w-full
          h-52
          sm:h-60
          md:h-auto
          md:w-[32%]
          lg:w-[30%]
          md:min-w-[220px]
          lg:min-w-[240px]
          overflow-hidden
          bg-lf-page-alt
        "
      >
        {/* Rank */}
        {typeof rank === "number" && (
          <span
            className="
              absolute top-3 left-3 z-10
              w-8 h-8
              rounded-full
              text-white text-xs font-bold
              flex items-center justify-center
              shadow-md
            "
            style={{ backgroundColor: category.primaryColor }}
          >
            {rank}
          </span>
        )}

        {/* Featured */}
        {business.featured && (
          <span
            className="
              absolute top-3 right-3 z-10
              sm:top-3 sm:right-3
              md:top-12 md:left-3 md:right-auto
              inline-flex items-center gap-1
              text-[10px] font-semibold
              px-2.5 py-1.5
              rounded-full
              text-white
              shadow-sm
            "
            style={{ backgroundColor: category.darkColor }}
          >
            <Star size={10} />
            Featured
          </span>
        )}

        {/* Open status */}
        {openStatusKnown && (
          <span
            className={`
              absolute bottom-3 left-3 z-10
              text-[10px] sm:text-xs
              font-semibold
              px-2.5 py-1.5
              rounded-full
              text-white
              shadow-sm
              ${open ? "bg-lf-success" : "bg-lf-ink-soft"}
            `}
          >
            {open ? "Open Now" : "Closed Now"}
          </span>
        )}

        <img
          src={business.image}
          alt={`${category.name} illustration for ${business.name} in ${business.city}`}
          loading="lazy"
          className="
            w-full h-full
            object-cover
            transition-transform duration-300
            group-hover:scale-105
          "
        />
      </Link>

      {/* CONTENT */}
      <div className="flex-1 min-w-0 p-4 sm:p-5 lg:p-6 flex flex-col">
        
        {/* TITLE + FAVORITE */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3
              className="
                font-syne
                font-bold
                text-base
                sm:text-lg
                lg:text-xl
                text-lf-ink
                leading-snug
                break-words
              "
            >
              <Link
                to={detailUrl}
                className="hover:underline"
                style={{
                  textDecorationColor: category.primaryColor,
                }}
              >
                {business.name}
              </Link>
            </h3>

            {/* LOCATION */}
            <p className="flex items-start gap-1.5 text-xs sm:text-sm text-lf-ink-soft mt-1.5">
              <MapPin
                size={13}
                className="shrink-0 mt-0.5"
              />
              <span className="line-clamp-2">
                {business.address ?? business.city}
              </span>
            </p>
          </div>

          <div className="shrink-0">
            <FavoriteButton
              businessId={business.id}
              businessName={business.name}
              onToast={onToast}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-xs sm:text-sm text-lf-ink-soft mt-3 line-clamp-2 leading-relaxed">
          {business.description}
        </p>

        {/* SERVICES */}
        <p className="text-xs sm:text-sm text-lf-ink-soft mt-2.5 line-clamp-2 leading-relaxed">
          {business.services.join(" • ")}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <span
            className="
              inline-flex items-center
              text-[10px] sm:text-[11px]
              font-semibold
              px-2.5 py-1.5
              rounded-full
            "
            style={{
              backgroundColor: category.lightColor,
              color: category.darkColor,
            }}
          >
            {category.name}
          </span>

          {business.featured && (
            <span
              className="
                inline-flex items-center gap-1
                text-[10px] sm:text-[11px]
                font-semibold
                px-2.5 py-1.5
                rounded-full
              "
              style={{
                backgroundColor: category.lightColor,
                color: category.darkColor,
              }}
            >
              <Star size={11} />
              Featured
            </span>
          )}
        </div>

        {/* ACTIONS */}
        <div
          className="
            mt-4 pt-4
            border-t border-black/5
            flex flex-col
            xs:flex-row
            sm:flex-row
            gap-2
          "
        >
          {/* CALL */}
          {business.phone && (
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className="
                flex-1 sm:flex-none
                flex items-center justify-center gap-1.5
                text-xs sm:text-sm
                font-semibold
                rounded-xl
                px-4
                h-10
                border-2
                bg-white
                transition-colors
                hover:bg-lf-page-alt
              "
              style={{
                borderColor: category.primaryColor,
                color: category.darkColor,
              }}
            >
              <Phone size={14} />
              Call
            </a>
          )}

          {/* DETAILS */}
          <Link
            to={detailUrl}
            className="
              flex-1 sm:flex-none
              flex items-center justify-center gap-1.5
              text-xs sm:text-sm
              font-semibold
              rounded-xl
              px-4
              h-10
              text-white
              transition-all
              hover:opacity-90
              sm:ml-0
            "
            style={{
              backgroundColor: category.primaryColor,
            }}
          >
            View Details
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
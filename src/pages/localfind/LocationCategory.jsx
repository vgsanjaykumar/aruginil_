import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { resolveListing } from "../../features/localfind/shared/utils/queries";
import {
  generateListingSEO,
  getListingBreadcrumbs,
  generateListingJsonLd,
  generateBreadcrumbJsonLd,
} from "../../features/localfind/shared/utils/seo";
import ListingPage from "../../features/localfind/pages/ListingPage";
import LocalFindNotFoundPage from "./LocalFindNotFound";

/**
 * Route: /:city/:category
 *
 * SEO metadata is generated per city+category from real data (see
 * features/localfind/shared/utils/seo.ts), never duplicated across
 * the valid listing pages.
 */
const LocationCategory = () => {
  const { city: citySlug, category: categorySlug } = useParams();
  const listing = resolveListing(citySlug, categorySlug);

  if (!listing) {
    return (
      <>
        <Helmet>
          <title>Page Not Found | Aruginil</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <LocalFindNotFoundPage
          title="Page Not Found"
          message="This city/category combination isn't available on Aruginil. Explore the categories and cities in the menu instead."
          backTo="/"
          backLabel="Back to Aruginil"
        />
      </>
    );
  }

  const { city, category, businesses } = listing;
  const seo = generateListingSEO(city, category);
  // Per the indexing-control policy: a valid city/category route with
  // zero real businesses yet shows the normal page (empty state, no
  // fabricated content) but is marked noindex — it exists so the
  // route resolves and can be filled in later, not as a thin SEO
  // page competing for a keyword with no real content behind it.
  const hasBusinesses = businesses.length > 0;
  const jsonLd = [
    generateListingJsonLd(city, category, businesses),
    generateBreadcrumbJsonLd(getListingBreadcrumbs(city, category)),
  ];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        {!hasBusinesses && <meta name="robots" content="noindex, follow" />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:url" content={seo.ogUrl} />
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.twitterTitle} />
        <meta name="twitter:description" content={seo.twitterDescription} />
        {seo.twitterImage && <meta name="twitter:image" content={seo.twitterImage} />}
        {hasBusinesses &&
          jsonLd.map((ld, i) => (
            <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
          ))}
      </Helmet>
      <ListingPage city={city} category={category} businesses={businesses} />
    </>
  );
};

export default LocationCategory;

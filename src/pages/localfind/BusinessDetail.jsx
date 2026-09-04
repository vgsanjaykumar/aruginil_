import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { resolveListing, resolveBusiness } from "../../features/localfind/shared/utils/queries";
import {
  generateBusinessSEO,
  getBusinessBreadcrumbs,
  generateBusinessJsonLd,
  generateBreadcrumbJsonLd,
} from "../../features/localfind/shared/utils/seo";
import BusinessDetailPage from "../../features/localfind/pages/BusinessDetailPage";
import LocalFindNotFoundPage from "./LocalFindNotFound";

/**
 * Route: /:city/:category/:businessSlug
 *
 * Distinguishes two failure states, as required:
 * - invalid city/category combination → generic LocalFind "Page Not Found"
 * - valid city/category but unknown business slug → "Business Not Found"
 */
const BusinessDetail = () => {
  const { city: citySlug, category: categorySlug, businessSlug } = useParams();
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
          message="This city/category combination isn't available on Aruginil."
          backTo="/"
          backLabel="Back to Aruginil"
        />
      </>
    );
  }

  const resolved = resolveBusiness(citySlug, categorySlug, businessSlug);

  if (!resolved) {
    return (
      <>
        <Helmet>
          <title>Business Not Found | Aruginil</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <LocalFindNotFoundPage
          title="Business Not Found"
          message="We couldn't find this business listing. It may have moved or the link may be incorrect."
          backTo={`/${listing.city.slug}/${listing.category.slug}`}
          backLabel={`Back to ${listing.category.pluralName} in ${listing.city.name}`}
        />
      </>
    );
  }

  const { business, category, city } = resolved;
  const seo = generateBusinessSEO(business, category, city);
  const jsonLd = [
    generateBusinessJsonLd(business, city),
    generateBreadcrumbJsonLd(getBusinessBreadcrumbs(business, city, category)),
  ];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:url" content={seo.ogUrl} />
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.twitterTitle} />
        <meta name="twitter:description" content={seo.twitterDescription} />
        {seo.twitterImage && <meta name="twitter:image" content={seo.twitterImage} />}
        {jsonLd.map((ld, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
        ))}
      </Helmet>
      <BusinessDetailPage business={business} category={category} city={city} />
    </>
  );
};

export default BusinessDetail;

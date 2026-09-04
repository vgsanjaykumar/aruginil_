import React from "react";
import { Helmet } from "react-helmet";
import { generateHomeSEO, generateWebsiteJsonLd, generateOrganizationJsonLd } from "../../features/localfind/shared/utils/seo";
import HomePage from "../../features/localfind/pages/HomePage";

/**
 * Route: / (Aruginil's own home page)
 *
 * This project is a standalone application — Aruginil no longer
 * shares a codebase or a domain with Natarajan & Co, so "/" is free
 * to be Aruginil's own home page here.
 */
const Home = () => {
  const seo = generateHomeSEO();
  const websiteJsonLd = generateWebsiteJsonLd();
  const organizationJsonLd = generateOrganizationJsonLd();

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
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      </Helmet>
      <HomePage />
    </>
  );
};

export default Home;

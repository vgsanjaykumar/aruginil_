import React from "react";
import { Helmet } from "react-helmet";
import NotFoundPage from "../../features/localfind/pages/NotFoundPage";

/**
 * Route: * (catch-all — registered last in App.tsx so it never
 * intercepts a valid /, /:city/:category or
 * /:city/:category/:businessSlug match)
 *
 * True site-wide 404 for URLs that don't match any Aruginil route at
 * all. Marked noindex, nofollow and given no canonical — it isn't a
 * real page and must never appear in the sitemap or be treated as a
 * duplicate/alternate of another URL.
 */
const NotFound = () => (
  <>
    <Helmet>
      <title>Page Not Found | Aruginil</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <NotFoundPage />
  </>
);

export default NotFound;

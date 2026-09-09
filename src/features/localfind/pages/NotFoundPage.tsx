import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home as HomeIcon } from "lucide-react";
import LocalFindPageShell from "../shared/components/LocalFindPageShell";
import { ARUGINIL_NAME, ARUGINIL_TAGLINE } from "../../../config/siteConfig.js";

/**
 * Route: * (catch-all)
 *
 * Rendered for any URL that doesn't match a real Aruginil route —
 * distinct from LocalFindNotFoundPage (src/pages/localfind/LocalFindNotFound.jsx),
 * which handles the narrower case of a syntactically valid
 * /:city/:category route that just doesn't resolve to real data.
 * This page is the true "nothing here at all" state, e.g.
 * /invalid-page or /random/unknown/endpoint.
 */
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <LocalFindPageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 flex flex-col items-center text-center">
        <p
          aria-hidden="true"
          className="font-syne font-extrabold leading-none text-lf-brand/15 text-[6rem] sm:text-[8rem] md:text-[10rem] select-none"
        >
          404
        </p>

        <h1 className="font-syne font-bold text-2xl sm:text-3xl md:text-4xl text-lf-ink -mt-8 sm:-mt-12">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-lf-ink-soft mt-4 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-lf-brand hover:bg-lf-brand-dark text-white text-sm font-semibold rounded-xl h-12 px-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lf-brand focus-visible:ring-offset-2"
          >
            <HomeIcon size={16} aria-hidden="true" />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back to the previous page"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-lf-page-alt text-lf-ink border border-black/10 text-sm font-semibold rounded-xl h-12 px-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lf-brand focus-visible:ring-offset-2"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Go Back
          </button>
        </div>

        <p className="text-xs text-lf-ink-soft/80 mt-14">
          {ARUGINIL_NAME} — {ARUGINIL_TAGLINE}
        </p>
      </div>
    </LocalFindPageShell>
  );
}

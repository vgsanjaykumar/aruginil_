/**
 * Centralized site configuration for Aruginil.
 *
 * This project is now a standalone application (split out from the
 * Natarajan & Co codebase it originally shared). Everything that
 * needs the brand name or the production domain — canonical URLs,
 * Open Graph/Twitter tags, JSON-LD, sitemap generation — reads from
 * this one place.
 */
export const ARUGINIL_NAME = "Aruginil";
export const ARUGINIL_TAGLINE = "Discover Local Businesses Near You";
export const ARUGINIL_SITE_URL = "https://aruginil.com";

/**
 * Single source of truth for Aruginil's own contact number (shown on
 * the footer's "Connect" button as a tel: link). Referenced from here
 * everywhere it's needed, rather than hardcoded in multiple places —
 * update it once, here, if it ever changes.
 */
export const CONTACT_PHONE = "9600417117";

/**
 * Google Search Console site-verification meta tag content.
 * Left empty on purpose — no fake verification code is generated.
 * When a real one is issued (Search Console → Add Property → HTML tag
 * method), add it directly to index.html's <head> as:
 *   <meta name="google-site-verification" content="PASTE_CODE_HERE" />
 */
export const GOOGLE_SITE_VERIFICATION = "";

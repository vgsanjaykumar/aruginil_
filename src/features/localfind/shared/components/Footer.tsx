import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Logo from "./Logo";
import { CONTACT_PHONE } from "../../../../config/siteConfig.js";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/8 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Brand */}
          <div>
            <Link to="/" aria-label="Aruginil home">
              <Logo />
            </Link>
            <p className="text-sm text-lf-ink-soft mt-2 max-w-xs">
              Discover local businesses and services near you across Tamil Nadu.
            </p>
          </div>

          {/* Connect CTA */}
          <a
            href={`tel:${CONTACT_PHONE}`}
            aria-label={`Connect with Aruginil — call ${CONTACT_PHONE}`}
            className="inline-flex items-center justify-center gap-2 bg-lf-brand hover:bg-lf-brand-dark text-white font-semibold text-sm rounded-xl h-12 px-6 transition-colors shrink-0 w-full sm:w-auto"
          >
            <Phone size={16} aria-hidden="true" />
            Connect
          </a>
        </div>

        <div className="border-t border-black/5 mt-8 pt-6 text-xs text-lf-ink-soft flex flex-col sm:flex-row justify-between gap-2">
          <p>
            © 2026 Aruginil. Business listings are sourced from public information; verify details before visiting.
          </p>

          <p>Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}

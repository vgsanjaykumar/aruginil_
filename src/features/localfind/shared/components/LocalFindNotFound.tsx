import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";

interface LocalFindNotFoundProps {
  title?: string;
  message?: string;
  backTo?: string;
  backLabel?: string;
}

export default function LocalFindNotFound({
  title = "Page Not Found",
  message = "We couldn't find what you're looking for. It may have moved or the link may be incorrect.",
  backTo = "/",
  backLabel = "Back to Aruginil",
}: LocalFindNotFoundProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-full bg-lf-brand-light flex items-center justify-center mb-4">
        <SearchX size={26} className="text-lf-brand" />
      </div>
      <h1 className="font-syne font-bold text-2xl text-lf-ink">{title}</h1>
      <p className="text-sm text-lf-ink-soft mt-2 max-w-sm">{message}</p>
      <Link to={backTo} className="mt-6 inline-flex items-center gap-1.5 bg-lf-brand hover:bg-lf-brand-dark text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-colors">
        {backLabel}
      </Link>
    </div>
  );
}

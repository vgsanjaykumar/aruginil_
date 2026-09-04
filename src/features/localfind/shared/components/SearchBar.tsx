import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  accentColor?: string;
}

export default function SearchBar({ value, onChange, onSubmit, placeholder = "What are you looking for?", accentColor }: SearchBarProps) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="flex items-center bg-white rounded-full shadow-lf-card border border-black/10 overflow-hidden h-12 sm:h-14"
    >
      <Search size={18} className="ml-4 sm:ml-5 text-lf-ink-soft shrink-0" />
      <label htmlFor="lf-search-bar" className="sr-only">
        {placeholder}
      </label>
      <input
        id="lf-search-bar"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 h-full text-sm sm:text-base text-lf-ink placeholder:text-lf-ink-soft focus:outline-none bg-transparent min-w-0"
      />
      <button
        type="submit"
        className="flex items-center gap-1.5 h-full px-5 sm:px-7 text-white text-sm sm:text-base font-bold shrink-0 transition-colors"
        style={{ backgroundColor: accentColor ?? "#6D28D9" }}
      >
        <Search size={16} />
        <span>Search</span>
      </button>
    </form>
  );
}

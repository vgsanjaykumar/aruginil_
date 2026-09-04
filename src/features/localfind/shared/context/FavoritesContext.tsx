import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "localfind:favorites";

interface FavoritesContextValue {
  favorites: Set<string>;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => boolean; // returns true if now favorited
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function loadFromStorage(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    // localStorage may be unavailable (private browsing, SSR-ish
    // prerender context, etc.) — fail safe to an empty set.
    return new Set();
  }
}

function saveToStorage(favorites: Set<string>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)));
  } catch {
    // ignore write failures (e.g. storage full/disabled)
  }
}

/**
 * Wraps every Aruginil route (see LocalFindLayout) so favorited
 * businesses persist across page navigation AND across browser
 * sessions (localStorage), namespaced under "localfind:favorites".
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(() =>
    typeof window !== "undefined" ? loadFromStorage() : new Set()
  );

  useEffect(() => {
    saveToStorage(favorites);
  }, [favorites]);

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    let nowFavorited = false;
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        nowFavorited = false;
      } else {
        next.add(id);
        nowFavorited = true;
      }
      return next;
    });
    return nowFavorited;
  }, []);

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites, isFavorite, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavoritesContext(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavoritesContext must be used within a FavoritesProvider");
  }
  return ctx;
}

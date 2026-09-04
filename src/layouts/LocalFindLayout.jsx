import { Outlet } from "react-router-dom";
import { FavoritesProvider } from "../features/localfind/shared/context/FavoritesContext";

/**
 * Wraps every Aruginil route so favorited businesses (persisted to
 * localStorage) are available on every page. Renders no visible
 * chrome of its own — each page ships its own Header/Navigation/
 * Footer via LocalFindPageShell — this only provides shared state.
 */
const LocalFindLayout = () => (
  <FavoritesProvider>
    <Outlet />
  </FavoritesProvider>
);

export default LocalFindLayout;

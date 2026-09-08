import { BrowserRouter, Routes, Route } from "react-router-dom";
import LocalFindLayout from "./layouts/LocalFindLayout";
import Home from "./pages/localfind/Home";
import LocationCategory from "./pages/localfind/LocationCategory";
import BusinessDetail from "./pages/localfind/BusinessDetail";
import NotFound from "./pages/localfind/NotFound";

/**
 * Aruginil — standalone local-business discovery application.
 *
 * This was originally a feature living inside the Natarajan & Co
 * codebase; it has since been split out into its own independent
 * project. `LocalFindLayout` only provides shared Favorites state
 * (localStorage-backed) across every route below — each page ships
 * its own Header/Navigation/Footer via `LocalFindPageShell`.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LocalFindLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:city/:category" element={<LocationCategory />} />
          <Route path="/:city/:category/:businessSlug" element={<BusinessDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

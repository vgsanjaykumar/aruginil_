import { useState, type ReactNode } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function LocalFindPageShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="lf-scope min-h-screen flex flex-col bg-lf-page font-inter">
      <Header onOpenMenu={() => setMobileMenuOpen((v) => !v)} menuOpen={mobileMenuOpen} />
      <Navigation mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

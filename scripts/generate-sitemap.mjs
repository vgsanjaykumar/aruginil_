/**
 * scripts/generate-sitemap.mjs
 *
 * Writes dist/sitemap.xml for the standalone Aruginil application,
 * covering the home page + every valid city/category listing page +
 * every business detail page. Nothing here is hand-maintained — the
 * URL list is generated straight from cities.ts/categories.ts/
 * businesses.ts, the same data the app itself renders from, so a
 * data-only change (new city, new category, new business) updates
 * the sitemap automatically.
 *
 * Runs as part of `npm run build` (see "postbuild"), after the
 * prerender step.
 */
import { createServer } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

import { ARUGINIL_SITE_URL } from "../src/config/siteConfig.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");

function urlEntry(loc, { changefreq = "weekly", priority = "0.8" } = {}) {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function main() {
  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
    optimizeDeps: { noDiscovery: true, include: [] },
  });

  try {
    const { cities } = await vite.ssrLoadModule("/src/features/localfind/data/cities.ts");
    const { categories } = await vite.ssrLoadModule("/src/features/localfind/data/categories.ts");
    const { businesses } = await vite.ssrLoadModule("/src/features/localfind/data/businesses.ts");
    const { listingPath, businessPath, ARUGINIL_HOME_PATH } = await vite.ssrLoadModule(
      "/src/features/localfind/shared/utils/seo.ts"
    );

    const entries = [];
    entries.push(
      urlEntry(`${ARUGINIL_SITE_URL}${ARUGINIL_HOME_PATH}`, { changefreq: "weekly", priority: "1.0" })
    );

    let listingCount = 0;
    for (const city of cities) {
      for (const categorySlug of city.availableCategories) {
        if (!categories.some((c) => c.slug === categorySlug)) continue;
        // Only submit listing URLs that actually have real business
        // content — a noindexed, empty-but-valid combination (see
        // LocationCategory.jsx) isn't something worth asking Google to
        // crawl/index via the sitemap.
        const hasBusinesses = businesses.some(
          (b) => b.citySlug === city.slug && b.categorySlug === categorySlug
        );
        if (!hasBusinesses) continue;
        entries.push(
          urlEntry(`${ARUGINIL_SITE_URL}${listingPath(city.slug, categorySlug)}`, {
            changefreq: "weekly",
            priority: "0.9",
          })
        );
        listingCount++;
      }
    }

    for (const b of businesses) {
      entries.push(
        urlEntry(`${ARUGINIL_SITE_URL}${businessPath(b.citySlug, b.categorySlug, b.slug)}`, {
          changefreq: "weekly",
          priority: "0.8",
        })
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join(
      "\n"
    )}\n</urlset>\n`;

    await fs.mkdir(distDir, { recursive: true });
    await fs.writeFile(path.join(distDir, "sitemap.xml"), xml, "utf-8");
    console.log(
      `[generate-sitemap] wrote dist/sitemap.xml with ${entries.length} URLs (${listingCount} listing pages + ${businesses.length} business pages)`
    );
  } finally {
    try {
      await vite.close();
    } catch (closeErr) {
      console.warn("[generate-sitemap] non-fatal: vite.close() warning:", closeErr?.message ?? closeErr);
    }
  }
}

main().catch((err) => {
  console.error("[generate-sitemap] failed:", err);
  process.exit(1);
});

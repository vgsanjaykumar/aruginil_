/**
 * scripts/prerender-localfind.mjs
 *
 * Post-build prerender step for Aruginil. This stays a plain React +
 * Vite SPA (no Next.js, no SSR framework), but writes a real static
 * `index.html` per Aruginil URL directly into `dist/`, using Vite's
 * own `ssrLoadModule` to load the existing TS data/SEO modules in
 * Node — no new dependency (vite + react-dom are already installed),
 * no headless browser.
 *
 * Each generated file has the correct <title>, meta description,
 * canonical, Open Graph, Twitter tags, JSON-LD, and a genuine HTML
 * content snapshot built from the same city/category/business data
 * every other part of the app reads — plus the exact same built
 * JS/CSS bundle as every other page, so a real visitor's browser
 * boots the full interactive app over it (`createRoot(...).render()`,
 * not `hydrateRoot`).
 */
import { createServer } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Strips the base index.html's generic head tags (title, description, canonical, OG) before injecting page-specific ones for each listing/business page. */
function stripConflictingHeadTags(html) {
  return html
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="keywords"[\s\S]*?>\s*/gi, "")
    .replace(/<meta\s+name="url"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:[a-z:]+"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[a-z:]+"[^>]*>\s*/gi, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "");
}

function renderHeadTags(seo, jsonLdBlocks = []) {
  const tags = [
    `<meta name="description" content="${escapeHtml(seo.description)}">`,
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${escapeHtml(seo.ogTitle)}">`,
    `<meta property="og:description" content="${escapeHtml(seo.ogDescription)}">`,
    `<meta property="og:url" content="${escapeHtml(seo.ogUrl)}">`,
  ];
  if (seo.ogImage) tags.push(`<meta property="og:image" content="${escapeHtml(seo.ogImage)}">`);
  tags.push(
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(seo.twitterTitle)}">`,
    `<meta name="twitter:description" content="${escapeHtml(seo.twitterDescription)}">`
  );
  if (seo.twitterImage) tags.push(`<meta name="twitter:image" content="${escapeHtml(seo.twitterImage)}">`);
  for (const jsonLd of jsonLdBlocks) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);
  }
  return tags.join("\n    ");
}

function renderListingSnapshot(city, category, businesses, businessPath, listingPath) {
  const cards = businesses
    .map(
      (b) => `
      <article>
        <h2><a href="${businessPath(b.citySlug, b.categorySlug, b.slug)}">${escapeHtml(b.name)}</a></h2>
        <p>${escapeHtml(b.city)} &middot; ${b.services.map(escapeHtml).join(" • ")}</p>
        <p>${escapeHtml(b.description)}</p>
        <p><a href="${businessPath(b.citySlug, b.categorySlug, b.slug)}">View Details</a></p>
      </article>`
    )
    .join("\n");

  return `
  <div id="top">
    <header><h2>Aruginil — Local Business Directory</h2></header>
    <nav aria-label="Breadcrumb"><a href="/">Home</a> &gt; <a href="${listingPath(city.slug, category.slug)}">${escapeHtml(city.name)}</a> &gt; ${escapeHtml(category.pluralName)}</nav>
    <main>
      <h1>${escapeHtml(category.name)} in ${escapeHtml(city.name)}</h1>
      <p>Discover local ${escapeHtml(category.name.toLowerCase())} services in ${escapeHtml(city.name)}. Explore businesses, services and useful local information.</p>
      <section aria-label="Business listings">${cards}</section>
    </main>
  </div>`;
}

function renderBusinessSnapshot(business, category, city, related, businessPath, listingPath) {
  const services = business.services.map((s) => `<li>${escapeHtml(s)}</li>`).join("\n");
  const hours = business.openingHours
    ? business.openingHours.map((h) => `<li>${escapeHtml(h.day)}: ${escapeHtml(h.hours)}</li>`).join("\n")
    : "";
  const relatedLinks = related
    .map((r) => `<li><a href="${businessPath(r.citySlug, r.categorySlug, r.slug)}">${escapeHtml(r.name)}</a></li>`)
    .join("\n");

  return `
  <div id="top">
    <header><h2>Aruginil — Local Business Directory</h2></header>
    <nav aria-label="Breadcrumb">
      <a href="/">Home</a> &gt;
      <a href="${listingPath(city.slug, category.slug)}">${escapeHtml(city.name)}</a> &gt;
      <a href="${listingPath(city.slug, category.slug)}">${escapeHtml(category.pluralName)}</a> &gt;
      ${escapeHtml(business.name)}
    </nav>
    <main>
      <h1>${escapeHtml(business.name)}</h1>
      <p>${escapeHtml(category.name)} in ${escapeHtml(city.name)}, ${escapeHtml(city.state)}</p>
      <img src="${escapeHtml(business.image)}" alt="${escapeHtml(category.name)} listing illustration for ${escapeHtml(business.name)} in ${escapeHtml(city.name)}" width="800" height="500">

      <h2>About ${escapeHtml(business.name)}</h2>
      <p>${escapeHtml(business.description)}</p>

      <h2>Services Offered</h2>
      <ul>${services}</ul>

      ${hours ? `<h2>Opening Hours</h2>\n      <ul>${hours}</ul>` : ""}

      <h2>Business Information</h2>
      <p>${escapeHtml(business.address ?? `${city.name}, ${city.state}`)}</p>
      ${business.phone ? `<p>Phone: ${escapeHtml(business.phone)}</p>` : ""}
      ${business.website ? `<p>Website: <a href="${escapeHtml(business.website)}">${escapeHtml(business.website)}</a></p>` : ""}

      <h2>Related ${escapeHtml(category.pluralName)} in ${escapeHtml(city.name)}</h2>
      <ul>${relatedLinks}</ul>
    </main>
  </div>`;
}

function renderHomeSnapshot(cities, categories, businesses, listingPath, businessBelongsToCategory) {
  const categoryLinks = categories
    .map((cat) => {
      const count = businesses.filter((b) => businessBelongsToCategory(b, cat.slug)).length;
      return `<li><a href="${listingPath("karaikudi", cat.slug)}">${escapeHtml(cat.pluralName)}</a> (${count})</li>`;
    })
    .join("\n");
  const cityLinks = cities
    .map((city) => {
      const count = businesses.filter((b) => b.citySlug === city.slug).length;
      return `<li><a href="${listingPath(city.slug, city.availableCategories[0])}">${escapeHtml(city.name)}</a> (${count})</li>`;
    })
    .join("\n");

  return `
  <div id="top">
    <header><h2>Aruginil — Local Business Directory</h2></header>
    <main>
      <h1>Discover Local Businesses Near You</h1>
      <p>Find trusted local services, shops and professionals across your city.</p>

      <h2>Popular Categories</h2>
      <ul>${categoryLinks}</ul>

      <h2>Explore Local Businesses by City</h2>
      <ul>${cityLinks}</ul>
    </main>
  </div>`;
}

function writeHtmlDocument(baseHtml, { title, headExtra, bodySnapshot }) {
  let html = stripConflictingHeadTags(baseHtml);
  html = html.replace(/<title>.*?<\/title>/is, `<title>${escapeHtml(title)}</title>`);
  html = html.replace("</head>", `    ${headExtra}\n  </head>`);
  html = html.replace(/<div id="root"><\/div>/, `<div id="root">${bodySnapshot}</div>`);
  return html;
}

async function main() {
  const indexHtmlPath = path.join(distDir, "index.html");
  const baseHtml = await fs.readFile(indexHtmlPath, "utf-8");

  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
    optimizeDeps: { noDiscovery: true, include: [] },
  });

  let listingPagesWritten = 0;
  let businessPagesWritten = 0;

  try {
    const { cities } = await vite.ssrLoadModule("/src/features/localfind/data/cities.ts");
    const { categories } = await vite.ssrLoadModule("/src/features/localfind/data/categories.ts");
    const { businesses, getBusinessesByCityAndCategory, businessBelongsToCategory } = await vite.ssrLoadModule(
      "/src/features/localfind/data/businesses.ts"
    );
    const seoUtils = await vite.ssrLoadModule("/src/features/localfind/shared/utils/seo.ts");
    const {
      listingPath,
      businessPath,
      generateHomeSEO,
      generateListingSEO,
      generateBusinessSEO,
      getListingBreadcrumbs,
      getBusinessBreadcrumbs,
      generateListingJsonLd,
      generateBusinessJsonLd,
      generateBreadcrumbJsonLd,
      generateWebsiteJsonLd,
      generateOrganizationJsonLd,
      ARUGINIL_HOME_PATH,
    } = seoUtils;

    // 0. Home page (/)
    {
      const seo = generateHomeSEO();
      const html = writeHtmlDocument(baseHtml, {
        title: seo.title,
        headExtra: renderHeadTags(seo, [generateWebsiteJsonLd(), generateOrganizationJsonLd()]),
        bodySnapshot: renderHomeSnapshot(cities, categories, businesses, listingPath, businessBelongsToCategory),
      });
      const outDir = path.join(distDir, ARUGINIL_HOME_PATH.replace(/^\//, ""));
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
    }

    // 1. Listing pages — only for {city, category} pairs that actually
    //    have real business data. With the full 144-category registry
    //    now available to every city, prerendering every combination
    //    (mostly empty) would itself be exactly the kind of thin-page
    //    bloat the project avoids — an empty combination still
    //    resolves correctly at runtime (React Router + resolveListing
    //    render the real "no businesses found" state client-side, with
    //    a noindex tag — see LocationCategory.jsx), it just isn't
    //    worth a dedicated prerendered/crawlable file with no content.
    let listingPagesSkippedEmpty = 0;
    for (const city of cities) {
      for (const categorySlug of city.availableCategories) {
        const category = categories.find((c) => c.slug === categorySlug);
        if (!category) continue;

        const cityBusinesses = getBusinessesByCityAndCategory(city.slug, categorySlug);
        if (cityBusinesses.length === 0) {
          listingPagesSkippedEmpty++;
          continue;
        }

        const seo = generateListingSEO(city, category);
        const jsonLd = [
          generateListingJsonLd(city, category, cityBusinesses),
          generateBreadcrumbJsonLd(getListingBreadcrumbs(city, category)),
        ];
        const html = writeHtmlDocument(baseHtml, {
          title: seo.title,
          headExtra: renderHeadTags(seo, jsonLd),
          bodySnapshot: renderListingSnapshot(city, category, cityBusinesses, businessPath, listingPath),
        });

        const outDir = path.join(distDir, seo.path.replace(/^\//, ""));
        await fs.mkdir(outDir, { recursive: true });
        await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
        listingPagesWritten++;
      }
    }

    // 2. Business pages: one per business (285 total)
    for (const business of businesses) {
      const category = categories.find((c) => c.slug === business.categorySlug);
      const city = cities.find((c) => c.slug === business.citySlug);
      if (!category || !city) continue;

      const related = getBusinessesByCityAndCategory(business.citySlug, business.categorySlug).filter(
        (b) => b.id !== business.id
      );
      const seo = generateBusinessSEO(business, category, city);
      const jsonLd = [
        generateBusinessJsonLd(business, city),
        generateBreadcrumbJsonLd(getBusinessBreadcrumbs(business, city, category)),
      ];
      const html = writeHtmlDocument(baseHtml, {
        title: seo.title,
        headExtra: renderHeadTags(seo, jsonLd),
        bodySnapshot: renderBusinessSnapshot(business, category, city, related, businessPath, listingPath),
      });

      const outDir = path.join(distDir, seo.path.replace(/^\//, ""));
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
      businessPagesWritten++;
    }

    console.log(
      `[prerender-localfind] wrote ${listingPagesWritten} listing pages + ${businessPagesWritten} business pages = ${
        listingPagesWritten + businessPagesWritten
      } total static HTML pages (skipped ${listingPagesSkippedEmpty} valid-but-empty city/category combinations — no thin pages generated)`
    );
  } finally {
    try {
      await vite.close();
    } catch (closeErr) {
      console.warn("[prerender-localfind] non-fatal: vite.close() warning:", closeErr?.message ?? closeErr);
    }
  }
}

main().catch((err) => {
  console.error("[prerender-localfind] failed:", err);
  process.exit(1);
});

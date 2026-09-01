import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const indexPath = path.join(dist, "index.html");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function findSsrEntry() {
  const candidates = ["entry-server.js", "entry-server.mjs", "entry-server.cjs"];
  for (const name of candidates) {
    const filePath = path.join(ssrDir, name);
    if (fs.existsSync(filePath)) return filePath;
  }
  fail(`SSR bundle not found in ${ssrDir}`);
}

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function upsertMetaByName(html, name, content) {
  const tag = `    <meta name="${name}" content="${escapeAttr(content)}" />`;
  const pattern = new RegExp(`<meta\\s+name="${name}"[^>]*>\\s*`, "i");
  if (pattern.test(html)) return html.replace(pattern, `${tag}\n`);
  return html.replace("</head>", `${tag}\n  </head>`);
}

function upsertMetaByProperty(html, property, content) {
  const tag = `    <meta property="${property}" content="${escapeAttr(content)}" />`;
  const pattern = new RegExp(`<meta\\s+property="${property}"[^>]*>\\s*`, "i");
  if (pattern.test(html)) return html.replace(pattern, `${tag}\n`);
  return html.replace("</head>", `${tag}\n  </head>`);
}

function upsertLink(html, rel, href) {
  const tag = `    <link rel="${rel}" href="${escapeAttr(href)}" />`;
  const pattern = new RegExp(`<link\\s+rel="${rel}"[^>]*>\\s*`, "i");
  if (pattern.test(html)) return html.replace(pattern, `${tag}\n`);
  return html.replace("</head>", `${tag}\n  </head>`);
}

function applySeo(html, seo) {
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  html = upsertMetaByName(html, "description", seo.description);
  if (seo.robots) {
    html = upsertMetaByName(html, "robots", seo.robots);
  } else {
    html = html.replace(/<meta\s+name="robots"[^>]*>\s*/i, "");
  }
  if (seo.canonical) {
    html = upsertLink(html, "canonical", seo.canonical);
    html = upsertMetaByProperty(html, "og:url", seo.canonical);
  } else {
    html = html.replace(/<link\s+rel="canonical"[^>]*>\s*/i, "");
    html = html.replace(/<meta\s+property="og:url"[^>]*>\s*/i, "");
  }
  html = upsertMetaByProperty(html, "og:type", "website");
  html = upsertMetaByProperty(html, "og:locale", "he_IL");
  html = upsertMetaByProperty(html, "og:site_name", "AllInCenter");
  html = upsertMetaByProperty(html, "og:title", seo.title);
  html = upsertMetaByProperty(html, "og:description", seo.description);
  html = upsertMetaByProperty(html, "og:image", seo.ogImage);
  html = upsertMetaByName(html, "twitter:card", seo.twitterCard || "summary");
  html = upsertMetaByName(html, "twitter:title", seo.title);
  html = upsertMetaByName(html, "twitter:description", seo.description);
  html = upsertMetaByName(html, "twitter:image", seo.ogImage);

  const json = JSON.stringify(seo.jsonLd).replaceAll("<", "\\u003c");
  const jsonTag = `    <script type="application/ld+json" id="allincenter-jsonld">${json}</script>`;
  if (html.includes('id="allincenter-jsonld"')) {
    html = html.replace(
      /<script type="application\/ld\+json" id="allincenter-jsonld">[\s\S]*?<\/script>/,
      jsonTag.trim(),
    );
  } else {
    html = html.replace("</head>", `${jsonTag}\n  </head>`);
  }
  return html;
}

function writeRouteHtml(template, url, appHtml, seo) {
  if (!/<div id="root">[\s]*<\/div>/.test(template)) {
    fail('Could not find <div id="root"></div> in dist/index.html');
  }
  let html = template.replace(/<div id="root">[\s]*<\/div>/, `<div id="root">${appHtml}</div>`);
  html = applySeo(html, seo);

  const outPath =
    url === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, url.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, "utf8");
  return outPath;
}

function looksLikeSpaShell(content) {
  return content.includes('<div id="root"></div>') && /<html[\s>]/i.test(content) && /<script type="module"/i.test(content);
}

function assertContains(html, needles, label) {
  for (const needle of needles) {
    if (!html.includes(needle)) {
      fail(`${label} is missing: ${needle}`);
    }
  }
}

if (!fs.existsSync(indexPath)) {
  fail("dist/index.html missing — run vite build first");
}

const template = fs.readFileSync(indexPath, "utf8");
const ssrModule = await import(pathToFileURL(findSsrEntry()).href);
const { render, prerenderPaths, getRouteSeo, notFoundSeo } = ssrModule;

for (const url of prerenderPaths) {
  const appHtml = render(url);
  const seo = getRouteSeo(url);
  const outPath = writeRouteHtml(template, url, appHtml, seo);
  const html = fs.readFileSync(outPath, "utf8");
  const relative = path.relative(dist, outPath);

  assertContains(
    html,
    [
      `<title>${escapeHtml(seo.title)}</title>`,
      `content="${escapeAttr(seo.description)}"`,
      `rel="canonical" href="${seo.canonical}"`,
      "<h1",
      "application/ld+json",
      "050-267-7765",
      "info@allincenter.co.il",
    ],
    relative,
  );
  if (html.includes('<div id="root"></div>')) {
    fail(`${relative} still has an empty #root`);
  }
  console.log(`prerendered ${url} -> ${relative}`);
}

const notFoundHtml = writeRouteHtml(template, "/__not-found__", render("/__not-found__"), notFoundSeo);
const publicNotFound = path.join(dist, "404.html");
fs.copyFileSync(notFoundHtml, publicNotFound);
fs.rmSync(path.dirname(notFoundHtml), { recursive: true, force: true });
const notFoundCheck = fs.readFileSync(publicNotFound, "utf8");
assertContains(notFoundCheck, ["העמוד לא נמצא", "noindex", "<h1"], "404.html");
console.log("prerendered 404.html");

const robots = fs.readFileSync(path.join(dist, "robots.txt"), "utf8");
if (robots.includes("<html") || looksLikeSpaShell(robots) || !robots.includes("Sitemap: https://www.allincenter.co.il/sitemap.xml")) {
  fail("dist/robots.txt is not a plain robots file");
}
for (const bot of [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Applebot",
]) {
  if (!robots.includes(bot)) fail(`robots.txt missing ${bot}`);
}
console.log("validated robots.txt");

const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
if (sitemap.includes("<html") || looksLikeSpaShell(sitemap) || !sitemap.includes("<urlset")) {
  fail("dist/sitemap.xml is not XML");
}
for (const loc of [
  "https://www.allincenter.co.il/",
  "https://www.allincenter.co.il/lp",
  "https://www.allincenter.co.il/pricing",
  "https://www.allincenter.co.il/ai",
  "https://www.allincenter.co.il/about",
  "https://www.allincenter.co.il/appointment-management",
  "https://www.allincenter.co.il/allincenter-pelecard",
]) {
  if (!sitemap.includes(`<loc>${loc}</loc>`)) fail(`sitemap.xml missing ${loc}`);
}
if (sitemap.includes("/pelecard</loc>") && !sitemap.includes("/allincenter-pelecard")) {
  fail("sitemap.xml unexpectedly lists /pelecard");
}
if (sitemap.includes("https://www.allincenter.co.il/pelecard</loc>")) {
  fail("sitemap.xml must not include /pelecard");
}
console.log("validated sitemap.xml");

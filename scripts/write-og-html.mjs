/**
 * After Vite build, emit /allincenter-pelecard/index.html with WhatsApp OG tags
 * so crawlers (WhatsApp/Facebook) see Pelecard branding instead of the homepage meta.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "../dist");
const indexPath = path.join(dist, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html missing — run vite build first");
  process.exit(1);
}

const title = "AllInCenter × פלאקארד | חבילת ניהול וסליקה לעסקים";
const description =
  "AllInCenter בשיתוף פלאקארד — מערכת ניהול תורים או אתר + באנדל סליקה מקצועי. חבילה אחת לניהול העסק ולתשלומים.";
const url = "https://www.allincenter.co.il/allincenter-pelecard";
const image = "https://www.allincenter.co.il/assets/og-allincenter-pelecard.png";

const ogBlock = `    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="he_IL" />
    <meta property="og:site_name" content="AllInCenter" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
`;

let html = fs.readFileSync(indexPath, "utf8");

html = html
  .replace(/<title>[^<]*<\/title>\s*/gi, "")
  .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
  .replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, "")
  .replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, "");

if (/<\/head>/i.test(html)) {
  html = html.replace(/<\/head>/i, `${ogBlock}\n  </head>`);
} else {
  html = ogBlock + html;
}

const outDir = path.join(dist, "allincenter-pelecard");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "index.html");
fs.writeFileSync(outPath, html, "utf8");

const check = fs.readFileSync(outPath, "utf8");
if (check.includes("Maya") || !check.includes("og-allincenter-pelecard.png") || !check.includes("פלאקארד")) {
  console.error("OG HTML validation failed");
  process.exit(1);
}

console.log("wrote dist/allincenter-pelecard/index.html");

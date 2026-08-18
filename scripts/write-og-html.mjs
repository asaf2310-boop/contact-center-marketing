/**
 * After Vite build, emit route-specific HTML with OG tags so crawlers
 * (WhatsApp/Facebook/LinkedIn) see the right title instead of homepage meta.
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

const baseHtml = fs.readFileSync(indexPath, "utf8");

function stripMeta(html) {
  return html
    .replace(/<title>[^<]*<\/title>\s*/gi, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, "");
}

function ogBlock({ title, description, url, image, twitterCard = "summary_large_image" }) {
  return `    <title>${title}</title>
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
    <meta name="twitter:card" content="${twitterCard}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
`;
}

function writePage({ dir, meta, validate }) {
  let html = stripMeta(baseHtml);
  const block = ogBlock(meta);
  if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `${block}\n  </head>`);
  } else {
    html = block + html;
  }

  const outDir = path.join(dist, dir);
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "index.html");
  fs.writeFileSync(outPath, html, "utf8");

  const check = fs.readFileSync(outPath, "utf8");
  validate(check, outPath);
  console.log(`wrote ${path.relative(dist, outPath)}`);
}

writePage({
  dir: "allincenter-pelecard",
  meta: {
    title: "AllInCenter × פלאקארד | חבילת ניהול וסליקה לעסקים",
    description:
      "AllInCenter בשיתוף פלאקארד — מערכת ניהול תורים או אתר + באנדל סליקה מקצועי. חבילה אחת לניהול העסק ולתשלומים.",
    url: "https://www.allincenter.co.il/allincenter-pelecard",
    image: "https://www.allincenter.co.il/assets/og-allincenter-pelecard.png",
  },
  validate(check) {
    if (check.includes("Maya") || !check.includes("og-allincenter-pelecard.png") || !check.includes("פלאקארד")) {
      console.error("OG HTML validation failed for /allincenter-pelecard");
      process.exit(1);
    }
  },
});

writePage({
  dir: "ai",
  meta: {
    title: "אסף אריאלי | AI & Automation Project Manager",
    description:
      "ייעוץ, ניהול והובלת פרויקטי AI ואוטומציה לחברות וארגונים — משלב זיהוי ההזדמנות והאפיון ועד לפיתוח והטמעה בפועל.",
    url: "https://www.allincenter.co.il/ai",
    image: "https://www.allincenter.co.il/assets/asaf-ariely.png",
    twitterCard: "summary",
  },
  validate(check) {
    if (
      !check.includes("אסף אריאלי") ||
      !check.includes("https://www.allincenter.co.il/ai") ||
      !check.includes("asaf-ariely.png") ||
      check.includes("og-allincenter-pelecard.png")
    ) {
      console.error("OG HTML validation failed for /ai");
      process.exit(1);
    }
  },
});

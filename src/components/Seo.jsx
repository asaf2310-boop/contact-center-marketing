import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "@/lib/site";
import { getRouteSeo } from "@/lib/seoConfig";

function upsertMeta(selector, attributes) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function Seo() {
  const { pathname } = useLocation();
  const seo = getRouteSeo(pathname);

  useEffect(() => {
    document.title = seo.title;
    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    if (seo.robots) {
      upsertMeta('meta[name="robots"]', { name: "robots", content: seo.robots });
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }
    if (seo.canonical) {
      upsertLink("canonical", seo.canonical);
      upsertMeta('meta[property="og:url"]', { property: "og:url", content: seo.canonical });
    }
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "he_IL" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE.name });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: seo.ogImage });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: seo.twitterCard || "summary" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: seo.ogImage });
    upsertJsonLd("allincenter-jsonld", seo.jsonLd);
  }, [pathname, seo]);

  return null;
}

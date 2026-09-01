import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App.jsx";

export { getRouteSeo, notFoundSeo, prerenderPaths } from "./lib/seoConfig.js";

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </React.StrictMode>,
  );
}


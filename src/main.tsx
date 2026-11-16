import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { I18nProvider } from "./i18n/I18nContext";
import { initAnalytics } from "./utils/analytics";
import { setInitialCrumbs, CRUMBS_SCRIPT_ID } from "./seo/initialCrumbs";

initAnalytics();

const container = document.getElementById("root")!;

// Breadcrumbs prerendered into this page (see src/seo/initialCrumbs.ts).
const crumbData = document.getElementById(CRUMBS_SCRIPT_ID)?.textContent;
if (crumbData) {
  try {
    setInitialCrumbs(window.location.pathname.replace(/\/+$/, "") || "/", JSON.parse(crumbData));
  } catch {
    // Ignore malformed data — breadcrumbs will load from the manifest.
  }
}
const app = (
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <App />
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>
);

// Production pages are prerendered (scripts/build.mjs) → hydrate the existing
// markup. The dev server serves an empty root → render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

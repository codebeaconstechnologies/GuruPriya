// Build-time prerendering entry (used by scripts/build.mjs via the SSR build).
// Renders the full page body for a URL, waiting for lazy route chunks, so
// every prerendered .html file contains the real headings, text, links and
// hero image — readable by crawlers without JavaScript. The browser then
// hydrates the same markup (src/main.tsx).

import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
// @ts-expect-error -- Node built-in (build-time only); @types/node is intentionally not a dependency.
import { Writable } from "node:stream";
import App from "./App";
import { I18nProvider } from "./i18n/I18nContext";
import { setInitialCrumbs, type Crumb } from "./seo/initialCrumbs";

export function render(url: string, crumbs: Crumb[] = []): Promise<string> {
  setInitialCrumbs(url, crumbs);
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk: { toString(): string }, _enc: string, cb: () => void) {
        html += chunk.toString();
        cb();
      },
      final(cb: () => void) {
        resolve(html);
        cb();
      }
    });
    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <I18nProvider>
            <App />
          </I18nProvider>
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady() {
          pipe(sink);
        },
        onShellError: reject,
        onError(err) {
          reject(err);
        }
      }
    );
  });
}

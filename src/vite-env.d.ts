/// <reference types="vite/client" />

/** Injected by vite.config.ts at build time. */
declare const __SITE_CONFIG__: {
  env: "production" | "development";
  url: string;
  gtmId: string;
  analyticsHost: string;
  buildDate: string;
};

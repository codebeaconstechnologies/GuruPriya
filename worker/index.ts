// Cloudflare Worker entry for deploying the site as a Worker (with Static
// Assets) instead of Cloudflare Pages. Serves the built site from ./dist and
// reuses the Pages Function for the enquiry API unchanged.
//
//   npm run build && npx wrangler deploy --config wrangler.staging.jsonc
//
// When NOINDEX = "true" (preview deployments on *.workers.dev), every
// response carries X-Robots-Tag: noindex so the copy never competes with
// www.gurupriyatours.com in search results.

import { onRequestPost } from "../functions/api/contact";

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  NOINDEX?: string;
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
  FROM_EMAIL: string;
}

interface Ctx {
  waitUntil: (promise: Promise<unknown>) => void;
}

function withHeaders(res: Response, env: Env): Response {
  if (env.NOINDEX !== "true") return res;
  const out = new Response(res.body, res);
  out.headers.set("X-Robots-Tag", "noindex, nofollow");
  return out;
}

export default {
  async fetch(request: Request, env: Env, ctx: Ctx): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return withHeaders(new Response(JSON.stringify({ error: "Method not allowed." }), { status: 405, headers: { "Content-Type": "application/json" } }), env);
      }
      const res = await onRequestPost({
        request,
        env,
        params: {},
        waitUntil: ctx.waitUntil.bind(ctx),
        next: () => env.ASSETS.fetch(request)
      });
      return withHeaders(res, env);
    }

    return withHeaders(await env.ASSETS.fetch(request), env);
  }
};

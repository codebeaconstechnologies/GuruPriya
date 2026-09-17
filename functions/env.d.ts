// Minimal ambient type for Cloudflare Pages Functions, avoiding a dependency
// on @cloudflare/workers-types (which would conflict with the DOM lib used
// by the Vite/React frontend in the same TypeScript project).

interface PagesFunctionContext<Env = unknown> {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}

type PagesFunction<Env = unknown> = (
  context: PagesFunctionContext<Env>
) => Response | Promise<Response>;

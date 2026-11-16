import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only in the browser (after hydration). Used for widgets
 * that touch `window` when their module loads (Leaflet maps), so prerendering
 * at build time never imports them. The fallback is what the prerendered HTML
 * shows.
 */
export function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}

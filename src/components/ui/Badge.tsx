import { type ReactNode } from "react";

export function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "red" | "dark" | "light" }) {
  const tones: Record<string, string> = {
    gold: "bg-gold/15 text-gold-dark border-gold/30",
    red: "bg-temple-red/10 text-temple-red border-temple-red/25",
    dark: "bg-charcoal text-white border-charcoal",
    light: "bg-white/90 text-charcoal border-white/60"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  );
}

import { useId, useState } from "react";
import { Plus } from "lucide-react";

/** Accessible accordion for FAQs and itineraries. */
export function FaqList({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="divide-y divide-navy-900/10 overflow-hidden rounded-3xl border border-navy-900/10 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3 className="!font-sans">
              <button
                type="button"
                id={`${base}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-semibold text-navy-900 transition hover:bg-navy-50/60"
              >
                {item.q}
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-800 transition ${isOpen ? "rotate-45 bg-saffron-600 text-white" : ""}`}>
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={`${base}-a${i}`}
              role="region"
              aria-labelledby={`${base}-q${i}`}
              className={`grid transition-all duration-300 ease-brand ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-navy-900/75">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

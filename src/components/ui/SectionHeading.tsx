import { type ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  action?: ReactNode;
  /** Use "h1" when this is the page's main heading. */
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center", light, action, as: Heading = "h2" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`mb-10 flex flex-col gap-6 sm:mb-14 ${centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <Reveal className={`flex max-w-3xl flex-col gap-3 ${centered ? "items-center" : "items-start"}`}>
        {eyebrow && (
          <span className={`eyebrow ${light ? "!text-sun-light" : ""}`}>
            <span className={`h-px w-6 ${light ? "bg-sun-light" : "bg-saffron-500"}`} />
            {eyebrow}
          </span>
        )}
        <Heading className={`font-display font-extrabold ${Heading === "h1" ? "text-display-lg" : "text-display-md"} ${light ? "!text-white" : "text-navy-900"}`}>
          {title}
        </Heading>
        {subtitle && <p className={`max-w-2xl text-base leading-relaxed sm:text-lg ${light ? "text-white/80" : "text-navy-900/70"}`}>{subtitle}</p>}
      </Reveal>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

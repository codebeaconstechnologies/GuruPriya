import { motion } from "framer-motion";
import { type ReactNode } from "react";

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
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "items-start text-left"} mb-10 sm:mb-14`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 items-inherit"
      >
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Heading className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight ${light ? "text-white" : "text-charcoal"}`}>
          {title}
        </Heading>
        {subtitle && (
          <p className={`max-w-2xl text-base sm:text-lg ${light ? "text-white/75" : "text-charcoal/65"}`}>
            {subtitle}
          </p>
        )}
      </motion.div>
      {action}
    </div>
  );
}

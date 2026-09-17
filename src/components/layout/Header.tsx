import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useScrolled } from "@/hooks/useScrollPosition";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { company } from "@/data/trips";

export function Header() {
  const { t } = useI18n();
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: t.nav.home },
    { to: "/yatras", label: t.nav.yatras },
    { to: "/coming-soon", label: t.nav.comingSoon },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact }
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ivory/90 shadow-card backdrop-blur-md" : "bg-ivory/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-px mx-auto flex max-w-7xl items-center justify-between py-3">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <span className="block h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-sm sm:h-[72px] sm:w-[72px]">
            <img
              src="/images/logo.png"
              alt={`${company.shortName.en} logo`}
              width={72}
              height={72}
              className="h-full w-full object-cover"
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-charcoal text-white" : "text-charcoal/75 hover:bg-charcoal/5 hover:text-charcoal"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Link to="/contact" className="btn-primary">
            {t.nav.enquireNow}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle compact />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-charcoal/10 bg-ivory lg:hidden">
          <nav className="container-px mx-auto flex max-w-7xl flex-col gap-1 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive ? "bg-charcoal text-white" : "text-charcoal/80 hover:bg-charcoal/5"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
              {t.nav.enquireNow}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

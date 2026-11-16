// Site navigation — single source for the desktop mega menu, the mobile
// accordion and the footer.
import S from "@/i18n/strings";
import { categories } from "@/data/catalog/categories";
import { destinations, regionLabels, type Region } from "@/data/catalog/destinations";
import { services } from "@/data/catalog/services";

export interface NavLink {
  label: { en: string; mr: string };
  to: string;
  note?: string;
}

export interface NavGroup {
  title?: { en: string; mr: string };
  links: NavLink[];
}

export interface NavItem {
  label: { en: string; mr: string };
  to: string;
  /** Columns shown in the dropdown / mega menu. */
  groups?: NavGroup[];
  mega?: boolean;
}

const regionOrder: Region[] = ["north", "south", "west", "east", "international"];

export const mainNav: NavItem[] = [
  { label: S.nav.home, to: "/" },
  {
    label: S.nav.about,
    to: "/about",
    groups: [
      {
        links: [
          { label: S.about.story, to: "/about#story" },
          { label: S.about.why, to: "/about#why" },
          { label: S.about.philosophy, to: "/about#philosophy" },
          { label: S.about.founder, to: "/about#founder" }
        ]
      }
    ]
  },
  {
    label: S.nav.tours,
    to: "/packages",
    mega: true,
    groups: [
      {
        title: { en: "Browse", mr: "पहा" },
        links: [
          { label: { en: "All Tour Packages", mr: "सर्व टूर पॅकेजेस" }, to: "/packages" },
          { label: { en: "Upcoming Yatras", mr: "आगामी यात्रा" }, to: "/upcoming-yatras" },
          ...categories.filter((c) => ["domestic", "international"].includes(c.slug)).map((c) => ({ label: c.name, to: `/tours/${c.slug}` }))
        ]
      },
      {
        title: { en: "Holiday styles", mr: "सहलींचे प्रकार" },
        links: categories
          .filter((c) => ["family", "group", "honeymoon", "pilgrimage", "adventure", "weekend-getaways"].includes(c.slug))
          .map((c) => ({ label: c.name, to: `/tours/${c.slug}` }))
      },
      {
        title: { en: "Special interest", mr: "विशेष सहली" },
        links: categories
          .filter((c) => ["customized", "senior-citizen", "educational", "corporate"].includes(c.slug))
          .map((c) => ({ label: c.name, to: `/tours/${c.slug}` }))
      }
    ]
  },
  {
    label: S.nav.destinations,
    to: "/destinations",
    mega: true,
    groups: regionOrder.map((r) => ({
      title: regionLabels[r],
      links: destinations
        .filter((d) => d.region === r)
        .slice(0, 6)
        .map((d) => ({ label: { en: d.name, mr: d.name }, to: `/destinations/${d.slug}` }))
    }))
  },
  {
    label: S.nav.services,
    to: "/services",
    groups: [{ links: services.map((s) => ({ label: s.name, to: `/services/${s.slug}` })) }]
  },
  { label: S.nav.gallery, to: "/gallery" },
  { label: S.nav.blog, to: "/blog" },
  { label: S.nav.contact, to: "/contact" }
];

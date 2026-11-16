import { useLocalized } from "@/i18n/I18nContext";
import { destinations, regionLabels, type Region } from "@/data/catalog/destinations";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DestinationCard } from "@/components/cards/Cards";
import { CtaBand } from "@/components/ui/CtaBand";

const ORDER: Region[] = ["north", "south", "west", "east", "international"];

export default function Destinations() {
  const pick = useLocalized();
  return (
    <>
      <PageHero
        image="switzerland-lauterbrunnen"
        imageAlt="The Swiss Alps"
        eyebrow="Destinations"
        title="Places we'd love to take you"
        subtitle="Destination guides for India and the world, with the best season, ideal duration, top attractions and travel tips, to help you choose your next journey."
        mood="ocean"
      >
        <nav aria-label="Regions" className="flex flex-wrap gap-2">
          {ORDER.map((r) => (
            <a key={r} href={`#${r}`} className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-navy-900">
              {pick(regionLabels[r])}
            </a>
          ))}
        </nav>
      </PageHero>

      {ORDER.map((r, i) => {
        const list = destinations.filter((d) => d.region === r);
        return (
          <section key={r} id={r} className={`section-py ${i % 2 ? "bg-white" : "bg-sand"}`}>
            <div className="container-site">
              <SectionHeading eyebrow={r === "international" ? "Abroad" : "India"} title={pick(regionLabels[r])} align="left" />
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {list.map((d) => (
                  <DestinationCard key={d.slug} d={d} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand title="Not sure where to go?" text="Tell us your month, budget and who's travelling, and we'll recommend the right destination." image="kerala-houseboat" ctaTo="/services/travel-consultation" ctaLabel="Get travel advice" />
    </>
  );
}

import { imageCredits, photo } from "@/utils/images";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Attribution for every photograph used on the site (CC BY / BY-SA etc.). */
export default function ImageCredits() {
  return (
    <section className="section-py bg-white">
      <div className="container-site max-w-5xl">
        <SectionHeading
          as="h1"
          align="left"
          title="Image credits"
          subtitle="Destination photographs on this website are from Wikimedia Commons and are used under the free licences shown below. We are grateful to the photographers. Images have been resized and compressed for the web."
        />
        <ul className="divide-y divide-navy-900/10 rounded-3xl border border-navy-900/10">
          {imageCredits.map((c) => (
            <li key={c.id} className="flex items-center gap-4 p-4">
              <img src={photo(c.id, 800)} alt="" loading="lazy" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 text-sm">
                <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className="block truncate font-semibold text-navy-900 hover:text-saffron-700">
                  {c.title.replace(/^File:/, "")}
                </a>
                <p className="text-navy-900/70">
                  {c.author} ·{" "}
                  {c.licenseUrl ? (
                    <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline">
                      {c.license}
                    </a>
                  ) : (
                    c.license
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

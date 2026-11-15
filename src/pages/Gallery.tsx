import { withWidth } from "@/utils/images";
import { useState } from "react";
import { X } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { trips } from "@/data/trips";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Gallery() {
  const { t } = useI18n();
  const pick = useLocalized();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const images = trips.flatMap((trip) => trip.gallery);

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading as="h1" title={t.galleryPage.title} subtitle={t.galleryPage.subtitle} />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox({ src: img.src, alt: pick(img.alt) })}
              aria-label={pick(img.alt)}
              className="group overflow-hidden rounded-2xl"
            >
              <img
                src={img.src}
                alt={pick(img.alt)}
                loading="lazy"
                className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-6"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={t.common.close}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <img src={withWidth(lightbox.src, 1920)} alt={lightbox.alt} className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
        </div>
      )}
    </section>
  );
}

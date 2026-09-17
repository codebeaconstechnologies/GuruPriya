import { useState } from "react";
import { X } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { featuredTrip } from "@/data/trips";
import { useSeo } from "@/utils/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Gallery() {
  const { t } = useI18n();
  const pick = useLocalized();
  const [lightbox, setLightbox] = useState<string | null>(null);

  useSeo({ title: `${t.galleryPage.title} | GuruPriya Tours & Travels`, description: t.galleryPage.subtitle });

  const images = featuredTrip.gallery;

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading title={t.galleryPage.title} subtitle={t.galleryPage.subtitle} />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightbox(img.src)}
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
          <img src={lightbox} alt="" className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
        </div>
      )}
    </section>
  );
}

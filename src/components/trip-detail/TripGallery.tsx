import { motion } from "framer-motion";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import type { Trip } from "@/data/trips";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TripGallery({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const pick = useLocalized();

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow="Gallery" title={t.trip.galleryTitle} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {trip.gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              className={`overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img
                src={img.src}
                alt={pick(img.alt)}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                style={{ aspectRatio: i === 0 ? "1 / 1" : "1 / 1" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

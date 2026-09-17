import { useI18n } from "@/i18n/I18nContext";
import { useSeo } from "@/utils/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Terms() {
  const { t, language } = useI18n();

  useSeo({ title: `${t.terms.title} | GuruPriya Tours & Travels`, description: t.terms.intro });

  const sectionsEn = [
    { title: "Registration & Advance Payment", body: "A seat on any yatra is confirmed only after the advance registration amount, as published for that yatra, has been received. The advance registration amount is strictly non-refundable." },
    { title: "Balance Payment", body: "The remaining package amount must be paid before the scheduled departure date, as communicated by our team." },
    { title: "Cancellations", body: "In addition to the non-refundable advance, cancellation terms for the balance amount will be communicated at the time of registration." },
    { title: "Itinerary Changes", body: "The published itinerary is a presentation structure based on the planned route. Timings, accommodation and specific arrangements may be adjusted for safety, weather, local conditions or authority guidelines." },
    { title: "Traveller Conduct", body: "Travellers are expected to follow group timings and instructions from the tour management for the comfort and safety of all pilgrims." },
    { title: "Liability", body: "GuruPriya Tours & Travels makes every effort to ensure a safe and comfortable journey but is not liable for delays, losses or circumstances beyond its reasonable control." }
  ];

  const sectionsMr = [
    { title: "नोंदणी व पूर्वनोंदणी रक्कम", body: "यात्रेसाठी संबंधित यात्रेकरिता जाहीर केलेली पूर्वनोंदणी रक्कम प्राप्त झाल्यानंतरच स्थान निश्चित मानले जाईल. पूर्वनोंदणी रक्कम पूर्णपणे नॉन-रिफंडेबल आहे." },
    { title: "उर्वरित रक्कम", body: "उर्वरित पॅकेज रक्कम आमच्या टीमने कळविलेल्या ठरलेल्या प्रस्थान तारखेपूर्वी भरणे आवश्यक आहे." },
    { title: "रद्दीकरण", body: "नॉन-रिफंडेबल पूर्वनोंदणी व्यतिरिक्त, उर्वरित रकमेसंदर्भातील रद्दीकरण अटी नोंदणीच्या वेळी कळविण्यात येतील." },
    { title: "प्रवासक्रमातील बदल", body: "प्रकाशित प्रवासक्रम हा नियोजित मार्गावर आधारित सादरीकरण रचना आहे. सुरक्षितता, हवामान, स्थानिक परिस्थिती किंवा प्रशासकीय सूचनांनुसार वेळापत्रक, निवास व इतर व्यवस्थेत बदल होऊ शकतो." },
    { title: "यात्रेकरूंचे वर्तन", body: "सर्व यात्रेकरूंनी समूहाचे वेळापत्रक व यात्रा व्यवस्थापनाच्या सूचनांचे पालन करणे अपेक्षित आहे." },
    { title: "जबाबदारी", body: "गुरुप्रिया टुर्स ॲण्ड ट्रॅव्हल्स सुरक्षित व आरामदायी प्रवासासाठी सर्वतोपरी प्रयत्न करते, मात्र आवाक्याबाहेरील विलंब, नुकसान किंवा परिस्थितीसाठी जबाबदार राहणार नाही." }
  ];

  const sections = language === "mr" ? sectionsMr : sectionsEn;

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-3xl">
        <SectionHeading align="left" title={t.terms.title} subtitle={t.terms.intro} />
        <div className="flex flex-col gap-6">
          {sections.map((s, i) => (
            <div key={i} className="card-premium p-6">
              <h2 className="mb-2 font-display text-base font-bold text-charcoal">{s.title}</h2>
              <p className="text-sm leading-relaxed text-charcoal/65">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

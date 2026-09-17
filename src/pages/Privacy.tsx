import { useI18n } from "@/i18n/I18nContext";
import { useSeo } from "@/utils/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Privacy() {
  const { t, language } = useI18n();

  useSeo({ title: `${t.privacy.title} | GuruPriya Tours & Travels`, description: t.privacy.intro });

  const sectionsEn = [
    { title: "Information We Collect", body: "When you submit an enquiry, we collect your name, mobile number, email address and any other details you choose to share, such as preferred yatra, number of travellers and travel dates." },
    { title: "How We Use Your Information", body: "Your information is used only to respond to your enquiry, share yatra details and, if you register, to coordinate your travel arrangements." },
    { title: "Data Sharing", body: "We do not sell your personal information. Details are shared only with our internal team and service providers directly involved in organising your journey." },
    { title: "Data Storage", body: "Enquiry details submitted through our website are sent directly to our team's email and are not stored in a public database." },
    { title: "Your Rights", body: "You may contact us at any time to request that your information be corrected or removed from our records." }
  ];

  const sectionsMr = [
    { title: "आम्ही गोळा करत असलेली माहिती", body: "आपण चौकशी सादर केल्यावर आम्ही आपले नाव, मोबाईल क्रमांक, ईमेल पत्ता आणि आपण दिलेली इतर माहिती (उदा. इच्छित यात्रा, प्रवाशांची संख्या, प्रवास तारीख) संकलित करतो." },
    { title: "माहितीचा वापर", body: "आपली माहिती केवळ आपल्या चौकशीला प्रतिसाद देण्यासाठी, यात्रेची माहिती कळवण्यासाठी आणि नोंदणी झाल्यास प्रवास व्यवस्थेच्या समन्वयासाठी वापरली जाते." },
    { title: "माहितीची देवाणघेवाण", body: "आम्ही आपली वैयक्तिक माहिती विकत नाही. ही माहिती केवळ आमच्या अंतर्गत टीम व यात्रा आयोजनाशी थेट संबंधित सेवा पुरवठादारांसोबत सामायिक केली जाते." },
    { title: "माहितीची साठवण", body: "वेबसाईटवरून सादर केलेली चौकशी थेट आमच्या टीमच्या ईमेलवर पाठवली जाते व ती कोणत्याही सार्वजनिक डेटाबेसमध्ये साठवली जात नाही." },
    { title: "आपले हक्क", body: "आपली माहिती दुरुस्त करण्यासाठी किंवा आमच्या नोंदीतून काढून टाकण्यासाठी आपण केव्हाही आमच्याशी संपर्क साधू शकता." }
  ];

  const sections = language === "mr" ? sectionsMr : sectionsEn;

  return (
    <section className="section-py bg-ivory">
      <div className="container-px mx-auto max-w-3xl">
        <SectionHeading align="left" title={t.privacy.title} subtitle={t.privacy.intro} />
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

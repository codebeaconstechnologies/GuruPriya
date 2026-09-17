import type { LocalizedText } from "./trips";

export interface FAQItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export const generalFaqs: FAQItem[] = [
  {
    id: "advance-registration",
    question: {
      en: "How do I register for a yatra?",
      mr: "यात्रेसाठी नोंदणी कशी करावी?"
    },
    answer: {
      en: "Contact us by phone, WhatsApp or the enquiry form. Your seat is confirmed after the non-refundable advance registration amount is paid.",
      mr: "फोन, व्हॉट्सॲप किंवा चौकशी फॉर्मद्वारे आमच्याशी संपर्क साधा. नॉन-रिफंडेबल पूर्वनोंदणी रक्कम भरल्यानंतर आपले स्थान निश्चित केले जाईल."
    }
  },
  {
    id: "refund-policy",
    question: {
      en: "Is the advance registration amount refundable?",
      mr: "पूर्वनोंदणी रक्कम परत मिळते का?"
    },
    answer: {
      en: "No. As stated in the package information, the advance registration amount is non-refundable.",
      mr: "नाही. पॅकेज माहितीनुसार पूर्वनोंदणी रक्कम नॉन-रिफंडेबल आहे."
    }
  },
  {
    id: "travel-mode-choice",
    question: {
      en: "Can I choose between railway, bus and flight travel?",
      mr: "रेल्वे, बस व विमान यापैकी प्रवासाचे साधन निवडता येते का?"
    },
    answer: {
      en: "Yes. Each travel mode has its own package price and duration, listed on the trip page.",
      mr: "होय. प्रत्येक प्रवास साधनाचा स्वतंत्र पॅकेज दर व कालावधी यात्रा पानावर नमूद आहे."
    }
  },
  {
    id: "operational-details",
    question: {
      en: "Where can I find hotel names and exact timings?",
      mr: "हॉटेलचे नाव व अचूक वेळापत्रक कोठे मिळेल?"
    },
    answer: {
      en: "Exact accommodation, meal and darshan timings will be shared with registered travellers as per the final operational schedule closer to departure.",
      mr: "निवास, भोजन व दर्शनाचे अचूक वेळापत्रक प्रस्थानापूर्वी नोंदणीकृत यात्रेकरूंना अंतिम कार्यप्रणालीनुसार कळविण्यात येईल."
    }
  }
];

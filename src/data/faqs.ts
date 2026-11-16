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
      en: "Where a yatra offers more than one travel mode, the options are listed on its trip page. Package details for each option are shared on call or WhatsApp.",
      mr: "ज्या यात्रेत एकापेक्षा जास्त प्रवास साधने उपलब्ध आहेत, ते पर्याय यात्रा पानावर नमूद आहेत. प्रत्येक पर्यायाची पॅकेज माहिती कॉल किंवा व्हॉट्सॲपवर दिली जाते."
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
  },
  {
    id: "office-location",
    question: {
      en: "Where is the GuruPriya Tours & Travels office?",
      mr: "गुरुप्रिया टुर्स ॲण्ड ट्रॅव्हल्सचे कार्यालय कोठे आहे?"
    },
    answer: {
      en: "Our office is in Latur, Maharashtra: Shri Swami Samarth Girls' Hostel, next to Ambika Temple, behind the Bus Stand. Please call before visiting so the right person is available.",
      mr: "आमचे कार्यालय लातूर, महाराष्ट्र येथे आहे — श्री स्वामी समर्थ मुलींचे वसतीगृह, अंबिका मंदिर शेजारी, बस स्टँडच्या पाठीमागे. भेट देण्यापूर्वी कृपया फोन करा."
    }
  },
  {
    id: "serve-other-cities",
    question: {
      en: "Do you plan trips for travellers from Pune, Solapur and nearby towns?",
      mr: "पुणे, सोलापूर व परिसरातील प्रवाशांसाठी आपण सहली आखता का?"
    },
    answer: {
      en: "Yes. We have contact numbers for Pune, Solapur, Naldurg, Renapur and Nalegaon (see the Contact page). Group yatras usually depart from Latur, and tailor-made holidays can start from your own city.",
      mr: "होय. पुणे, सोलापूर, नळदुर्ग, रेणापूर व नळेगाव येथील संपर्क क्रमांक संपर्क पानावर दिले आहेत. समूह यात्रा सहसा लातूरहून सुटतात, तर पसंतीनुसार सहली आपल्या शहरातून सुरू होऊ शकतात."
    }
  },
  {
    id: "beyond-pilgrimage",
    question: {
      en: "Do you only organise pilgrimages?",
      mr: "आपण फक्त तीर्थयात्राच आयोजित करता का?"
    },
    answer: {
      en: "No. Alongside our yatras we plan family holidays, honeymoons, weekend getaways, group and corporate trips, and international holidays to destinations such as Dubai, Thailand, Bali and Singapore.",
      mr: "नाही. यात्रांसोबतच आम्ही कौटुंबिक सहली, हनिमून, वीकेंड सहली, समूह व कॉर्पोरेट सहली तसेच दुबई, थायलंड, बाली, सिंगापूर यांसारख्या आंतरराष्ट्रीय सहलीही आखतो."
    }
  }
];

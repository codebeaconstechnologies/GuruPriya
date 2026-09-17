// src/data/trips.ts

import { commonsImage } from "@/utils/images";

export type Language = "en" | "mr";

export interface LocalizedText {
  en: string;
  mr: string;
}

export interface RoutePoint {
  id: string;
  name: LocalizedText;
  category:
    | "departure"
    | "temple"
    | "pilgrimage"
    | "city"
    | "village"
    | "confluence"
    | "route";

  description: LocalizedText;

  // Verified approximate coordinates for well-known public locations.
  lat?: number;
  lng?: number;

  imageQuery: string;
}

export interface TripPrice {
  mode: "railway" | "bus" | "flight";
  name: LocalizedText;
  amount: number;
  duration?: LocalizedText;
}

export interface TripFeature {
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface ItineraryDay {
  day: number;
  title: LocalizedText;
  locations: string[];
  description: LocalizedText;

  // Keep optional until the final operational schedule is confirmed.
  date?: string;
  overnight?: LocalizedText;
  meals?: string[];
  timings?: LocalizedText;
}

export interface Trip {
  id: string;
  slug: string;
  status: "featured" | "coming-soon";

  title: LocalizedText;
  subtitle: LocalizedText;
  badge: LocalizedText;

  duration: LocalizedText;

  startDate?: string;
  endDate?: string;

  departure: LocalizedText;

  heroImage: string;

  gallery: {
    src: string;
    alt: LocalizedText;
    searchQuery: string;
  }[];

  description: LocalizedText;

  highlights: LocalizedText[];

  features: TripFeature[];

  prices: TripPrice[];

  advanceRegistration: {
    mode: LocalizedText;
    amount: number;
    refundable: false;
  }[];

  inclusions: LocalizedText[];

  exclusions: LocalizedText[];

  routeSections: {
    id: string;
    title: LocalizedText;
    description: LocalizedText;
    stops: string[];
  }[];

  routePoints: RoutePoint[];

  itinerary: ItineraryDay[];

  organizer: {
    name: LocalizedText;
    title: LocalizedText;
    phones: string[];
  };

  contactNumbers: {
    location: LocalizedText;
    numbers: string[];
  }[];

  office: LocalizedText;

  seo: {
    title: LocalizedText;
    description: LocalizedText;
    keywords: string[];
  };
}


/* =========================================================
   COMPANY
========================================================= */

export const company = {

  name: {
    en: "GuruPriya Tours & Travels",
    mr: "गुरुप्रिया टुर्स ॲण्ड ट्रॅव्हल्स"
  },

  shortName: {
    en: "GuruPriya Travels",
    mr: "गुरुप्रिया ट्रॅव्हल्स"
  },

  tagline: {
    en: "Faith. Journey. Experience.",
    mr: "श्रद्धा • यात्रा • अनुभव"
  },

  heroTitle: {
    en: "Begin Your Journey With Faith",
    mr: "श्रद्धेने आपल्या यात्रेचा शुभारंभ करा"
  },

  heroSubtitle: {
    en:
      "Thoughtfully planned pilgrimage journeys across India's sacred destinations.",
    mr:
      "भारताच्या पवित्र तीर्थक्षेत्रांची नियोजनबद्ध आणि आध्यात्मिक यात्रा."
  },

  description: {
    en:
      "GuruPriya Tours & Travels is a pilgrimage-focused travel initiative created to provide meaningful, comfortable and thoughtfully planned spiritual journeys.",
    mr:
      "गुरुप्रिया टुर्स ॲण्ड ट्रॅव्हल्स हा श्रद्धाळूंना अर्थपूर्ण, आरामदायी आणि नियोजनबद्ध आध्यात्मिक यात्रेचा अनुभव देण्याच्या उद्देशाने सुरू करण्यात आलेला तीर्थयात्रा-केंद्रित उपक्रम आहे."
  },

  founder: {
    name: {
      en: "Shri. Guruprasad Hundekar",
      mr: "श्री. गुरुप्रसाद हुंडेकर"
    },

    title: {
      en: "Founder & Chief Coordinator",
      mr: "संस्थापक व मुख्य संयोजक"
    },

    phones: [
      "9730699805",
      "7498132640"
    ]
  },

  office: {
    en:
      "GuruPriya Tours & Travels, Shri Swami Samarth Girls' Hostel, next to Ambika Temple, behind the Bus Stand, Latur, Maharashtra.",
    mr:
      "गुरुप्रिया टुर्स ॲण्ड ट्रॅव्हल्स, श्री स्वामी समर्थ मुलींचे वसतीगृह, अंबिका मंदिर शेजारी, बस स्टँडच्या पाठीमागे, लातूर, महाराष्ट्र."
  },

  contacts: [
    {
      location: {
        en: "Latur",
        mr: "लातूर"
      },
      numbers: [
        "8390978841",
        "8446802033"
      ]
    },

    {
      location: {
        en: "Pune",
        mr: "पुणे"
      },
      numbers: [
        "8605234948"
      ]
    },

    {
      location: {
        en: "Solapur",
        mr: "सोलापूर"
      },
      numbers: [
        "9359870818"
      ]
    },

    {
      location: {
        en: "Naldurg",
        mr: "नळदुर्ग"
      },
      numbers: [
        "7972496323",
        "9529436959"
      ]
    },

    {
      location: {
        en: "Renapur",
        mr: "रेणापूर"
      },
      numbers: [
        "9922550165"
      ]
    },

    {
      location: {
        en: "Nalegaon",
        mr: "नळेगाव"
      },
      numbers: [
        "9049575509"
      ]
    }
  ],

  whatsapp: "917498132640"
};


/* =========================================================
   FOUNDER STORY
========================================================= */

export const founderStory = {

  title: {
    en: "A New Beginning. A New Spiritual Journey.",
    mr: "एक नवीन पर्व... एक नवीन सुरुवात...!"
  },

  introduction: {
    en:
      "After 12 years of continuous travel, study and first-hand experience across Uttarakhand, along with journeys through various pilgrimage destinations across India, Shri. Guruprasad Hundekar is beginning a new venture in the travel sector through GuruPriya Travels.",
    mr:
      "उत्तराखंडातील गेल्या १२ वर्षांच्या सातत्यपूर्ण प्रवास, अभ्यास आणि प्रत्यक्ष अनुभवाच्या आधारावर, तसेच देशभरातील विविध तीर्थक्षेत्रांच्या भ्रमंतीतून मिळालेल्या अनुभवाच्या बळावर, श्री. गुरुप्रसाद हुंडेकर 'गुरुप्रिया ट्रॅव्हल्स' या नव्या उपक्रमाद्वारे पर्यटन क्षेत्रात व्यवसाय म्हणून पदार्पण करीत आहेत."
  },

  story: {
    en:
      "Over the years, he has had the opportunity to study and personally visit many ancient, remote and sacred temples of Devbhoomi Uttarakhand. These experiences created a strong belief that pilgrims deserve more than just darshan. Every sacred destination has a history, spiritual significance and cultural heritage that deserves to be experienced.",
    mr:
      "आजवर देवभूमी उत्तराखंडातील अनेक प्राचीन, दुर्गम आणि पवित्र देवस्थानांचा अभ्यास करून, प्रत्यक्ष दर्शन घेण्याचे भाग्य लाभले. त्या अनुभवातून एक गोष्ट प्रकर्षाने जाणवली — श्रद्धाळूंना केवळ दर्शन नव्हे, तर त्या प्रत्येक तीर्थक्षेत्राचा इतिहास, आध्यात्मिक महत्त्व आणि सांस्कृतिक वारसा यांचाही अनुभव मिळायला हवा."
  },

  mission: {
    en:
      "GuruPriya Travels aims to combine pilgrimage with knowledge, comfort, spiritual guidance and thoughtful planning.",
    mr:
      "दर्शनासोबत तीर्थक्षेत्राचे ज्ञान, आरामदायी प्रवास, आध्यात्मिक मार्गदर्शन आणि नियोजनबद्ध व्यवस्था यांचा सुंदर संगम घडविणे हे गुरुप्रिया ट्रॅव्हल्सचे उद्दिष्ट आहे."
  },

  founderMessage: {
    en:
      "Your love, trust and blessings are my greatest strength. I sincerely invite you to become a part of this new journey.",
    mr:
      "आपल्या सर्वांचे प्रेम, विश्वास आणि आशीर्वाद हेच माझे सर्वात मोठे बळ आहे. या नव्या प्रवासात आपणही सहभागी व्हावे, ही मनापासून विनंती."
  }
};


/* =========================================================
   FIRST / FEATURED YATRA
========================================================= */

export const featuredTrip: Trip = {

  id: "uttarakhand-char-dham-2026",

  slug:
    "premium-uttarakhand-char-dham-ancient-devasthan-darshan-yatra-2026",

  status: "featured",

  title: {
    en:
      "Premium Uttarakhand Char Dham & Ancient Devasthan Darshan Yatra 2026",

    mr:
      "प्रीमियम उत्तराखंड चारधाम व प्राचीन देवस्थान दर्शन यात्रा २०२६"
  },

  subtitle: {
    en:
      "An unforgettable spiritual journey through Char Dham, ancient temples, sacred confluences and India's historic pilgrimage destinations.",

    mr:
      "चारधाम, प्राचीन देवस्थाने, पवित्र प्रयाग आणि भारतातील ऐतिहासिक तीर्थक्षेत्रांच्या दर्शनाची अविस्मरणीय आध्यात्मिक यात्रा."
  },

  badge: {
    en: "Our First Spiritual Yatra",
    mr: "आमची पहिली आध्यात्मिक यात्रा"
  },

  duration: {
    en: "18 Days",
    mr: "१८ दिवस"
  },

  startDate: "2026-10-21",

  endDate: "2026-11-07",

  departure: {
    en: "Latur, Maharashtra",
    mr: "लातूर, महाराष्ट्र"
  },

  heroImage: commonsImage("Kedarnath Temple in Rainy season.jpg", 2000),

  gallery: [
    {
      src: commonsImage("Kedarnath Temple in Rainy season.jpg"),
      alt: { en: "Kedarnath Temple", mr: "केदारनाथ मंदिर" },
      searchQuery: "Kedarnath Temple Uttarakhand Himalayas"
    },
    {
      src: commonsImage("Badrinath Temple , Uttarakhand.jpg"),
      alt: { en: "Badrinath Temple", mr: "बद्रीनाथ मंदिर" },
      searchQuery: "Badrinath Temple Uttarakhand"
    },
    {
      src: commonsImage("Yamunotri temple and ashram.jpg"),
      alt: { en: "Yamunotri Dham", mr: "यमुनोत्री धाम" },
      searchQuery: "Yamunotri Temple Uttarakhand"
    },
    {
      src: commonsImage("Gangotri (ganga river).jpg"),
      alt: { en: "Gangotri Dham", mr: "गंगोत्री धाम" },
      searchQuery: "Gangotri Temple Uttarakhand"
    },
    {
      src: commonsImage("Tungnath temple.jpg"),
      alt: { en: "Tungnath Temple trail", mr: "तुंगनाथ मंदिर मार्ग" },
      searchQuery: "Tungnath Temple Uttarakhand"
    },
    {
      src: commonsImage("Mana Village, Badrinath, Uttarakhand, India.jpeg"),
      alt: { en: "Mana Village", mr: "माणा गाव" },
      searchQuery: "Mana Village Badrinath Uttarakhand"
    },
    {
      src: commonsImage("Lakshman Jhula Hanging Bridge, Rishikesh, India.jpg"),
      alt: { en: "Rishikesh Ganga Ghats", mr: "ऋषिकेश गंगा घाट" },
      searchQuery: "Rishikesh Ganga Ghats"
    },
    {
      src: commonsImage("Shri Ram Janambhoomi Mandir, Ayodhya Dham.jpg"),
      alt: { en: "Ayodhya", mr: "अयोध्या" },
      searchQuery: "Ayodhya Ram Mandir"
    }
  ],

  description: {
    en:
      "Beginning from Latur on 21 October 2026, this 18-day pilgrimage journey covers ancient temples and important spiritual destinations across Maharashtra, Madhya Pradesh, Uttar Pradesh and Uttarakhand. The journey includes Uttarakhand Char Dham along with Tungnath, Mana Village, Jyotirmath, Panch Prayag, Rishikesh, Ayodhya, Prayagraj, Kashi, Maihar, Ramtek and Mahur.",

    mr:
      "दि. २१ ऑक्टोबर २०२६ रोजी लातूर येथून सुरू होणाऱ्या या १८ दिवसांच्या यात्रेत महाराष्ट्र, मध्य प्रदेश, उत्तर प्रदेश आणि उत्तराखंडमधील विविध प्राचीन देवस्थाने व महत्त्वाची तीर्थक्षेत्रे समाविष्ट आहेत. उत्तराखंड चारधामासोबत तुंगनाथ, माणा गाव, ज्योतिर्मठ, पंचप्रयाग, ऋषिकेश, अयोध्या, प्रयागराज, काशी, मैहर, रामटेक आणि माहूर यांचा यात्रेत समावेश आहे."
  },

  highlights: [
    { en: "Uttarakhand Char Dham Darshan", mr: "उत्तराखंड चारधाम दर्शन" },
    { en: "Ghrishneshwar & Omkareshwar", mr: "घृष्णेश्वर व ओंकारेश्वर" },
    { en: "Mahakal • Ujjain", mr: "महाकाल • उज्जैन" },
    { en: "Mathura & Vrindavan", mr: "मथुरा व वृंदावन" },
    { en: "Tungnath & Mana Village", mr: "तुंगनाथ व माणा गाव" },
    { en: "Panch Prayag", mr: "पंचप्रयाग दर्शन" },
    { en: "Ayodhya • Prayagraj • Kashi", mr: "अयोध्या • प्रयागराज • काशी" },
    { en: "Maihar • Ramtek • Mahur", mr: "मैहर • रामटेक • माहूर" }
  ],


  /* =======================================================
     SPECIAL FEATURES
  ======================================================= */

  features: [

    {
      icon: "doctor",
      title: { en: "Doctor Throughout the Journey", mr: "संपूर्ण प्रवासात डॉक्टर सुविधा" },
      description: {
        en: "Doctor assistance will be available throughout the journey.",
        mr: "संपूर्ण यात्रेत डॉक्टरची सुविधा सोबत उपलब्ध असेल."
      }
    },
    {
      icon: "rudraksha",
      title: { en: "108 Natural Two-Faced Rudraksha", mr: "१०८ शुद्ध नैसर्गिक द्विमुखी रुद्राक्ष भेट" },
      description: {
        en: "Every participating devotee will receive a natural two-faced Rudraksha offering as specified in the trip information.",
        mr: "प्रत्येक सहभागी भक्ताला यात्रेच्या माहितीनुसार शुद्ध नैसर्गिक द्विमुखी रुद्राक्ष भेट देण्यात येईल."
      }
    },
    {
      icon: "spiritual",
      title: { en: "Spiritual Guidance", mr: "आध्यात्मिक मार्गदर्शन" },
      description: {
        en: "Bhagwatacharya Shri. Amol Maharaj Nalegaonkar will provide pilgrimage significance stories and spiritual guidance throughout the journey.",
        mr: "भागवताचार्य श्री. अमोल महाराज नळेगावकर यांचे संपूर्ण यात्रेत तीर्थ महात्म्य कथा व आध्यात्मिक मार्गदर्शन लाभेल."
      }
    },
    {
      icon: "hotel",
      title: { en: "Comfortable Accommodation", mr: "उत्तम निवास व्यवस्था" },
      description: {
        en: "Accommodation arrangements are included as specified in the package.",
        mr: "पॅकेजमध्ये नियोजित निवास व्यवस्थेचा समावेश आहे."
      }
    },
    {
      icon: "food",
      title: { en: "Tea, Breakfast & Pure Vegetarian Meals", mr: "चहा, नाश्ता व शुद्ध शाकाहारी भोजन" },
      description: {
        en: "Tea, breakfast and pure vegetarian meals are included.",
        mr: "चहा, नाश्ता व शुद्ध रुचकर शाकाहारी भोजनाचा समावेश आहे."
      }
    },
    {
      icon: "transparent",
      title: { en: "No Hidden Charges", mr: "कोणतेही छुपे खर्च नाहीत" },
      description: {
        en: "The published package states that there are no hidden charges.",
        mr: "प्रकाशित पॅकेजमध्ये कोणतेही छुपे खर्च नसल्याचे नमूद केले आहे."
      }
    }
  ],


  /* =======================================================
     PACKAGE PRICES
  ======================================================= */

  prices: [
    { mode: "railway", name: { en: "Railway Travel", mr: "रेल्वे प्रवास" }, amount: 45000 },
    {
      mode: "bus",
      name: { en: "Travels / Bus", mr: "ट्रॅव्हल्स / बस" },
      amount: 51000,
      duration: { en: "18 Days", mr: "१८ दिवस" }
    },
    {
      mode: "flight",
      name: { en: "Flight", mr: "विमान प्रवास" },
      amount: 65000,
      duration: { en: "10 Days", mr: "१० दिवस" }
    }
  ],


  /* =======================================================
     ADVANCE REGISTRATION
  ======================================================= */

  advanceRegistration: [
    { mode: { en: "Railway & Travels", mr: "रेल्वे व ट्रॅव्हल्स" }, amount: 11000, refundable: false },
    { mode: { en: "Flight", mr: "विमान प्रवास" }, amount: 25000, refundable: false }
  ],


  /* =======================================================
     INCLUSIONS
  ======================================================= */

  inclusions: [
    { en: "Travel according to selected package", mr: "निवडलेल्या पॅकेजनुसार प्रवास" },
    { en: "Accommodation", mr: "निवास व्यवस्था" },
    { en: "Tea and breakfast", mr: "चहा व नाश्ता" },
    { en: "Pure vegetarian meals", mr: "शुद्ध शाकाहारी भोजन" },
    { en: "Doctor assistance throughout the journey", mr: "संपूर्ण प्रवासात डॉक्टर सुविधा" },
    { en: "Spiritual guidance", mr: "आध्यात्मिक मार्गदर्शन" },
    { en: "Pilgrimage significance / spiritual sessions", mr: "तीर्थ महात्म्य कथा व आध्यात्मिक मार्गदर्शन" },
    { en: "108 natural two-faced Rudraksha", mr: "१०८ शुद्ध नैसर्गिक द्विमुखी रुद्राक्ष" }
  ],


  /* =======================================================
     EXCLUSIONS
  ======================================================= */

  exclusions: [
    {
      en: "Personal expenses not specifically included in the package.",
      mr: "पॅकेजमध्ये स्पष्टपणे समाविष्ट नसलेले वैयक्तिक खर्च."
    },
    {
      en: "Additional services or expenses not mentioned in the package.",
      mr: "पॅकेजमध्ये नमूद नसलेल्या अतिरिक्त सेवा किंवा खर्च."
    }
  ],


  /* =======================================================
     ROUTE
  ======================================================= */

  routeSections: [
    {
      id: "route-1",
      title: { en: "Route 1 • Journey Towards Uttarakhand", mr: "मार्ग १ • उत्तराखंडकडे प्रस्थान" },
      description: {
        en: "The journey begins from Latur and proceeds through major pilgrimage destinations towards Haridwar.",
        mr: "लातूर येथून यात्रेचा शुभारंभ करून प्रमुख तीर्थक्षेत्रांमधून हरिद्वारकडे प्रस्थान."
      },
      stops: ["latur", "omkareshwar", "ujjain", "mathura", "vrindavan", "haridwar"]
    },
    {
      id: "route-2",
      title: {
        en: "Route 2 • Uttarakhand Char Dham + Tungnath + Panch Prayag",
        mr: "मार्ग २ • उत्तराखंड चारधाम + तुंगनाथ + पंचप्रयाग"
      },
      description: {
        en: "The Himalayan section covers Char Dham along with Tungnath, Mana Village, Jyotirmath and the Panch Prayag region.",
        mr: "हिमालयीन टप्प्यात चारधामासोबत तुंगनाथ, माणा गाव, ज्योतिर्मठ व पंचप्रयाग क्षेत्राचा समावेश आहे."
      },
      stops: [
        "haridwar", "barkot", "yamunotri", "uttarkashi", "gangotri", "srinagar",
        "rudraprayag", "guptakashi", "kedarnath", "gaurikund", "ukhimath", "chopta",
        "tungnath", "gopeshwar", "chamoli", "karnaprayag", "nandprayag", "vishnuprayag",
        "badrinath", "mana", "jyotirmath", "devprayag", "rishikesh", "haridwar"
      ]
    },
    {
      id: "route-3",
      title: { en: "Route 3 • Return Pilgrimage Route", mr: "मार्ग ३ • परतीचा तीर्थयात्रा मार्ग" },
      description: {
        en: "The return journey continues through Ayodhya, Prayagraj, Chitrakoot, Kashi, Maihar, Ramtek and Mahur before returning to Latur.",
        mr: "परतीच्या प्रवासात अयोध्या, प्रयागराज, चित्रकूट, काशी, मैहर, रामटेक व माहूर मार्गे लातूरला परत."
      },
      stops: ["ayodhya", "prayagraj", "chitrakoot", "kashi", "maihar", "ramtek", "mahur", "latur"]
    }
  ],


  /* =======================================================
     ROUTE POINTS
     Coordinates are verified real-world approximate values
     for these well-known public locations.
  ======================================================= */

  routePoints: [
    { id: "latur", name: { en: "Latur", mr: "लातूर" }, category: "departure",
      description: { en: "Starting point and final return point of the pilgrimage.", mr: "यात्रेचा प्रारंभ व अंतिम परतीचा बिंदू." },
      lat: 18.4088, lng: 76.5604, imageQuery: "Latur Maharashtra" },

    { id: "ghrishneshwar", name: { en: "Ghrishneshwar", mr: "घृष्णेश्वर" }, category: "temple",
      description: { en: "Ancient pilgrimage destination included in the journey plan.", mr: "यात्रेच्या नियोजनात समाविष्ट असलेले प्राचीन तीर्थक्षेत्र." },
      lat: 20.0231, lng: 75.1783, imageQuery: "Grishneshwar Jyotirlinga Temple Ellora" },

    { id: "omkareshwar", name: { en: "Omkareshwar", mr: "ओंकारेश्वर" }, category: "temple",
      description: { en: "Important pilgrimage destination on the Narmada.", mr: "नर्मदा नदीकाठी वसलेले प्रमुख तीर्थक्षेत्र." },
      lat: 22.2411, lng: 76.1517, imageQuery: "Omkareshwar Temple Madhya Pradesh" },

    { id: "ujjain", name: { en: "Mahakal • Ujjain", mr: "महाकाल • उज्जैन" }, category: "temple",
      description: { en: "Home of the revered Mahakaleshwar pilgrimage destination.", mr: "प्रसिद्ध महाकालेश्वर तीर्थक्षेत्र." },
      lat: 23.1828, lng: 75.7681, imageQuery: "Mahakaleshwar Temple Ujjain" },

    { id: "mathura", name: { en: "Mathura", mr: "मथुरा" }, category: "pilgrimage",
      description: { en: "Major Krishna pilgrimage destination.", mr: "भगवान श्रीकृष्णाशी संबंधित प्रमुख तीर्थक्षेत्र." },
      lat: 27.4924, lng: 77.6737, imageQuery: "Mathura Krishna Temple" },

    { id: "vrindavan", name: { en: "Vrindavan", mr: "वृंदावन" }, category: "pilgrimage",
      description: { en: "Sacred destination associated with Krishna-Bhakti tradition.", mr: "श्रीकृष्ण भक्तीपरंपरेतील पवित्र तीर्थक्षेत्र." },
      lat: 27.5806, lng: 77.7006, imageQuery: "Vrindavan temple India" },

    { id: "haridwar", name: { en: "Haridwar", mr: "हरिद्वार" }, category: "pilgrimage",
      description: { en: "Sacred Ganga destination and gateway to the Himalayan pilgrimage circuit.", mr: "पवित्र गंगातीर आणि हिमालयीन तीर्थयात्रेचे प्रवेशद्वार." },
      lat: 29.9457, lng: 78.1642, imageQuery: "Haridwar Ganga Ghat" },

    { id: "barkot", name: { en: "Barkot", mr: "बारकोट" }, category: "route",
      description: { en: "Mountain route point on the way to Yamunotri.", mr: "यमुनोत्री मार्गावरील पर्वतीय मार्गबिंदू." },
      lat: 30.8167, lng: 78.2333, imageQuery: "Barkot Uttarakhand" },

    { id: "yamunotri", name: { en: "Yamunotri Dham", mr: "यमुनोत्री धाम" }, category: "temple",
      description: { en: "One of Uttarakhand's Char Dham pilgrimage destinations.", mr: "उत्तराखंडातील चारधाम यात्रेतील प्रमुख धाम." },
      lat: 31.0106, lng: 78.4506, imageQuery: "Yamunotri Temple Uttarakhand" },

    { id: "uttarkashi", name: { en: "Uttarkashi", mr: "उत्तरकाशी" }, category: "route",
      description: { en: "Important Himalayan pilgrimage town on the Gangotri route.", mr: "गंगोत्री मार्गावरील महत्त्वाचे हिमालयीन तीर्थक्षेत्र." },
      lat: 30.7268, lng: 78.4354, imageQuery: "Uttarkashi Uttarakhand" },

    { id: "gangotri", name: { en: "Gangotri Dham", mr: "गंगोत्री धाम" }, category: "temple",
      description: { en: "One of Uttarakhand's Char Dham pilgrimage destinations.", mr: "उत्तराखंडातील चारधाम यात्रेतील प्रमुख धाम." },
      lat: 30.9946, lng: 78.9398, imageQuery: "Gangotri Temple Uttarakhand" },

    { id: "srinagar", name: { en: "Srinagar", mr: "श्रीनगर" }, category: "route",
      description: { en: "A route town in the Garhwal Himalayan region.", mr: "गढवाल हिमालयातील यात्रेतील मार्गबिंदू." },
      lat: 30.2270, lng: 78.7846, imageQuery: "Srinagar Garhwal Uttarakhand" },

    { id: "rudraprayag", name: { en: "Rudraprayag", mr: "रुद्रप्रयाग" }, category: "confluence",
      description: { en: "Sacred confluence destination in Uttarakhand.", mr: "उत्तराखंडातील पवित्र प्रयाग क्षेत्र." },
      lat: 30.2849, lng: 78.9812, imageQuery: "Rudraprayag confluence" },

    { id: "guptakashi", name: { en: "Guptakashi", mr: "गुप्तकाशी" }, category: "route",
      description: { en: "Important pilgrimage route town for the Kedarnath region.", mr: "केदारनाथ यात्रेच्या मार्गावरील महत्त्वाचे तीर्थक्षेत्र." },
      lat: 30.5292, lng: 79.0692, imageQuery: "Guptakashi Uttarakhand" },

    { id: "kedarnath", name: { en: "Kedarnath Dham", mr: "केदारनाथ धाम" }, category: "temple",
      description: { en: "Major Himalayan pilgrimage destination.", mr: "प्रमुख हिमालयीन तीर्थक्षेत्र." },
      lat: 30.7346, lng: 79.0669, imageQuery: "Kedarnath Temple Himalayas" },

    { id: "gaurikund", name: { en: "Gaurikund", mr: "गौरीकुंड" }, category: "route",
      description: { en: "Important access point on the Kedarnath pilgrimage route.", mr: "केदारनाथ यात्रेच्या मार्गावरील महत्त्वाचा प्रवेशबिंदू." },
      lat: 30.6910, lng: 79.0166, imageQuery: "Gaurikund Uttarakhand" },

    { id: "ukhimath", name: { en: "Ukhimath", mr: "उखीमठ" }, category: "pilgrimage",
      description: { en: "Historic Himalayan pilgrimage destination.", mr: "ऐतिहासिक हिमालयीन तीर्थक्षेत्र." },
      lat: 30.5333, lng: 79.0667, imageQuery: "Ukhimath temple Uttarakhand" },

    { id: "chopta", name: { en: "Chopta", mr: "चोपता" }, category: "route",
      description: { en: "Scenic Himalayan region associated with the Tungnath route.", mr: "तुंगनाथ मार्गावरील निसर्गरम्य हिमालयीन परिसर." },
      lat: 30.4167, lng: 79.1833, imageQuery: "Chopta Uttarakhand Himalayas" },

    { id: "tungnath", name: { en: "Tungnath", mr: "तुंगनाथ" }, category: "temple",
      description: { en: "Ancient Himalayan Shiva temple included in the journey.", mr: "यात्रेत समाविष्ट असलेले प्राचीन हिमालयीन शिवतीर्थ." },
      lat: 30.4886, lng: 79.2166, imageQuery: "Tungnath Temple Uttarakhand" },

    { id: "gopeshwar", name: { en: "Gopeshwar", mr: "गोपेश्वर" }, category: "pilgrimage",
      description: { en: "Historic pilgrimage destination in the Chamoli region.", mr: "चमोली परिसरातील ऐतिहासिक तीर्थक्षेत्र." },
      lat: 30.3901, lng: 79.3412, imageQuery: "Gopeshwar temple Uttarakhand" },

    { id: "chamoli", name: { en: "Chamoli", mr: "चमोली" }, category: "route",
      description: { en: "Himalayan region on the pilgrimage route.", mr: "यात्रेतील हिमालयीन मार्गप्रदेश." },
      lat: 30.4038, lng: 79.3212, imageQuery: "Chamoli Uttarakhand" },

    { id: "karnaprayag", name: { en: "Karnaprayag", mr: "कर्णप्रयाग" }, category: "confluence",
      description: { en: "Sacred confluence destination.", mr: "पवित्र प्रयाग क्षेत्र." },
      lat: 30.2653, lng: 79.2154, imageQuery: "Karnaprayag Uttarakhand" },

    { id: "nandprayag", name: { en: "Nandprayag", mr: "नंदप्रयाग" }, category: "confluence",
      description: { en: "Sacred confluence on the Himalayan pilgrimage route.", mr: "हिमालयीन तीर्थमार्गावरील पवित्र प्रयाग." },
      lat: 30.3167, lng: 79.3167, imageQuery: "Nandprayag Uttarakhand" },

    { id: "vishnuprayag", name: { en: "Vishnuprayag", mr: "विष्णुप्रयाग" }, category: "confluence",
      description: { en: "Sacred confluence in the Alaknanda region.", mr: "अलकनंदा परिसरातील पवित्र प्रयाग." },
      lat: 30.5667, lng: 79.5667, imageQuery: "Vishnuprayag Uttarakhand" },

    { id: "badrinath", name: { en: "Badrinath Dham", mr: "बद्रीनाथ धाम" }, category: "temple",
      description: { en: "One of Uttarakhand's Char Dham pilgrimage destinations.", mr: "उत्तराखंडातील चारधाम यात्रेतील प्रमुख धाम." },
      lat: 30.7433, lng: 79.4938, imageQuery: "Badrinath Temple Uttarakhand" },

    { id: "mana", name: { en: "Mana Village", mr: "माणा गाव" }, category: "village",
      description: { en: "High-altitude Himalayan village near Badrinath.", mr: "बद्रीनाथजवळील उंचावरील हिमालयीन गाव." },
      lat: 30.7638, lng: 79.4694, imageQuery: "Mana Village Badrinath" },

    { id: "jyotirmath", name: { en: "Jyotirmath (Joshimath)", mr: "ज्योतिर्मठ (जोशीमठ)" }, category: "pilgrimage",
      description: { en: "Important spiritual centre in the Himalayan pilgrimage circuit.", mr: "हिमालयीन तीर्थयात्रेतील महत्त्वाचे आध्यात्मिक केंद्र." },
      lat: 30.5551, lng: 79.5643, imageQuery: "Jyotirmath Joshimath Uttarakhand" },

    { id: "devprayag", name: { en: "Devprayag", mr: "देवप्रयाग" }, category: "confluence",
      description: { en: "Sacred confluence destination on the return towards Rishikesh.", mr: "ऋषिकेशकडे परतीच्या मार्गावरील पवित्र प्रयाग." },
      lat: 30.1462, lng: 78.5993, imageQuery: "Devprayag confluence Uttarakhand" },

    { id: "rishikesh", name: { en: "Rishikesh", mr: "ऋषिकेश" }, category: "pilgrimage",
      description: { en: "Spiritual destination on the banks of the Ganga.", mr: "गंगातीरावरील प्रसिद्ध आध्यात्मिक नगरी." },
      lat: 30.0869, lng: 78.2676, imageQuery: "Rishikesh Ganga Ghats" },

    { id: "ayodhya", name: { en: "Ayodhya", mr: "अयोध्या" }, category: "pilgrimage",
      description: { en: "Major pilgrimage destination on the return route.", mr: "परतीच्या मार्गावरील प्रमुख तीर्थक्षेत्र." },
      lat: 26.7922, lng: 82.1998, imageQuery: "Ayodhya Ram Mandir" },

    { id: "prayagraj", name: { en: "Prayagraj", mr: "प्रयागराज" }, category: "confluence",
      description: { en: "Sacred confluence and major pilgrimage destination.", mr: "पवित्र संगम व प्रमुख तीर्थक्षेत्र." },
      lat: 25.4358, lng: 81.8463, imageQuery: "Triveni Sangam Prayagraj" },

    { id: "chitrakoot", name: { en: "Chitrakoot", mr: "चित्रकूट" }, category: "pilgrimage",
      description: { en: "Historic spiritual destination.", mr: "ऐतिहासिक आध्यात्मिक तीर्थक्षेत्र." },
      lat: 25.2001, lng: 80.8697, imageQuery: "Chitrakoot temple" },

    { id: "kashi", name: { en: "Kashi / Varanasi", mr: "काशी / वाराणसी" }, category: "pilgrimage",
      description: { en: "One of India's most important spiritual and pilgrimage cities.", mr: "भारताच्या प्रमुख आध्यात्मिक व तीर्थनगरींपैकी एक." },
      lat: 25.3176, lng: 82.9739, imageQuery: "Kashi Vishwanath Varanasi Ganga Ghat" },

    { id: "maihar", name: { en: "Maihar", mr: "मैहर" }, category: "temple",
      description: { en: "Pilgrimage destination on the return route.", mr: "परतीच्या मार्गावरील तीर्थक्षेत्र." },
      lat: 24.2667, lng: 80.7667, imageQuery: "Maihar Sharda Mata Temple" },

    { id: "ramtek", name: { en: "Ramtek", mr: "रामटेक" }, category: "pilgrimage",
      description: { en: "Historic pilgrimage destination in Maharashtra.", mr: "महाराष्ट्रातील ऐतिहासिक तीर्थक्षेत्र." },
      lat: 21.3978, lng: 79.3311, imageQuery: "Ramtek Temple Maharashtra" },

    { id: "mahur", name: { en: "Mahur", mr: "माहूर" }, category: "pilgrimage",
      description: { en: "Important pilgrimage destination in Maharashtra.", mr: "महाराष्ट्रातील महत्त्वाचे तीर्थक्षेत्र." },
      lat: 19.0961, lng: 77.8797, imageQuery: "Mahur Renuka Devi Temple" }
  ],


  /* =======================================================
     18-DAY PRESENTATION STRUCTURE

     These are route stages based on the supplied route.
     DO NOT display invented timings/hotels.
  ======================================================= */

  itinerary: [
    { day: 1, title: { en: "Latur → Omkareshwar → Ujjain", mr: "लातूर → ओंकारेश्वर → उज्जैन" },
      locations: ["latur", "omkareshwar", "ujjain"],
      description: { en: "Begin the pilgrimage from Latur and proceed towards Omkareshwar and Ujjain.", mr: "लातूर येथून यात्रेचा शुभारंभ करून ओंकारेश्वर व उज्जैनकडे प्रस्थान." } },

    { day: 2, title: { en: "Ujjain → Mathura → Vrindavan → Haridwar", mr: "उज्जैन → मथुरा → वृंदावन → हरिद्वार" },
      locations: ["ujjain", "mathura", "vrindavan", "haridwar"],
      description: { en: "Continue through Mathura and Vrindavan before reaching Haridwar.", mr: "मथुरा व वृंदावन मार्गे हरिद्वारकडे प्रस्थान." } },

    { day: 3, title: { en: "Haridwar → Barkot → Yamunotri", mr: "हरिद्वार → बारकोट → यमुनोत्री" },
      locations: ["haridwar", "barkot", "yamunotri"],
      description: { en: "Enter the Himalayan Char Dham circuit and proceed towards Yamunotri.", mr: "हिमालयीन चारधाम यात्रेत प्रवेश करून यमुनोत्रीकडे प्रस्थान." } },

    { day: 4, title: { en: "Yamunotri → Uttarkashi", mr: "यमुनोत्री → उत्तरकाशी" },
      locations: ["yamunotri", "uttarkashi"],
      description: { en: "Continue from Yamunotri towards Uttarkashi.", mr: "यमुनोत्री दर्शनानंतर उत्तरकाशीकडे प्रस्थान." } },

    { day: 5, title: { en: "Uttarkashi → Gangotri", mr: "उत्तरकाशी → गंगोत्री" },
      locations: ["uttarkashi", "gangotri"],
      description: { en: "Proceed towards Gangotri Dham.", mr: "गंगोत्री धामकडे प्रस्थान." } },

    { day: 6, title: { en: "Gangotri → Srinagar → Rudraprayag", mr: "गंगोत्री → श्रीनगर → रुद्रप्रयाग" },
      locations: ["gangotri", "srinagar", "rudraprayag"],
      description: { en: "Continue deeper into the Garhwal Himalayan pilgrimage region.", mr: "गढवाल हिमालयातील पुढील तीर्थमार्गाकडे प्रस्थान." } },

    { day: 7, title: { en: "Rudraprayag → Guptakashi → Gaurikund → Kedarnath", mr: "रुद्रप्रयाग → गुप्तकाशी → गौरीकुंड → केदारनाथ" },
      locations: ["rudraprayag", "guptakashi", "gaurikund", "kedarnath"],
      description: { en: "Proceed towards the Kedarnath pilgrimage route.", mr: "केदारनाथ यात्रेच्या मार्गावर प्रस्थान." } },

    { day: 8, title: { en: "Kedarnath → Ukhimath → Chopta → Tungnath", mr: "केदारनाथ → उखीमठ → चोपता → तुंगनाथ" },
      locations: ["kedarnath", "ukhimath", "chopta", "tungnath"],
      description: { en: "Continue towards Ukhimath, Chopta and Tungnath.", mr: "उखीमठ, चोपता व तुंगनाथकडे यात्रेचा पुढील टप्पा." } },

    { day: 9, title: { en: "Tungnath → Gopeshwar → Chamoli → Karnaprayag", mr: "तुंगनाथ → गोपेश्वर → चमोली → कर्णप्रयाग" },
      locations: ["tungnath", "gopeshwar", "chamoli", "karnaprayag"],
      description: { en: "Travel through the Chamoli region towards the Panch Prayag circuit.", mr: "चमोली परिसरातून पंचप्रयाग क्षेत्राकडे प्रस्थान." } },

    { day: 10, title: { en: "Karnaprayag → Nandprayag → Vishnuprayag → Badrinath", mr: "कर्णप्रयाग → नंदप्रयाग → विष्णुप्रयाग → बद्रीनाथ" },
      locations: ["karnaprayag", "nandprayag", "vishnuprayag", "badrinath"],
      description: { en: "Continue through sacred confluence destinations towards Badrinath Dham.", mr: "पवित्र प्रयागांमधून बद्रीनाथ धामाकडे प्रस्थान." } },

    { day: 11, title: { en: "Badrinath → Mana Village → Jyotirmath", mr: "बद्रीनाथ → माणा गाव → ज्योतिर्मठ" },
      locations: ["badrinath", "mana", "jyotirmath"],
      description: { en: "Explore the Badrinath region, visit Mana Village and continue towards Jyotirmath.", mr: "बद्रीनाथ परिसर, माणा गाव दर्शन करून ज्योतिर्मठकडे प्रस्थान." } },

    { day: 12, title: { en: "Jyotirmath → Devprayag → Rishikesh → Haridwar", mr: "ज्योतिर्मठ → देवप्रयाग → ऋषिकेश → हरिद्वार" },
      locations: ["jyotirmath", "devprayag", "rishikesh", "haridwar"],
      description: { en: "Descend from the Himalayan circuit through Devprayag and Rishikesh towards Haridwar.", mr: "देवप्रयाग व ऋषिकेश मार्गे हरिद्वारकडे परतीचा प्रवास." } },

    { day: 13, title: { en: "Haridwar → Ayodhya", mr: "हरिद्वार → अयोध्या" },
      locations: ["haridwar", "ayodhya"],
      description: { en: "Begin the return pilgrimage route towards Ayodhya.", mr: "परतीच्या तीर्थयात्रेत अयोध्येकडे प्रस्थान." } },

    { day: 14, title: { en: "Ayodhya → Prayagraj", mr: "अयोध्या → प्रयागराज" },
      locations: ["ayodhya", "prayagraj"],
      description: { en: "Continue from Ayodhya towards Prayagraj.", mr: "अयोध्येहून प्रयागराजकडे प्रस्थान." } },

    { day: 15, title: { en: "Prayagraj → Chitrakoot → Kashi", mr: "प्रयागराज → चित्रकूट → काशी" },
      locations: ["prayagraj", "chitrakoot", "kashi"],
      description: { en: "Continue through Chitrakoot towards the sacred city of Kashi.", mr: "चित्रकूट मार्गे पवित्र काशी नगरीकडे प्रस्थान." } },

    { day: 16, title: { en: "Kashi → Maihar", mr: "काशी → मैहर" },
      locations: ["kashi", "maihar"],
      description: { en: "Continue the return pilgrimage towards Maihar.", mr: "परतीच्या यात्रेत मैहरकडे प्रस्थान." } },

    { day: 17, title: { en: "Maihar → Ramtek → Mahur", mr: "मैहर → रामटेक → माहूर" },
      locations: ["maihar", "ramtek", "mahur"],
      description: { en: "Proceed towards Maharashtra through Ramtek and Mahur.", mr: "रामटेक व माहूर मार्गे महाराष्ट्राकडे प्रस्थान." } },

    { day: 18, title: { en: "Mahur → Latur", mr: "माहूर → लातूर" },
      locations: ["mahur", "latur"],
      description: { en: "Complete the pilgrimage journey and return to Latur.", mr: "तीर्थयात्रेची सांगता करून लातूर येथे परत." } }
  ],


  organizer: {
    name: { en: "Shri. Guruprasad Hundekar", mr: "श्री. गुरुप्रसाद हुंडेकर" },
    title: { en: "Founder & Chief Coordinator", mr: "संस्थापक व मुख्य संयोजक" },
    phones: ["9730699805", "7498132640"]
  },

  contactNumbers: company.contacts,

  office: company.office,

  seo: {
    title: {
      en: "Premium Uttarakhand Char Dham Yatra 2026 | GuruPriya Tours & Travels",
      mr: "प्रीमियम उत्तराखंड चारधाम यात्रा २०२६ | गुरुप्रिया टुर्स ॲण्ड ट्रॅव्हल्स"
    },
    description: {
      en: "Join GuruPriya Tours & Travels for the 18-day Premium Uttarakhand Char Dham and Ancient Devasthan Darshan Yatra starting from Latur on 21 October 2026.",
      mr: "२१ ऑक्टोबर २०२६ रोजी लातूरहून सुरू होणाऱ्या १८ दिवसांच्या प्रीमियम उत्तराखंड चारधाम व प्राचीन देवस्थान दर्शन यात्रेत गुरुप्रिया टुर्स ॲण्ड ट्रॅव्हल्ससोबत सहभागी व्हा."
    },
    keywords: [
      "GuruPriya Travels", "GuruPriya Tours", "Char Dham Yatra 2026", "Uttarakhand Yatra 2026",
      "Latur Char Dham Yatra", "Kedarnath Badrinath", "Yamunotri Gangotri", "Tungnath",
      "Mana Village", "Ayodhya Yatra", "Kashi Yatra", "चारधाम यात्रा २०२६",
      "लातूर चारधाम यात्रा", "गुरुप्रिया ट्रॅव्हल्स"
    ]
  }
};


/* =========================================================
   COMING SOON TRIPS
========================================================= */

export const comingSoonTrips = [
  {
    id: "tirupati-darshan",
    slug: "tirupati-darshan",
    status: "coming-soon" as const,
    title: { en: "Tirupati Darshan", mr: "तिरुपती दर्शन यात्रा" },
    subtitle: {
      en: "A dedicated spiritual journey to the sacred abode of Lord Venkateswara.",
      mr: "भगवान श्री वेंकटेश्वरांच्या पवित्र धामाची नियोजित आध्यात्मिक यात्रा."
    },
    badge: { en: "Coming Soon", mr: "लवकरच" },
    image: commonsImage("Tirumala 090615.jpg"),
    imageQuery: "Tirumala Tirupati Venkateswara Temple",
    description: {
      en: "A future pilgrimage journey centred around Tirupati and Tirumala Darshan.",
      mr: "तिरुपती व तिरुमला दर्शनावर केंद्रित आगामी तीर्थयात्रा."
    }
  },
  {
    id: "southern-mandir-visits",
    slug: "southern-mandir-visits",
    status: "coming-soon" as const,
    title: { en: "Southern Mandir Visits", mr: "दक्षिण भारत मंदिर दर्शन यात्रा" },
    subtitle: {
      en: "A future spiritual circuit exploring the sacred temple heritage of South India.",
      mr: "दक्षिण भारतातील पवित्र मंदिरांचा आध्यात्मिक व सांस्कृतिक वारसा अनुभवणारी आगामी यात्रा."
    },
    badge: { en: "Coming Soon", mr: "लवकरच" },
    image: commonsImage("Brihadisvara Temple during Maha Shivaratri-WUS03611 (edit).jpg"),
    imageQuery: "South India ancient temple Tamil Nadu Karnataka Kerala",
    description: {
      en: "A future pilgrimage circuit covering selected sacred temples of South India.",
      mr: "दक्षिण भारतातील निवडक पवित्र मंदिरांचा समावेश असलेली आगामी तीर्थयात्रा."
    }
  },
  {
    id: "kanyakumari-rameshwaram-kerala",
    slug: "kanyakumari-rameshwaram-kerala",
    status: "coming-soon" as const,
    title: { en: "Kanyakumari • Rameshwaram • Kerala", mr: "कन्याकुमारी • रामेश्वरम • केरळ" },
    subtitle: {
      en: "A future journey combining sacred destinations, coastal landscapes and the spiritual heritage of South India.",
      mr: "पवित्र तीर्थक्षेत्रे, समुद्रकिनारी निसर्ग आणि दक्षिण भारताचा आध्यात्मिक वारसा यांचा अनुभव देणारी आगामी यात्रा."
    },
    badge: { en: "Coming Soon", mr: "लवकरच" },
    image: commonsImage("Ramanathaswamy Temple, Rameshwaram, Tamil Nadu.jpg"),
    imageQuery: "Kanyakumari Rameshwaram Kerala temple",
    description: {
      en: "An upcoming spiritual journey connecting Kanyakumari, Rameshwaram and Kerala.",
      mr: "कन्याकुमारी, रामेश्वरम आणि केरळ यांना जोडणारी आगामी आध्यात्मिक यात्रा."
    }
  }
];

export type ComingSoonTrip = (typeof comingSoonTrips)[number];


/* =========================================================
   ALL FEATURED TRIPS (extend this array for future yatras)
========================================================= */

export const trips: Trip[] = [featuredTrip];


/* =========================================================
   WEBSITE HOME PAGE DATA
========================================================= */

export const homePage = {
  announcement: {
    en: "Registrations Open • Premium Uttarakhand Char Dham Yatra 2026",
    mr: "पूर्वनोंदणी सुरू • प्रीमियम उत्तराखंड चारधाम यात्रा २०२६"
  },

  hero: {
    title: { en: "Your Sacred Journey Begins Here", mr: "आपली पवित्र यात्रा येथे सुरू होते" },
    subtitle: {
      en: "Experience India's sacred destinations with thoughtful planning, spiritual guidance and personal care.",
      mr: "नियोजनबद्ध प्रवास, आध्यात्मिक मार्गदर्शन आणि आपुलकीच्या सेवेसह भारतातील पवित्र तीर्थक्षेत्रांचा अनुभव घ्या."
    },
    primaryCTA: { en: "Explore Yatra", mr: "यात्रा पहा" },
    secondaryCTA: { en: "Enquire Now", mr: "आत्ताच चौकशी करा" }
  },

  whyUs: [
    {
      title: { en: "Planned With Experience", mr: "अनुभवातून नियोजन" },
      description: {
        en: "Built around extensive first-hand experience of Uttarakhand and pilgrimage travel.",
        mr: "उत्तराखंड व तीर्थयात्रेच्या प्रत्यक्ष अनुभवावर आधारित नियोजन."
      }
    },
    {
      title: { en: "Spiritual Guidance", mr: "आध्यात्मिक मार्गदर्शन" },
      description: {
        en: "Understand the history and spiritual significance of the destinations you visit.",
        mr: "प्रत्येक तीर्थक्षेत्राचा इतिहास व आध्यात्मिक महत्त्व जाणून घेण्याची संधी."
      }
    },
    {
      title: { en: "Comfort & Care", mr: "आराम व आपुलकी" },
      description: {
        en: "Thoughtful travel and accommodation planning for pilgrims.",
        mr: "यात्रेकरूंसाठी प्रवास व निवासाचे विचारपूर्वक नियोजन."
      }
    },
    {
      title: { en: "Transparent Information", mr: "पारदर्शक माहिती" },
      description: {
        en: "Clear package information and no hidden charges as advertised.",
        mr: "स्पष्ट पॅकेज माहिती आणि जाहिरातीनुसार कोणतेही छुपे खर्च नाहीत."
      }
    }
  ]
};

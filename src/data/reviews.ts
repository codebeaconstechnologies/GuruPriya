import type { LocalizedText } from "./trips";

// Reviews from participants of completed yatras, keyed by trip id.
// The entries below are SAMPLE reviews (isSample: true) and are labelled as
// such in the UI. Replace them with real participant feedback, then set
// isSample to false.
export interface TripReview {
  id: string;
  tripId: string;
  name: string;
  location: LocalizedText;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: LocalizedText;
  isSample: boolean;
}

export const tripReviews: TripReview[] = [
  {
    id: "char-dham-sample-1",
    tripId: "uttarakhand-char-dham-2026",
    name: "Sunita K.",
    location: { en: "Latur", mr: "लातूर" },
    rating: 5,
    quote: {
      en: "Kedarnath and Badrinath darshan with my parents was a dream come true. Everything was well organised and the team took care of the elders at every step.",
      mr: "आई-वडिलांसोबत केदारनाथ व बद्रीनाथ दर्शन हे स्वप्न पूर्ण झाले. सर्व व्यवस्था उत्तम होती आणि टीमने प्रत्येक टप्प्यावर ज्येष्ठांची काळजी घेतली."
    },
    isSample: true
  },
  {
    id: "char-dham-sample-2",
    tripId: "uttarakhand-char-dham-2026",
    name: "Prakash D.",
    location: { en: "Pune", mr: "पुणे" },
    rating: 5,
    quote: {
      en: "The tirth mahatmya stories by Amol Maharaj made every darshan more meaningful. Pure vegetarian food was tasty throughout the 18 days.",
      mr: "अमोल महाराजांच्या तीर्थ महात्म्य कथांमुळे प्रत्येक दर्शन अधिक अर्थपूर्ण झाले. १८ दिवस शुद्ध शाकाहारी भोजन अतिशय रुचकर होते."
    },
    isSample: true
  },
  {
    id: "char-dham-sample-3",
    tripId: "uttarakhand-char-dham-2026",
    name: "Meena J.",
    location: { en: "Solapur", mr: "सोलापूर" },
    rating: 4,
    quote: {
      en: "Long journey but very comfortable. Having a doctor with the group gave us great peace of mind in the mountains.",
      mr: "प्रवास मोठा होता पण अतिशय आरामदायी. डोंगराळ भागात गटासोबत डॉक्टर असल्याने आम्ही निश्चिंत होतो."
    },
    isSample: true
  }
];

export function getReviewsForTrip(tripId: string): TripReview[] {
  return tripReviews.filter((review) => review.tripId === tripId);
}

export function averageRating(reviews: TripReview[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

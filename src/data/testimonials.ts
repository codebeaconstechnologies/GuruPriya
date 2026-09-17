import type { LocalizedText } from "./trips";

// Placeholder testimonials — clearly marked as samples in the UI.
// Replace with verified traveller testimonials once available.
export interface Testimonial {
  id: string;
  name: string;
  location: LocalizedText;
  quote: LocalizedText;
  isPlaceholder: true;
}

export const testimonials: Testimonial[] = [
  {
    id: "sample-1",
    name: "Sample Traveller",
    location: { en: "Latur", mr: "लातूर" },
    quote: {
      en: "A well-organised and peaceful pilgrimage experience — sample review, to be replaced with real traveller feedback.",
      mr: "सुनियोजित व शांत तीर्थयात्रेचा अनुभव — हा नमुना अभिप्राय असून प्रत्यक्ष यात्रेकरूंच्या प्रतिक्रियांनी बदलण्यात येईल."
    },
    isPlaceholder: true
  },
  {
    id: "sample-2",
    name: "Sample Traveller",
    location: { en: "Pune", mr: "पुणे" },
    quote: {
      en: "The spiritual guidance throughout the journey made the darshan more meaningful — sample review.",
      mr: "संपूर्ण यात्रेतील आध्यात्मिक मार्गदर्शनामुळे दर्शन अधिक अर्थपूर्ण झाले — हा नमुना अभिप्राय आहे."
    },
    isPlaceholder: true
  },
  {
    id: "sample-3",
    name: "Sample Traveller",
    location: { en: "Solapur", mr: "सोलापूर" },
    quote: {
      en: "Comfortable travel and thoughtful planning for the whole family — sample review.",
      mr: "संपूर्ण कुटुंबासाठी आरामदायी प्रवास व विचारपूर्वक नियोजन — हा नमुना अभिप्राय आहे."
    },
    isPlaceholder: true
  }
];

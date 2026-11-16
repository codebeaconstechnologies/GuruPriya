export interface ContactFormValues {
  fullName: string;
  mobile: string;
  email: string;
  destination: string;
  category: string;
  yatra: string;
  travellers: string;
  preferredDate: string;
  travelMode: string;
  message: string;
  consent: boolean;
  company: string; // honeypot
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const MESSAGE_MAX = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIAN_MOBILE_RE = /^[6-9]\d{9}$/;

export function validateContactForm(
  values: ContactFormValues,
  messages: {
    required: string;
    invalidEmail: string;
    invalidMobile: string;
    invalidTravellers: string;
    consentRequired: string;
  }
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.fullName.trim()) errors.fullName = messages.required;
  if (!values.mobile.trim()) {
    errors.mobile = messages.required;
  } else if (!INDIAN_MOBILE_RE.test(values.mobile.trim().replace(/\D/g, "").slice(-10))) {
    errors.mobile = messages.invalidMobile;
  }

  // Email is optional — the team replies by phone / WhatsApp.
  if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
    errors.email = messages.invalidEmail;
  }

  if (values.travellers.trim() && (!/^\d+$/.test(values.travellers.trim()) || Number(values.travellers) < 1)) {
    errors.travellers = messages.invalidTravellers;
  }

  if (!values.consent) errors.consent = messages.consentRequired;

  return errors;
}

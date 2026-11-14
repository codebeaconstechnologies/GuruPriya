import { company } from "@/data/trips";

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${company.whatsapp}?text=${encoded}`;
}

export function tripEnquiryMessage(tripTitle: string, language: "en" | "mr"): string {
  return language === "mr"
    ? `नमस्कार, मला "${tripTitle}" या यात्रेबद्दल अधिक माहिती हवी आहे.`
    : `Hello, I would like more information about "${tripTitle}".`;
}

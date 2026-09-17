import { company } from "@/data/trips";

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${company.whatsapp}?text=${encoded}`;
}

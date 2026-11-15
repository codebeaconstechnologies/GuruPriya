import { type ReactNode } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import { MobileCtaBar } from "./MobileCtaBar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useI18n } from "@/i18n/I18nContext";

export function Layout({ children }: { children: ReactNode }) {
  const { language } = useI18n();
  const whatsappMessage =
    language === "mr"
      ? "नमस्कार, मला यात्रेबद्दल अधिक माहिती हवी आहे."
      : "Hello, I would like more information about your yatras.";

  return (
    <div className={`pb-16 lg:pb-0 ${language === "mr" ? "font-devanagari" : ""}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <Breadcrumbs />
      <main id="main">{children}</main>
      <Footer />
      <div className="hidden lg:block">
        <WhatsAppButton floating message={whatsappMessage} />
      </div>
      <MobileCtaBar whatsappMessage={whatsappMessage} />
    </div>
  );
}

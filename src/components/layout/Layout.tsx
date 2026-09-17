import { type ReactNode } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useI18n } from "@/i18n/I18nContext";

export function Layout({ children }: { children: ReactNode }) {
  const { language } = useI18n();

  return (
    <div className={language === "mr" ? "font-devanagari" : ""}>
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton
        floating
        message={
          language === "mr"
            ? "नमस्कार, मला यात्रेबद्दल अधिक माहिती हवी आहे."
            : "Hello, I would like more information about your yatras."
        }
      />
    </div>
  );
}

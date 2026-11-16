import { useLocalized } from "@/i18n/I18nContext";
import { HomeHero } from "@/components/home/HomeHero";
import {
  Experiences,
  FeaturedDestinations,
  FeaturedPackages,
  SignatureJourney,
  WhyGuruPriya,
  IndiaWorldSplit,
  CustomTripBand,
  AboutIntro,
  Testimonials,
  Inspiration
} from "@/components/home/HomeSections";
import { CtaBand } from "@/components/ui/CtaBand";
import S from "@/i18n/strings";

export default function Home() {
  const pick = useLocalized();
  return (
    <>
      <HomeHero />
      <Experiences />
      <FeaturedDestinations />
      <FeaturedPackages />
      <SignatureJourney />
      <WhyGuruPriya />
      <IndiaWorldSplit />
      <CustomTripBand />
      <AboutIntro />
      <Testimonials />
      <Inspiration />
      <CtaBand title={pick(S.home.finalTitle)} text={pick(S.home.finalText)} image="maldives-water-villas" ctaLabel={pick(S.planTrip)} />
    </>
  );
}

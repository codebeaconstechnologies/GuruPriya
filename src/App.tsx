import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SeoManager } from "@/utils/seo";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

// Secondary pages are split into their own chunks so the home page loads
// less JavaScript. scripts/build.mjs adds <link rel="modulepreload"> for the
// right chunk to each prerendered route, so direct visits don't wait for it.
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Packages = lazy(() => import("@/pages/Packages"));
const Category = lazy(() => import("@/pages/Category"));
const Destinations = lazy(() => import("@/pages/Destinations"));
const Destination = lazy(() => import("@/pages/Destination"));
const PackageDetail = lazy(() => import("@/pages/PackageDetail"));
const ServicesIndex = lazy(() => import("@/pages/Services").then((m) => ({ default: m.ServicesIndex })));
const ServiceDetail = lazy(() => import("@/pages/Services").then((m) => ({ default: m.ServiceDetail })));
const TripDetail = lazy(() => import("@/pages/TripDetail"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const UpcomingYatras = lazy(() => import("@/pages/ComingSoon"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const ImageCredits = lazy(() => import("@/pages/ImageCredits"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a tick so the target section has rendered.
      const id = window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return () => window.clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SeoManager />
      <Layout>
        {/* Full-height placeholder keeps the footer below the fold while a page chunk loads (no layout shift). */}
        <Suspense fallback={<div className="min-h-screen bg-white" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:slug" element={<PackageDetail />} />
            <Route path="/tours/:slug" element={<Category />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<Destination />} />
            <Route path="/services" element={<ServicesIndex />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            {/* /yatras is served as a 301 to the pilgrimage page by _redirects; this covers in-app navigation. */}
            <Route path="/yatras" element={<Navigate to="/tours/pilgrimage" replace />} />
            <Route path="/yatras/:slug" element={<TripDetail />} />
            <Route path="/upcoming-yatras" element={<UpcomingYatras />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/image-credits" element={<ImageCredits />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

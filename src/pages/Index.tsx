import { useState, useCallback } from "react";
import VideoBackground from "@/components/VideoBackground";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import AboutSection from "@/components/AboutSection";
import TreatmentsSection from "@/components/TreatmentsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashFinished = useCallback(() => setSplashDone(true), []);

  return (
    <>
      {!splashDone && <SplashScreen onFinished={handleSplashFinished} />}
      <VideoBackground />
      <Navigation />
      <main>
        <HeroSection />
        <WhyChooseSection />
        <AboutSection />
        <TreatmentsSection />
        <BeforeAfterSection />
        <PricingSection />
        <TestimonialsSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
};

export default Index;

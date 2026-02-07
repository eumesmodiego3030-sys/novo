import VideoBackground from "@/components/VideoBackground";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import AboutSection from "@/components/AboutSection";
import TreatmentsSection from "@/components/TreatmentsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

const Index = () => (
  <>
    <VideoBackground />
    <Navigation />
    <main>
      <HeroSection />
      <WhyChooseSection />
      <AboutSection />
      <TreatmentsSection />
      <TestimonialsSection />
      <BookingSection />
      <ContactSection />
    </main>
    <Footer />
    <FloatingChat />
  </>
);

export default Index;

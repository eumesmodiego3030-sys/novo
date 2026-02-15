import { motion } from "framer-motion";
import { ParallaxSection } from "./ParallaxSection";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-40 sm:pt-20 pb-32 sm:pb-12 overflow-hidden">
      <ParallaxSection offset={0.15} className="w-full">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}>

            <h1 className="section-heading text-foreground leading-[1.1] mb-6">
              {t.hero.title}{" "}
              <span className="italic text-primary">{t.hero.titleHighlight}</span>
            </h1>

            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 font-body font-semibold">
              {t.hero.location}
            </p>

            <div className="luxury-divider" />

            <p className="section-subheading mt-6 mb-10 font-medium">
              {t.hero.subtitle}
            </p>

            {/* Buttons removed as requested (Agendar / Consulta WhatsApp) */}
          </motion.div>

          {/* Scroll indicator removed as requested */}
        </div>
      </ParallaxSection>
    </section>);

};

export default HeroSection;
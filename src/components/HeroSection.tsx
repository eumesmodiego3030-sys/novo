import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-40 sm:pt-20 pb-32 sm:pb-12">
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("#booking")}
              className="btn-primary-luxury">

              {t.hero.bookConsultation}
            </button>
            <a
              href="https://wa.me/447492934010"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp">

              {t.hero.whatsappConsultation}
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-2">

          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-body font-extrabold">
            {t.hero.scrollExplore}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-foreground/20" />

        </motion.div>
      </div>
    </section>);

};

export default HeroSection;
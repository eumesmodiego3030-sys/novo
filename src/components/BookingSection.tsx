import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";

const BookingSection = () => {
  const { t } = useLanguage();
  return (
<section id="booking" className="section-luxury">
    <div className="max-w-3xl mx-auto text-center">
      <ScrollReveal>
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body font-extrabold">
          {t.booking.label}
        </p>
        <h2 className="section-heading text-foreground mb-2">
          {t.booking.title} <span className="italic text-primary font-medium">{t.booking.titleHighlight}</span>
        </h2>
        <div className="luxury-divider" />
        <p className="section-subheading mt-6 mb-10 font-medium">
          {t.booking.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="https://wa.me/447492934010"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {t.booking.whatsappConsultation}
          </motion.a>
          <motion.a
            href="#"
            className="btn-primary-luxury"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {t.booking.bookOnline}
          </motion.a>
        </div>

        <p className="text-xs text-muted-foreground mt-8 font-body font-medium">
          {t.booking.note}
        </p>
      </ScrollReveal>
    </div>
  </section>
  );
};


export default BookingSection;
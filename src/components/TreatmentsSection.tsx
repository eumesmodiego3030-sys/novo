import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { TouchCarousel } from "./TouchCarousel";
import { useMediaQuery } from "@/hooks/use-mobile";
import botoxImg from "@/assets/treatment-botox.jpg";
import fillersImg from "@/assets/treatment-fillers.jpg";
import browsImg from "@/assets/brows-lashes-waxing.jpg";
import laserImg from "@/assets/treatment-laser.jpg";
import tanningImg from "@/assets/brazilian-tanning.jpg";

// Map treatment IDs to images
const treatmentImages: Record<string, string> = {
  "facial-aesthetics-injectables": botoxImg,
  "skin-treatments": laserImg,
  "micropigmentation-pmu": fillersImg,
  "body-treatments": botoxImg,
  "laser-hair-removal": laserImg,
  "brows-lashes-waxing": browsImg,
  "brazilian-tanning": tanningImg,
};

const TreatmentsSection = () => {
  const { t } = useLanguage();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const treatments = t.treatments.data;

  const carouselItems = treatments.map((treatment) => ({
    id: treatment.id,
      content: (
      <motion.div
        className="glass-card group cursor-pointer p-0 overflow-hidden h-full w-full text-foreground dark:text-white"
        whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative h-48 sm:h-56 overflow-hidden bg-white flex items-center justify-center">
          <motion.img
            src={treatmentImages[treatment.id]}
            alt={treatment.name}
            className="mx-auto h-full w-auto object-contain"
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-0 bg-foreground/10"
            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="p-6 sm:p-8">
          <motion.h3
            className="font-heading text-xl sm:text-2xl font-medium text-foreground dark:text-white mb-3"
            whileHover={{ color: "hsl(var(--primary))" }}
            transition={{ duration: 0.2 }}
          >
            {treatment.name}
          </motion.h3>
          <motion.p
            className="text-sm text-muted-foreground dark:text-white leading-relaxed mb-4 font-body"
            whileHover={{ color: "hsl(var(--foreground)/0.8)" }}
            transition={{ duration: 0.2 }}
          >
            {treatment.description}
          </motion.p>
          <ul className="space-y-2 mb-6">
            {treatment.benefits.map((b: string, idx: number) => (
              <motion.li
                key={b}
                className="text-xs text-muted-foreground dark:text-white font-body flex items-center gap-2"
                whileHover={{ x: 4, color: "hsl(var(--primary))" }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
              >
                <span className="w-1 h-1 rounded-full bg-primary" />
                {b}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    ),
  }));

  return (
    <section id="treatments" className="section-luxury">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body font-bold">
              {t.treatments.label}
            </p>
            <h2 className="section-heading text-foreground mb-2">
              {t.treatments.title} <span className="italic text-primary font-medium">{t.treatments.titleHighlight}</span>
            </h2>
            <div className="luxury-divider" />
            <p className="section-subheading mt-6 font-semibold">
              {t.treatments.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile: Carousel */}
        {isMobile ? (
          <div className="px-4">
            <TouchCarousel
              items={carouselItems}
              autoPlay={true}
              autoPlayInterval={5000}
              showNav={true}
              className="h-96"
            />
          </div>
        ) : (
          /* Desktop: Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {treatments.map((treatment, i) => (
              <ScrollReveal key={treatment.name} delay={i * 0.1}>
                {carouselItems.find((item) => item.id === treatment.id)?.content}
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TreatmentsSection;

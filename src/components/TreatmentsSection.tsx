import ScrollReveal from "./ScrollReveal";
import botoxImg from "@/assets/treatment-botox.jpg";
import fillersImg from "@/assets/treatment-fillers.jpg";
import laserImg from "@/assets/treatment-laser.jpg";

const treatments = [
  {
    name: "Facial Aesthetics & Injectables",
    image: botoxImg,
    description: "Anti-wrinkle injections, Profhilo, mesotherapy, lip fillers and skin boosters for a refreshed, youthful appearance.",
    benefits: ["Anti-wrinkle injections", "Dermal fillers", "Profhilo & Lumi"],
  },
  {
    name: "Skin Treatments",
    image: laserImg,
    description: "Chemical peels, microneedling and deep cleansing facials for radiant, clear and rejuvenated skin.",
    benefits: ["Chemical peels", "Microneedling", "Deep cleansing facials"],
  },
  {
    name: "Micropigmentation & PMU",
    image: fillersImg,
    description: "Expert microblading, lip blush, eyeliner and brow techniques for beautifully defined, long-lasting results.",
    benefits: ["Microblading", "Lip blush", "Eyeliner PMU"],
  },
  {
    name: "Body Treatments",
    image: botoxImg,
    description: "Body contouring, lymphatic drainage massage and cellulite treatments for a sculpted, smooth silhouette.",
    benefits: ["Body contouring", "Lymphatic drainage", "Cellulite treatment"],
  },
  {
    name: "Laser Hair Removal",
    image: laserImg,
    description: "Advanced laser technology for permanent hair reduction on all skin types, with comfortable and effective sessions.",
    benefits: ["Full body laser", "All skin types", "Permanent reduction"],
  },
  {
    name: "Brows, Lashes & Waxing",
    image: fillersImg,
    description: "Brow shaping, lash lifts, tinting and full-body waxing for a polished, effortless look.",
    benefits: ["Lash lift & tint", "Brow lamination", "Full body waxing"],
  },
  {
    name: "Brazilian Tanning",
    image: botoxImg,
    description: "Flawless, natural-looking Brazilian spray tan for a sun-kissed glow all year round.",
    benefits: ["Spray tan", "Natural finish", "Long-lasting glow"],
  },
];

const TreatmentsSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="treatments" className="section-luxury">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body font-bold">
              Our expertise
            </p>
            <h2 className="section-heading text-foreground mb-2">
              Featured <span className="italic text-primary font-medium">Treatments</span>
            </h2>
            <div className="luxury-divider" />
            <p className="section-subheading mt-6 font-semibold">
              Each treatment is performed with precision, care and an artistic eye for natural beauty.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {treatments.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="glass-card group cursor-pointer p-0 overflow-hidden">
                <div className="relative h-48 sm:h-56 overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="mx-auto h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/5 transition-colors duration-500" />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-heading text-xl sm:text-2xl font-medium text-foreground mb-3">
                    {t.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-body">
                    {t.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {t.benefits.map((b) => (
                      <li
                        key={b}
                        className="text-xs text-muted-foreground font-body flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollTo("#booking")}
                    className="btn-outline-luxury text-xs py-3 px-6 w-full"
                  >
                    Book This Treatment
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentsSection;

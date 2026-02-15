import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { Heart, ShieldCheck, Sparkles, Users } from "lucide-react";

const WhyChooseSection = () => {
  const { t } = useLanguage();
  const reasons = [
    {
      icon: Heart,
      title: t.whyChoose.reasons.professionalism.title,
      description: t.whyChoose.reasons.professionalism.desc,
    },
    {
      icon: Sparkles,
      title: t.whyChoose.reasons.innovation.title,
      description: t.whyChoose.reasons.innovation.desc,
    },
    {
      icon: ShieldCheck,
      title: t.whyChoose.reasons.care.title,
      description: t.whyChoose.reasons.care.desc,
    },
    {
      icon: Users,
      title: t.whyChoose.reasons.results.title,
      description: t.whyChoose.reasons.results.desc,
    }
  ];

  return (
<section className="section-luxury">
    <div className="max-w-6xl mx-auto text-center">
      <ScrollReveal>
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body font-semibold">
          {t.whyChoose.label}
        </p>
        <h2 className="section-heading text-foreground mb-2">
          {t.whyChoose.title} <span className="italic text-primary font-medium">{t.whyChoose.titleHighlight}</span>
        </h2>
        <div className="luxury-divider" />
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {reasons.map((r, i) =>
      <ScrollReveal key={r.title} delay={i * 0.1}>
            <div className="glass-card text-center group cursor-default transition-all duration-500 h-full flex flex-col">
              <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
                <r.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-medium text-foreground dark:text-white mb-3">
                {r.title}
              </h3>
              <p className="text-sm text-muted-foreground dark:text-white leading-relaxed font-body mt-auto">
                {r.description}
              </p>
            </div>
          </ScrollReveal>
      )}
      </div>
    </div>
  </section>
  );
};


export default WhyChooseSection;
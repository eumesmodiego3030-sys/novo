import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import portraitImg from "@/assets/portrait-tatiana.jpg";

const AboutSection = () => {
  const { t } = useLanguage();
<section id="about" className="section-luxury">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Portrait */}
        <ScrollReveal>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
              src={portraitImg}
              alt="Tatiana Torres - Advanced Aesthetics Professional"
              className="w-full h-[300px] lg:h-[380px] object-contain bg-white" />

            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl border border-primary/20 -z-10" />
          </div>
        </ScrollReveal>

        {/* Text */}
        <ScrollReveal delay={0.2}>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body font-extrabold">
            {t.about.subheading}
          </p>
          <h2 className="section-heading text-foreground mb-2">
            {t.about.title} <span className="italic text-primary font-medium">{t.about.titleHighlight}</span>
          </h2>
          <div className="luxury-divider mx-0" />

          <div className="space-y-5 mt-8">
            <p className="leading-relaxed font-body font-semibold text-[#19010c]">
              {t.about.bio1}
            </p>
            <p className="leading-relaxed font-body font-semibold text-[#140009]">
              {t.about.bio2}
            </p>
            <p className="leading-relaxed font-body font-semibold text-[#0f0007]">
              {t.about.bio3}
            </p>
          </div>

          <div className="flex gap-8 mt-10">
            <div>
              <span className="font-heading text-3xl text-primary font-extrabold">25+</span>
              <p className="text-xs mt-1 font-body font-medium text-[#19010c]">Years Experience</p>
            </div>
            <div>
              <span className="font-heading text-3xl text-primary font-extrabold">Level 7</span>
              <p className="text-xs mt-1 font-body font-medium text-[#140109]">Qualification</p>
            </div>
            <div>
              <span className="font-heading text-3xl text-primary font-extrabold">100%</span>
              <p className="text-xs mt-1 font-body font-medium text-[#0f0007]">Dedication</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>;


export default AboutSection;
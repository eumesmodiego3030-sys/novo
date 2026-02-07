import ScrollReveal from "./ScrollReveal";
import { Heart, ShieldCheck, Sparkles, Users } from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Personalised Care",
    description: "Every treatment plan is tailored to your unique features, goals and lifestyle.",
  },
  {
    icon: ShieldCheck,
    title: "Qualified Professional",
    description: "Certified and continuously trained in the latest advanced aesthetic techniques.",
  },
  {
    icon: Sparkles,
    title: "Natural Results",
    description: "Subtle enhancements that celebrate your beauty — never overdone.",
  },
  {
    icon: Users,
    title: "Safe & Welcoming",
    description: "A warm, discreet environment where your comfort and safety come first.",
  },
];

const WhyChooseSection = () => (
  <section className="section-luxury">
    <div className="max-w-6xl mx-auto text-center">
      <ScrollReveal>
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
          Your journey
        </p>
        <h2 className="section-heading text-foreground mb-2">
          Why Choose <span className="italic text-primary">Tatiana?</span>
        </h2>
        <div className="luxury-divider" />
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {reasons.map((r, i) => (
          <ScrollReveal key={r.title} delay={i * 0.1}>
            <div className="glass-card text-center group cursor-default transition-all duration-500">
              <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
                <r.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-medium text-foreground mb-3">
                {r.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">
                {r.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseSection;

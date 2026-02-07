import ScrollReveal from "./ScrollReveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie M.",
    treatment: "Dermal Fillers",
    text: "Tatiana is incredible. She listened to exactly what I wanted and the results are so natural — I look refreshed, not different. Couldn't recommend her more!",
    rating: 5,
  },
  {
    name: "Emma R.",
    treatment: "Botox",
    text: "I was nervous about my first treatment but Tatiana made me feel so comfortable. The results are beautiful and subtle, exactly what I hoped for.",
    rating: 5,
  },
  {
    name: "Charlotte W.",
    treatment: "Laser Treatment",
    text: "The clinic is stunning and so welcoming. Tatiana's expertise really shows — my skin has never looked better. An absolutely wonderful experience.",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="section-luxury">
    <div className="max-w-6xl mx-auto text-center">
      <ScrollReveal>
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
          Client love
        </p>
        <h2 className="section-heading text-foreground mb-2">
          What Our Clients <span className="italic text-primary">Say</span>
        </h2>
        <div className="luxury-divider" />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.12}>
            <div className="glass-card text-left">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-accent text-accent"
                    strokeWidth={1}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic mb-6 font-body">
                "{t.text}"
              </p>
              <div>
                <p className="font-heading text-lg font-medium text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground font-body">{t.treatment}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

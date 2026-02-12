import ScrollReveal from "./ScrollReveal";
import { Star, ExternalLink } from "lucide-react";

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
  {
    name: "Jessica L.",
    treatment: "Lip Fillers",
    text: "Best lip fillers I've ever had! Tatiana has such an artistic eye. My lips look fuller but still completely natural. Everyone asks what my secret is!",
    rating: 5,
  },
  {
    name: "Olivia T.",
    treatment: "Microblading",
    text: "I woke up every morning with perfect brows now. Tatiana took so much time to get the shape exactly right. Life-changing treatment!",
    rating: 5,
  },
  {
    name: "Amelia K.",
    treatment: "Chemical Peel",
    text: "My skin was dull and uneven, but after just one session with Tatiana it was glowing. She explained everything clearly and I felt so looked after.",
    rating: 5,
  },
  {
    name: "Grace P.",
    treatment: "Body Contouring",
    text: "Incredible results from the body treatment. Tatiana is so professional and knowledgeable. The whole experience from start to finish was luxury.",
    rating: 5,
  },
  {
    name: "Isabella D.",
    treatment: "Profhilo",
    text: "I've had Profhilo elsewhere before but Tatiana's technique is on another level. My skin feels hydrated and plump. Already booked my next session!",
    rating: 5,
  },
];

const GOOGLE_MAPS_REVIEW_URL =
  "https://www.google.com/maps/place/Tatiana+Torres+Brazilian+Aesthetic+%26+Beauty/@52.4745,-1.9685,17z/";

const TestimonialsSection = () => (
  <section id="testimonials" className="section-luxury">
    <div className="max-w-6xl mx-auto text-center">
      <ScrollReveal>
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body font-extrabold">
          Client love
        </p>
        <h2 className="section-heading text-foreground mb-2">
          What Our Clients <span className="italic text-primary font-medium">Say</span>
        </h2>
        <div className="luxury-divider" />

        {/* Google rating summary */}
        <div className="flex items-center justify-center gap-2 mt-6 mb-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" strokeWidth={1} />
            ))}
          </div>
          <span className="text-sm font-body text-muted-foreground">5.0 on Google</span>
        </div>
      </ScrollReveal>

      {/* Modern testimonial grid — no card borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-12">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.08}>
            <div className="text-left group">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-accent text-accent" strokeWidth={1} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-foreground/80 leading-relaxed mb-5 font-body">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="border-t border-border/40 pt-4">
                <p className="font-heading text-base font-medium text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground font-body">{t.treatment}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Link to Google Maps */}
      <ScrollReveal delay={0.3}>
        <a
          href={GOOGLE_MAPS_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-12 text-sm text-primary hover:text-foreground transition-colors font-body font-semibold"
        >
          See all reviews on Google
          <ExternalLink className="w-4 h-4" />
        </a>
      </ScrollReveal>
    </div>
  </section>
);

export default TestimonialsSection;

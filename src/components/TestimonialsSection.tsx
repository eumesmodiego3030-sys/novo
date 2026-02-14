import ScrollReveal from "./ScrollReveal";
import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  "https://www.google.com/maps/place/Tatiana+Torres+Brazilian+Aesthetic+%26+Beauty/@52.480737,-1.9698317,17z/data=!4m8!3m7!1s0x4870bd2e0f9018fd:0x9a2ba65fb822d0e0!8m2!3d52.480737!4d-1.9698317!9m1!1b1!16s%2Fg%2F11trjxld06";

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="text-left">
    {/* Stars */}
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: testimonial.rating }).map((_, j) => (
        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={1} />
      ))}
    </div>

    {/* Quote */}
    <p className="text-base text-foreground/80 leading-relaxed mb-6 font-body">
      "{testimonial.text}"
    </p>

    {/* Author */}
    <div className="border-t border-border/40 pt-4">
      <p className="font-heading text-lg font-medium text-foreground">
        {testimonial.name}
      </p>
      <p className="text-sm text-muted-foreground font-body">{testimonial.treatment}</p>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % testimonials.length);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 2 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 2) % testimonials.length);
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
  ];

  return (
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
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" strokeWidth={1} />
              ))}
            </div>
            <span className="text-sm font-body text-muted-foreground">5.0 on Google</span>
          </div>
        </ScrollReveal>

        {/* Carousel with 2 testimonials side by side */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8" key={currentIndex}>
              {visibleTestimonials.map((testimonial, idx) => (
                <ScrollReveal key={testimonial.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="glass-card p-8 cursor-pointer"
                    whileHover={{
                      y: -8,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TestimonialCard testimonial={testimonial} />
                    </motion.div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={handlePrev}
              className="p-3 rounded-full border border-border"
              whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--accent))" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
                (_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrentIndex((i * 2) % testimonials.length)}
                    className={`rounded-full transition-all ${
                      i === Math.floor(currentIndex / 2)
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                    animate={
                      i === Math.floor(currentIndex / 2)
                        ? { width: 24, height: 8 }
                        : { width: 8, height: 8 }
                    }
                    whileHover={{
                      backgroundColor: "hsl(var(--primary))",
                      scale: 1.2,
                    }}
                    aria-label={`Go to testimonial set ${i + 1}`}
                  />
                )
              )}
            </div>

            <motion.button
              onClick={handleNext}
              className="p-3 rounded-full border border-border"
              whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--accent))" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
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
};

export default TestimonialsSection;

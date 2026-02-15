import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
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
  const { t } = useLanguage();
  const testimonials = t.testimonials.data;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

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
            {t.testimonials.label}
          </p>
          <h2 className="section-heading text-foreground mb-2">
            {t.testimonials.title} <span className="italic text-primary font-medium">{t.testimonials.titleHighlight}</span>
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
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-white/50 to-background/50 backdrop-blur-sm rounded-2xl p-8 border border-border/40 hover:border-border/60 transition-all duration-300"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg border border-border/40 hover:border-border/60 hover:bg-accent transition-all duration-200"
              aria-label="Previous testimonials"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg border border-border/40 hover:border-border/60 hover:bg-accent transition-all duration-200"
              aria-label="Next testimonials"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * 2)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === Math.floor(currentIndex / 2)
                    ? "bg-primary w-8"
                    : "bg-border/40 hover:bg-border/60"
                }`}
                aria-label={`Go to testimonial group ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

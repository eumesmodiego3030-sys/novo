import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

const Logo3D = lazy(() => import("@/components/Logo3D"));

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pb-32 sm:pb-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex justify-center mb-6">
            <Suspense fallback={<div className="w-40 h-40" />}>
              <Logo3D size="xl" />
            </Suspense>
          </div>

          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 font-body">
            Birmingham, United Kingdom
          </p>

          <h1 className="section-heading text-foreground leading-[1.1] mb-6">
            Transforming beauty and boosting{" "}
            <span className="italic text-primary">confidence!</span>
          </h1>

          <div className="luxury-divider" />

          <p className="section-subheading mt-6 mb-10">
            Advanced Brazilian aesthetics with exceptional results, personalised care and total client satisfaction.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("#booking")}
              className="btn-primary-luxury"
            >
              Book Now
            </button>
            <a
              href="https://wa.me/447492934010"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              WhatsApp Consultation
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hidden sm:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-body">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-foreground/20"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

import ScrollReveal from "./ScrollReveal";
import { AnimatedText } from "./AnimatedText";
import { useLanguage } from "@/i18n/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-luxury">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body text-xl">
              {t.contact.label}
            </p>
            <h2 className="section-heading text-foreground mb-2">
              <AnimatedText 
                text={t.contact.title}
                staggerDelay={0.02}
              /> 
              <span className="italic text-primary font-medium"> {t.contact.titleHighlight}</span>
            </h2>
            <div className="luxury-divider" />
          </div>
        </ScrollReveal>

        {/* Map */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-3xl overflow-hidden h-96 border border-border/50 shadow-lg">
            <iframe
              title="Tatiana Torres Brazilian Aesthetic & Beauty - Bearwood, Birmingham"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3273.0789090909093!2d-2.0147!3d52.509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487095a2c5555555%3A0x1234567890abcdef!2s382%20Bearwood%20Rd%2C%20B66%204ET!5e0!3m2!1sen!2suk!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;

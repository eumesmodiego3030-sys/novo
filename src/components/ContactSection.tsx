import ScrollReveal from "./ScrollReveal";
import { AnimatedText } from "./AnimatedText";
import { AdvancedForm } from "./AdvancedForm";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";

const ContactSection = () => {
  const { t } = useLanguage();

  const contactFields = [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Your full name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'your@email.com',
      required: true,
    },
    {
      name: 'phone',
      type: 'phone',
      label: 'Phone Number',
      placeholder: '+44 7492 934010',
      required: false,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Tell us about your inquiry...',
      required: true,
    },
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    // Here you would send the data to your backend
    console.log('Form data:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollReveal delay={0.2}>
            <div className="glass-effect rounded-3xl p-8 md:p-12">
              <AdvancedForm
                fields={contactFields}
                onSubmit={handleSubmit}
                submitLabel="Send Message"
                title="Get in Touch"
                description="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
              />
            </div>
          </ScrollReveal>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <ScrollReveal delay={0.3}>
              <motion.div
                className="glass-effect rounded-3xl p-8 space-y-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-primary font-semibold mb-2">
                    Phone
                  </p>
                  <a
                    href="tel:+447492934010"
                    className="text-2xl font-heading text-foreground hover:text-primary transition-colors"
                  >
                    +44 7492 934010
                  </a>
                </div>

                <div className="w-px h-px bg-border/30" />

                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-primary font-semibold mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:tatiana@example.com"
                    className="text-lg font-body text-foreground hover:text-primary transition-colors"
                  >
                    contact@tatianatorres.co.uk
                  </a>
                </div>

                <div className="w-px h-px bg-border/30" />

                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-primary font-semibold mb-2">
                    Address
                  </p>
                  <p className="text-foreground font-body leading-relaxed">
                    382 Bearwood Road<br />
                    Birmingham, B66 4ET<br />
                    United Kingdom
                  </p>
                </div>

                <div className="w-px h-px bg-border/30" />

                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-primary font-semibold mb-3">
                    Follow Us
                  </p>
                  <div className="flex gap-4">
                    {['Instagram', 'Facebook', 'TikTok'].map((social) => (
                      <motion.a
                        key={social}
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Map */}
            <ScrollReveal delay={0.4}>
              <div className="rounded-3xl overflow-hidden h-80 border border-border/50 shadow-lg">
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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
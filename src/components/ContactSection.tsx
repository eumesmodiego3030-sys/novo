import ScrollReveal from "./ScrollReveal";
import { MapPin, Clock, Phone } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="section-luxury">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            Visit us
          </p>
          <h2 className="section-heading text-foreground mb-2">
            Contact & <span className="italic text-primary">Location</span>
          </h2>
          <div className="luxury-divider" />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info */}
        <ScrollReveal>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading text-lg font-medium text-foreground mb-1">
                  Address
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  Tatiana Torres Beauty<br />
                  Birmingham, United Kingdom
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading text-lg font-medium text-foreground mb-1">
                  Opening Hours
                </h3>
                <div className="text-sm text-muted-foreground font-body space-y-1">
                  <p>Monday – Friday: 9:00 – 18:00</p>
                  <p>Saturday: 10:00 – 16:00</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-heading text-lg font-medium text-foreground mb-1">
                  Get in Touch
                </h3>
                <div className="flex gap-4 mt-2">
                  <a
                    href="https://wa.me/44XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-rose-deep transition-colors font-body"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://instagram.com/tatianatorresbeauty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-rose-deep transition-colors font-body"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Map */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-2xl overflow-hidden h-80 lg:h-full min-h-[320px] border border-border/50">
            <iframe
              title="Tatiana Torres Beauty - Birmingham"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155421.56282590924!2d-2.0269!3d52.4862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870942d1b417173%3A0xca81fef0aeee7998!2sBirmingham%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000"
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
  </section>
);

export default ContactSection;

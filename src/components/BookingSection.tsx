import ScrollReveal from "./ScrollReveal";

const BookingSection = () =>
<section id="booking" className="section-luxury">
    <div className="max-w-3xl mx-auto text-center">
      <ScrollReveal>
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body font-extrabold">
          Ready to begin?
        </p>
        <h2 className="section-heading text-foreground mb-2">
          Book Your <span className="italic text-primary font-medium">Consultation</span>
        </h2>
        <div className="luxury-divider" />
        <p className="section-subheading mt-6 mb-10 font-medium">
          Take the first step towards enhancing your natural beauty. Book a personalised
          consultation with Tatiana today — online or via WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
          href="https://wa.me/447492934010"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp">

            WhatsApp Consultation
          </a>
          <a
          href="#"
          className="btn-primary-luxury">

            Book Online
          </a>
        </div>

        <p className="text-xs text-muted-foreground mt-8 font-body font-medium">
          Free initial consultation · No obligation · Discreet & confidential
        </p>
      </ScrollReveal>
    </div>
  </section>;


export default BookingSection;
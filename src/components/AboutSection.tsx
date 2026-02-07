import ScrollReveal from "./ScrollReveal";
import portraitImg from "@/assets/portrait-tatiana.jpg";

const AboutSection = () => (
  <section id="about" className="section-luxury">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Portrait */}
        <ScrollReveal>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={portraitImg}
                alt="Tatiana Torres - Advanced Aesthetics Professional"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl border border-primary/20 -z-10" />
          </div>
        </ScrollReveal>

        {/* Text */}
        <ScrollReveal delay={0.2}>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body">
            Meet your practitioner
          </p>
          <h2 className="section-heading text-foreground mb-2">
            About <span className="italic text-primary">Tatiana</span>
          </h2>
          <div className="luxury-divider mx-0" />

          <div className="space-y-5 mt-8">
            <p className="text-muted-foreground leading-relaxed font-body">
              I am Tatiana Torres, an advanced aesthetics professional passionate about
              enhancing each client's natural beauty. With extensive training in the latest
              techniques and a commitment to safety, I provide bespoke treatments that
              deliver subtle, elegant results.
            </p>
            <p className="text-muted-foreground leading-relaxed font-body">
              Based in Birmingham, my clinic is a warm and welcoming space where you can
              feel completely at ease. I believe that every person deserves to feel
              confident in their own skin, and I'm here to help you achieve that — naturally.
            </p>
            <p className="text-muted-foreground leading-relaxed font-body">
              From consultation to aftercare, I'm with you every step of the way,
              ensuring your experience is as exceptional as your results.
            </p>
          </div>

          <div className="flex gap-8 mt-10">
            <div>
              <span className="font-heading text-3xl text-primary">500+</span>
              <p className="text-xs text-muted-foreground mt-1 font-body">Happy Clients</p>
            </div>
            <div>
              <span className="font-heading text-3xl text-primary">10+</span>
              <p className="text-xs text-muted-foreground mt-1 font-body">Years Experience</p>
            </div>
            <div>
              <span className="font-heading text-3xl text-primary">100%</span>
              <p className="text-xs text-muted-foreground mt-1 font-body">Satisfaction</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default AboutSection;

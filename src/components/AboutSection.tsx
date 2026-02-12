import ScrollReveal from "./ScrollReveal";
import portraitImg from "@/assets/portrait-tatiana.jpg";

const AboutSection = () =>
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
              className="w-full h-[300px] lg:h-[380px] object-contain bg-white" />

            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl border border-primary/20 -z-10" />
          </div>
        </ScrollReveal>

        {/* Text */}
        <ScrollReveal delay={0.2}>
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body font-extrabold">
            Founder & Aesthetic Practitioner
          </p>
          <h2 className="section-heading text-foreground mb-2">
            About <span className="italic text-primary font-medium">Tatiana</span>
          </h2>
          <div className="luxury-divider mx-0" />

          <div className="space-y-5 mt-8">
            <p className="text-muted-foreground leading-relaxed font-body font-semibold">
              With over 25 years of experience in the beauty industry, Tatiana began her journey
              in Brazil within a family of hairdressers. At 15, she completed her first professional
              course and managed a salon for nearly a decade.
            </p>
            <p className="text-muted-foreground leading-relaxed font-body font-semibold">
              She graduated in Industrial Chemistry Technology and Quality Management.
              In 2016, she moved to England, specialising in design and micropigmentation.
            </p>
            <p className="text-muted-foreground leading-relaxed font-body font-semibold">
              In 2020, she co-founded the first Brazilian salon in Birmingham and in 2023,
              opened her own clinic. She holds a Level 7 postgraduate qualification in
              advanced aesthetics and injectable procedures.
            </p>
          </div>

          <div className="flex gap-8 mt-10">
            <div>
              <span className="font-heading text-3xl text-primary font-extrabold">25+</span>
              <p className="text-xs text-muted-foreground mt-1 font-body font-medium">Years Experience</p>
            </div>
            <div>
              <span className="font-heading text-3xl text-primary font-extrabold">Level 7</span>
              <p className="text-xs text-muted-foreground mt-1 font-body font-medium">Qualification</p>
            </div>
            <div>
              <span className="font-heading text-3xl text-primary font-extrabold">100%</span>
              <p className="text-xs text-muted-foreground mt-1 font-body font-medium">Dedication</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>;


export default AboutSection;
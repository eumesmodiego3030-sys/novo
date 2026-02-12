import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone } from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/tatianatorresbeauty",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/tatianatorresbeauty",
    icon: Facebook,
  },
  {
    label: "Phone",
    href: "tel:+447492934010",
    icon: Phone,
  },
];

const Footer = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <button onClick={() => scrollTo("#home")} className="flex flex-col text-left">
              <span className="font-heading text-2xl font-light text-foreground">
                Tatiana Torres
              </span>
              <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground font-body">
                Brazilian Aesthetic & Beauty
              </span>
            </button>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed font-body">
              382 Bearwood Road, B66 4ET — Birmingham, UK<br />
              📞 07492 934010
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <s.icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-lg font-medium text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["About", "Treatments", "Testimonials", "Contact", "Booking"].map((l) => (
                <li key={l}>
                  <button
                    onClick={() => scrollTo(`#${l.toLowerCase()}`)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-lg font-medium text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 text-center">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} Tatiana Torres Brazilian Aesthetic & Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

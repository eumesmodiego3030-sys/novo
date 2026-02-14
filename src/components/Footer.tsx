import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
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

          {/* Address & Hours */}
          <div>
            <h4 className="font-heading text-lg font-medium text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {t.footer.location}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-body mb-6">
              {t.contact.addressValue.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                  {i === 1 && <br />}
                </span>
              ))}
            </p>

            <h4 className="font-heading text-lg font-medium text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {t.footer.hours}
            </h4>
            <div className="text-sm text-muted-foreground font-body space-y-1">
              <p>{t.contact.hours.weekday}</p>
              <p>{t.contact.hours.saturday}</p>
              <p>{t.contact.hours.sunday}</p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-lg font-medium text-foreground mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {["About", "Treatments", "Testimonials", "Prices", "Booking"].map((l) => (
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
              {t.footer.policies}
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
            © {new Date().getFullYear()} Tatiana Torres Brazilian Aesthetic & Beauty. {t.footer.allRightsReserved}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useLanguage } from "@/i18n/LanguageContext";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const languages = [
  { code: "en" as const, name: "English", flag: "🇬🇧" },
  { code: "pt" as const, name: "Português", flag: "🇵🇹" },
  { code: "es" as const, name: "Español", flag: "🇪🇸" },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-background/50 transition-colors duration-300"
        aria-label="Select language"
        title="Select language"
      >
        <span className="text-xl leading-none">{currentLanguage.flag}</span>
        <ChevronDown
          className={`w-3 h-3 text-foreground/70 transition-transform duration-300 mt-0.5 ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-background border border-border/30 rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 flex items-center gap-2 text-xs transition-colors duration-200 ${
                language === lang.code
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70 hover:bg-background/80"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

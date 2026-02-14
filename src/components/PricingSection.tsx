import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCart } from "@/i18n/CartContext";

interface PriceItem {
  name: string;
  price: string;
}

interface PriceCategory {
  title: string;
  emoji: string;
  treatmentId?: string;
  items: PriceItem[];
  note?: string;
}

const categories: PriceCategory[] = [
{
  title: "Facial Aesthetics & Injectables",
  emoji: "💉",
  treatmentId: "facial-aesthetics-injectables",
  items: [
  { name: "Anti-Wrinkle Injection – 1 Area", price: "£200" },
  { name: "Anti-Wrinkle Injection – 2 Areas", price: "£240" },
  { name: "Anti-Wrinkle Injection – 3 Areas", price: "£280" },
  { name: "Profhilo (1 session)", price: "£300" },
  { name: "Profhilo Face & Neck", price: "£560" },
  { name: "Mesotherapy Face & Body", price: "£120" },
  { name: "Lumi Eye", price: "£200" },
  { name: "Lumi Pro", price: "£120" },
  { name: "Lip Filler 1ml", price: "£180" },
  { name: "Filler Dissolver", price: "£100" }]

},
{
  title: "Skin Treatments",
  emoji: "✨",
  treatmentId: "skin-treatments",
  items: [
  { name: "Chemical Peel (single)", price: "£120" },
  { name: "Chemical Peel (3 sessions)", price: "£310" },
  { name: "Microneedling (single)", price: "£90" },
  { name: "Microneedling (3 sessions)", price: "£235" },
  { name: "Microneedling Face & Neck", price: "£140" },
  { name: "Deep Cleansing Facial", price: "£50" },
  { name: "Clear Skin Acne Facial", price: "£60" },
  { name: "Deep Back Cleanse", price: "£70" }]

},
{
  title: "Body Treatments",
  emoji: "🧴",
  treatmentId: "body-treatments",
  items: [
  { name: "Scalp Microneedling for Hair Loss", price: "£80" },
  { name: "Stretch Marks Microneedling (session)", price: "£80" },
  { name: "Stretch Marks Microneedling (5 sessions)", price: "£350" },
  { name: "Vitamin B12", price: "£60" },
  { name: "Vitamin D", price: "£80" },
  { name: "Vitamin C", price: "£40" },
  { name: "Biotin", price: "£70" },
  { name: "Fat Dissolver & PDRN – Small Area", price: "£300" },
  { name: "Fat Dissolver & PDRN – Large Area", price: "£560" }]

},
{
  title: "Laser Hair Removal (Diode)",
  emoji: "⚡",
  treatmentId: "laser-hair-removal",
  items: [
  { name: "Hollywood / Brazilian", price: "£70" },
  { name: "Full Leg", price: "£80" },
  { name: "Half Leg", price: "£45" },
  { name: "Underarms", price: "£35" },
  { name: "Full Arm", price: "£60" },
  { name: "Half Arms", price: "£60" },
  { name: "Bikini Line", price: "£50" },
  { name: "Peri Anal", price: "£35" },
  { name: "Full Face", price: "£55" },
  { name: "Upper Lip", price: "£35" }],

  note: "Packages available with 10–15% discount"
},
{
  title: "Waxing",
  emoji: "🌸",
  items: [
  { name: "Hollywood / Brazilian", price: "£30" },
  { name: "Bikini Line", price: "£20" },
  { name: "Full Leg", price: "£25" },
  { name: "Half Leg", price: "£15" },
  { name: "Underarms", price: "£10" },
  { name: "Full Arms", price: "£25" },
  { name: "Upper Lip", price: "£5" },
  { name: "Face", price: "£20" },
  { name: "Chin / Nose", price: "£5" }]

},
{
  title: "Brows & Lashes",
  emoji: "👁️",
  treatmentId: "brows-lashes-waxing",
  items: [
  { name: "Eyebrow Shaping", price: "£15" },
  { name: "Henna Shaping", price: "£25" },
  { name: "Brow Tinting", price: "£10" },
  { name: "Brow Lamination", price: "£35" },
  { name: "Lash Lift & Curl", price: "£40" },
  { name: "Lash Tint", price: "£10" },
  { name: "Lash Removal", price: "£10" }]

},
{
  title: "Micropigmentation (PMU)",
  emoji: "🖊️",
  treatmentId: "micropigmentation-pmu",
  items: [
  { name: "Microblading / Nanoblading", price: "£220" },
  { name: "Eyebrows Shadow", price: "£220" },
  { name: "Eyeliner", price: "£250" },
  { name: "Lip Blush PMU", price: "£240" },
  { name: "Top-up (12–18 months)", price: "£180" }]

},
{
  title: "Brazilian Tanning",
  emoji: "☀️",
  treatmentId: "brazilian-tanning",
  items: [
  { name: "Brazilian Sunbed", price: "£50" },
  { name: "Spraytan Organic", price: "£45" },
  { name: "Banho de Lua", price: "£35" },
  { name: "Pack 4 sessions + Banho de Lua", price: "£200" },
  { name: "Sunbed + Spraytan", price: "£90" },
  { name: "Banho de Lua + 2 Sunbed", price: "£110" }]

}];


const CategoryAccordion = ({ category, index }: {category: PriceCategory;index: number;}) => {
  const { addItem, removeItem, items } = useCart();
  const [open, setOpen] = useState(index === 0);

  const handleHeaderClick = () => {
    setOpen(!open);
  };

  const getItemQuantity = (itemName: string) => {
    const item = items.find((i) => i.name === itemName);
    return item?.quantity || 0;
  };

  const handleAddItem = (item: PriceItem) => {
    const priceNumeric = parseFloat(item.price.replace("£", ""));
    addItem({
      name: item.name,
      price: item.price,
      quantity: 1,
      category: category.title,
      priceNumeric,
    });
  };

  const handleRemoveItem = (itemName: string) => {
    removeItem(itemName);
  };

  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="glass-card p-0 overflow-hidden mb-4" style={{ transform: "none" }}>
        <button
          onClick={handleHeaderClick}
          className="w-full flex items-center justify-between p-6 text-left cursor-pointer">

          <div className="flex items-center gap-3">
            <span className="text-xl">{category.emoji}</span>
            <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground">
              {category.title}
            </h3>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""}`
            }
            strokeWidth={1.5} />

        </button>

        <AnimatePresence>
          {open &&
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden">

              <div className="px-6 pb-6">
                <div className="border-t border-border/50 pt-4">
                  {category.items.map((item) => {
                    const quantity = getItemQuantity(item.name);
                    return (
                      <div
                        key={item.name}
                        className="w-full flex items-center justify-between py-3 border-b border-border/20 last:border-0 px-2"
                      >
                        <div className="flex-1">
                          <span className="text-sm text-muted-foreground font-body">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-heading text-lg font-medium text-primary whitespace-nowrap">
                            {item.price}
                          </span>
                          <div className="flex items-center gap-2 bg-accent/50 rounded-lg p-1">
                            {quantity > 0 ? (
                              <>
                                <button
                                  onClick={() => handleRemoveItem(item.name)}
                                  className="w-6 h-6 flex items-center justify-center hover:bg-accent transition-colors rounded text-destructive"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center font-medium text-sm">
                                  {quantity}
                                </span>
                              </>
                            ) : null}
                            <button
                              onClick={() => handleAddItem(item)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-primary/90 bg-primary text-primary-foreground transition-colors rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {category.note &&
                    <p className="text-xs text-primary mt-3 font-body italic">{category.note}</p>
                  }
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
};

const PricingSection = () => {
  const { t } = useLanguage();

  return (
    <section id="prices" className="section-luxury">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-body font-extrabold">
              {t.pricing.label}
            </p>
            <h2 className="section-heading text-foreground mb-2">
              {t.pricing.title} <span className="italic text-primary font-medium">{t.pricing.titleHighlight}</span>
            </h2>
            <div className="luxury-divider" />
            <p className="section-subheading mt-6 font-normal">
              {t.pricing.description}
            </p>
          </div>
        </ScrollReveal>

        {categories.map((cat, i) =>
        <CategoryAccordion key={cat.title} category={cat} index={i} />
        )}

        <ScrollReveal>
          <div className="text-center mt-12">
            


          </div>
        </ScrollReveal>
      </div>
    </section>);

};

export default PricingSection;
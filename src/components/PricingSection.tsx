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
                  {category.items.map((item, itemIdx) => {
                    const quantity = getItemQuantity(item.name);
                    return (
                      <motion.div
                        key={item.name}
                        className="w-full flex items-center justify-between py-3 border-b border-border/20 last:border-0 px-2 cursor-pointer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIdx * 0.05 }}
                        whileHover={{ backgroundColor: "hsl(var(--accent)/0.3)", x: 4 }}
                      >
                        <div className="flex-1">
                          <motion.span
                            className="text-sm text-muted-foreground font-body"
                            whileHover={{ color: "hsl(var(--foreground))" }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                        </div>
                        <div className="flex items-center gap-3">
                          <motion.span
                            className="font-heading text-lg font-medium text-primary whitespace-nowrap"
                            whileHover={{ scale: 1.1, color: "hsl(var(--primary)/0.8)" }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.price}
                          </motion.span>
                          <div className="flex items-center gap-2 bg-accent/50 rounded-lg p-1">
                            {quantity > 0 ? (
                              <>
                                <motion.button
                                  onClick={() => handleRemoveItem(item.name)}
                                  className="w-6 h-6 flex items-center justify-center hover:bg-accent transition-colors rounded text-destructive"
                                  whileHover={{ scale: 1.2, rotate: 180 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Minus className="w-4 h-4" />
                                </motion.button>
                                <motion.span
                                  className="w-6 text-center font-medium text-sm"
                                  key={quantity}
                                  initial={{ scale: 0.8 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {quantity}
                                </motion.span>
                              </>
                            ) : null}
                            <motion.button
                              onClick={() => handleAddItem(item)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-primary/90 bg-primary text-primary-foreground transition-colors rounded"
                              whileHover={{ scale: 1.2, rotate: 90 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
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
  const categories = t.pricing.prices;

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

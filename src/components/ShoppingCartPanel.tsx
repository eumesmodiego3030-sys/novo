import { useCart } from "@/i18n/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";
import { useState } from "react";

const ShoppingCartPanel = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;

    const itemsList = items
      .map((item) => `${item.name} (${item.category}) - £${item.priceNumeric} x ${item.quantity}`)
      .join("\n");

    const total = getTotalPrice();
    const message = `Olá! Gostaria de agendar os seguintes serviços:\n\n${itemsList}\n\nTotal: ${total}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/447492934010?text=${encodedMessage}`, "_blank");
    
    clearCart();
    setIsOpen(false);
  };

  const isSmallScreen = window.innerWidth < 768;

  return (
    <>
      {/* Botão flutuante do carrinho */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShoppingCart className="w-6 h-6" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </motion.button>

      {/* Painel do carrinho */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Painel */}
            <motion.div
              initial={{ x: isSmallScreen ? "100%" : 0, y: isSmallScreen ? "100%" : 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: isSmallScreen ? "100%" : 0, y: isSmallScreen ? "100%" : 0 }}
              className={`fixed z-50 bg-background border border-border ${
                isSmallScreen
                  ? "bottom-0 left-0 right-0 rounded-t-2xl max-h-[80vh]"
                  : "right-0 top-0 w-96 h-screen rounded-l-2xl"
              } shadow-2xl overflow-y-auto`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-medium">Carrinho</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-2 hover:bg-accent transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {items.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Seu carrinho está vazio
                  </p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <motion.div
                          key={item.name}
                          className="bg-accent/50 rounded-lg p-4 space-y-3 cursor-pointer"
                          whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--accent)/0.7)" }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.category}</p>
                            </div>
                            <motion.button
                              onClick={() => removeItem(item.name)}
                              className="text-muted-foreground hover:text-destructive"
                              whileHover={{ scale: 1.2, rotate: 180 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 bg-background rounded-lg p-1">
                              <motion.button
                                onClick={() =>
                                  updateQuantity(item.name, item.quantity - 1)
                                }
                                className="w-7 h-7 flex items-center justify-center hover:bg-accent transition-colors rounded"
                                whileHover={{ scale: 1.2, rotate: -90 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                −
                              </motion.button>
                              <motion.span 
                                className="w-8 text-center font-medium"
                                animate={{ scale: 1 }}
                                key={item.quantity}
                                initial={{ scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.quantity}
                              </motion.span>
                              <motion.button
                                onClick={() =>
                                  updateQuantity(item.name, item.quantity + 1)
                                }
                                className="w-7 h-7 flex items-center justify-center hover:bg-accent transition-colors rounded"
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                +
                              </motion.button>
                            </div>
                            <p className="font-heading font-medium text-primary">
                              £{(item.priceNumeric * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border my-6" />

                    {/* Total */}
                    <div className="bg-primary/10 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <p className="text-foreground font-medium">Total:</p>
                        <p className="text-2xl font-heading font-bold text-primary">
                          {getTotalPrice()}
                        </p>
                      </div>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => clearCart()}
                        className="flex-1 py-3 px-4 rounded-lg border border-border hover:bg-accent transition-colors font-medium"
                      >
                        Limpar
                      </button>
                      <button
                        onClick={handleCheckout}
                        className="flex-1 py-3 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                      >
                        Finalizar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShoppingCartPanel;

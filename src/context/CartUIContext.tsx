import { createContext, useContext, useState, ReactNode } from 'react';

interface CartUIContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartUIContext = createContext<CartUIContextType | undefined>(undefined);

export function CartUIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartUIContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CartUIContext.Provider>
  );
}

export function useCartUI() {
  const context = useContext(CartUIContext);
  if (!context) {
    throw new Error('useCartUI must be used within CartUIProvider');
  }
  return context;
}

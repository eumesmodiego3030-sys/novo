import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const RippleButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary'
}: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ id: string; x: number; y: number }>>([]);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = `${Date.now()}-${Math.random()}`;

    setRipples(prev => [...prev, { id, x, y }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);

    onClick?.(e);
  };

  const variantClasses = {
    primary: 'btn-primary-luxury',
    secondary: 'btn-outline-luxury',
    outline: 'border border-foreground/20 rounded-full px-8 py-3 hover:bg-foreground/5'
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={`relative overflow-hidden ${variantClasses[variant]} ${className}`}
    >
      {children}

      {/* Ripple effect */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </button>
  );
};

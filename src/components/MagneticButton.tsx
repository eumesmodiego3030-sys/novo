import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

export const MagneticButton = ({ 
  children, 
  onClick, 
  className = '', 
  strength = 0.3 
}: MagneticButtonProps) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distX = (e.clientX - centerX) * strength;
    const distY = (e.clientY - centerY) * strength;
    
    setOffset({ x: distX, y: distY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      className={`relative ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{
          boxShadow: offset.x !== 0 || offset.y !== 0 
            ? '0 20px 40px rgba(0,0,0,0.2)'
            : '0 4px 20px rgba(0,0,0,0.1)'
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.button>
  );
};

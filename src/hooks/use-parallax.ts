import { useRef, useEffect, useState } from 'react';

export const useParallax = (offset: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementCenter = rect.top + window.innerHeight / 2;
      
      if (elementCenter < window.innerHeight) {
        setTranslateY(scrollY * offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return { 
    ref, 
    style: { transform: `translateY(${translateY}px)` } 
  };
};

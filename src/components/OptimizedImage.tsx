import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  srcWebp?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  blurDataUrl?: string;
  onLoad?: () => void;
}

export const OptimizedImage = ({
  src,
  srcWebp,
  alt,
  width,
  height,
  className = '',
  blurDataUrl,
  onLoad
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { margin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : 'auto',
      }}
    >
      {/* Blur placeholder */}
      {blurDataUrl && !isLoaded && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${blurDataUrl})` }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Image */}
      {inView && (
        <picture>
          {srcWebp && (
            <source srcSet={srcWebp} type="image/webp" />
          )}
          <motion.img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            className="w-full h-full object-cover"
            onLoad={() => {
              setIsLoaded(true);
              onLoad?.();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
        </picture>
      )}
    </div>
  );
};

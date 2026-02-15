import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
}

/**
 * Imagem otimizada com suporte a AVIF, WebP e srcset responsivo
 * Mostra blur placeholder enquanto carrega
 */
export const OptimizedImageV2 = ({
  src,
  alt,
  width,
  height,
  className = '',
  sizes = '100vw',
  priority = false,
  onLoad,
}: ResponsiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Gerar URLs para diferentes formatos
  const getImageUrl = (format: 'avif' | 'webp' | 'jpg') => {
    const baseUrl = src.replace(/\.[^.]+$/, ''); // Remove extensão
    const ext = { avif: 'avif', webp: 'webp', jpg: 'jpg' };
    return `${baseUrl}.${ext[format]}`;
  };

  // Gerar srcset responsivo
  const getSrcSet = (format: 'avif' | 'webp' | 'jpg') => {
    const baseUrl = src.replace(/\.[^.]+$/, '');
    const ext = { avif: 'avif', webp: 'webp', jpg: 'jpg' };
    return [
      `${baseUrl}.${ext[format]} 1x`,
      `${baseUrl}@2x.${ext[format]} 2x`,
      `${baseUrl}@3x.${ext[format]} 3x`,
    ].join(', ');
  };

  useEffect(() => {
    if (priority && imgRef.current) {
      imgRef.current.loading = 'eager';
    }
  }, [priority]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur Placeholder */}
      {!isLoaded && !hasError && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-foreground/5 blur-md"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Picture com múltiplos formatos */}
      <picture>
        {/* AVIF (melhor compressão) */}
        <source
          srcSet={getSrcSet('avif')}
          type="image/avif"
          sizes={sizes}
        />

        {/* WebP (bom suporte) */}
        <source
          srcSet={getSrcSet('webp')}
          type="image/webp"
          sizes={sizes}
        />

        {/* Fallback JPG */}
        <img
          ref={imgRef}
          src={getImageUrl('jpg')}
          srcSet={getSrcSet('jpg')}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => {
            setIsLoaded(true);
            onLoad?.();
          }}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
        />
      </picture>

      {/* Fallback message */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
          <span className="text-sm text-muted-foreground">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

/**
 * Background image otimizado com AVIF/WebP
 */
export const OptimizedBackgroundImage = ({
  src,
  className = '',
  children,
}: {
  src: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const baseUrl = src.replace(/\.[^.]+$/, '');

  return (
    <div
      className={className}
      style={{
        backgroundImage: `
          url('${baseUrl}.avif'),
          url('${baseUrl}.webp'),
          url('${baseUrl}.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  );
};

/**
 * Hero image otimizado (prioridade máxima)
 */
export const HeroOptimizedImage = ({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <OptimizedImageV2
      src={src}
      alt={alt}
      priority
      sizes="100vw"
      className={className}
    />
  );
};

/**
 * Thumbnail otimizado (baixa prioridade)
 */
export const ThumbnailOptimizedImage = ({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <OptimizedImageV2
      src={src}
      alt={alt}
      priority={false}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className={className}
    />
  );
};

/**
 * Gerador de imagens otimizadas (CLI)
 * Use isso no seu CI/CD para gerar AVIF e WebP
 *
 * npm install -D sharp
 *
 * import sharp from 'sharp';
 *
 * export async function generateOptimizedImages(inputPath: string) {
 *   const input = sharp(inputPath);
 *
 *   // AVIF (melhor compressão, ~50% menor que WebP)
 *   await input
 *     .avif({ quality: 80 })
 *     .toFile(inputPath.replace(/\.[^.]+$/, '') + '.avif');
 *
 *   // WebP (bom suporte, ~30% menor que JPG)
 *   await input
 *     .webp({ quality: 80 })
 *     .toFile(inputPath.replace(/\.[^.]+$/, '') + '.webp');
 *
 *   // 2x e 3x
 *   const img = sharp(inputPath);
 *   const metadata = await img.metadata();
 *   if (metadata.width) {
 *     await img
 *       .resize(metadata.width * 2)
 *       .avif({ quality: 80 })
 *       .toFile(inputPath.replace(/\.[^.]+$/, '') + '@2x.avif');
 *   }
 * }
 */

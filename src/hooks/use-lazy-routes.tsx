import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/**
 * Page Loading Skeleton
 * Exibido enquanto componente está carregando
 */
export function PageLoadingSkeleton() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-12 h-12 text-primary mx-auto" />
        </motion.div>
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </motion.div>
  );
}

/**
 * Component Loading Skeleton - para componentes menores
 */
export function ComponentLoadingSkeleton() {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="h-12 bg-foreground/10 rounded-lg"
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          style={{
            backgroundImage:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            backgroundSize: '200% 100%',
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      ))}
    </motion.div>
  );
}

/**
 * Lazy-loaded pages com route-based code splitting
 * Cada página é carregada sob demanda, reduzindo bundle inicial
 */
export const LazyPages = {
  // Main pages (carregados menos frequentemente)
  Index: lazy(() => import('@/pages/Index')),
  NotFound: lazy(() => import('@/pages/NotFound')),
  PrivacyPolicy: lazy(() => import('@/pages/PrivacyPolicy')),
  TermsAndConditions: lazy(() => import('@/pages/Terms')),
  CookiePolicy: lazy(() => import('@/pages/CookiePolicy')),
};

/**
 * Wrapper component para lazy routes com suspense
 */
export function LazyRouteWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      {children}
    </Suspense>
  );
}

/**
 * Lazy-loaded sections com route-based code splitting
 */
export const LazySections = {
  HeroSection: lazy(() => import('@/components/HeroSection')),
  TreatmentsSection: lazy(() => import('@/components/TreatmentsSection')),
  PricingSection: lazy(() => import('@/components/PricingSection')),
  BeforeAfterSection: lazy(() => import('@/components/BeforeAfterSection')),
  TestimonialsSection: lazy(() => import('@/components/TestimonialsSection')),
  ContactSection: lazy(() => import('@/components/ContactSection')),
};

/**
 * Lazy-loaded heavy components
 * Logo3D é o mais pesado (~969KB), só carregar quando necessário
 */
export const LazyComponents = {
  Logo3D: lazy(() => import('@/components/Logo3D')),
  ShoppingCartPanel: lazy(() => import('@/components/ShoppingCartPanel')),
  VideoSection: lazy(() => import('@/components/VideoSection')),
};

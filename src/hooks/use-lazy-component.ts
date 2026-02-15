import { Suspense, ComponentType, lazy, ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface LazyComponentProps {
  delay?: number;
  fallback?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Higher-order component for lazy loading with suspense
 * Automatically splits code for the component
 * Usage: const LazyComponent = withLazyLoad(Component);
 */
export function withLazyLoad<P extends object>(
  Component: ComponentType<P>,
  displayName?: string
) {
  const LazyComponent = lazy(() =>
    import(`../components/${displayName || Component.name}`).then((module) => ({
      default: Component,
    }))
  );

  const WrappedComponent = (props: P & LazyComponentProps) => {
    const { delay = 0, fallback, className = '', style, ...componentProps } =
      props as any;

    return (
      <Suspense
        fallback={
          fallback || (
            <motion.div
              className={`p-8 flex items-center justify-center ${className}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={style}
            >
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ y: [-8, 0, -8] }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )
        }
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.3 }}
          className={className}
          style={style}
        >
          <LazyComponent {...(componentProps as P)} />
        </motion.div>
      </Suspense>
    );
  };

  WrappedComponent.displayName = `withLazyLoad(${displayName || Component.name})`;
  return WrappedComponent;
}

/**
 * Hook for dynamic lazy loading of components
 * Returns a component that can be rendered with code splitting
 */
export function useLazyComponent<P extends object>(
  loader: () => Promise<{ default: ComponentType<P> }>,
  fallback?: ReactNode
) {
  const Component = lazy(loader);

  return function LazyComponent(props: P) {
    return (
      <Suspense fallback={fallback || <LoadingSkeleton />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

/**
 * Component for lazy loading routes
 * Usage in React Router:
 * const LazyPage = LazyRoute(() => import('@/pages/Page'))
 */
export const LazyRoute = lazy;

/**
 * Custom loading skeleton for lazy components
 */
export function LoadingSkeleton() {
  return (
    <motion.div
      className="w-full h-screen flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="space-y-4 w-full max-w-md px-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="h-4 bg-foreground/10 rounded"
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
      </div>
    </motion.div>
  );
}

/**
 * Utility to preload a component
 * Use in useEffect or event handlers to preload before navigation
 */
export function preloadComponent(
  loader: () => Promise<{ default: ComponentType<any> }>
) {
  loader().catch((err) => console.error('Failed to preload component:', err));
}

/**
 * Custom Suspense wrapper with error boundary pattern
 */
export function LazyComponentBoundary({
  children,
  fallback = <LoadingSkeleton />,
  onError,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

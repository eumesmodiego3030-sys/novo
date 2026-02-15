import { useCallback, useEffect, useState } from 'react';

/**
 * Monitorar e registrar tamanho de bundle e performance
 * Útil para rastrear melhorias ao longo do tempo
 */
interface BundleMetrics {
  timestamp: string;
  totalSize: number;
  chunks: Array<{
    name: string;
    size: number;
    compressed: number;
  }>;
  largestChunks: Array<{
    name: string;
    size: number;
  }>;
  performanceMetrics: {
    fcp: number | null; // First Contentful Paint
    lcp: number | null; // Largest Contentful Paint
    fid: number | null; // First Input Delay
    cls: number | null; // Cumulative Layout Shift
  };
}

/**
 * Hook para monitorar Core Web Vitals
 */
export function useCoreWebVitals() {
  const [metrics, setMetrics] = useState<BundleMetrics['performanceMetrics']>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
  });

  useEffect(() => {
    // Observer para Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics((prev) => ({
            ...prev,
            lcp: lastEntry.startTime,
          }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (deprecated but still useful)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          setMetrics((prev) => ({
            ...prev,
            fid: entries[0].processingDuration,
          }));
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let cls = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              cls += (entry as any).value;
            }
          }
          setMetrics((prev) => ({
            ...prev,
            cls,
          }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (e) {
        console.debug('Performance monitoring not available');
      }
    }
  }, []);

  return metrics;
}

/**
 * Hook para rastrear quando chunks são carregados
 * Útil para identificar bottlenecks de lazy loading
 */
export function useChunkLoadMetrics() {
  const [loadedChunks, setLoadedChunks] = useState<Map<string, number>>(new Map());

  const recordChunkLoad = useCallback((chunkName: string) => {
    setLoadedChunks((prev) => {
      const next = new Map(prev);
      next.set(chunkName, performance.now());
      return next;
    });
  }, []);

  return { loadedChunks, recordChunkLoad };
}

/**
 * Preload estratégico de chunks críticos
 * Use para preload de chunks que serão usados em breve
 */
export function useChunkPreloader() {
  const preloadChunk = useCallback(async (chunkPath: string) => {
    try {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = chunkPath;
      document.head.appendChild(link);
    } catch (err) {
      console.debug('Chunk preload failed:', err);
    }
  }, []);

  return { preloadChunk };
}

/**
 * Monitor de renderização e re-renders desnecessários
 */
export function useRenderMetrics(componentName: string) {
  useEffect(() => {
    const renderTime = performance.now();
    return () => {
      const endTime = performance.now();
      const duration = endTime - renderTime;
      
      if (duration > 16.67) { // 60 FPS threshold
        console.warn(
          `[Performance] ${componentName} took ${duration.toFixed(2)}ms to render`
        );
      }
    };
  }, [componentName]);
}

/**
 * Reporte de bundle size para analytics
 */
export async function reportBundleMetrics() {
  if (!('PerformanceObserver' in window)) return;

  try {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    const metrics = {
      // Network timings
      dns: perfData.domainLookupEnd - perfData.domainLookupStart,
      tcp: perfData.connectEnd - perfData.connectStart,
      ttfb: perfData.responseStart - perfData.requestStart,
      download: perfData.responseEnd - perfData.responseStart,
      
      // Processing
      dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
      load: perfData.loadEventEnd - perfData.loadEventStart,
      
      // Total
      pageLoadTime: perfData.loadEventEnd - perfData.fetchStart,
    };

    return metrics;
  } catch (err) {
    console.debug('Bundle metrics not available');
  }
}

/**
 * Log de importações dinâmicas para análise
 */
export function logDynamicImport(moduleName: string, size?: number) {
  if (typeof window !== 'undefined' && (window as any).__CHUNK_LOAD_LOG) {
    (window as any).__CHUNK_LOAD_LOG.push({
      module: moduleName,
      timestamp: new Date().toISOString(),
      size,
    });
  }
}

/**
 * Inicializar coleta de métricas
 */
export function initMetricsCollection() {
  if (typeof window !== 'undefined') {
    (window as any).__CHUNK_LOAD_LOG = [];
    
    // Limpar log periodicamente para evitar memory leak
    setInterval(() => {
      if ((window as any).__CHUNK_LOAD_LOG?.length > 100) {
        (window as any).__CHUNK_LOAD_LOG.shift();
      }
    }, 60000); // A cada minuto
  }
}

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Hook para otimizar performance de componentes com scroll
 * Desativa re-renders desnecessários e usa IntersectionObserver
 */
export function useScrollPerformance() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

/**
 * Hook para otimizar bundles com lazy loading de imagens
 * Reduz o tamanho inicial do bundle
 */
export function useLazyImage(src: string) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { ref, isVisible } = useScrollPerformance();

  useEffect(() => {
    if (!isVisible) {
      setImageSrc(null);
      setIsLoading(true);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      setError(new Error(`Failed to load image: ${src}`));
      setIsLoading(false);
    };
    img.src = src;
  }, [isVisible, src]);

  return { ref, imageSrc, isLoading, error };
}

/**
 * Hook para code splitting automático de rotas
 * Permite carregar páginas sob demanda
 */
export function useRouteCodeSplitting(routeName: string) {
  const [route, setRoute] = useState<{
    component: React.ComponentType<any> | null;
    loading: boolean;
    error: Error | null;
  }>({
    component: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadRoute = async () => {
      try {
        const module = await import(
          `../pages/${routeName}.tsx`
        );
        setRoute({
          component: module.default,
          loading: false,
          error: null,
        });
      } catch (err) {
        setRoute({
          component: null,
          loading: false,
          error: err instanceof Error ? err : new Error('Failed to load route'),
        });
      }
    };

    loadRoute();
  }, [routeName]);

  return route;
}

/**
 * Hook para monitorar performance de bundle
 * Ajuda a identificar componentes pesados
 */
export function useComponentPerformance(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      if (renderTime > 16) {
        // Mais de una frame (60fps)
        console.warn(
          `[Performance] ${componentName} levou ${renderTime.toFixed(2)}ms para renderizar`
        );
      }
    };
  }, [componentName]);
}

/**
 * Hook para otimizar re-renders com useMemo baseado em dependências
 */
export function useMemoDeep<T>(factory: () => T, deps: any[]): T {
  const [value, setValue] = useState<T>(() => factory());
  const [prevDeps, setPrevDeps] = useState(deps);

  // Deep comparison of dependencies
  const depsChanged = prevDeps.length !== deps.length ||
    prevDeps.some((dep, i) => JSON.stringify(dep) !== JSON.stringify(deps[i]));

  if (depsChanged) {
    setValue(factory());
    setPrevDeps(deps);
  }

  return value;
}

/**
 * Hook para debounce de valores para otimizar performance
 */
export function useDebouncedValue<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook para gerenciar estado com undo/redo
 * Otimiza histórico sem manter referências desnecessárias
 */
export function useUndoRedo<T>(
  initialValue: T,
  maxHistory: number = 50
) {
  const [history, setHistory] = useState<T[]>([initialValue]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = history[currentIndex];

  const addToHistory = (newValue: T) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newValue);

    if (newHistory.length > maxHistory) {
      newHistory.shift();
    } else {
      setCurrentIndex(newHistory.length - 1);
    }

    setHistory(newHistory);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return {
    current,
    addToHistory,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
  };
}

/**
 * Hook para gerenciar state simples sem Redux/Zustand
 * Perfeito para componentes medium-complexity
 */
export function useReducerState<T extends Record<string, any>>(
  initialState: T
) {
  const [state, setState] = useState(initialState);

  const updateState = (updates: Partial<T>) => {
    setState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return [state, updateState, resetState] as const;
}

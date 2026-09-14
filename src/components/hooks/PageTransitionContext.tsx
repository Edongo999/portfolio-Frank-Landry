import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type PageTransitionContextType = {
  loading: boolean;
  startTransition: (callback?: () => void) => void;
};

const PageTransitionContext = createContext<PageTransitionContextType | null>(
  null
);

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const startTransition = useCallback((callback?: () => void) => {
    // Évite plusieurs transitions simultanées
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    setLoading(true);

    timeoutRef.current = window.setTimeout(() => {
      callback?.();
      setLoading(false);
      timeoutRef.current = null;
    }, 1800);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <PageTransitionContext.Provider
      value={{
        loading,
        startTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error(
      'usePageTransition doit être utilisé à l’intérieur de PageTransitionProvider'
    );
  }

  return context;
}

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import React from "react";

/**
 * Inicializar Sentry para error tracking e performance monitoring
 * Capture erros automaticamente + Web Vitals
 */
export function initSentry() {
  Sentry.init({
    // Substitua pela sua DSN do Sentry
    dsn: import.meta.env.VITE_SENTRY_DSN || "",
    environment: import.meta.env.MODE,
    
    // Performance Monitoring
    integrations: [
      new BrowserTracing({
        // Rastrear navegação
        tracingOrigins: ["localhost", /^\//],
        // Monitorar HTTP requests
        traceFetch: true,
        traceXhr: true,
      }),
    ],

    // Performance
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    
    // Release tracking
    release: import.meta.env.VITE_APP_VERSION,

    // Filtrar erros irrelevantes
    beforeSend(event, hint) {
      // Ignorar erros de script do navegador
      if (event.exception) {
        const exception = hint.originalException;
        if (exception instanceof Error) {
          // Ignorar erros de CORS/PWA
          if (
            exception.message.includes("CORS") ||
            exception.message.includes("manifest")
          ) {
            return null;
          }
        }
      }
      return event;
    },

    // Enviar User Feedback
    attachStacktrace: true,
    maxBreadcrumbs: 50,
  });
}

/**
 * Rastrear evento customizado
 */
export function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number
) {
  Sentry.captureMessage(`${category}: ${action}`, "info");
}

/**
 * Rastrear conversão/lead
 */
export function trackConversion(conversionType: string, value?: number) {
  Sentry.captureMessage(`Conversion: ${conversionType}`, "info");
}

/**
 * Rastrear página view
 */
export function trackPageView(pageName: string) {
  if (window.location.pathname !== pageName) {
    Sentry.captureMessage(`Page: ${pageName}`, "info");
  }
}

/**
 * Set user context para melhor debugging
 */
export function setUserContext(userId?: string, email?: string) {
  if (userId || email) {
    Sentry.setUser({
      id: userId,
      email: email,
    });
  } else {
    Sentry.setUser(null);
  }
}

/**
 * Rastrear erro customizado
 */
export function captureError(
  error: Error | string,
  context?: Record<string, any>
) {
  if (typeof error === "string") {
    Sentry.captureException(new Error(error), { extra: context });
  } else {
    Sentry.captureException(error, { extra: context });
  }
}

/**
 * Rastrear form submission
 */
export function trackFormSubmission(formName: string, success: boolean) {
  Sentry.captureMessage(
    `Form ${formName}: ${success ? "success" : "failed"}`,
    success ? "info" : "warning"
  );
}

/**
 * Componente de fallback para erro
 */
function ErrorFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Oops! Algo deu errado
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Estamos trabalhando para corrigir o problema.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        >
          Recarregar página
        </button>
      </div>
    </div>
  );
}

/**
 * Wrapper para Sentry error boundary
 */
export const SentryErrorBoundary = Sentry.withErrorBoundary(
  ({ children }: { children: React.ReactNode }) => <>{children}</>,
  {
    fallback: React.createElement(ErrorFallback),
    showDialog: true,
  }
);

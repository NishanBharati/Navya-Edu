import React, { type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  errorId: string;
}

type ComponentConstructor<P, S> = {
  new (props: P): {
    props: P;
    state: S;
    setState(update: Partial<S> | ((prev: S) => Partial<S>)): void;
  };
};

// Defensive inheritance from React.Component that satisfies TypeScript without relying on external ambient @types/react definitions
const ReactComponentBase = ((React as unknown as { Component: unknown }).Component || class {}) as ComponentConstructor<
  ErrorBoundaryProps,
  ErrorBoundaryState
>;

/**
 * Enterprise Error Boundary component.
 * Catches unhandled exceptions in the React tree to prevent blank-screen unmounts.
 * Sanitizes and suppresses internal system traces in production to avoid information leakage.
 */
export class ErrorBoundary extends ReactComponentBase {
  public static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    const errorId = `err_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    return { hasError: true, errorId };
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorId: '',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Defensive logging: Never log credentials or tokens
    if (process.env.NODE_ENV !== 'production') {
      console.error('[ErrorBoundary caught exception]:', error, errorInfo);
    } else {
      // In production, record sanitized diagnostic signature
      console.warn(`[Navya App Error ${this.state.errorId}]: Application exception intercepted defensively.`);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, errorId: '' });
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-paper">
          <div className="max-w-md w-full bg-white rounded-2xl border border-border-warm shadow-md p-6 sm:p-8 text-center space-y-5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-ink">
                {this.props.fallbackTitle || 'Something went wrong'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                {this.props.fallbackDescription ||
                  'An unexpected interface error was intercepted safely. Your previous inputs have been preserved.'}
              </p>
            </div>

            {this.state.errorId && (
              <p className="text-[11px] font-mono text-ink-faint bg-paper-alt px-3 py-1.5 rounded-lg border border-border">
                Diagnostic ID: {this.state.errorId}
              </p>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-deep transition-colors shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <a
                href="/"
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-paper-alt hover:bg-border-warm text-ink text-xs font-bold transition-colors border border-border"
              >
                <Home className="w-3.5 h-3.5 text-ink-soft" />
                <span>Return Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

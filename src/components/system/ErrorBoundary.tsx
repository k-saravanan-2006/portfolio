import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Antigravity System Catch:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{ padding: '32px', color: '#f8fafc', background: '#050608', fontFamily: 'monospace' }}>
          <h2 className="text-gradient-blue">SYSTEM ENGINE NOTICE</h2>
          <p style={{ marginTop: '8px', opacity: 0.8 }}>
            An unexpected error occurred during rendering. Fallback mode activated.
          </p>
          <pre style={{ marginTop: '16px', fontSize: '12px', opacity: 0.6 }}>
            {this.state.error?.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

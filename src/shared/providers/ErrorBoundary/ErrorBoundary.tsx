import type { ReactNode } from 'react';
import { Component } from 'react';

import { UnknownError } from './UnknownError/UnknownError';

type ErrorBoundaryProps = {
  children: ReactNode;
  fullscreen?: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? <UnknownError /> : this.props.children;
  }
}

export default ErrorBoundary;

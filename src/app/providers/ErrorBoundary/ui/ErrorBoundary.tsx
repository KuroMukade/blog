import {
  Component, ErrorInfo, ReactNode, Suspense,
} from 'react';
import { PageError } from 'widgets/PageError';

interface ErrorBoundaryProps {
    fallback: ReactNode;
    errorHandler?: (error: any, errorInfo: any) => void;
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { errorHandler } = this.props;
    console.error(error, errorInfo);
    errorHandler?.(error, errorInfo);
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return (
          <Suspense fallback={fallback}>
              <PageError />
          </Suspense>
      );
    }

    return children;
  }
}

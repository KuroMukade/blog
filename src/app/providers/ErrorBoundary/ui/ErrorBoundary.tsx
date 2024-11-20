import {
  Component, ErrorInfo, FC, ReactNode, Suspense,
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
    errorHandler?.(error, errorInfo);
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return (
          <PageError />
      );
    }

    return children;
  }
}

export const ErrorBoundaryWithSSR: FC<ErrorBoundaryProps> = ({ fallback, children, errorHandler }) => {
  return (
      <ErrorBoundary errorHandler={errorHandler} fallback={fallback}>
          <Suspense fallback={fallback}>{children}</Suspense>
      </ErrorBoundary>
  );
};

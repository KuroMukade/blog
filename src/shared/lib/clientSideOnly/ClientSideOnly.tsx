import { ErrorBoundaryWithSSR } from 'app/providers/ErrorBoundary';
import { ReactNode, useEffect, useState } from 'react';

export const ClientSideOnly = ({ children, fallback }: {children: ReactNode, fallback: ReactNode}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
        <ErrorBoundaryWithSSR fallback={fallback}>
            {fallback}
        </ErrorBoundaryWithSSR>
    );
  }

  return children;
};

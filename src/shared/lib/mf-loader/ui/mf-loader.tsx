import React, { ReactNode, Suspense } from 'react';

// eslint-disable-next-line
import { ErrorBoundary } from 'app/providers/ErrorBoundary';

import { MfLoaderProps } from '../model/types';

const defaultContextValue = {};

type MFLoaderProps = {
    fallback: ReactNode;
};

export function MFLoader({ fallback }: MFLoaderProps) {
  const isLoading = true;

  return (
      <ErrorBoundary fallback={fallback}>
          <Suspense fallback={<div>123</div>}>
              <div />
          </Suspense>
      </ErrorBoundary>
  );
}

import loadable from '@loadable/component';
import { ErrorBoundaryWithSSR } from 'app/providers/ErrorBoundary';
import { memo, ReactNode } from 'react';

export const lazyLoad = (
  importModule: () => Promise<any>,
  exportedName = 'default',
  suspenseProps: {fallback?: ReactNode} = {},
): React.FC<any> => {
  console.log('running', exportedName);
  const Component = loadable(importModule, {
    fallback: suspenseProps.fallback,
    resolveComponent: (components) => {
      return components[exportedName];
    },
    ssr: true,
  });

  const DynamicComponent = memo((props) => (
      <ErrorBoundaryWithSSR errorHandler={console.error} fallback={suspenseProps.fallback}>
          <Component {...props} />
      </ErrorBoundaryWithSSR>
  ));

  DynamicComponent.displayName = 'DynamicComponent';

  return DynamicComponent;
};

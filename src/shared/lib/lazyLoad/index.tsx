import loadable from '@loadable/component';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { memo } from 'react';

export const lazyLoad = (
  importModule: () => Promise<any>,
  exportedName = 'default',
  suspenseProps: {fallback?: JSX.Element} = {},
): React.FC<any> => {
  const Component = loadable(importModule, {
    fallback: suspenseProps.fallback,
    resolveComponent: (components) => components[exportedName],
  });

  const DynamicComponent = memo((props) => (
      <ErrorBoundary fallback={suspenseProps.fallback}>
          <Component {...props} />
      </ErrorBoundary>
  ));

  DynamicComponent.displayName = 'DynamicComponent';

  return DynamicComponent;
};

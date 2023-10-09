import React, { Suspense, useCallback } from 'react';

import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './PrivateRoute';

export const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const { element } = route;

    return (
        <Route
            key={route.path}
            path={route.path}
            element={
              route.authOnly
                // @ts-ignore
                ? <RequireAuth>{element}</RequireAuth>
                : element
}
        />
    );
  }, []);

  return (
      <Suspense fallback={<PageLoader />}>
          <Routes>
              {Object.values(routeConfig).map(renderWithWrapper)}
          </Routes>
      </Suspense>
  );
};

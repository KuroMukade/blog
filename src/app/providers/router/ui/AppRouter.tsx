import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig';
import { PageLoader } from 'widgets/PageLoader';

import { getUserInited, userActions } from 'entities/User';
import { ErrorBoundaryWithSSR } from 'app/providers/ErrorBoundary';
import { RequireAuth } from './PrivateRoute';

const renderWithWrapper = (route: AppRoutesProps) => {
  const { element } = route;

  return (
      <Route
          key={route.path}
          path={route.path}
          element={
            route.authOnly
              ? (
                  <ErrorBoundaryWithSSR fallback={null}>
                      {/* @ts-ignore */}
                      <RequireAuth>
                          {element}
                      </RequireAuth>
                  </ErrorBoundaryWithSSR>
              )
              : (
                  <ErrorBoundaryWithSSR fallback={<PageLoader />}>
                      {element}
                  </ErrorBoundaryWithSSR>
              )
          }
      />
  );
};

export const AppRouter = () => {
  const dispatch = useDispatch();

  const inited = useSelector(getUserInited);

  useEffect(() => {
    if (!inited) {
      dispatch(userActions.initAuthData(null));
    }
  }, [inited, dispatch]);

  return (
      <Routes>
          {Object.values(routeConfig).map(renderWithWrapper)}
      </Routes>
  );
};

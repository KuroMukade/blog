import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig';
import { PageLoader } from 'widgets/PageLoader';

import { getUserInited, userActions } from 'entities/User';
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
            // @ts-ignore
                  <RequireAuth>
                      <Suspense fallback={<PageLoader />}>
                          {element}
                      </Suspense>
                  </RequireAuth>
              )
              : (
                  <Suspense fallback={<PageLoader />}>
                      {element}
                  </Suspense>
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

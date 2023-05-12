import React, { Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import { routeConfig } from 'shared/config/routeConfig';

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
          <Route element={element} path={path} key={path} />
        ))}
      </Routes>
    </Suspense>
  );
};

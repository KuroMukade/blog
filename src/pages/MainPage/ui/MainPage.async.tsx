import { lazy } from 'react';

export const MainPageAsync = lazy(
  () => import(/* webpackChunkName: "MainPage" */ './MainPage'),
);

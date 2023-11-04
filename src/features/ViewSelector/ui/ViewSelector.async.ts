import { lazy } from 'react';

export const ViewSelectorAsync = lazy(
  () => import('./ViewSelector').then((module) => ({ default: module.ViewSelector })),
);

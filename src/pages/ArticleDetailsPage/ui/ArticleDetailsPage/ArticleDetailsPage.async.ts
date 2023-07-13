import { lazy } from 'react';

export const ArticlesDetailsPageAsync = lazy(
  () => import('./ArticleDetailsPage').then((module) => ({ default: module.ArticleDetailsPage })),
);

export type AppRoute = '/' | '/about' | '/profile/:id' | '/articles' | '/articles/:id';

export const APP_ROUTES: Readonly<AppRoute[]> = [
  '/', '/about', '/profile/:id', '/articles', '/articles/:id',
] as const;

export type AppRoutesType = typeof APP_ROUTES;

export type AppRoute = '/' | '/about' | '/profile/' | '/articles' | '/articles/';

export const APP_ROUTES: Readonly<AppRoute[]> = [
  '/', '/about', '/profile/', '/articles', '/articles/',
] as const;

export type AppRoutesType = typeof APP_ROUTES;

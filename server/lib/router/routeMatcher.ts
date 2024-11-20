import { matchPath } from 'react-router-dom';
import { APP_ROUTES } from './index';

export const getIsMatchRoute = (url: string) => {
  const matchRoute = APP_ROUTES.find((route) => matchPath(route, url));

  return matchRoute;
};

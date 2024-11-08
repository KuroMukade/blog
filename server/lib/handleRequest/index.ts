import { Request, Response } from 'express';
import { matchPath } from 'react-router-dom';
import { getStore } from 'lib/store/getStore';
import i18n from 'lib/i18n/config';
import { render } from '../render';

type AppRoutes = string[]

export const handleRequest = async (url: string, res: Response, req: Request, routes: AppRoutes) => {
  const matchedRoute = routes.find((route) => matchPath(route, url));
  if (!matchedRoute) {
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/html');
    res.send('<h2>404 not found</h2>');
    return;
  }

  const store = getStore();
  await render(res, {
    url,
    cookies: req.cookies,
    i18n,
    store,
    title: 'React SSR blog :D',
  });
};

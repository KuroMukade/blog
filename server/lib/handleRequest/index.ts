import { Request, Response } from 'express';

import { getStore } from 'lib/store/getStore';
import i18n from 'lib/i18n/config';

import { getIsMatchRoute } from 'lib/router/routeMatcher';
import { render } from '../render';
import { prepareLocales } from 'lib/i18n/lang';

export const handleRequest = async (url: string, res: Response, req: Request) => {
  const parsed = url.split('?');
  const matchedRoute = getIsMatchRoute(parsed[0]);
  const { cookies } = req;

  const requestI18n = prepareLocales(i18n, cookies);
  const store = await getStore(matchedRoute || null, url, cookies);

  await render(res, {
    url,
    cookies,
    i18n: requestI18n,
    store,
    title: 'React SSR blog :D',
  });
};

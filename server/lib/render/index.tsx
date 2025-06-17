import fs from 'fs';
import path from 'path';
import React from 'react';
import { Response } from 'express';

import App from '@client/app/App';
import { ThemeProvider } from '@client/shared/contexts/theme';
import { CookiesProvider } from '@client/shared/contexts/cookies';

import { renderToPipeableStream, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import {
  createCriticalStyleStream,
  discoverProjectStyles,
} from 'used-styles';

import { ServerCookiesManager } from 'lib/cookies';

import { Head } from 'lib/jsx/head/Head';

type Options = {
    url: string;
    store: any;
    i18n: any;
    title: string;
    cookies: any;
};

const stylesLookup = discoverProjectStyles(path.resolve('..', 'dist', 'client'));

export const render = async (res: Response, options: Options) => {
  await stylesLookup;
  const styledStream = createCriticalStyleStream(stylesLookup);
  let didError = false;

  const {
    url, i18n, store, title, cookies,
  } = options;

  const manifest = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '..', 'client', 'manifest.json'),
    'utf-8',
  ));

  const { abort, pipe } = renderToPipeableStream((
  <StaticRouter location={url}>
      <Provider store={store}>
          <I18nextProvider i18n={i18n}>
              <CookiesProvider manager={new ServerCookiesManager(cookies)}>
                  <ThemeProvider>
                      <App />
                  </ThemeProvider>
              </CookiesProvider>
          </I18nextProvider>
      </Provider>
  </StaticRouter>), {
    onShellError() {
      console.log('SHELL ERR');
      res.sendStatus(500);
    },
    bootstrapScripts: [manifest['initChunk.js']],
    onAllReady() {
      res.status(didError ? 500 : 200);
      res.set({ 'Content-Type': 'text/html' });
      const head = renderToString(
          <Head reduxState={store.getState()} language={i18n.language} title={title} />,
      );

      res.write(`<!DOCTYPE html><html>${head}<body><div id="root">`);
      styledStream.pipe(res, { end: false });
      pipe(styledStream);
      styledStream.on('end', () => {
        res.end('</body></html>');
      });
    },

    onError(error) {
      didError = true;
      console.error(error);
    },
  });
  setTimeout(() => {
    abort();
  }, 10_000);
};

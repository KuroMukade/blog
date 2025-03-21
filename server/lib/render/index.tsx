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
  createLink, createStyleStream, discoverProjectStyles,
} from 'used-styles';

import { ChunkExtractor } from '@loadable/server';

import { ServerCookiesManager } from 'lib/cookies';

import { Head } from 'lib/jsx/html/head/Head';
import { Body } from 'lib/jsx/html/body/Body';

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

  const styledStream = createStyleStream(stylesLookup, (style) => {
    return createLink(`/static/${style}`);
  });

  let didError = false;

  const {
    url, i18n, store, title, cookies,
  } = options;

  const manifest = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '..', 'client', 'manifest.json'),
    'utf-8',
  ));

  const extractor = new ChunkExtractor({
    statsFile: path.resolve(__dirname, '..', 'client', 'loadable-stats.json'),
    entrypoints: 'initChunk',
  });

  const scriptTags = extractor.getScriptTags();

  const jsx = extractor.collectChunks(
      <StaticRouter location={url}>
          <Provider store={store}>
              <I18nextProvider i18n={i18n}>
                  <Body
                      assets={{
                        react: '',
                        preloadedState: store.getState(),
                      }}
                  >
                      <CookiesProvider manager={new ServerCookiesManager(cookies)}>
                          <ThemeProvider>
                              <App />
                          </ThemeProvider>
                      </CookiesProvider>
                  </Body>
              </I18nextProvider>
          </Provider>
      </StaticRouter>,
  );

  const { abort, pipe } = renderToPipeableStream(jsx, {
    onShellError() {
      console.log('SHELL ERR');
      res.sendStatus(500);
    },
    bootstrapScripts: [manifest['initChunk.js']],
    onAllReady() {
      res.status(didError ? 500 : 200);
      res.set({ 'Content-Type': 'text/html' });
      const head = renderToString(
          <Head language={i18n.language} title={title} />,
      );
      res.write(`<!DOCTYPE html><html>${head}`);

      pipe(styledStream);

      styledStream.pipe(res, { end: false });
      styledStream.on('end', () => {
        res.end('</html>');
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

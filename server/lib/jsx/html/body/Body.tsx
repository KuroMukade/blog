/* eslint-disable react/no-danger */
import React, { FC, ReactNode } from 'react';
import serializeJavascript from 'serialize-javascript';

type AssetsType = {
    react: string;
    preloadedState: {[key: string]: string};
};

type PropsType = {
    assets: AssetsType;
    children: ReactNode;
};

export const Body: FC<PropsType> = ({ assets, children }) => {
  const { react } = assets;
  const preloadedState = serializeJavascript(assets.preloadedState);
  return (
      <body>
          <noscript
              dangerouslySetInnerHTML={{ __html: '<b>Enable JavaScript to run this app.</b>' }}
          />
          <div id="root">{children}</div>
          <script src={react} />
          <script dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${preloadedState};`,
          }}
          />
      </body>
  );
};

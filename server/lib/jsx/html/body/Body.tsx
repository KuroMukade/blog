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
    scripts: ReactNode;
};

export const Body: FC<PropsType> = ({ assets, children, scripts }) => {
  const { react } = assets;

  const reduxStateScript = `window.__PRELOADED_STATE__ = ${serializeJavascript(assets.preloadedState)};`;
  return (
      <body>
          <noscript
              dangerouslySetInnerHTML={{ __html: '<b>Enable JavaScript to run this app.</b>' }}
          />
          <script
              dangerouslySetInnerHTML={{
                __html: reduxStateScript,
              }}
          />
          <div id="root">{children}</div>
          <script src={react} />
          {scripts}
      </body>
  );
};

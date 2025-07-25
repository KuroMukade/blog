import React from 'react';
import serializeJavascript from 'serialize-javascript';

type HeadTemplateType = {
    title: string;
    language: string;
    reduxState: Object;
    styles: string;
};

export const Head = ({ title, language, reduxState, styles, i18nResources }: HeadTemplateType) => {
  const reduxStateScript = `window.__PRELOADED_STATE__ = ${serializeJavascript(reduxState)};`;
  const i18nScript = `window.__LANG__ = "${language}"; window.i18nResources = ${serializeJavascript(i18nResources)};`;

  return (
      <head lang={language}>
          <meta charSet="utf-8" />
          <meta
              name="viewport"
              content="width=device-width,user-scalable=no,
              initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="description" content="ausbdasubhc" />
          <title>{title}</title>
          <link rel="stylesheet" href={styles} />
          <noscript
              dangerouslySetInnerHTML={{ __html: '<b>Enable JavaScript to run this app.</b>' }}
          />
          <script dangerouslySetInnerHTML={{ __html: reduxStateScript }} />
          <script dangerouslySetInnerHTML={{ __html: i18nScript }} />
      </head>
  );
};

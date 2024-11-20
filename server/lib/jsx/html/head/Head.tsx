import React from 'react';

type HeadTemplateType = {
    title: string;
    language: string;
};

export const Head = ({ title, language }: HeadTemplateType) => {
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
      </head>
  );
};

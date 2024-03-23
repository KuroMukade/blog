import path from 'path';

type BuildOptionsType = {
    isDev: boolean;
};

export function buildServerLoaders({ isDev }: BuildOptionsType) {
  const serverCssLoader = {
    test: /\.(css|scss)$/,
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentContext: path.resolve(__dirname, '..', '../'),
            localIdentName: isDev
              ? '[name]__[local]___[hash:base64:5]'
              : '[hash:base64:5]',
            mode: 'global',
            exportOnlyLocals: true,
          },
          importLoaders: 1,
        },
      },
      'postcss-loader',
    ],
  };

  const serverJSLoader = {
    test: /\.(js|tsx|ts|jsx)$/,
    exclude: '/node_modules/',
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  };

  return [serverCssLoader, serverJSLoader];
}

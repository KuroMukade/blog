import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

export function buildServerLoaders({ isDev }) {
  const serverCssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentContext: path.resolve(`${__dirname}/../../`),
            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]',
            auto: (resPath) => resPath.includes('.module.'),
          },
        },
      },
      'sass-loader',
    ],
  };

  const svgLoader = {
    test: /\.svg$/,
    type: 'asset',
    generator: {
      filename: './icons/[contenthash].[ext]',
    },
  };

  const imgLoader = {
    test: /\.(png|jpg)$/i,
    type: 'asset/resource',
    generator: {
      filename: './img/[contenthash].[ext]',
    },
  };

  const serverJSLoader = {
    test: /\.(js|tsx|ts|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
        plugins: ['@loadable/babel-plugin'],
      },
    },
  };

  return [serverCssLoader, serverJSLoader, svgLoader, imgLoader];
}

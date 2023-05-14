import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';
import ReactRefreshTypeScipt from 'react-refresh-typescript';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;

  const typescriptLoader: webpack.RuleSetRule = {
    test: /\.tsx?$/,
    use: [{
      loader: 'ts-loader',
      options: {
        getCustomTransformers: () => ({
          before: [isDev && ReactRefreshTypeScipt()].filter(Boolean)
        }),
        transpileOnly: isDev,
      }
    }],
    exclude: /node_modules/,
  };

  const cssLoader: webpack.RuleSetRule = {
    test: /\.s[ac]ss$/i,
    use: [
      // dont compile css if dev
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,

      // setup css modules
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
            auto: (resPath: string) => resPath.includes('.module.'),
          },
        },
      },
      'sass-loader',
    ],
  };

  const svgLoader: webpack.RuleSetRule = {
    test: /\.svg$/,
    type: 'asset/resource',
    generator: {
      filename: './icons/[contenthash].[ext]',
    },
  };

  const imgLoader: webpack.RuleSetRule = {
    test: /\.(png|jpg)$/i,
    type: 'asset/resource',
    generator: {
      filename: './img/[contenthash].[ext]',
    },
  };

  return [typescriptLoader, cssLoader, svgLoader, imgLoader];
}

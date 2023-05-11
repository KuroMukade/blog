import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // dont compile css if dev
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,

      // setup css modules
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]--[hash:base:64:5]' : '[hash:base64:8]',
            auto: (resPath: string) => resPath.includes('.module.'),
          },
        },
      },
      'sass-loader',
    ],
  };

  return [typescriptLoader, cssLoader];
}

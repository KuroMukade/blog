import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { buildLoaders } from './loaders/buildLoaders';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    target: 'web',
    entry: {
      initChunk: paths.entry,
    },
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
      assetModuleFilename: '[hash][ext][query]',
      publicPath: '/static/',
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : undefined,
  };
}

import webpack, { WebpackPluginInstance } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { ImportedPlugin } from 'webpack-imported';
import LoadablePlugin from '@loadable/webpack-plugin';
import { dependencies } from '../../package.json';
import { BuildOptions } from './types/config';
import { buildMfConfig } from './mf/mfConfig';

export function buildPlugins({
  paths, isDev, apiUrl, project,
}: BuildOptions): WebpackPluginInstance[] {
  const isWithAnalyzer = Boolean(process.env.analyze);

  return [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project),
      __NODEJS__: JSON.stringify(project === 'server'),
      __PROFILE_MF_URL__: JSON.stringify(process.env.PROFILE_MF_URI) || 'no-route',
    }),
    buildMfConfig({
      remotes: {
        profile: 'Profile',
      },
      packageVersions: dependencies,
    }),
    new ImportedPlugin('imported.json'),
    isWithAnalyzer && new BundleAnalyzerPlugin({ openAnalyzer: true }),
    new WebpackManifestPlugin({}),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/locales', to: 'locales' },
      ],
    }),
    new LoadablePlugin(),
  ].filter(Boolean) as WebpackPluginInstance[];
}

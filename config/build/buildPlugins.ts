import webpack, { WebpackPluginInstance } from 'webpack';

import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import {dependencies} from '../../package.json';

import { BuildOptions } from './types/config';
import { buildMfConfig } from './mf/mfConfig';

export function buildPlugins({ paths, isDev, apiUrl, project }: BuildOptions): WebpackPluginInstance[] {
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
    isDev && new ReactRefreshWebpackPlugin({ overlay: false }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project),
      __NODEJS__: project === 'server',
      __PROFILE_MF_URL__: JSON.stringify(process.env.PROFILE_MF_URI) || 'http://localhost:3069',
    }),
    buildMfConfig({remotes: {
      profile: 'Profile',
    }, packageVersions: dependencies}),
    isWithAnalyzer && new BundleAnalyzerPlugin({ openAnalyzer: true }),
    new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean) as WebpackPluginInstance[];
}

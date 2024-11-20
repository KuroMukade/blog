import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import { buildServerLoaders } from './loaders.js';

const nodeJsPlugin = new webpack.DefinePlugin({
  __IS_DEV__: JSON.stringify(true),
  __NODEJS__: JSON.stringify(true),
  __PROJECT__: JSON.stringify('server'),
  __API__: JSON.stringify('http://localhost:8000'),
  __PROFILE_MF_URL__: JSON.stringify(''),
});

export default {
  target: 'async-node',
  entry: './server.ts',
  name: 'server',
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: buildServerLoaders({ isDev: true }),
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist/server'),
    publicPath: '/static',
    filename: 'server.js',
    clean: true,
  },
  plugins: [
    nodeJsPlugin,
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new WebpackManifestPlugin({}),
    new LoadablePlugin(),
  ],
  resolve: {
    preferAbsolute: true,
    mainFiles: ['index'],
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    alias: {
      '@dist': path.resolve(__dirname, '..', '..', 'dist'),
      '@client': path.resolve(__dirname, '..', '..', 'src/'),
      lib: path.resolve(__dirname, '..', './lib'),
      shared: path.resolve(__dirname, '..', '..', 'src', 'shared'),
      entities: path.resolve(__dirname, '..', '..', 'src', 'entities'),
      widgets: path.resolve(__dirname, '..', '..', 'src', 'widgets'),
      pages: path.resolve(__dirname, '..', '..', 'src', 'pages'),
      features: path.resolve(__dirname, '..', '..', 'src', 'features'),
      app: path.resolve(__dirname, '..', '..', 'src', 'app'),
    },
  },
};

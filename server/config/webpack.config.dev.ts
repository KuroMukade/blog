import path from 'path';
import webpack from 'webpack';
import { buildServerLoaders } from './loaders';

const nodeJsPlugin = new webpack.DefinePlugin({
  __NODEJS__: true,
});

export default {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: buildServerLoaders({ isDev: true }),
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist'),
    publicPath: '/',
    filename: 'server.js',
    clean: true,
  },
  plugins: [nodeJsPlugin],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    alias: {},
    modules: ['../node_modules', '../src'],
  },
  entry: './server.ts',
  target: 'async-node',
  name: 'server',
};

import webpack from 'webpack';

const nodeJsPlugin = new webpack.DefinePlugin({
  __NODEJS__: true,
});

export default {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    alias: {},
    modules: ['../node_modules', '../src'],
  },
  module: {
    rules: {},
  },
  plugins: [nodeJsPlugin],
  entry: './server.ts',
  target: false,
  name: 'server',
};

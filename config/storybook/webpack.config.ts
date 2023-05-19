import webpack from 'webpack';

import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };

  if (config.resolve) {
    if (config.resolve.modules) {
      config.resolve?.modules.push(paths.src);
    }
    if (config.resolve.extensions) {
      config.resolve?.extensions.push('ts', 'tsx');
    }
  }

  if (config.module) {
    if (config.module.rules) {
      config.module.rules.push(buildCssLoader(true));
    }
  }

  return config;
};

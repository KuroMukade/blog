import { container } from 'webpack';
import { BuildMFOptions } from '../types/config';

const HOST_NAME = 'host';

export function buildMfConfig({ packageVersions, remotes }: BuildMFOptions) {
  return new container.ModuleFederationPlugin({
    name: HOST_NAME,
    remotes: {
      profileMF: `${remotes.profile}@${process.env.PROFILE_MF_URL}/remoteEntry.js`,
    },
    shared: {
      react: {
        eager: true,
        singleton: true,
        version: packageVersions.react,
      },
      'react-dom': {
        eager: true,
        singleton: true,
        version: packageVersions['react-dom'],
      },
    },
  });
}

export type BuildMode = 'production' | 'development';
export type Platform = 'client' | 'server' | 'jest';

export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
}

export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string;
    platform: Platform;
}

export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
    project: Platform;
}

export const MFRemotes = {
  profile: 'Profile',
} as const;

export interface BuildMFOptions {
    packageVersions: {[key: string]: string};
    remotes: typeof MFRemotes;
}

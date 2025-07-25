/* eslint-disable no-unused-vars */
declare module '*.module.scss';

declare module '*.svg'

declare module '*.png' {
  const value: any;
  export = value;
}

interface Window {
  __PRELOADED_STATE__: any,
  __LANG__: string,
  i18nResources: any,
}

declare module '*.jpeg';

declare module '*.jpg';

declare module '*.gif';

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'client' | 'server' | 'jest';
declare const __PROFILE_MF_URL__: string;
declare const __NODEJS__: boolean;

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>
} : T;

declare type Mods = Record<string, boolean>;

declare type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

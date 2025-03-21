import { lazyLoad } from 'shared/lib/lazyLoad';

export const MainPageAsync = lazyLoad(
  () => import(/* webpackChunkName: "MainPage" */ './MainPage'),
  'MainPage',
  { fallback: 'Loading MainPage...' },
);

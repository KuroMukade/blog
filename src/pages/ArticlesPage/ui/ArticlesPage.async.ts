import { lazyLoad } from 'shared/lib/lazyLoad';

export const ArticlesPageAsync = lazyLoad(() => import('./ArticlesPage'), 'ArticlesPage');

import type { ArticleView } from 'entities/Article';
import { User, USER_COOKIE_STORAGE_KEY } from 'entities/User';
import { ARTICLE_STORAGE_KEY } from 'pages/ArticlesPage/model/slices/articlesPageSlice';

import { Theme, THEME_COOKIE_STORAGE_KEY } from 'shared/contexts/theme';

export type CookieStoreType = {
    [THEME_COOKIE_STORAGE_KEY]: Theme;
    [USER_COOKIE_STORAGE_KEY]: User;
    [ARTICLE_STORAGE_KEY]: ArticleView;
}

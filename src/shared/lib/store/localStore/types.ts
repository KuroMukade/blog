import type { Article, ArticleView } from 'entities/Article';
import { ARTICLE_STORAGE_KEY } from 'shared/constants/localstorage';

export type LocalStoreType = {
    article: Article;
    [ARTICLE_STORAGE_KEY]: ArticleView;
};

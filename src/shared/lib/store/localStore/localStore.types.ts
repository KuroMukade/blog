import type { Article, ArticleView } from 'entities/Article';
import type { User } from 'entities/User';
import type { Theme } from 'shared/contexts/theme';

export type LocalStoreType = {
    user: User;
    article: Article;
    articles_view: ArticleView;
    theme: Theme;
};

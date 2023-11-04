import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
    _inited: boolean;
    isLoading: boolean;
    error?: string;

    // pagination
    page: number;
    limit?: number;
    hasMore: boolean;

    // filters
    view: ArticleView;
}

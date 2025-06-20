import {
  FC, useCallback, useEffect,
} from 'react';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ReducersList, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';

import { ArticleList, ArticleView } from 'entities/Article';

import { ViewSelector } from 'features/ViewSelector';
import { articleFiltersReducer, ArticleFiltersOrder, ArticleFiltersSearch } from 'features/ArticleFilters';

import { Page } from 'widgets/Page/Page';

import { ArticleItemsLoader } from 'entities/Article/ui/ArticleList/ArticleItemsLoader';
import { fetchArticlesNextPage } from '../model/services/fetchArticlesNextPage/fetchArticlesNextPage';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slices/articlesPageSlice';
import {
  getArticlesError,
  getArticlesHasMore,
  getArticlesIsLoading,
  getArticlesView,
} from '../model/selectors/articlesSelectors';

import s from './ArticlesPage.module.scss';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';

interface ArticlesPageProps {
  className?: string
}

const initialPageReducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const initialFiltersReducers: ReducersList = {
  articlesFilters: articleFiltersReducer,
};

export const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  useDynamicModuleLoader('articlesPage', initialPageReducers, false);
  useDynamicModuleLoader('articlesFilters', initialFiltersReducers, false);
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesIsLoading);
  const hasMore = useSelector(getArticlesHasMore);
  const view = useSelector(getArticlesView);
  const error = useSelector(getArticlesError);
  const dispatch = useAppDispatch();

  const onViewChange = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchArticlesNextPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initArticlesPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArticlesList({ page: 1 }));
  }, [dispatch]);

  return (
      <Page
          loader={(
              <div className={s.content}>
                  <ArticleItemsLoader className={s.loader} hasMore={Boolean(hasMore)} />
              </div>
          )}
          isSaveScroll
          onScrollEnd={onLoadNextPart}
          className={classNames(s.wrapper, {}, [className])}
      >
          <div className={s.content}>
              <div className={s.filters}>
                  <ArticleFiltersSearch />
                  <ArticleFiltersOrder />
              </div>
              <ViewSelector view={view} onViewClick={onViewChange} />
              <ArticleList
                  hasMore={hasMore}
                  isLoading={isLoading}
                  error={error}
                  articles={articles}
                  view={view}
              />
          </div>
      </Page>
  );
};

export default ArticlesPage;

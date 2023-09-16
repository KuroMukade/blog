import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from 'shared/lib/classNames';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ReducersList, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';

import { ArticleList, ArticleView } from 'entities/Article';

import { ViewSelector } from 'features/viewSelector';

import { fetchArticles } from '../model/services/fetchArticles/fetchArticles';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slices/articlesPageSlice';
import {
  getArticlesError,
  getArticlesIsLoading,
  getArticlesView,
} from '../model/selectors/articlesSelectors';

import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
   className?: string
}

const initialReducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

export const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const { t } = useTranslation('article');

  useDynamicModuleLoader('articlesPage', initialReducers);

  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesIsLoading);
  const view = useSelector(getArticlesView);
  const error = useSelector(getArticlesError);
  const dispatch = useAppDispatch();

  const onViewChange = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(fetchArticles());
    dispatch(articlesPageActions.initState());
  });

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <ViewSelector view={view} onViewClick={onViewChange} />
          <ArticleList isLoading={isLoading} error={error} articles={articles} view={view} />
      </div>
  );
};

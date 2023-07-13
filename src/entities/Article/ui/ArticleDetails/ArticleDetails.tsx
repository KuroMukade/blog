import React, { memo, useEffect } from 'react';

import { classNames } from 'shared/lib/classNames';

import { useTranslation } from 'react-i18next';
import { ReducersList, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from 'entities/Article/model/selectors/articleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

import styles from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
   className?: string;
   id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const data = useSelector(getArticleDetailsData);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
        <div className={classNames(styles.wrapper, {}, [className])}>Loading</div>
    );
  } else if (error) {
    content = (
        <div className={classNames(styles.wrapper, {}, [className])}>{error}</div>
    );
  } else {
    content = (
        <div className={classNames(styles.wrapper, {}, [className])}>{data?.title}</div>
    );
  }

  useDynamicModuleLoader('articleDetails', reducers, true);

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          {content}
      </div>
  );
});

import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

import styles from './ArticleList.module.scss';

interface ArticleListProps {
   className?: string;
   articles: Article[];
   isLoading?: boolean;
   error?: string;
   view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className, articles, view, isLoading, error,
  } = props;

  const renderArticle = (article: Article, view: ArticleView) => (
      <ArticleListItem key={article.id} article={article} view={view} />
  );

  if (isLoading || !view) {
    return (
        <div className={classNames(styles.wrapper, {}, [className])} />

    );
  }

  if (error) {
    return (
        <div className={classNames(styles.wrapper, {}, [className])} />

    );
  }

  return (
      <div className={classNames(styles.wrapper, {}, [className, styles[view!]])}>
          {articles.map((article) => (
            renderArticle(article, view)
          ))}
      </div>
  );
});

import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';

import { Article, ArticleView } from '../../model/types/article';

import styles from './ArticleList.module.scss';
import { ArticleListViewController } from '../ArticleListViewController/ArticleListViewController';

interface ArticleListProps {
   className?: string;
   articles: Article[];
   error?: string;
   view?: ArticleView;
}

export const ArticleList = memo(({
  className, articles, view, error,
}: ArticleListProps) => {
  if (!view) {
    return (
        <div className={classNames(styles.wrapper, {}, [className])} />
    );
  }

  if (error) {
    return (
        <div className={classNames(styles.wrapper, {}, [className])} />
    );
  }

  const articlesItems = articles.map(
    (article) => <ArticleListViewController key={article.id} article={article} view={view} />,
  );

  return (
      <div className={classNames(styles.wrapper, {}, [className, styles[view]])}>
          {articlesItems}
      </div>
  );
});

ArticleList.displayName = 'ArticleList';

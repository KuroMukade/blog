import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';

import { ClientSideOnly } from 'shared/lib/clientSideOnly/ClientSideOnly';
import { Article, ArticleView } from '../../model/types/article';

import styles from './ArticleList.module.scss';
import { ArticleListViewController } from '../ArticleListViewController/ArticleListViewController';
import { ArticleItemsLoader } from './ArticleItemsLoader';

interface ArticleListProps {
   className?: string;
   articles: Article[];
   isLoading?: boolean;
   error?: string;
   hasMore?: boolean;
   view?: ArticleView;
}

export const ArticleList = memo(({
  className, articles, view, error, isLoading, hasMore = false,
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

  if (isLoading && !articles.length) {
    return (
        <div className={classNames(styles.wrapper, {}, [className, styles[view]])}>
            <ArticleItemsLoader hasMore={hasMore} />
        </div>
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

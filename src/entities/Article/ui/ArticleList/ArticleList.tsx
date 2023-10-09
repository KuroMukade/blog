import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';

import { Article, ArticleView } from '../../model/types/article';

import styles from './ArticleList.module.scss';
import { ArticleListViewController } from '../ArticleListViewController/ArticleListViewController';

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
      <ArticleListViewController key={article.id} article={article} view={view} />
  );

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

  return (
      <div className={classNames(styles.wrapper, {}, [className, styles[view!]])}>
          {articles.length > 0
            ? articles.map((article) => renderArticle(article, view))
            : <div className={classNames(styles.wrapper, {}, [className])} />}
      </div>
  );
});

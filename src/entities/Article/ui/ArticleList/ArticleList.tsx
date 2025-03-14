import { memo, useCallback } from 'react';
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

const renderArticle = (article: Article, view?: ArticleView) => (
    <ArticleListViewController key={article.id} article={article} view={view} />
);

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className, articles, view, isLoading, error,
  } = props;

  const handleRenderArticle = useCallback((article: Article) => {
    return renderArticle(article, view);
  }, [view]);

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
            ? articles.map(handleRenderArticle)
            : <div className={classNames(styles.wrapper, {}, [className])} />}
      </div>
  );
});

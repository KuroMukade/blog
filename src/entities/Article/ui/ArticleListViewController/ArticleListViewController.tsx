import { ArticleListColumnItem } from 'entities/Article/ui/ArticleListColumnItem/ArticleListColumnItem';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListGridItem } from '../ArticleListGridItem/ArticleListGridItem';

interface ArticleListViewControllerProps {
  article: Article;
  view?: ArticleView;
}

export const ArticleListViewController = (props: ArticleListViewControllerProps) => {
  const { article, view } = props;

  switch (view) {
    case 'LIST': return (
        <ArticleListGridItem article={article} />
    );
    case 'GRID': return (
        <ArticleListColumnItem article={article} />
    );
    default: return (
        <ArticleListGridItem article={article} />
    );
  }
};

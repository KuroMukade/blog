import { useId } from 'react';
import ContentLoader from 'react-content-loader';

const ArticleListSkeleton = () => {
  const id = useId();
  return (
      <ContentLoader
          speed={2}
          width={762}
          height={300}
          viewBox="0 0 762 300"
          backgroundColor="#f3f3f3"
          uniqueKey={id}
          foregroundColor="#ecebeb"
      >
          <rect x="0" y="0" rx="16" ry="16" width="300" height="300" />
          <rect x="310" y="4" rx="6" ry="6" width="300" height="26" />
          <rect x="310" y="60" rx="10" ry="10" width="300" height="104" />
          <rect x="310" y="252" rx="10" ry="10" width="265" height="43" />
      </ContentLoader>
  );
};

export const ArticleItemsLoader = ({ hasMore, className }: {hasMore: boolean, className?: string}) => {
  if (!hasMore) return null;

  return (
      <div className={className}>
          <ArticleListSkeleton />
          <ArticleListSkeleton />
          <ArticleListSkeleton />
          <ArticleListSkeleton />
      </div>

  );
};

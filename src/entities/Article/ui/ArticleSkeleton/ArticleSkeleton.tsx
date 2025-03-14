import { memo } from 'react';
import ContentLoader from 'react-content-loader';

interface ArticleSkeletonProps {
  className?: string;
}

export const ArticleSkeleton = memo(({ className }: ArticleSkeletonProps) => (
    <ContentLoader
        className={className}
        speed={1.5}
        width={900}
        height={754}
        viewBox="0 0 900 754"
        backgroundColor="#ededed"
        foregroundColor="#d6d6d6"
    >
        <circle cx="13" cy="13" r="13" />
        <rect x="36" ry="5" y="0" width="95" height="26" />
        <rect x="156" ry="5" y="0" width="95" height="26" />
        <rect x="800" ry="5" y="0" width="95" height="24" />
        <rect x="0" ry="5" y="56" width="900" height="182" />
        <rect x="0" ry="5" y="248" width="900" height="26" />
        <rect x="0" ry="5" y="294" width="900" height="460" />
    </ContentLoader>
));

ArticleSkeleton.displayName = 'ArticleSkeleton';

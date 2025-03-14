import { memo } from 'react';
import ContentLoader from 'react-content-loader';

interface CommentCardSkeletonProps {
   className?: string;
}

export const CommentCardSkeleton = memo((props: CommentCardSkeletonProps) => {
  const { className } = props;
  return (
      <ContentLoader
          className={className}
          speed={1.5}
          width={900}
          height={436}
          viewBox="0 0 900 436"
          backgroundColor="#ededed"
          foregroundColor="#d6d6d6"
          {...props}
      >
          <rect x="0" y="60" rx="8" ry="8" width="595" height="96" />
          <circle cx="20" cy="20" r="20" />
          <rect x="55" y="0" rx="6" ry="6" width="120" height="40" />
          <rect x="0" y="170" rx="4" ry="4" width="150" height="22" />
          <rect x="0" y="303" rx="8" ry="8" width="595" height="96" />
          <circle cx="20" cy="263" r="20" />
          <rect x="55" y="243" rx="6" ry="6" width="120" height="40" />
          <rect x="0" y="413" rx="4" ry="4" width="150" height="22" />
      </ContentLoader>
  );
});

CommentCardSkeleton.displayName = 'CommentCardSkeleton';

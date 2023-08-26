import { memo } from 'react';

import { classNames } from 'shared/lib/classNames';

import { useTranslation } from 'react-i18next';
import styles from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { CommentCardSkeleton } from '../CommentCardSkeleton/CommentCardSkeleton';

interface CommentListProps {
   className?: string;
   comments?: Comment[];
   isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading = true } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return (
        <div className={classNames(styles.wrapper, {}, [className])}>
            <CommentCardSkeleton />
        </div>
    );
  }

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          {comments?.length
            ? comments.map((comment) => (
                <CommentCard key={comment.id} isLoading={isLoading} comment={comment} />
            ))
            : t('Будьте первым кто оставит комментарий!')}
      </div>
  );
});

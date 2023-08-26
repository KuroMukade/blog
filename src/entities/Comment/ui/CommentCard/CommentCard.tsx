import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import heartIcon from 'shared/assets/icons/heart.svg';
import dotsIcon from 'shared/assets/icons/dots.svg';

import { classNames } from 'shared/lib/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { RoutePath } from 'shared/config/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { CommentCardSkeleton } from '../CommentCardSkeleton/CommentCardSkeleton';

import { Comment } from '../../model/types/comment';

import styles from './CommentCard.module.scss';

interface CommentCardProps {
   className?: string;
   comment: Comment;
   isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  const { t } = useTranslation('commentCard');

  if (isLoading) {
    return (
        <div className={styles.header}>
            `<CommentCardSkeleton />`
        </div>
    );
  }

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <div className={styles.header}>
              <AppLink className={styles.link} to={`${RoutePath.profile}${comment.user.id}`}>
                  {comment.user?.avatar && <Avatar size={40} src={comment.user.avatar} alt="user-logo" />}
              </AppLink>
              <div className={styles.commentInfo}>
                  <p className={styles.username}>{comment.user?.username}</p>
                  <p className={styles.date}>{comment?.createdAt}</p>
              </div>
          </div>
          <Text className={styles.text} text={comment.text} />
          <div className={styles.additional}>
              <img src={heartIcon} alt="" />
              <p>{t('Ответить')}</p>
              <img src={dotsIcon} alt="" />
          </div>
      </div>
  );
});

import heartIcon from 'shared/assets/icons/heart.svg';
import dotsIcon from 'shared/assets/icons/dots.svg';

import { memo } from 'react';

import { classNames } from 'shared/lib/classNames';

import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Loader } from 'shared/ui/Loader/Loader';

import { Comment } from '../../model/types/comment';

import styles from './CommentCard.module.scss';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig';

interface CommentCardProps {
   className?: string;
   comment: Comment;
   isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
        <div className={styles.header}>
            <Loader />
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
              <p>Ответить</p>
              <img src={dotsIcon} alt="" />
          </div>
      </div>
  );
});

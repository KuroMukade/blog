import { memo, useCallback, useRef } from 'react';

import archiveIcon from 'shared/assets/icons/bookmark-mini.svg';
import heartIcon from 'shared/assets/icons/heart.svg';
import messageIcon from 'shared/assets/icons/message.svg';
import eyeIcon from 'shared/assets/icons/eye.svg';
import { useHover } from 'shared/lib/hooks/useHover';
import { Card } from 'shared/ui/Card/Card';

import { classNames } from 'shared/lib/classNames';

import { Avatar } from 'shared/ui/Avatar/Avatar';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig';
import { Article } from '../../model/types/article';

import styles from './ArticleListGridItem.module.scss';

interface ArticleListItemProps {
   className?: string;
   article: Article;
}

export const ArticleListGridItem = memo((props: ArticleListItemProps) => {
  const { className, article } = props;
  const [isHover, bindHover] = useHover();

  const navigate = useNavigate();

  const imgRef = useRef(null);

  const onOpenArticle = useCallback(() => {
    navigate(`${RoutePath.article_details_page}${article.id}`);
  }, [article.id, navigate]);

  return (
      <div className={classNames(styles.wrapperGrid, {}, [className])}>
          <Card onClick={onOpenArticle} {...bindHover}>
              <img className={styles.cardImage} src={article.img} alt={article.title} />
              <div className={styles.content}>
                  <div className={styles.cardHeader}>
                      <AppLink className={styles.cardHeaderLink} to={`profile/${article.user?.id}`}>
                          <Avatar size="26px" src={article.user?.avatar} />
                          <span>{article.user.username}</span>
                      </AppLink>
                      <span className={styles.cardDate}>{article.createdAt}</span>
                  </div>
                  <div className={styles.cardBody}>
                      <p className={styles.cardTitle}>{article.title}</p>
                      <p className={styles.cardSubtitle}>{article.subtitle}</p>
                  </div>
                  <div className={styles.cardFooter}>
                      <div className={styles.cardFooterLeftSide}>
                          <img src={archiveIcon} alt="archive article" />
                          <div className={styles.cardLikes}>
                              <img src={heartIcon} alt="heart" />
                              <p>25</p>
                          </div>
                          <div className={styles.cardCommentsCount}>
                              <img src={messageIcon} alt="comments" />
                              <p>14</p>
                          </div>
                      </div>
                      <div className={styles.cardFooterRightSide}>
                          <p className={styles.cardReadTime}>Время чтения: 10 мин</p>
                          <div className={styles.cardViews}>
                              <img src={eyeIcon} alt="views" />
                              <p className={styles.cardViewCount}>281</p>
                          </div>
                      </div>
                  </div>
              </div>
          </Card>
      </div>
  );
});

import { classNames } from 'shared/lib/classNames';
import { Card } from 'shared/ui/Card/Card';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import archiveIcon from 'shared/assets/icons/bookmark-mini.svg';
import heartIcon from 'shared/assets/icons/heart.svg';
import messageIcon from 'shared/assets/icons/message.svg';
import eyeIcon from 'shared/assets/icons/eye.svg';
import { useHover } from 'shared/lib/hooks/useHover';
import { useNavigate } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import { RoutePath } from 'shared/config/routeConfig';
import brokenImage from 'shared/assets/images/noutFound.png';
import { Article } from '../../model/types/article';

import styles from './ArticleListColumnItem.module.scss';

interface ArticleListListItemProps {
  className?: string;
  article: Article;
}

export const ArticleListColumnItem = (props: ArticleListListItemProps) => {
  const { className, article } = props;

  const [isHover, bindHover] = useHover();

  const navigate = useNavigate();

  const imgRef = useRef<HTMLImageElement>(null);

  const setBrokenImage = () => {
    if (imgRef?.current) {
      imgRef.current.src = brokenImage;
    }
  };

  const onOpenArticle = useCallback(() => {
    navigate(`${RoutePath.article_details_page}${article.id}`);
  }, [article.id, navigate]);

  return (
      <div className={classNames(styles.wrapperColumns, {}, [className])}>
          <Card onClick={onOpenArticle} {...bindHover}>
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
                      <span className={styles.cardSubtitle}>{article.subtitle}</span>
                  </div>
                  <img
                      ref={imgRef}
                      onError={setBrokenImage}
                      className={styles.cardImage}
                      src={article.img}
                      alt={article.title}
                  />
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
};

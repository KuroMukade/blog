import { memo, useCallback } from 'react';

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
import { Article, ArticleView } from '../../model/types/article';

import styles from './ArticleListItem.module.scss';

interface ArticleListItemProps {
   className?: string;
   article: Article;
   view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const [isHover, bindHover] = useHover();

  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(`${RoutePath.article_details_page}${article.id}`);
  }, [article.id, navigate]);

  const Grid = (
      <div className={classNames(styles.wrapperGrid, {}, [className])}>
          <Card onClick={onOpenArticle} {...bindHover}>
              <img className={styles.cardImage} src={article.img} alt={article.title} />
              <div className={styles.content}>
                  <div className={styles.cardHeader}>
                      <AppLink className={styles.cardHeaderLink} to={`profile/${article.users?.id}`}>
                          <Avatar size="26px" src={article.users?.avatar} />
                          <span>{article.users.username}</span>
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

  const List = (
      <div className={classNames(styles.wrapperColumns, {}, [className])}>
          <Card onClick={onOpenArticle} {...bindHover}>
              <div className={styles.content}>
                  <div className={styles.cardHeader}>
                      <AppLink className={styles.cardHeaderLink} to={`profile/${article.users?.id}`}>
                          <Avatar size="26px" src={article.users?.avatar} />
                          <span>{article.users.usersname}</span>
                      </AppLink>
                      <span className={styles.cardDate}>{article.createdAt}</span>
                  </div>
                  <div className={styles.cardBody}>
                      <p className={styles.cardTitle}>{article.title}</p>
                      <span className={styles.cardSubtitle}>{article.subtitle}</span>
                  </div>
                  <img className={styles.cardImage} src={article.img} alt={article.title} />
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

  switch (view) {
    case 'GRID':
      return Grid;
    case 'LIST':
      return List;
    default: return Grid;
  }
});

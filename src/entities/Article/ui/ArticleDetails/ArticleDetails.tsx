import addUserIcon from 'shared/assets/icons/add-user.svg';
import dotsIcon from 'shared/assets/icons/dots.svg';
import archiveIcon from 'shared/assets/icons/bookmark-mini.svg';
import heartIcon from 'shared/assets/icons/heart.svg';
import messageIcon from 'shared/assets/icons/message.svg';
import eyeIcon from 'shared/assets/icons/eye.svg';

import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';

import { ReducersList, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById';

import { Avatar } from 'shared/ui/Avatar/Avatar';
import { ArticleSkeleton } from '../ArticleSkeleton/ArticleSkeleton';

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

import styles from './ArticleDetails.module.scss';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
   className?: string;
   id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsData);

  const renderBlock = (block: ArticleBlock) => {
    switch (block.type) {
      case 'CODE':
        return <ArticleCodeBlockComponent block={block} key={block.id} />;
      case 'IMAGE':
        return <ArticleImageBlockComponent block={block} key={block.id} />;
      case 'TEXT':
        return <ArticleTextBlockComponent block={block} key={block.id} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
        <div className={classNames(styles.wrapper, {}, [className])}>
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
        </div>
    );
  } else if (error) {
    content = (
        <div className={classNames(styles.wrapper, {}, [className])}>{error}</div>
    );
  } else {
    content = (
        <div className={classNames(styles.wrapper, {}, [className])}>
            <div className={styles.heading}>
                <div className={styles.header}>
                    <div className={styles.headerLeftSection}>
                        <Avatar src={article?.img!} size="26px" rounded alt="profile avatar" />
                        <span className={styles.date}>{article?.createdAt}</span>
                    </div>
                    <div className={styles.headerRightSection}>
                        <img src={addUserIcon} alt="add-user" />
                        <img src={dotsIcon} alt="extra" />
                    </div>
                </div>
                <div className={styles.body}>
                    <h1 className={styles.title}>{article?.title}</h1>
                    <p className={styles.subtitle}>{article?.subtitle}</p>
                    <div className={styles.extra}>
                        <div className={styles.extraLeftSide}>
                            <img src={archiveIcon} alt="archive article" />
                            <div className={styles.likes}>
                                <img src={heartIcon} alt="heart" />
                                <p>25</p>
                            </div>
                            <div className={styles.comments}>
                                <img src={messageIcon} alt="comments" />
                                <p>14</p>
                            </div>
                        </div>
                        <div className={styles.extraRightSide}>
                            <p className={styles.time}>{t('Время чтения: 10 мин')}</p>
                            <div className={styles.views}>
                                <img src={eyeIcon} alt="views" />
                                <p className={styles.viewCount}>281</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {article?.blocks.map(renderBlock)}
        </div>
    );
  }

  useDynamicModuleLoader('articleDetails', reducers, false);

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          {content}
      </div>
  );
});

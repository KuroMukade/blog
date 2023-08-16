import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames';
import { Text } from 'shared/ui/Text/Text';
import { ReducersList, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';

import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId';
import {
  articleCommentsReducers,
  getArticleComments,
} from '../../model/slice/articleDetailsCommentsSlice';

import { getArticleCommentsLoading } from '../../model/selectors/comments';

import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers: ReducersList = { articleDetailsComments: articleCommentsReducers };

export const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('articles');
  const { id } = useParams<{ id: string }>();

  useDynamicModuleLoader('articleDetailsComments', reducers, false);

  const dispatch = useAppDispatch();

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsLoading);

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [dispatch, id]);

  if (!id) {
    return (
        <div className={classNames(styles.wrapper, {}, [className])}>
            {t('Статья не найдена')}
        </div>
    );
  }

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <ArticleDetails id={id} />
          <div className={styles.comments}>
              <Text textSize="X" title={`Комментарии: ${comments.length}`} />
              <CommentList
                  className={styles.commentList}
                  isLoading={commentsIsLoading}
                  comments={comments}
              />
          </div>
      </div>
  );
});

import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames';
import { Text } from 'shared/ui/Text/Text';
import { ReducersList, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';

import { AddCommentForm } from 'features/AddCommentForm';

import { Page } from 'widgets/Page/Page';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleCommentsReducer, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';

import { getArticleCommentsLoading } from '../../model/selectors/comments';

import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
   className?: string;
}

const reducers: ReducersList = { articleDetailsComments: articleCommentsReducer };

export const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation('articles');
  const { id } = useParams<{ id: string }>();

  useDynamicModuleLoader('articleDetailsComments', reducers, false);

  const dispatch = useAppDispatch();

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsLoading);

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  if (!id) {
    return (
        <div className={classNames(styles.wrapper, {}, [className])}>
            {t('Статья не найдена')}
        </div>
    );
  }

  return (
      <Page className={classNames(styles.wrapper, {}, [className])}>
          <ArticleDetails id={id} />
          <div className={styles.comments}>
              <Text textSize="X" title={`${t('Комментарии')}: ${comments.length}`} />
              <AddCommentForm onSendComment={onSendComment} />
              <CommentList
                  className={styles.commentList}
                  isLoading={commentsIsLoading}
                  comments={comments}
              />
          </div>
      </Page>
  );
});

import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';
import { TextArea } from 'shared/ui/TextArea/TextArea';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { ReducersList, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';

import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';

import styles from './AddCommentForm.module.scss';

interface AddCommentFormProps {
   className?: string;
   onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

export const AddCommentForm = memo((props: AddCommentFormProps) => {
  useDynamicModuleLoader('addCommentForm', reducers);
  const { className, onSendComment } = props;

  const { t } = useTranslation('commentForm');

  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);

  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendClick = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [text, onSendComment, onCommentTextChange]);

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <TextArea
              placeholder={t('Введите текст комментария')}
              value={text}
              className={styles.textarea}
              onChange={onCommentTextChange}
              button={(
                  <Button
                      onClick={onSendClick}
                      theme={ThemeButton.SECONDARY}
                      className={styles.btn}
                  >
                      {t('Отправить')}

                  </Button>
              )}
          />
      </div>
  );
});

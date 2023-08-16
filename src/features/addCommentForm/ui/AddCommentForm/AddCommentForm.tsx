import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames';

import { Input } from 'shared/ui/Input/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';

import {
  addCommentFormActions,
  addCommentFormReducer,
} from 'features/addCommentForm/model/slice/addCommentFormSlice';

import { ReducersList, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';

import styles from './AddCommentForm.module.scss';

interface AddCommentFormProps {
   className?: string;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

export const AddCommentForm = memo((props: AddCommentFormProps) => {
  useDynamicModuleLoader('addCommentForm', reducers);
  const { className } = props;

  const { t } = useTranslation();

  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);

  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <Input
              placeholder={t('Введите текст комментария')}
              value={text}
              onChange={(onCommentTextChange)}
          />
          <Button />
      </div>
  );
});

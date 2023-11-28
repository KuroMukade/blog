import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { SortOrderType } from 'shared/types';
import { useTranslation } from 'react-i18next';
import { getArticleFiltersOrder } from '../../model/selectors/articleFiltersSelector';
import { articlesFiltersActions } from '../../model/slice/articleFiltersSlice';

type PropsType = {
  className?: string;
}

export const ArticleFiltersOrder = memo<PropsType>((props: PropsType) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const currentOrder = useSelector(getArticleFiltersOrder);

  const { t } = useTranslation('articleFiltersOrder');

  const onSetOrder = useCallback((value: string) => {
    dispatch(articlesFiltersActions.setOrder(value as SortOrderType));
  }, [dispatch]);

  const selectOptions : SelectOption<SortOrderType>[] = useMemo(() => [{
    value: 'asc',
    content: t('По возрастанию'),
  }, {
    value: 'desc',
    content: t('По убыванию'),
  }], [t]);

  return (
      <Select onChange={onSetOrder} className={className} options={selectOptions} value={currentOrder} />
  );
});

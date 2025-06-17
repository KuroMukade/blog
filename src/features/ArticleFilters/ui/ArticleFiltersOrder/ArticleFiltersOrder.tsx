import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { SortOrderType } from 'shared/types';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { getArticleFiltersOrder } from '../../model/selectors/articleFiltersSelector';
import { articlesFiltersActions } from '../../model/slice/articleFiltersSlice';

type PropsType = {
  className?: string;
}

export const ArticleFiltersOrder = memo<PropsType>(({ className }: PropsType) => {
  const dispatch = useAppDispatch();
  const currentOrder = useSelector(getArticleFiltersOrder);
  const [searchParams, setSearchParams] = useSearchParams();

  const { t } = useTranslation('articleFiltersOrder');

  const onSetOrder = useCallback((value: string) => {
    dispatch(articlesFiltersActions.setOrder(value as SortOrderType));
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  }, [dispatch, searchParams, setSearchParams]);

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

ArticleFiltersOrder.displayName = 'ArticleFiltersOrder';

import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { SortOrderType } from 'shared/types';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import { saveScrollActions } from 'features/SaveScroll';
import { getArticleFiltersOrder } from '../../model/selectors/articleFiltersSelector';
import { articlesFiltersActions } from '../../model/slice/articleFiltersSlice';
import { DESCENDING_URL_VALUE, SORT_ORDER_URL_PARAM_NAME, ASCENDING_URL_VALUE } from 'features/ArticleFilters/model/constants/sort';
import { isSortOrderValid } from 'features/ArticleFilters/model/helpers/sortValidation';
import { fetchArticlesList } from 'pages/ArticlesPage';

type PropsType = {
  className?: string;
}

export const ArticleFiltersOrder = memo<PropsType>(({ className }: PropsType) => {
  const dispatch = useAppDispatch();
  const currentOrder = useSelector(getArticleFiltersOrder);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { t } = useTranslation('articleFiltersOrder');

  const onSetOrder = useCallback((order: string) => {
    if (!isSortOrderValid(order)) return;

    dispatch(articlesFiltersActions.setOrder(order));
    searchParams.set(SORT_ORDER_URL_PARAM_NAME, order);
    setSearchParams(searchParams);
    dispatch(fetchArticlesList({page: 1}));
    saveScrollActions.setScrollPosition({ path: pathname, position: 0 });
  }, [dispatch, pathname, searchParams, setSearchParams]);

  const selectOptions : SelectOption<SortOrderType>[] = useMemo(() => [{
    value: ASCENDING_URL_VALUE,
    content: t('По возрастанию'),
  }, {
    value: DESCENDING_URL_VALUE,
    content: t('По убыванию'),
  }], [t]);

  return (
      <Select name='articles order' onChange={onSetOrder} className={className} options={selectOptions} value={currentOrder} />
  );
});

ArticleFiltersOrder.displayName = 'ArticleFiltersOrder';

import { memo } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { SortOrderType } from 'shared/types';
import { articlesFiltersActions } from 'features/ArticleFilters';
import { getArticleFiltersOrder } from '../../model/selectors/articleFiltersSelector';

type PropsType = {
  className?: string;
}

const selectOptions : SelectOption<SortOrderType>[] = [{
  value: 'asc',
  content: 'По возрастанию',
}, {
  value: 'desc',
  content: 'По убыванию',
}];

export const ArticleFiltersOrder = memo<PropsType>((props: PropsType) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const currentOrder = useSelector(getArticleFiltersOrder);

  const onSetOrder = (value: string) => {
    dispatch(articlesFiltersActions.setOrder(value as SortOrderType));
  };

  return (
      <Select onChange={onSetOrder} className={className} options={selectOptions} value={currentOrder} />
  );
});

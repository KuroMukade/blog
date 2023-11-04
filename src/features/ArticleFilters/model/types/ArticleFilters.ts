import type { SortOrderType, SortType } from 'shared/types';

export interface ArticleFiltersSchema {
  order: SortOrderType;
  sort: SortType;
  search: string;
}

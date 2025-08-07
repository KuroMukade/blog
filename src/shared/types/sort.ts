import { ASCENDING_URL_VALUE, DESCENDING_URL_VALUE } from "features/ArticleFilters";

export type SortOrderType = typeof ASCENDING_URL_VALUE | typeof DESCENDING_URL_VALUE;
export type SortType = 'createdAt' | 'views' | 'title';

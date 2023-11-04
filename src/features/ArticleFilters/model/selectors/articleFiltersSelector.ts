import { StateSchema } from 'app/providers/StoreProvider';

const getArticleFiltersSort = (state: StateSchema) => state.articlesFilters?.sort || 'createdAt';
const getArticleFiltersOrder = (state: StateSchema) => state.articlesFilters?.order || 'asc';

const getArticleFiltersSearch = (state: StateSchema) => state.articlesFilters?.search || '';

export {
  getArticleFiltersSort,
  getArticleFiltersOrder,
  getArticleFiltersSearch,
};

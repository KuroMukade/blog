import { ReduxStoreWithManager } from '@client/app/providers/StoreProvider';
import { initArticlesPage } from '@client/pages/ArticlesPage';
import { QueryParams } from '@client/shared/lib/url';
import {articlesFiltersActions} from '@client/features/ArticleFilters';

export const initializeArticlesData = async (store: ReduxStoreWithManager, urlParams: QueryParams) => {
  await store.dispatch(articlesFiltersActions.initFilterParams(urlParams));
  await store.dispatch(initArticlesPage());
};

import { initArticlesPage } from '@client/pages/ArticlesPage';

export const initializeArticlesData = async (store) => {
  await store.dispatch(initArticlesPage());
};

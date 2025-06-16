export { ArticlesPageAsync as ArticlesPage } from './ui/ArticlesPage.async';
export { fetchArticlesList } from './model/services/fetchArticlesList/fetchArticlesList';
export { initArticlesPage } from './model/services/initArticlesPage/initArticlesPage';
export type { ArticlesPageSchema } from './model/types/articlesPageSchema';
export { articlesPageReducer, initialSSRReducers, injectSSRReducer } from './model/slices/articlesPageSlice';

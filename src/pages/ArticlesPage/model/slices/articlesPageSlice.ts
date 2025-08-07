import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { cookieStore } from 'shared/lib/store';
import { articleFiltersReducer } from 'features/ArticleFilters';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

export const ARTICLE_STORAGE_KEY = 'articles_view';

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

export const articlesPageSlice = createSlice({
  name: 'articlePageSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    hasMore: true,
    limit: undefined,
    page: 1,
    ids: [],
    entities: {},
    view: 'grid',
    _inited: false,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      cookieStore.set(ARTICLE_STORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const view = cookieStore.get(ARTICLE_STORAGE_KEY) as ArticleView;
      if (view) {
        state.view = view;
      } else {
        state.view = 'grid';
      }
      state.limit = view === 'list' ? 4 : 9;
      state._inited = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.error = undefined;
        state.isLoading = false;
        if (action.meta.arg.page === 1) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          articlesAdapter.addMany(state, action.payload);
        }
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  reducer: articlesPageReducer,
  actions: articlesPageActions,
} = articlesPageSlice;

export const initialSSRReducers = {
  articlesPage: articlesPageReducer,
  articlesFilters: articleFiltersReducer,
};

export const injectSSRReducer = (store: ReduxStoreWithManager) => {
  store.reducerManager.add('articlesPage', articlesPageReducer);
  store.reducerManager.add('articlesFilters', articleFiltersReducer);
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleFiltersSchema } from '../types/ArticleFilters';

const initialState: ArticleFiltersSchema = {
  order: 'asc',
  sort: 'createdAt',
  search: '',
};

const articlesFiltersSlice = createSlice({
  name: 'articleSortSlice',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<ArticleFiltersSchema['order']>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleFiltersSchema['sort']>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { actions: articlesFiltersActions, reducer: articleFiltersReducer } = articlesFiltersSlice;

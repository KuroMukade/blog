import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ArticleDetailsSchema } from '../types/articleDetailsShema';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article } from '../types/article';

const initialState: ArticleDetailsSchema = {
  isLoading: true,
  error: undefined,
  data: undefined,
};

export const articleDetailsSlice = createSlice({
  name: 'ArticleDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(fetchArticleById.fulfilled, (
        state,
        action: PayloadAction<Article>,
      ) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchArticleById.rejected, (
        state,
        action,
      ) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;

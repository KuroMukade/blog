import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../../services/fetchArticlesList/fetchArticlesList';
import {
  getArticlesHasMore,
  getArticlesIsLoading,
  getArticlesPageNum,
} from '../../selectors/articlesSelectors';

export const fetchArticlesNextPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticlesNextPage',
  (_, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    try {
      const hasMore = getArticlesHasMore(getState());
      const page = getArticlesPageNum(getState());
      const isLoading = getArticlesIsLoading(getState());

      if (hasMore && !isLoading) {
        dispatch(articlesPageActions.setPage(page + 1));
        dispatch(fetchArticlesList({ page: page + 1 }));
      }
    } catch (e) {
      return rejectWithValue('Произошла ошибка');
    }
  },
);

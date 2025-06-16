import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesLimit } from 'pages/ArticlesPage/model/selectors/articlesSelectors';

interface FetchArticlesListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticlesList', async ({ page = 1 }, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const limit = getArticlesLimit(getState());
  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
      },
    });
    if (!response.data) {
      return rejectWithValue('Произошла ошибка, данные не пришли!');
    }
    return response.data;
  } catch (e) {
    return rejectWithValue('Произошла ошибка');
  }
});

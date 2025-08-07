import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from 'pages/ArticlesPage/model/selectors/articlesSelectors';
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { getSearchParams } from 'app/providers/router/model/selectors/getSearchParams';
import { getSearchParam } from 'app/providers/router/model/selectors/getSearchParam';
import { ArticleView } from 'entities/Article';

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (_, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const store = getState();
  const inited = getArticlesPageInited(store);
  const viewSearchParam = getSearchParam(store, 'view');

  if (!inited) {
    dispatch(articlesPageActions.initState(viewSearchParam as ArticleView));
    await dispatch(fetchArticlesList({
      page: 1,
    }));
  }
});

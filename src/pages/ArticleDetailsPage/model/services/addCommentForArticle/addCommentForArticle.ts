import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
    >(
      'articleDeatils/sendComment',
      async (text, thunkApi) => {
        const {
          extra, rejectWithValue, dispatch, getState,
        } = thunkApi;

        const authData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!authData) {
          return rejectWithValue('not authenticated');
        }

        if (!article) {
          return rejectWithValue('no article');
        }

        if (!text) {
          return rejectWithValue('no text');
        }

        try {
          const response = await extra.api.post<Comment>('/comments', {
            articleId: article.id,
            userId: authData.id,
            text,
          });

          if (!response.data) {
            throw new Error();
          }

          dispatch(fetchCommentsByArticleId(article.id));
          return response.data;
        } catch (e) {
          console.log(e);
          return rejectWithValue('error');
        }
      },
    );

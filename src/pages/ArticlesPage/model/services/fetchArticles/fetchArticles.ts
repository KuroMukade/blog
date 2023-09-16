import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticles = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
 >(
   'articlesPage/fetchArticles',
   async (_, thunkApi) => {
     const { extra, rejectWithValue } = thunkApi;
     try {
       const response = await extra.api.get<Article[]>('/articles', {
         params: {
           _expand: 'users',
         },
       });

       if (!response?.data) {
         return rejectWithValue('error no data');
       }
       return response.data;
     } catch (e) {
       console.log(e);
       return rejectWithValue('error');
     }
   },
 );

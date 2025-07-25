import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { User, userActions, USER_COOKIE_STORAGE_KEY } from 'entities/User';
import { i18n } from 'shared/lib/i18n';
import { cookieStore } from 'shared/lib/store';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
  'login/loginByUsername',
  async (authData, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.post<User>('/login', authData);
      if (!response.data) {
        throw new Error();
      }

      cookieStore.set(USER_COOKIE_STORAGE_KEY, response.data);
      console.log(response.data, 'asdfasdf')
      dispatch(userActions.setAuthData(response.data));
      extra.navigate?.('/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(i18n.t('Вы ввели неверный логин или пароль'));
      // return rejectWithValue('Wrong login')
    }
  },
);

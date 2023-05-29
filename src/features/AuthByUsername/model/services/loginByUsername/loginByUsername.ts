import { createAsyncThunk } from '@reduxjs/toolkit';

import { User, userActions } from 'entities/User';
import axios from 'axios';
import { i18n } from 'shared/config/i18n';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localstorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/login', authData);
      if (!response.data) {
        throw new Error();
      }
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
      thunkAPI.dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(i18n.t('Вы ввели неверный логин или пароль'));
    }
  },
);

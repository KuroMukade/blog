import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { cookieStore } from 'shared/lib/store';
import { USER_COOKIE_STORAGE_KEY } from '../constants';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: (state, action: PayloadAction<User | null>) => {
      const userData = action?.payload;

      if (userData) {
        cookieStore.set(USER_COOKIE_STORAGE_KEY, userData);
        state.authData = userData;
      }

      state._inited = true;
    },
    logout: (state) => {
      state.authData = undefined;
      cookieStore.remove(USER_COOKIE_STORAGE_KEY);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;

export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UrlParamsType } from 'shared/lib/url';
import { RouterSchema } from '../types/routerSchema';

const initialState: RouterSchema = {
  searchParams: {},
};

const routerSlice = createSlice({
  initialState,
  name: 'routerSlice',
  reducers: {
    setSearchParams: (state, action: PayloadAction<UrlParamsType>) => {
      state.searchParams = action.payload;
    },
  },
});

export const { reducer: routerReducer, actions: routerActions } = routerSlice;

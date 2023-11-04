import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SaveScrollSchema } from '../types/saveScrollSchema';

const initialState: SaveScrollSchema = {
  scroll: {},
};

const saveScrollSlice = createSlice({
  initialState,
  name: 'scrollSlice',
  reducers: {
    setScrollPosition: (state, action: PayloadAction<{path: string, position: number}>) => {
      state.scroll[action.payload.path] = action.payload.position;
    },
  },
});

export const {
  actions: saveScrollActions,
  reducer: saveScrollReducer,
} = saveScrollSlice;

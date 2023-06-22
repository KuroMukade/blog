import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../../../../entities/Profile/model/types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  data: undefined,
  error: undefined,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: { 
    setReadonly: (state, action) => {
      state.readonly = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.error = undefined;
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { reducer: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;

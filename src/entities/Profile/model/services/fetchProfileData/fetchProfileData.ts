import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
    Profile,
    string | undefined,
    ThunkConfig<string>
    >(
      'profile/fetchProfileData',
      async (userId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        if (!userId) {
          throw new Error();
        }

        try {
          const response = await extra.api.get<Profile>(`/profile/${userId}`);

          if (!response.data) {
            throw new Error();
          }
          return response.data;
        } catch (e) {
          console.log(e);
          return rejectWithValue('error');
        }
      },
    );

import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Profile, ProfileSchema, ValidateProfileError } from '../../types/profile';
import { profileActions, profileReducer } from '../profileSlice';
import { updateProfileData } from '../../services/updateProfileData/updateProfileData';

const data: Profile = {
  first: 'Тимур',
  lastname: 'Гайнутдинов',
  age: 20,
  currency: Currency.RUB,
  country: Country.Russia,
  city: 'Казань',
  username: 'kuromukade',
  avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juvenile_Ragdoll.jpg',
};

describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };
    expect(profileReducer(
        state as ProfileSchema,
        profileActions.setReadonly(true),
    )).toEqual({ readonly: true });
  });
  test('test cancelEdit', () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: { username: 'kuromukade' },
    };
    expect(profileReducer(
        state as ProfileSchema,
        profileActions.cancelEdit(),
    )).toEqual({
      readonly: true, validateError: undefined, data, form: data,
    });
  });

  test('test updateProfile', () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: { username: 'kuromukade' },
    };
    expect(profileReducer(
          state as ProfileSchema,
          profileActions.updateProfile(data),
    )).toEqual({
      data, form: data,
    });
  });

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateError: [ValidateProfileError.SERVER_ERROR],
    };

    expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending,
    )).toEqual({ isLoading: true, validateErrors: undefined });
  });
});

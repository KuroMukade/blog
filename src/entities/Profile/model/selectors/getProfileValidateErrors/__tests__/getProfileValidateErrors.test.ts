import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateErrors } from '../getProfileValidateErrors';
import { ValidateProfileError } from '../../../types/profile';

describe('getProfileData', () => {
  test('should return profile empty array of validation errors', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateError: [],
      },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([]);
  });
  test('should work with validation error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateError: [ValidateProfileError.INCORRECT_USER_DATA],
      },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
    ]);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});

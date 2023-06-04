import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginError } from '../getLoginError';

describe('getLoginError.test', () => {
  test('should return error message', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: '',
      },
    };
    expect(getLoginError(state as StateSchema)).toEqual('');
  });
  test('should return empty string', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginError(state as StateSchema)).toEqual(undefined);
  });
});

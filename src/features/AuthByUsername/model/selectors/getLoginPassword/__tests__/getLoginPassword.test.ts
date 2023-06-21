import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginPassword } from '../getLoginPassword';

describe('getLoginPassword.test', () => {
  test('Test with state value. Should return empty string', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        password: '',
      },
    };
    expect(getLoginPassword(state as StateSchema)).toEqual('');
  });
  test('Test with empty state. Should return empty string', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginPassword(state as StateSchema)).toEqual('');
  });
});

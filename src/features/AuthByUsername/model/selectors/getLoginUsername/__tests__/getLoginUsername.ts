import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from '../getLoginUsername';

describe('getLoginPassword.test', () => {
  test('Test with state value. Should return empty string', () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        username: '',
      },
    };
    expect(getLoginUsername(state as StateSchema)).toEqual('');
  });
  test('Test with empty state. Should return empty string', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginUsername(state as StateSchema)).toEqual('');
  });
});

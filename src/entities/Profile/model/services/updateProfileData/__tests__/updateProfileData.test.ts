import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { ValidateProfileError } from 'entities/Profile/model/types/profile';
import { updateProfileData } from '../updateProfileData';

const data = {
  id: '1',
  first: 'Тимур',
  lastname: 'Гайнутдинов',
  age: 20,
  currency: Currency.RUB,
  country: Country.Russia,
  city: 'Казань',
  username: 'kuromukade',
  avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juvenile_Ragdoll.jpg',
};

describe('updateProfileData.test', () => {
  test('success case', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, { profile: { form: data } });

    thunk.api.put.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('client validate error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...data, age: undefined },
      },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk();

    expect(thunk.api.put).toBeCalledTimes(0);
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_AGE]);
  });

  test('server validate error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
  });
});

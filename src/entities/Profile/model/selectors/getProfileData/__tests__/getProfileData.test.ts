import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileData } from '../getProfileData';

describe('getProfileData', () => {
  test('should return profile data', () => {
    const data = {
      lastname: 'Гайнутдинов',
      age: 16,
      country: Country.Russia,
      city: 'Kazan',
      username: 'kuromukade',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juvenile_Ragdoll.jpg',
      currency: Currency.RUB,
      first: 'Тимур1',
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});

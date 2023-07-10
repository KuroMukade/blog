import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileForm } from '../getProfileForm';

describe('getProfileData', () => {
  test('should return profile form', () => {
    const form = {
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
        form,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(form);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});

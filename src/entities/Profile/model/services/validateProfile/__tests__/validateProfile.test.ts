import { Profile, ValidateProfileError } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { validateProfile } from '../validateProfile';

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

describe('validateProfile.test', () => {
  test('should pass without errors', () => {
    const result = validateProfile(data);
    expect(result).toEqual([]);
  });

  test('should return age error', () => {
    const result = validateProfile({ ...data, age: undefined });
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_AGE]);
  });

  test('should return incorrect user data error', () => {
    const result = validateProfile({ ...data, first: undefined, lastname: undefined });
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('should return incorrect user contry error', () => {
    const result = validateProfile({ ...data, country: undefined });
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_COUNTRY]);
  });
});

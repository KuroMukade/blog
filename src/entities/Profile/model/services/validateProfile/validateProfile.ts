import { Profile, ValidateProfileError } from '../../types/profile';

export const validateProfile = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }
  const {
    age, avatar, city, country, currency, first, lastname, username,
  } = profile;

  const errors: ValidateProfileError[] = [];

  if (!first || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_USER_AGE);
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_USER_COUNTRY);
  }

  return errors;
};

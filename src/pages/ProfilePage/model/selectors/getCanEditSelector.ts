import { getProfileData } from 'entities/Profile';
import { getUserAuthData } from 'entities/User';
import { createSelector } from 'reselect';

export const getCanEditSelector = createSelector(
  getProfileData,
  getUserAuthData,
  (profile, user) => profile?.id === user?.id,
);

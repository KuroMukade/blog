import React, { FC, useEffect } from 'react';

import { classNames } from 'shared/lib/classNames';

import { ReducersList, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader';
import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import styles from './ProfilePage.module.scss';

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage: FC = () => {
  useDynamicModuleLoader('profile', reducers, false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
      <div className={classNames(styles.wrapper, {}, [])}>
          <ProfileCard />
      </div>
  );
};

export default ProfilePage;

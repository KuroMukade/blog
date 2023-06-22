import { FC } from 'react';
import { useSelector } from 'react-redux';
import { ProfileCard } from 'entities/Profile';
import { classNames } from 'shared/lib/classNames';
import { Loader } from 'shared/ui/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getProfileData } from '../model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from '../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../model/selectors/getProfileError/getProfileError';

import styles from './EditableProfileCard.module.scss';

interface EditableProfileCardProps {
    className?: string;
}

export const EditableProfileCard: FC<EditableProfileCardProps> = ({ className }) => {
  const { t } = useTranslation();

  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  if (isLoading) {
    return (
        <div className={classNames(styles.wrapper, { [styles.loading]: true }, [className])}>
            <Loader />
        </div>
    );
  }

  if (error) {
    return (
        <div className={classNames(styles.wrapper, {}, [className, styles.error])}>
            <Text theme={TextTheme.ERROR} title={t('Произошла ошибка')} />
        </div>
    );
  }

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <ProfileCard data={data} isLoading={isLoading} error={error} />
      </div>
  );
};

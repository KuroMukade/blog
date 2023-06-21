import { FC, useEffect } from 'react';

import { classNames } from 'shared/lib/classNames';

import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import {
  getProfileIsLoading,
} from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { PageLoader } from 'widgets/PageLoader';
import { Text } from 'shared/ui/Text/Text';
import { Button, GrowthColor, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
   className?: string
}

export const ProfileCard: FC<ProfileCardProps> = ({ className }) => {
  const { t } = useTranslation();
  const data = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
          <div className={styles.profileHeader}>
              <Text title={t('Профиль')} />
              <Button
                  growthColor={GrowthColor.PRIMARY}
                  theme={ThemeButton.OUTLINE}
              >
                  {t('Редактировать профиль')}
              </Button>
          </div>
          <div className={styles.profileData}>
              <div className={styles.inputWrapper}>
                  <span className={styles.inputText}>{t('Ник')}</span>
                  <Input
                      className={styles.input}
                      value={data?.username}
                  />
              </div>
              <div className={styles.inputWrapper}>
                  <span className={styles.inputText}>{t('Возраст')}</span>
                  <Input
                      className={styles.input}
                      value={data?.age}
                  />
              </div>
              <div className={styles.inputWrapper}>
                  <span className={styles.inputText}>{t('Возраст')}</span>
                  <Input
                      className={styles.input}
                      value={data?.age}
                  />
              </div>
              <div className={styles.inputWrapper}>
                  <span className={styles.inputText}>{t('Возраст')}</span>
                  <Input
                      className={styles.input}
                      value={data?.age}
                  />
              </div>
              <div className={styles.inputWrapper}>
                  <span className={styles.inputText}>{t('Возраст')}</span>
                  <Input
                      className={styles.input}
                      value={data?.age}
                  />
              </div>
              <div className={styles.inputWrapper}>
                  <span className={styles.inputText}>{t('Возраст')}</span>
                  <Input
                      className={styles.input}
                      value={data?.age}
                  />
              </div>
          </div>
      </div>
  );
};

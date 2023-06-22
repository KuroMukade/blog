import { FC } from 'react';

import { classNames } from 'shared/lib/classNames';

import { useTranslation } from 'react-i18next';

import { Text } from 'shared/ui/Text/Text';
import { Button, GrowthColor, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import styles from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
   className?: string;
   data?: Profile;
   isLoading: boolean;
   error?: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({
  className, data, error, isLoading,
}) => {
  const { t } = useTranslation();

  return (
      <div className={classNames(styles.wrapper, {}, [className])}>
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

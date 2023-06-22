import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, GrowthColor, ThemeButton } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';

import { useSelector } from 'react-redux';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import styles from './EditableProfileCardHeader.module.scss';

export const EditableProfileCardHeader: FC = () => {
  const { t } = useTranslation();

  const readonly = useSelector(getProfileReadonly);

  return (
      <div className={styles.profileHeader}>
          <Text title={t('Профиль')} />
          {readonly
            ? (

                <Button
                    growthColor={GrowthColor.PRIMARY}
                    theme={ThemeButton.OUTLINE}
                >
                    {t('Редактировать профиль')}
                </Button>

            )
            : (
                <>
                    <Button
                        growthColor={GrowthColor.PRIMARY}
                        theme={ThemeButton.OUTLINE}
                    >
                        {t('Сохранить')}
                    </Button>
                    <Button
                        growthColor={GrowthColor.PRIMARY}
                        theme={ThemeButton.OUTLINE}
                    >
                        {t('Отменить')}
                    </Button>
                </>
            )}
      </div>
  );
};

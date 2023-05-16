import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from 'shared/ui/Button/Button';

import styles from './PageError.module.scss';

export const PageError: FC = () => {
  const { t } = useTranslation();

  return (
      <div className={styles.pageError}>
          <Button className={styles.text}>{t('Произошла ')}</Button>
      </div>
  );
};

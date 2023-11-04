import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import styles from './NotFoundPage.module.scss';

const NotFoundPage: FC = () => {
  const { t } = useTranslation();

  return (
      <Page className={styles.notFoundPage}>
          {t('Страница не найдена')}
      </Page>
  );
};

export default NotFoundPage;

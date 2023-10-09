import { Counter } from 'entities/Counter';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';

const MainPage = () => {
  const { t } = useTranslation('main');

  return (
      <Page>
          {t('Главная')}
          <Counter />
      </Page>
  );
};

export default MainPage;

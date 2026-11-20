import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ThemeButton } from 'shared/ui/Button/Button';

import { classNames } from 'shared/lib/classNames';
import { cookieStore } from 'shared/lib/store';
import { LOCALE_STORE_KEY } from 'shared/lib/i18n/constants';
import styles from './LangSwithcer.module.scss';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.on('languageChanged', (lng) => {
      console.log('✅ languageChanged:', lng);
    });
    i18n.on('failedLoading', (lng, ns, msg) => {
      console.error('❌ failedLoading:', lng, ns, msg);
    });
  }, []);
  const toggle = async () => {
    const lang = i18n.language === 'ru' ? 'en' : 'ru';
    await i18n.changeLanguage(lang);
    cookieStore.set(LOCALE_STORE_KEY, lang);
  };

  return (
      <Button
          className={
                classNames(styles.switcher, {}, [className])
            }
          theme={ThemeButton.CLEAR}
          onClick={toggle}
      >
          <span className={styles.code}>{t('ру')}</span>
          <span data-sidebar-label>{t('Язык интерфейса')}</span>
      </Button>
  );
};

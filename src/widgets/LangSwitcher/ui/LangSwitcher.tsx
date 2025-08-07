import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ThemeButton } from 'shared/ui/Button/Button';

import { classNames } from 'shared/lib/classNames';
import styles from './LangSwithcer.module.scss';
import { cookieStore } from 'shared/lib/store';
import { LOCALE_STORE_KEY } from 'shared/lib/i18n/constants';

interface LangSwitcherProps {
  className?: string;
  collapsed?: boolean;
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className, collapsed }) => {
  const { t, i18n } = useTranslation();

  const toggle = async () => {
    const lang = i18n.language === 'ru' ? 'en' : 'ru';
    await i18n.changeLanguage(lang);
    cookieStore.set(LOCALE_STORE_KEY, lang);
  };
  console.log(i18n);
  return (
      <Button
          className={
                classNames(styles.switcher, {}, [className])
            }
          theme={ThemeButton.CLEAR}
          onClick={toggle}
      >
          {t('ру')}
          {!collapsed && <span className={styles.text}>{t('Язык интерфейса')}</span>}
      </Button>
  );
};

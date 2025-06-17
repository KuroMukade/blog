import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ThemeButton } from 'shared/ui/Button/Button';

import { classNames } from 'shared/lib/classNames';
import styles from './LangSwithcer.module.scss';

interface LangSwitcherProps {
  className?: string;
  collapsed?: boolean;
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className, collapsed }) => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

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

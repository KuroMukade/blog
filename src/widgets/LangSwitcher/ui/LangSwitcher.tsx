import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ThemeButton } from 'shared/ui/Button/Button';

import styles from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
      <Button className={className} theme={ThemeButton.CLEAR} onClick={toggle}>
          {t('Перевести')}
      </Button>
  );
};

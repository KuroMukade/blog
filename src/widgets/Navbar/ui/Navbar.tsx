import React from 'react';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import { classNames } from 'shared/lib/classNames';

import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}
export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  return (
      <div className={classNames(styles.navbar, {}, [className])}>
          <AppLink theme={AppLinkTheme.PRIMARY} to="/">{t('Главная')}</AppLink>
          <AppLink theme={AppLinkTheme.SECONDARY} to="about">{t('О нас')}</AppLink>
      </div>
  );
};

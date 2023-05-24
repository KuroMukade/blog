import React, { useCallback, useState } from 'react';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import { classNames } from 'shared/lib/classNames';

import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}
export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthOpen, setAuthOpen] = useState(false);

  const onCloseModal = useCallback(() => {
    setAuthOpen((prev) => !prev);
  }, []);

  return (
      <div className={classNames(styles.navbar, {}, [className])}>
          <AppLink theme={AppLinkTheme.PRIMARY} to="/">{t('Главная')}</AppLink>
          <AppLink theme={AppLinkTheme.SECONDARY} to="about">{t('О нас')}</AppLink>
          <Button theme={ThemeButton.OUTLINE} onClick={onCloseModal}>{t('Войти')}</Button>
          <LoginModal isOpen={isAuthOpen} onClose={onCloseModal} />
      </div>
  );
};

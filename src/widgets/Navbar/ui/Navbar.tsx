import React from 'react';
import { Link } from 'react-router-dom';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import { classNames } from 'shared/lib/classNames'

import styles from './Navbar.module.scss'
import { useTranslation } from 'react-i18next';

interface NavbarProps {
   className?: string
}
export const Navbar = ({ className }: NavbarProps) => {
   const { t, i18n } = useTranslation();
   return (
      <div className={classNames(styles.navbar, {}, [className])}>
        <AppLink theme={AppLinkTheme.PRIMARY} to='/'>{t('Главная')}</AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to='about'>{t('О нас')}</AppLink>
      </div>
    )
}
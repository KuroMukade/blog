import React from 'react';
import { Link } from 'react-router-dom';

import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import { classNames } from 'shared/lib/classNames'

import styles from './Navbar.module.scss'
import { ThemeSwithcer } from 'widgets/ThemeSwitcher';

interface NavbarProps {
   className?: string
}
export const Navbar = ({ className }: NavbarProps) => {
   return (
      <div className={classNames(styles.navbar, {}, [className])}>
         <ThemeSwithcer />
        <AppLink theme={AppLinkTheme.PRIMARY} to='/'>Главная</AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to='about'>About</AppLink>
      </div>
    )
}
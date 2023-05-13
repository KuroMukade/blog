import React, { FC } from 'react';
import { useTheme } from 'shared/contexts/theme';

import { classNames } from 'shared/lib/classNames'

import LightIcon from 'shared/assets/icons/light.svg';
import DarkIcon from 'shared/assets/icons/dark.svg';

import { Theme } from 'shared/contexts/theme';

import styles from './ThemeSwithcer.module.scss'

interface ThemeSwithcerProps {
   className?: string
}

export const ThemeSwithcer: FC<ThemeSwithcerProps> = ({ className }) => {
    const { theme, toggleTheme } = useTheme();

   return (
    <div className={classNames(styles.wrapper, {}, [className, theme === Theme.DARK ? styles.light : styles.dark])} onClick={toggleTheme}>
      <img className={styles.img} src={theme === Theme.DARK ? DarkIcon : LightIcon} alt={theme} />
    </div>
    )
}